import { HttpClient, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { isObservable, Observable, throwError } from "rxjs";
import {
  KEYCLOAK_TOKEN_PROVIDER_CONFIG,
  KeycloakAuthenticationError,
  KeycloakTokenProvider,
  KeycloakTokenProviderConfig,
  MIN_REFRESH_DELAY_IN_S,
  REFRESH_SKEW_IN_S
} from "./keycloak-token-provider";
import { TokenResult } from "./token-provider";

/** Base Keycloak URL used across the cases (with a trailing slash to exercise stripping). */
const KEYCLOAK_URL: string = "https://auth.example.com/auth/";

/** Realm name; contains no special chars, so URL-encoding is an identity here. */
const REALM: string = "ondewo-ccai-platform";

/** Public SDK client id sent on every token request. */
const CLIENT_ID: string = "ondewo-nlu-cai-sdk-public";

/** The fully-qualified token endpoint the provider should POST to (trailing slash stripped). */
const TOKEN_ENDPOINT: string = `https://auth.example.com/auth/realms/${REALM}/protocol/openid-connect/token`;

/** A long-lived offline / refresh token used in the offline-token config. */
const OFFLINE_TOKEN: string = "offline-refresh-token";

/** The access token returned by the first login. */
const ACCESS_1: string = "access-token-1";

/** The access token returned by the first background refresh. */
const ACCESS_2: string = "access-token-2";

/** The lifetime (seconds) reported by Keycloak for the issued access tokens. */
const EXPIRES_IN_S: number = 300;

/**
 * Build a {@link KeycloakTokenProviderConfig} for the offline-token shape, with
 * optional overrides merged on top.
 *
 * @param overrides partial config fields to override the offline-token defaults.
 * @returns a config carrying the offline `refreshToken` (no username/password).
 */
function offlineConfig(overrides: Partial<KeycloakTokenProviderConfig> = {}): KeycloakTokenProviderConfig {
  return {
    keycloakUrl: KEYCLOAK_URL,
    realm: REALM,
    clientId: CLIENT_ID,
    refreshToken: OFFLINE_TOKEN,
    ...overrides
  };
}

/**
 * Configure a TestBed providing the given config and return the resolved provider
 * plus the `HttpTestingController` for asserting/flushing token requests.
 *
 * @param config the {@link KeycloakTokenProviderConfig}, or `undefined` to omit it entirely.
 * @returns the instantiated {@link KeycloakTokenProvider} and the testing controller.
 */
function setup(config: KeycloakTokenProviderConfig | undefined): {
  provider: KeycloakTokenProvider;
  httpController: HttpTestingController;
} {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      KeycloakTokenProvider,
      ...(config === undefined ? [] : [{ provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: config }])
    ]
  });
  const provider: KeycloakTokenProvider = TestBed.inject(KeycloakTokenProvider);
  const httpController: HttpTestingController = TestBed.inject(HttpTestingController);
  return { provider, httpController };
}

/**
 * Drain the microtask queue several turns so an async refresh's `await` chain
 * (HTTP resolution -> storeTokens -> scheduleRefresh) settles under fake timers.
 *
 * @returns a promise that resolves after the queued microtasks have run.
 */
async function flushMicrotasks(): Promise<void> {
  for (let turn: number = 0; turn < 5; turn += 1) {
    await Promise.resolve();
  }
}

/**
 * Coerce a {@link TokenResult} that the tests know to be a `Promise` into one.
 *
 * @param result the value returned by {@link KeycloakTokenProvider.getToken}.
 * @returns the result narrowed to a `Promise<string | null>`.
 */
function asPromise(result: TokenResult): Promise<string | null> {
  if (typeof result === "string" || result === null || isObservable(result)) {
    throw new Error("expected getToken() to return a Promise on the first call");
  }
  return result;
}

/**
 * Expect exactly one POST to the token endpoint and respond with a token body.
 *
 * @param httpController the active {@link HttpTestingController}.
 * @param body the JSON body to flush as the token response.
 * @returns the matched {@link TestRequest} for body/assertion inspection.
 */
function flushToken(
  httpController: HttpTestingController,
  body: { access_token?: string; refresh_token?: string; expires_in?: number }
): TestRequest {
  const request: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
  request.flush(body);
  return request;
}

/**
 * Unit tests for {@link KeycloakTokenProvider}, the built-in headless offline-token
 * provider with background pre-expiry refresh.
 */
describe("KeycloakTokenProvider", () => {
  beforeEach((): void => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  /** A missing config makes construction fail with a clear, actionable error. */
  it("throws when no config is provided", (): void => {
    expect((): KeycloakTokenProvider => setup(undefined).provider).toThrow(KeycloakAuthenticationError);
  });

  /** Each required base field must be a non-empty string. */
  it("throws when a required base field is empty", (): void => {
    expect((): KeycloakTokenProvider => setup(offlineConfig({ realm: "" })).provider).toThrow(
      KeycloakAuthenticationError
    );
  });

  /** Supplying neither credential shape is rejected. */
  it("throws when neither a refresh token nor credentials are supplied", (): void => {
    const config: KeycloakTokenProviderConfig = {
      keycloakUrl: KEYCLOAK_URL,
      realm: REALM,
      clientId: CLIENT_ID
    };
    expect((): KeycloakTokenProvider => setup(config).provider).toThrow(KeycloakAuthenticationError);
  });

  /** Supplying BOTH a refresh token and credentials is rejected (exactly one allowed). */
  it("throws when both a refresh token and credentials are supplied", (): void => {
    const config: KeycloakTokenProviderConfig = offlineConfig({ username: "u@example.com", password: "pw" });
    expect((): KeycloakTokenProvider => setup(config).provider).toThrow(KeycloakAuthenticationError);
  });

  /** A username without a password is treated as no credentials (and so, with no token, rejected). */
  it("throws when a username is supplied without a password", (): void => {
    const config: KeycloakTokenProviderConfig = {
      keycloakUrl: KEYCLOAK_URL,
      realm: REALM,
      clientId: CLIENT_ID,
      username: "u@example.com"
    };
    expect((): KeycloakTokenProvider => setup(config).provider).toThrow(KeycloakAuthenticationError);
  });

  /** The offline-token login POSTs a `grant_type=refresh_token` body and yields the access token. */
  it("logs in once with the offline refresh token and returns the access token", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
    const request: TestRequest = flushToken(httpController, {
      access_token: ACCESS_1,
      refresh_token: OFFLINE_TOKEN,
      expires_in: EXPIRES_IN_S
    });

    expect(request.request.method).toBe("POST");
    expect(request.request.headers.get("Content-Type")).toBe("application/x-www-form-urlencoded");
    const params: URLSearchParams = new URLSearchParams(request.request.body as string);
    expect(params.get("grant_type")).toBe("refresh_token");
    expect(params.get("client_id")).toBe(CLIENT_ID);
    expect(params.get("refresh_token")).toBe(OFFLINE_TOKEN);
    expect(await tokenPromise).toBe(ACCESS_1);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** The ROPC login POSTs a `grant_type=password` body with `scope=offline_access`. */
  it("logs in once with username + password (ROPC) and returns the access token", async (): Promise<void> => {
    const config: KeycloakTokenProviderConfig = {
      keycloakUrl: KEYCLOAK_URL,
      realm: REALM,
      clientId: CLIENT_ID,
      username: "tech@example.com",
      password: "s3cret"
    };
    const { provider, httpController } = setup(config);

    const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
    const request: TestRequest = flushToken(httpController, {
      access_token: ACCESS_1,
      refresh_token: OFFLINE_TOKEN,
      expires_in: EXPIRES_IN_S
    });

    const params: URLSearchParams = new URLSearchParams(request.request.body as string);
    expect(params.get("grant_type")).toBe("password");
    expect(params.get("username")).toBe("tech@example.com");
    expect(params.get("password")).toBe("s3cret");
    expect(params.get("scope")).toBe("offline_access");
    expect(await tokenPromise).toBe(ACCESS_1);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** The one-time login fires only once; subsequent reads return the held token synchronously. */
  it("logs in only once and returns the cached token synchronously afterwards", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;
    // Let the resolved login promise settle so accessToken is populated for the sync path.
    await flushMicrotasks();

    expect(provider.getToken()).toBe(ACCESS_1);
    httpController.expectNone(TOKEN_ENDPOINT);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** A background timer refreshes the access token shortly before expiry. */
  it("refreshes the access token before expiry via the background timer", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    expect(await login).toBe(ACCESS_1);

    // Nothing yet just before the scheduled refresh delay (expires_in - skew).
    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S - 1) * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    // Cross the refresh threshold; the timer fires the refresh POST.
    await jest.advanceTimersByTimeAsync(2 * 1000);
    const refreshRequest: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    const params: URLSearchParams = new URLSearchParams(refreshRequest.request.body as string);
    expect(params.get("grant_type")).toBe("refresh_token");
    expect(params.get("refresh_token")).toBe(OFFLINE_TOKEN);
    refreshRequest.flush({ access_token: ACCESS_2, refresh_token: "rotated", expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    expect(provider.getToken()).toBe(ACCESS_2);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** A rotated refresh token from a refresh response is used on the next refresh. */
  it("uses a rotated refresh token on the subsequent refresh", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const firstRefresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    firstRefresh.flush({ access_token: ACCESS_2, refresh_token: "rotated-token", expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const secondRefresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    expect(new URLSearchParams(secondRefresh.request.body as string).get("refresh_token")).toBe("rotated-token");
    secondRefresh.flush({ access_token: "access-token-3", expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** A refresh response without a refresh token keeps the previous one. */
  it("keeps the previous refresh token when a refresh response omits it", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const firstRefresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    firstRefresh.flush({ access_token: ACCESS_2, expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const secondRefresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    expect(new URLSearchParams(secondRefresh.request.body as string).get("refresh_token")).toBe(OFFLINE_TOKEN);
    secondRefresh.flush({ access_token: "access-token-3", expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** A missing/zero `expires_in` floors the refresh delay at MIN_REFRESH_DELAY_IN_S. */
  it("floors the refresh delay when expires_in is absent", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN });
    await login;

    await jest.advanceTimersByTimeAsync(MIN_REFRESH_DELAY_IN_S * 1000);
    const refresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    refresh.flush({ access_token: ACCESS_2, expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** Login fails (non-2xx) with a wrapped KeycloakAuthenticationError. */
  it("rejects with KeycloakAuthenticationError when the token endpoint errors", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
    httpController.expectOne(TOKEN_ENDPOINT).flush("nope", { status: 401, statusText: "Unauthorized" });

    await expect(tokenPromise).rejects.toBeInstanceOf(KeycloakAuthenticationError);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** An Error transport rejection is wrapped, surfacing its `message`, into a KeycloakAuthenticationError. */
  it("wraps an Error transport rejection, surfacing its message", async (): Promise<void> => {
    // Override HttpClient with a stub whose post errors with a real Error so the
    // `caughtError.message` arm of the error-description path is exercised (HttpErrorResponse
    // is NOT an Error, so the 401 case above only covers the String() fallback arm).
    const boom: Error = new Error("network down");
    const httpStub: Pick<HttpClient, "post"> = {
      post: (): Observable<never> => throwError((): Error => boom)
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpStub },
        { provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: offlineConfig() },
        KeycloakTokenProvider
      ]
    });
    const provider: KeycloakTokenProvider = TestBed.inject(KeycloakTokenProvider);

    await expect(asPromise(provider.getToken())).rejects.toMatchObject({
      name: "KeycloakAuthenticationError",
      message: expect.stringContaining("network down")
    });

    provider.ngOnDestroy();
  });

  /** A plain-string transport rejection is wrapped, surfacing the string itself. */
  it("wraps a string transport rejection, surfacing the string", async (): Promise<void> => {
    // HttpErrorResponse (the 401 case) is neither an Error nor a string, so a stub that errors
    // with a plain string is needed to cover the string arm of the error-description path.
    const httpStub: Pick<HttpClient, "post"> = {
      post: (): Observable<never> => throwError((): string => "plain-string-failure")
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpStub },
        { provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: offlineConfig() },
        KeycloakTokenProvider
      ]
    });
    const provider: KeycloakTokenProvider = TestBed.inject(KeycloakTokenProvider);

    await expect(asPromise(provider.getToken())).rejects.toMatchObject({
      message: expect.stringContaining("plain-string-failure")
    });

    provider.ngOnDestroy();
  });

  /** A login response without an access token is rejected. */
  it("rejects when the login response carries no access_token", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });

    await expect(tokenPromise).rejects.toBeInstanceOf(KeycloakAuthenticationError);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** An ROPC login response without a refresh token is rejected (no offline session). */
  it("rejects when the login response carries no refresh_token", async (): Promise<void> => {
    const config: KeycloakTokenProviderConfig = {
      keycloakUrl: KEYCLOAK_URL,
      realm: REALM,
      clientId: CLIENT_ID,
      username: "tech@example.com",
      password: "s3cret"
    };
    const { provider, httpController } = setup(config);

    const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, expires_in: EXPIRES_IN_S });

    await expect(tokenPromise).rejects.toBeInstanceOf(KeycloakAuthenticationError);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** The bounded deadline stops the loop at schedule time (remaining <= 0) and lets the token lapse. */
  it("stops scheduling once the bounded deadline has elapsed", async (): Promise<void> => {
    // tokenExpirationInS is shorter than (expires_in - skew), so at schedule time the
    // remaining budget is already non-positive -> the loop stops, no refresh is armed.
    const { provider, httpController } = setup(offlineConfig({ tokenExpirationInS: 0 }));

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    await jest.advanceTimersByTimeAsync(EXPIRES_IN_S * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** A bounded deadline far beyond the natural delay still lets a refresh fire (deadline check passes). */
  it("refreshes within a generous bounded deadline", async (): Promise<void> => {
    // expires_in - skew = 270s and the deadline is 1000s, so the natural 270s delay is kept and
    // the firing refresh sees Date.now() < deadline and proceeds with the POST.
    const { provider, httpController } = setup(offlineConfig({ tokenExpirationInS: 1000 }));

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const refresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    refresh.flush({ access_token: ACCESS_2, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    expect(provider.getToken()).toBe(ACCESS_2);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** The deadline clamps the delay; when the timer fires at the deadline the refresh self-stops (no POST). */
  it("clamps to the deadline and self-stops at fire time", async (): Promise<void> => {
    // expires_in - skew = 270s, but tokenExpirationInS caps the loop at 100s, so the timer is
    // armed at 100s; by the time it fires the deadline has been reached, so refresh() self-stops.
    const { provider, httpController } = setup(offlineConfig({ tokenExpirationInS: 100 }));

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    await jest.advanceTimersByTimeAsync(99 * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    await jest.advanceTimersByTimeAsync(2 * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    provider.ngOnDestroy();
    httpController.verify();
  });

  /** ngOnDestroy clears the armed timer so no further refresh fires; calling it twice is safe. */
  it("stops the refresh loop on destroy and is idempotent", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    provider.ngOnDestroy();
    provider.ngOnDestroy();

    await jest.advanceTimersByTimeAsync(EXPIRES_IN_S * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    httpController.verify();
  });

  /** Destroying during an in-flight refresh stops the next refresh from being armed. */
  it("does not re-arm the timer when destroyed mid-refresh", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;

    // Fire the refresh timer so its POST is in flight, then tear the provider down.
    await jest.advanceTimersByTimeAsync((EXPIRES_IN_S - REFRESH_SKEW_IN_S + 1) * 1000);
    const refresh: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);
    provider.ngOnDestroy();

    // Completing the in-flight refresh must NOT schedule a further refresh.
    refresh.flush({ access_token: ACCESS_2, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await flushMicrotasks();

    await jest.advanceTimersByTimeAsync(EXPIRES_IN_S * 1000);
    httpController.expectNone(TOKEN_ENDPOINT);

    httpController.verify();
  });

  /** After destroy, getToken returns the last held token without scheduling anything new. */
  it("getToken returns the held token after destroy", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const login: Promise<string | null> = asPromise(provider.getToken());
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    await login;
    await flushMicrotasks();

    provider.ngOnDestroy();
    expect(provider.getToken()).toBe(ACCESS_1);

    httpController.verify();
  });

  /** The provider implements TokenProvider: getToken returns a usable TokenResult. */
  it("returns an awaitable TokenResult that resolves to the access token", async (): Promise<void> => {
    const { provider, httpController } = setup(offlineConfig());

    const result: TokenResult = provider.getToken();
    flushToken(httpController, { access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
    expect(result instanceof Observable).toBe(false);
    expect(await Promise.resolve(result as Promise<string | null>)).toBe(ACCESS_1);

    provider.ngOnDestroy();
    httpController.verify();
  });

  describe("keycloakVerifySsl (browser no-op, config -> provider parity)", () => {
    /** Omitting the field defaults the stored flag to verification-ON (secure). */
    it("defaults the stored flag to true when keycloakVerifySsl is omitted", (): void => {
      const { provider, httpController } = setup(offlineConfig());
      expect(provider.keycloakVerifySsl).toBe(true);
      httpController.verify();
    });

    /** An explicit true is stored as true. */
    it("stores an explicit keycloakVerifySsl: true as true", (): void => {
      const { provider, httpController } = setup(offlineConfig({ keycloakVerifySsl: true }));
      expect(provider.keycloakVerifySsl).toBe(true);
      httpController.verify();
    });

    /** An explicit false is threaded from config through to the provider field. */
    it("stores keycloakVerifySsl: false as false (threaded config -> provider)", (): void => {
      const { provider, httpController } = setup(offlineConfig({ keycloakVerifySsl: false }));
      expect(provider.keycloakVerifySsl).toBe(false);
      httpController.verify();
    });

    /**
     * The flag is inert at the transport layer: with keycloakVerifySsl: false the
     * provider issues the SAME single POST (same URL, method, headers, body) and
     * logs in exactly as with the field omitted — proving it is a no-op, not wired
     * to TLS.
     */
    it("does not alter or break the token request when keycloakVerifySsl is false", async (): Promise<void> => {
      const { provider, httpController } = setup(offlineConfig({ keycloakVerifySsl: false }));

      const tokenPromise: Promise<string | null> = asPromise(provider.getToken());
      const request: TestRequest = httpController.expectOne(TOKEN_ENDPOINT);

      expect(request.request.method).toBe("POST");
      expect(request.request.headers.get("Content-Type")).toBe("application/x-www-form-urlencoded");
      const params: URLSearchParams = new URLSearchParams(request.request.body as string);
      expect(params.get("grant_type")).toBe("refresh_token");
      expect(params.get("client_id")).toBe(CLIENT_ID);
      expect(params.get("refresh_token")).toBe(OFFLINE_TOKEN);

      request.flush({ access_token: ACCESS_1, refresh_token: OFFLINE_TOKEN, expires_in: EXPIRES_IN_S });
      expect(await tokenPromise).toBe(ACCESS_1);

      provider.ngOnDestroy();
      httpController.verify();
    });
  });
});
