import { HttpClient, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting, TestRequest } from "@angular/common/http/testing";
import { EnvironmentProviders, Provider } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  KEYCLOAK_TOKEN_PROVIDER_CONFIG,
  KeycloakAuthenticationError,
  KeycloakTokenProvider,
  KeycloakTokenProviderConfig,
  MIN_REFRESH_DELAY_IN_S,
  REFRESH_RETRY_BASE_DELAY_IN_S,
  REFRESH_SKEW_IN_S
} from "./keycloak-token-provider";
import { KeycloakLogger, KeycloakTransportError } from "./keycloak-token-session";
import { TokenResult } from "./token-provider";

/** Base Keycloak URL used across the tests; a trailing slash exercises the URL normalisation. */
const KEYCLOAK_URL: string = "https://auth.example.com/auth/";

/** Realm name with a character that must be URL-encoded into the token-endpoint path. */
const REALM: string = "ondewo ccai";

/** The public SDK client id sent on every token request (no `client_secret`). */
const CLIENT_ID: string = "ondewo-nlu-cai-sdk-public";

/** The fully-resolved token endpoint the provider is expected to POST to. */
const TOKEN_ENDPOINT: string = "https://auth.example.com/auth/realms/ondewo%20ccai/protocol/openid-connect/token";

/** The access token returned by the initial login. */
const ACCESS_TOKEN: string = "access-token-1";

/** The refresh token returned by the initial login. */
const REFRESH_TOKEN: string = "refresh-token-1";

/** The access token returned by the first refresh. */
const ACCESS_TOKEN_2: string = "access-token-2";

/** The access-token lifetime (seconds) reported by Keycloak in the test responses. */
const EXPIRES_IN: number = 300;

/** A logger that swallows (and records) the refresh lines, so the console stays quiet. */
class SilentLogger implements KeycloakLogger {
  /** Every WARNING line. */
  public readonly warnings: string[] = [];

  /** @param message the line. */
  public warn(message: string): void {
    this.warnings.push(message);
  }

  /** Ignored. */
  public info(): void {
    // ignored
  }

  /** Ignored. */
  public debug(): void {
    // ignored
  }
}

/** The captured result of standing up a `TestBed` for the provider under test. */
interface SetupResult {
  /** The provider instantiated through DI with the supplied config. */
  provider: KeycloakTokenProvider;
  /** The testing HTTP controller backing the provider's token-endpoint calls. */
  httpMock: HttpTestingController;
}

/**
 * Stand up a fresh `TestBed` with the testing HTTP backend and, when given, the provider config,
 * then instantiate the provider through DI.
 *
 * @param config the runtime config to register under {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}, or
 *   `null` for an idle provider awaiting `configure()`.
 * @returns the instantiated provider and the `HttpTestingController`.
 */
function setup(config: KeycloakTokenProviderConfig | null): SetupResult {
  const providers: (Provider | EnvironmentProviders)[] = [provideHttpClient(), provideHttpClientTesting()];
  if (config !== null) {
    providers.push({ provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: config });
  }
  TestBed.configureTestingModule({ providers });
  const provider: KeycloakTokenProvider = TestBed.inject(KeycloakTokenProvider);
  const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);
  return { provider, httpMock };
}

/** The logger every config of this file uses. */
let logger: SilentLogger = new SilentLogger();

/** A password-grant config (ROPC login). */
const PASSWORD_CONFIG: KeycloakTokenProviderConfig = {
  keycloakUrl: KEYCLOAK_URL,
  realm: REALM,
  clientId: CLIENT_ID,
  username: "technical-user@example.com",
  password: "s3cret",
  randomFraction: (): number => 0,
  get logger(): KeycloakLogger {
    return logger;
  }
};

/** A token-only config (offline token, no password). */
const TOKEN_CONFIG: KeycloakTokenProviderConfig = {
  keycloakUrl: KEYCLOAK_URL,
  realm: REALM,
  clientId: CLIENT_ID,
  refreshToken: "configured-offline-token",
  randomFraction: (): number => 0,
  get logger(): KeycloakLogger {
    return logger;
  }
};

/**
 * @param request the pending token request.
 * @returns the decoded form fields of its body.
 */
function formOf(request: TestRequest): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(request.request.body as string).entries());
}

/**
 * Answer a pending token request with a token response (as the raw text Keycloak sends).
 *
 * @param request the pending token request.
 * @param accessToken the access token to hand out.
 * @param extra further fields; `refresh_token` and `expires_in` default to the test constants.
 */
function flushToken(request: TestRequest, accessToken: string, extra: Record<string, unknown> = {}): void {
  request.flush(JSON.stringify({ access_token: accessToken, refresh_token: REFRESH_TOKEN, expires_in: EXPIRES_IN, ...extra }));
}

/**
 * Drain the microtask queue so a promise chain spanning several `await`s reaches its next step.
 *
 * @returns a promise that resolves once the queued microtasks have run.
 */
async function flushMicrotasks(): Promise<void> {
  for (let index: number = 0; index < 20; index++) {
    await Promise.resolve();
  }
}

/**
 * Await `promise` and return what it rejected with.
 *
 * @param promise a promise expected to reject.
 * @returns the rejection reason.
 */
async function rejectionOf(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error: unknown) {
    return error;
  }
  throw new Error("expected the promise to reject");
}

/**
 * Unit tests for the DI adapter {@link KeycloakTokenProvider}: the configuration rules (T55-T62 of
 * the cross-SDK catalogue), the `HttpClient` transport (status, body, timeout, network failure), the
 * lazy `getToken` path, runtime re-configuration and the shared login. The refresh semantics
 * themselves are pinned in keycloak-token-session.spec.ts. Network is the Angular HTTP testing
 * backend; time is Jest's fake timers (which also drive `performance.now`).
 */
describe("KeycloakTokenProvider", (): void => {
  beforeEach((): void => {
    jest.useFakeTimers();
    logger = new SilentLogger();
  });

  afterEach((): void => {
    TestBed.resetTestingModule();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  /**
   * Answer the start-up request and await readiness.
   *
   * @param setupResult the provider and its HTTP mock.
   * @param grant the expected `grant_type`.
   * @returns the start-up request.
   */
  async function completeLogin(setupResult: SetupResult, grant: string = "password"): Promise<TestRequest> {
    const request: TestRequest = setupResult.httpMock.expectOne(TOKEN_ENDPOINT);
    expect(request.request.method).toBe("POST");
    expect(request.request.headers.get("Content-Type")).toBe("application/x-www-form-urlencoded");
    expect(formOf(request)["grant_type"]).toBe(grant);
    flushToken(request, ACCESS_TOKEN);
    await setupResult.provider.whenReady();
    return request;
  }

  describe("start-up", (): void => {
    it("serves the first token through a promise while the first login is in flight", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const pending: TokenResult = result.provider.getToken();
      expect(pending).toBeInstanceOf(Promise);
      await completeLogin(result);
      expect(await pending).toBe(ACCESS_TOKEN);
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("yields null from that promise when the first login fails, and null afterwards", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const pending: TokenResult = result.provider.getToken();
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("nope", { status: 401, statusText: "Unauthorized" });
      expect(await pending).toBeNull();
      expect(await rejectionOf(result.provider.whenReady())).toBeInstanceOf(KeycloakAuthenticationError);
      expect(result.provider.getToken()).toBeNull();
    });

    it("yields null from that promise when no Keycloak is configured", async (): Promise<void> => {
      const result: SetupResult = setup({ keycloakUrl: "", realm: "", clientId: "" });
      expect(await result.provider.getToken()).toBeNull();
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("yields null from that promise when a re-configure supersedes the first login", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const pending: TokenResult = result.provider.getToken();
      const reconfigured: Promise<void> = result.provider.configure({ keycloakUrl: "", realm: "", clientId: "" });
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN);
      await reconfigured;
      expect(await pending).toBeNull();
    });

    it("T36 logs in with exactly the five password-grant fields and serves the token", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const request: TestRequest = await completeLogin(result);
      expect(formOf(request)).toEqual({
        grant_type: "password",
        client_id: CLIENT_ID,
        username: "technical-user@example.com",
        password: "s3cret",
        scope: "offline_access"
      });
      expect(request.request.headers.get("Accept")).toBe("application/json");
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("T42/T60 starts a token-only config with one refresh grant and no password", async (): Promise<void> => {
      const result: SetupResult = setup(TOKEN_CONFIG);
      const request: TestRequest = await completeLogin(result, "refresh_token");
      expect(formOf(request)).toEqual({
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        refresh_token: "configured-offline-token"
      });
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("accepts the deprecated offlineToken alias, and refreshToken wins over it", async (): Promise<void> => {
      const alias: SetupResult = setup({ ...PASSWORD_CONFIG, offlineToken: "legacy-offline-token" });
      const aliasRequest: TestRequest = await completeLogin(alias, "refresh_token");
      expect(formOf(aliasRequest)["refresh_token"]).toBe("legacy-offline-token");
      TestBed.resetTestingModule();
      const both: SetupResult = setup({ ...TOKEN_CONFIG, offlineToken: "legacy-offline-token" });
      const bothRequest: TestRequest = await completeLogin(both, "refresh_token");
      expect(formOf(bothRequest)["refresh_token"]).toBe("configured-offline-token");
    });

    it("treats an empty token as no token: it falls through to the password grant", async (): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, offlineToken: "", refreshToken: "" });
      await completeLogin(result, "password");
    });

    it("T44 a refused start-up token rejects whenReady without a password fallback", async (): Promise<void> => {
      const result: SetupResult = setup({ ...TOKEN_CONFIG, username: "u", password: "configured-too" });
      result.httpMock
        .expectOne(TOKEN_ENDPOINT)
        .flush(JSON.stringify({ error: "invalid_grant" }), { status: 400, statusText: "Bad Request" });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect(error).toBeInstanceOf(KeycloakAuthenticationError);
      expect((error as Error).message).toBe('Keycloak token refresh failed with status 400: {"error":"invalid_grant"}');
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      expect(result.provider.getToken()).toBeNull();
    });

    it("no longer requires a refresh_token in the login response", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush(JSON.stringify({ access_token: ACCESS_TOKEN, expires_in: 300 }));
      await result.provider.whenReady();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });
  });

  describe("configuration rules", (): void => {
    it.each([
      ["only keycloakUrl", { realm: "", clientId: "" }],
      ["only realm", { keycloakUrl: "", clientId: "" }],
      ["only clientId", { keycloakUrl: "", realm: "" }],
      ["keycloakUrl and realm", { clientId: "" }],
      ["realm and clientId", { keycloakUrl: "" }],
      ["keycloakUrl and clientId", { realm: "" }]
    ])("T61 rejects a partial triple (%s) before any request", async (_case: string, change: Partial<KeycloakTokenProviderConfig>): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, ...change });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect(error).toBeInstanceOf(KeycloakAuthenticationError);
      expect((error as Error).message).toBe(
        "The Keycloak fields `keycloakUrl`, `realm`, and `clientId` must be provided together in KeycloakTokenProviderConfig."
      );
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("T57 rejects a triple with neither a password nor a refresh token", async (): Promise<void> => {
      const result: SetupResult = setup({ keycloakUrl: KEYCLOAK_URL, realm: REALM, clientId: CLIENT_ID, username: "u" });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toContain("`password`");
      expect((error as Error).message).toContain("refresh_token");
      expect((error as Error).message).toContain("`refreshToken`");
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("keeps the username rule of the password grant", async (): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, username: "" });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe(
        "KeycloakTokenProvider requires either an offlineToken or a username + password pair"
      );
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("T56 a token-only config needs no username and no password", async (): Promise<void> => {
      const result: SetupResult = setup({ ...TOKEN_CONFIG, username: undefined, password: undefined });
      await completeLogin(result, "refresh_token");
    });

    it("T58 a password config still constructs and logs in", async (): Promise<void> => {
      await completeLogin(setup(PASSWORD_CONFIG));
    });

    it("T62 builds nothing and attaches nothing without a Keycloak triple", async (): Promise<void> => {
      const result: SetupResult = setup({ keycloakUrl: "", realm: "", clientId: "", password: "pw" });
      await result.provider.whenReady();
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      expect(result.provider.getToken()).toBeNull();
      expect(await result.provider.ensureFreshToken()).toBeNull();
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("T62 tolerates absent triple fields at runtime", async (): Promise<void> => {
      const result: SetupResult = setup({} as KeycloakTokenProviderConfig);
      await result.provider.whenReady();
      expect(result.provider.getToken()).toBeNull();
    });

    it("T55 has no positional surface: config and options are objects", (): void => {
      // The provider is built by DI with no parameters, so there is no argument order to keep stable.
      expect(KeycloakTokenProvider.length).toBe(0);
    });

    it("T59 renders the configuration redacted: a non-empty secret is masked, an empty one stays empty", async (): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, refreshToken: "secret-offline-77", offlineToken: "" });
      const rendered: string = `${String(result.provider)} ${JSON.stringify(result.provider)}`;
      expect(rendered).toContain("***REDACTED***");
      expect(rendered).not.toContain("secret-offline-77");
      expect(rendered).not.toContain("s3cret");
      expect(result.provider.toJSON()["offlineToken"]).toBe("");
      expect(result.provider.toJSON()["realm"]).toBe(REALM);
      expect(String(result.provider).startsWith("KeycloakTokenProvider(")).toBe(true);
      await completeLogin(result, "refresh_token");
    });

    it("renders an unconfigured provider as an empty object", (): void => {
      expect(setup(null).provider.toJSON()).toEqual({});
    });
  });

  describe("HttpClient transport", (): void => {
    it("quotes the raw error body of a non-2xx answer", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("<html>bad gateway</html>", { status: 502, statusText: "Bad Gateway" });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe("Keycloak token login failed with status 502: <html>bad gateway</html>");
    });

    it("quotes an empty body when the error answer carried no text", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).error(new ProgressEvent("error"), { status: 500, statusText: "Internal" });
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe("Keycloak token login failed with status 500: ");
    });

    it("reports a status-0 answer as an unreachable endpoint, with the HTTP error as the cause", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).error(new ProgressEvent("error"));
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toContain("Keycloak token login could not reach the token endpoint (HttpErrorResponse:");
      expect((error as Error).cause).toBeInstanceOf(KeycloakTransportError);
    });

    it("times a hanging token request out after 10 s", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const request: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      jest.advanceTimersByTime(9999);
      expect(request.cancelled).toBe(false);
      jest.advanceTimersByTime(1);
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe(
        "Keycloak token login could not reach the token endpoint (TimeoutError: Timeout has occurred)"
      );
      expect(request.cancelled).toBe(true);
    });

    it("rejects a 200 whose body is empty", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("");
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe("Keycloak token login returned status 200 with a body that is not JSON");
    });

    it("rejects a bodiless 204", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush(null);
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe("Keycloak token login returned status 204 with a body that is not JSON");
    });

    it("rejects a 200 whose JSON is an array", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("[]");
      const error: unknown = await rejectionOf(result.provider.whenReady());
      expect((error as Error).message).toBe("Keycloak token login returned a JSON array instead of an object");
    });
  });

  describe("refresh", (): void => {
    it("refreshes in the background shortly before expiry", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      jest.advanceTimersByTime((EXPIRES_IN - REFRESH_SKEW_IN_S) * 1000);
      const refresh: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      expect(formOf(refresh)).toEqual({ grant_type: "refresh_token", client_id: CLIENT_ID, refresh_token: REFRESH_TOKEN });
      flushToken(refresh, ACCESS_TOKEN_2);
      await flushMicrotasks();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN_2);
    });

    it("floors the refresh delay when expires_in is absent", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush(JSON.stringify({ access_token: ACCESS_TOKEN }));
      await result.provider.whenReady();
      jest.advanceTimersByTime((MIN_REFRESH_DELAY_IN_S * 1000) - 1);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      jest.advanceTimersByTime(1);
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN_2);
      await flushMicrotasks();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN_2);
    });

    it("keeps the previous token and re-arms with the backoff base after a failed background refresh", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      jest.advanceTimersByTime((EXPIRES_IN - REFRESH_SKEW_IN_S) * 1000);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("nope", { status: 401, statusText: "Unauthorized" });
      await flushMicrotasks();
      // Inside the leeway getToken goes through the shared decision: backing off, still valid.
      expect(await result.provider.getToken()).toBe(ACCESS_TOKEN);
      expect(logger.warnings).toHaveLength(1);
      // Never a password login on a refresh path.
      jest.advanceTimersByTime((REFRESH_RETRY_BASE_DELAY_IN_S * 1000) - 1);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      jest.advanceTimersByTime(1);
      const retry: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      expect(formOf(retry)["grant_type"]).toBe("refresh_token");
      flushToken(retry, "re-armed-access-token");
      await flushMicrotasks();
      expect(result.provider.getToken()).toBe("re-armed-access-token");
    });

    it("stops the background refresh when the tokenExpirationInS deadline is reached", async (): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, tokenExpirationInS: 100 });
      await completeLogin(result);
      jest.advanceTimersByTime(100 * 1000);
      await flushMicrotasks();
      jest.advanceTimersByTime(EXPIRES_IN * 1000);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      // Past the deadline the token is served as-is and allowed to lapse.
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("T19 getToken inside the leeway runs the shared refresh and serves the still-valid token on failure", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      result.provider.ngOnDestroy();
      jest.advanceTimersByTime(271 * 1000);
      const first: TokenResult = result.provider.getToken();
      const second: TokenResult = result.provider.getToken();
      expect(typeof (first as Promise<string | null>).then).toBe("function");
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("down", { status: 503, statusText: "Unavailable" });
      expect(await first).toBe(ACCESS_TOKEN);
      expect(await second).toBe(ACCESS_TOKEN);
      expect(logger.warnings[0]).toContain("refresh failed (attempt 1)");
    });

    it("T22 getToken rejects for an expired token whose refresh fails", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      result.provider.ngOnDestroy();
      jest.advanceTimersByTime(400 * 1000);
      const token: TokenResult = result.provider.getToken();
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("refused", { status: 400, statusText: "Bad Request" });
      const error: unknown = await rejectionOf(token as Promise<string | null>);
      expect(error).toBeInstanceOf(KeycloakAuthenticationError);
      expect((error as Error).message).toContain("status 400");
    });
  });

  describe("ensureFreshToken", (): void => {
    it("returns null and issues no request when unconfigured", async (): Promise<void> => {
      const result: SetupResult = setup(null);
      expect(await result.provider.ensureFreshToken()).toBeNull();
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("returns the cached token without a request while it is still valid", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      expect(await result.provider.ensureFreshToken()).toBe(ACCESS_TOKEN);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("renews unconditionally when force is set, with a refresh grant", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      const renewed: Promise<string | null> = result.provider.ensureFreshToken({ force: true });
      await flushMicrotasks();
      const request: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      expect(formOf(request)["grant_type"]).toBe("refresh_token");
      flushToken(request, ACCESS_TOKEN_2);
      expect(await renewed).toBe(ACCESS_TOKEN_2);
    });

    it("waits for a start-up that is still running", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const token: Promise<string | null> = result.provider.ensureFreshToken();
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN);
      expect(await token).toBe(ACCESS_TOKEN);
    });

    it("runs the start-up again after it failed, and rejects when it fails again", async (): Promise<void> => {
      const result: SetupResult = setup(TOKEN_CONFIG);
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("refused", { status: 400, statusText: "Bad Request" });
      await rejectionOf(result.provider.whenReady());
      const retry: Promise<string | null> = result.provider.ensureFreshToken();
      await flushMicrotasks();
      const again: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      expect(formOf(again)["grant_type"]).toBe("refresh_token");
      again.flush("refused", { status: 400, statusText: "Bad Request" });
      expect(await rejectionOf(retry)).toBeInstanceOf(KeycloakAuthenticationError);
      const recovered: Promise<string | null> = result.provider.ensureFreshToken();
      await flushMicrotasks();
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN);
      expect(await recovered).toBe(ACCESS_TOKEN);
    });
  });

  describe("configure (credentials supplied at runtime)", (): void => {
    it("stays idle and issues no request when constructed without a config", (): void => {
      const result: SetupResult = setup(null);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      expect(result.provider.getToken()).toBeNull();
    });

    it("logs in with a config supplied after construction and resolves whenReady", async (): Promise<void> => {
      const result: SetupResult = setup(null);
      const configured: Promise<void> = result.provider.configure(PASSWORD_CONFIG);
      await flushMicrotasks();
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN);
      await configured;
      await result.provider.whenReady();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("rejects configure() and whenReady() when the first runtime login fails", async (): Promise<void> => {
      const result: SetupResult = setup(null);
      const configured: Promise<void> = result.provider.configure(PASSWORD_CONFIG);
      await flushMicrotasks();
      result.httpMock.expectOne(TOKEN_ENDPOINT).flush("nope", { status: 401, statusText: "Unauthorized" });
      expect(await rejectionOf(configured)).toBeInstanceOf(KeycloakAuthenticationError);
      expect(await rejectionOf(result.provider.whenReady())).toBeInstanceOf(KeycloakAuthenticationError);
      expect(result.provider.getToken()).toBeNull();
    });

    it("replaces an earlier config and stops the refresh it had armed", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      const reconfigured: Promise<void> = result.provider.configure({ ...PASSWORD_CONFIG, username: "other-user" });
      await flushMicrotasks();
      const login: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      expect(formOf(login)["username"]).toBe("other-user");
      flushToken(login, ACCESS_TOKEN_2, { expires_in: 3600 });
      await reconfigured;
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN_2);
      // The first login's refresh (due at 270 s) is gone with its released session.
      jest.advanceTimersByTime((EXPIRES_IN - REFRESH_SKEW_IN_S) * 1000);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("drops a login superseded by a later configure()", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const first: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      const reconfigured: Promise<void> = result.provider.configure({ ...PASSWORD_CONFIG, username: "other-user" });
      await flushMicrotasks();
      const second: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      flushToken(second, ACCESS_TOKEN_2);
      await reconfigured;
      flushToken(first, "superseded-token");
      await result.provider.whenReady();
      await flushMicrotasks();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN_2);
      // The superseded session was released: its refresh never fires.
      jest.advanceTimersByTime((EXPIRES_IN - REFRESH_SKEW_IN_S) * 1000);
      const refreshes: TestRequest[] = result.httpMock.match(TOKEN_ENDPOINT);
      expect(refreshes).toHaveLength(1);
      expect(formOf(refreshes[0])["refresh_token"]).toBe(REFRESH_TOKEN);
      flushToken(refreshes[0], "access-token-3");
    });
  });

  describe("lifecycle and sharing", (): void => {
    it("stops the background refresh on destroy, keeping the lazy path", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      await completeLogin(result);
      result.provider.ngOnDestroy();
      result.provider.ngOnDestroy();
      jest.advanceTimersByTime(EXPIRES_IN * 1000 * 2);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
      const token: TokenResult = result.provider.getToken();
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN_2);
      expect(await token).toBe(ACCESS_TOKEN_2);
    });

    it("releases a login that completes after destroy, without arming a refresh", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const login: TestRequest = result.httpMock.expectOne(TOKEN_ENDPOINT);
      result.provider.ngOnDestroy();
      flushToken(login, ACCESS_TOKEN);
      await result.provider.whenReady();
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
      jest.advanceTimersByTime(EXPIRES_IN * 1000);
      result.httpMock.expectNone(TOKEN_ENDPOINT);
    });

    it("shares one login between providers with the same credentials on one HttpClient", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      const second: KeycloakTokenProvider = TestBed.runInInjectionContext(
        (): KeycloakTokenProvider => new KeycloakTokenProvider()
      );
      await completeLogin(result);
      await second.whenReady();
      expect(second.getToken()).toBe(ACCESS_TOKEN);
      // Destroying one keeps the shared refresh alive for the other.
      result.provider.ngOnDestroy();
      jest.advanceTimersByTime((EXPIRES_IN - REFRESH_SKEW_IN_S) * 1000);
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN_2);
      await flushMicrotasks();
      expect(second.getToken()).toBe(ACCESS_TOKEN_2);
      expect(TestBed.inject(HttpClient)).toBeDefined();
    });
  });

  describe("keycloakVerifySsl (browser no-op, config -> provider parity)", (): void => {
    it("defaults the stored flag to true", async (): Promise<void> => {
      const result: SetupResult = setup(PASSWORD_CONFIG);
      expect(result.provider.keycloakVerifySsl).toBe(true);
      await completeLogin(result);
    });

    it("stores keycloakVerifySsl: false and leaves the token request unchanged", async (): Promise<void> => {
      const result: SetupResult = setup({ ...PASSWORD_CONFIG, keycloakVerifySsl: false });
      expect(result.provider.keycloakVerifySsl).toBe(false);
      await completeLogin(result);
      expect(result.provider.getToken()).toBe(ACCESS_TOKEN);
    });

    it("is unset on an idle provider and adopted by configure()", async (): Promise<void> => {
      const result: SetupResult = setup(null);
      expect(result.provider.keycloakVerifySsl).toBe(true);
      const configured: Promise<void> = result.provider.configure({ ...PASSWORD_CONFIG, keycloakVerifySsl: false });
      expect(result.provider.keycloakVerifySsl).toBe(false);
      await flushMicrotasks();
      flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), ACCESS_TOKEN);
      await configured;
    });
  });
});
