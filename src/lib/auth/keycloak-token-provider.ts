import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, InjectionToken, NgZone, OnDestroy, Optional } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { TokenProvider, TokenResult } from "./token-provider";

/**
 * Seconds of head-room subtracted from a token's `expires_in` so the background
 * refresh fires *before* the access token actually lapses (covers clock skew and
 * the round-trip to Keycloak). Mirrors the nodejs `REFRESH_SKEW_IN_S` and the
 * python `_EXPIRY_LEEWAY_S` references.
 */
export const REFRESH_SKEW_IN_S: number = 30;

/**
 * Lower bound (in seconds) on the scheduled refresh delay, so a tiny or zero
 * `expires_in` cannot spin a hot refresh loop.
 */
export const MIN_REFRESH_DELAY_IN_S: number = 1;

/**
 * Configuration the consuming application supplies to {@link KeycloakTokenProvider}.
 *
 * Provide either a long-lived offline / refresh token (`refreshToken`) — the
 * preferred headless-SDK shape, no password kept in memory — or a
 * `username` + `password` pair for a one-time Resource Owner Password Credentials
 * (ROPC) login with `scope=offline_access`. Exactly one of the two must be given.
 */
export interface KeycloakTokenProviderConfig {
  /**
   * Base Keycloak URL, e.g. `https://auth.example.com/auth` (a trailing slash and
   * a baked-in `/auth` path are both tolerated).
   */
  readonly keycloakUrl: string;
  /** Realm name, e.g. `ondewo-ccai-platform`. */
  readonly realm: string;
  /**
   * Public SDK client id, e.g. `ondewo-nlu-cai-sdk-public`. No `client_secret` is
   * ever sent (the SDK client is public).
   */
  readonly clientId: string;
  /**
   * A long-lived offline / refresh token used to mint access tokens directly
   * (`grant_type=refresh_token`). Mutually exclusive with `username`/`password`.
   */
  readonly refreshToken?: string;
  /**
   * Technical-user email/username for a one-time ROPC login. Requires `password`.
   * Mutually exclusive with `refreshToken`.
   */
  readonly username?: string;
  /** Technical-user password for the ROPC login. Requires `username`. */
  readonly password?: string;
  /**
   * Optional cap (in seconds since login) on how long the background refresh loop
   * runs. Once it elapses the loop stops and the access token is allowed to lapse
   * (re-login required). Omit to keep refreshing until the offline session itself
   * expires.
   */
  readonly tokenExpirationInS?: number;
  /**
   * Whether to verify the Keycloak server's TLS certificate on the
   * token-endpoint call. Defaults to `true` (secure).
   *
   * NO-OP IN THIS ANGULAR/BROWSER CLIENT. The token request is made with
   * Angular's `HttpClient` (an XHR/fetch call), and in a browser the TLS
   * handshake is owned by the user agent — there is no `https.Agent`, undici
   * dispatcher, or `rejectUnauthorized` hook that app code can reach, and
   * `HttpClient`'s request options expose no certificate-verification slot. The
   * value is therefore stored on the provider for cross-SDK config parity with
   * the Python/Node.js clients (where it does disable TLS verification) but has
   * no effect on the outgoing request here. For a self-signed local Envoy, the
   * certificate must be trusted at the browser/OS level instead.
   */
  readonly keycloakVerifySsl?: boolean;
}

/**
 * DI token under which {@link KeycloakTokenProvider} reads its
 * {@link KeycloakTokenProviderConfig}. The consuming application provides a value
 * for it (see {@link provideKeycloakTokenProvider}).
 */
export const KEYCLOAK_TOKEN_PROVIDER_CONFIG: InjectionToken<KeycloakTokenProviderConfig> =
  new InjectionToken<KeycloakTokenProviderConfig>("ONDEWO_SIP_KEYCLOAK_TOKEN_PROVIDER_CONFIG");

/** Error raised on a missing/invalid configuration or any token-endpoint failure. */
export class KeycloakAuthenticationError extends Error {
  /**
   * @param message a human-readable description of the configuration or token failure.
   */
  public constructor(message: string) {
    super(message);
    this.name = "KeycloakAuthenticationError";
  }
}

/** The fields of a Keycloak token-endpoint response this provider consumes. */
interface KeycloakTokenResponse {
  /** The short-lived bearer access token. */
  readonly access_token?: string;
  /** The (optionally rotated) refresh token; absent if the response carries none. */
  readonly refresh_token?: string;
  /** The access-token lifetime in seconds, as reported by Keycloak. */
  readonly expires_in?: number;
}

/**
 * Concrete, ready-to-use {@link TokenProvider} that performs the Keycloak headless
 * offline-token flow itself, so consumers get background access-token refresh
 * without implementing {@link TokenProvider}.
 *
 * On the first {@link getToken} call it logs in once against the Keycloak token
 * endpoint — either with a supplied offline / refresh token
 * (`grant_type=refresh_token`) or with a `username` + `password` ROPC grant
 * (`grant_type=password`, `scope=offline_access`) — then keeps the access token
 * fresh via a background timer that refreshes shortly *before* expiry (clamped to
 * an optional bounded deadline, mirroring the nodejs `OfflineTokenProvider` and
 * python `KeycloakTokenProvider` references). {@link getToken} returns the current
 * valid access token; the library's interceptors attach it as
 * `Authorization: Bearer <token>`.
 *
 * Register it with {@link provideKeycloakTokenProvider}, then point the SDK auth at
 * it:
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideHttpClient(),
 *     provideKeycloakTokenProvider({
 *       keycloakUrl: "https://auth.example.com/auth",
 *       realm: "ondewo-ccai-platform",
 *       clientId: "ondewo-nlu-cai-sdk-public",
 *       refreshToken: "<offline-token>",
 *     }),
 *     provideOndewoSipAuth(KeycloakTokenProvider),
 *     provideHttpClient(withInterceptors([authHttpInterceptor])),
 *   ],
 * });
 * ```
 */
@Injectable({ providedIn: "root" })
export class KeycloakTokenProvider implements TokenProvider, OnDestroy {
  /** Pre-computed OIDC token endpoint URL for the configured realm. */
  private readonly tokenEndpoint: string;
  /** Public SDK client id sent on every token request (no `client_secret`). */
  private readonly clientId: string;
  /** Optional cap (seconds) after which the refresh loop stops; `undefined` means unbounded. */
  private readonly tokenExpirationInS: number | undefined;
  /**
   * Whether TLS-certificate verification is requested for the token-endpoint
   * call. Defaults to `true`. Stored for cross-SDK config parity only — it is a
   * NO-OP in this browser client (the browser owns the TLS handshake), so the
   * outgoing {@link postTokenRequest} call is unaffected by its value. See
   * {@link KeycloakTokenProviderConfig.keycloakVerifySsl}.
   */
  private readonly verifySsl: boolean;
  /** The grant parameters for the one-time login, derived from the config. */
  private readonly loginRequest: Record<string, string>;

  /** The current access token, or `null` before the first login / after the bounded loop lapses. */
  private accessToken: string | null = null;
  /** The current refresh token, or `null` before any login completes. */
  private refreshToken: string | null = null;
  /** Handle of the armed refresh timer, or `null` when no refresh is scheduled. */
  private timer: ReturnType<typeof setTimeout> | null = null;
  /** Whether {@link ngOnDestroy} has run; suppresses any further (re-)scheduling. */
  private stopped: boolean = false;
  /** Absolute epoch-ms deadline for the bounded loop, or `null` when unbounded. */
  private deadlineInMs: number | null = null;
  /** The in-flight (or settled) one-time login promise; ensures login happens exactly once. */
  private loginPromise: Promise<void> | null = null;

  /**
   * @param http the Angular {@link HttpClient} used for the token-endpoint calls.
   * @param zone the {@link NgZone}; the background timer is armed outside Angular so it
   *   does not keep change detection / zone stability churning between refreshes.
   * @param config the {@link KeycloakTokenProviderConfig}, injected under
   *   {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}.
   */
  public constructor(
    private readonly http: HttpClient,
    private readonly zone: NgZone,
    @Optional() @Inject(KEYCLOAK_TOKEN_PROVIDER_CONFIG) config: KeycloakTokenProviderConfig | null
  ) {
    if (config === null) {
      throw new KeycloakAuthenticationError(
        "KeycloakTokenProvider requires a KEYCLOAK_TOKEN_PROVIDER_CONFIG value; " +
          "register it with provideKeycloakTokenProvider({ ... })"
      );
    }
    this.loginRequest = this.validateAndBuildLoginRequest(config);
    this.tokenEndpoint = KeycloakTokenProvider.buildTokenEndpoint(config.keycloakUrl, config.realm);
    this.clientId = config.clientId;
    this.tokenExpirationInS = config.tokenExpirationInS;
    // Stored for cross-SDK config parity; a no-op on the browser transport (see field doc).
    this.verifySsl = config.keycloakVerifySsl ?? true;
    if (config.refreshToken !== undefined) {
      this.refreshToken = config.refreshToken;
    }
  }

  /**
   * Return the current access token, logging in on the first call.
   *
   * The first invocation returns a `Promise` that resolves once the one-time login
   * has completed and the background refresh is armed. Subsequent invocations
   * return the synchronously-held current access token (or `null` if the bounded
   * loop has lapsed), so interceptors pay no async cost on the hot path.
   *
   * @returns the current access token as a {@link TokenResult}.
   */
  public getToken(): TokenResult {
    if (this.loginPromise === null) {
      this.loginPromise = this.bootstrap();
    }
    if (this.accessToken !== null) {
      return this.accessToken;
    }
    return this.loginPromise.then((): string | null => this.accessToken);
  }

  /**
   * The resolved TLS-verification setting from
   * {@link KeycloakTokenProviderConfig.keycloakVerifySsl} (defaults to `true`).
   *
   * Exposed for cross-SDK config parity and introspection only. It is a NO-OP in
   * this browser client — the browser owns the TLS handshake, so the value never
   * reaches {@link postTokenRequest} and does not change the outgoing request.
   *
   * @returns `true` when TLS verification is requested (the default), `false`
   *   when the config explicitly opted out (still inert here).
   */
  public get keycloakVerifySsl(): boolean {
    return this.verifySsl;
  }

  /** Stop the background refresh loop when the provider is torn down. Idempotent. */
  public ngOnDestroy(): void {
    this.stopped = true;
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Perform the one-time login (offline-token or ROPC) and arm the first refresh.
   *
   * @returns a promise that resolves once the first token is stored and the refresh is armed.
   * @throws {@link KeycloakAuthenticationError} if the token endpoint fails or returns no
   *   `access_token` / `refresh_token`.
   */
  private async bootstrap(): Promise<void> {
    const response: KeycloakTokenResponse = await this.postTokenRequest(this.loginRequest);
    this.storeTokens(response);
    if (this.refreshToken === null) {
      throw new KeycloakAuthenticationError(
        "Keycloak token response did not contain a refresh_token; the SDK client must have " +
          "directAccessGrants + the offline_access scope (e.g. ondewo-nlu-cai-sdk-public)"
      );
    }
    if (this.tokenExpirationInS !== undefined) {
      this.deadlineInMs = Date.now() + (this.tokenExpirationInS * 1000);
    }
    this.scheduleRefresh(response.expires_in);
  }

  /**
   * Exchange the refresh token for a fresh access token and re-arm the next refresh.
   *
   * Stops the loop (instead of refreshing) once the bounded deadline has elapsed,
   * letting the access token lapse. If the provider was torn down while this refresh's
   * request was in flight, {@link scheduleRefresh} declines to arm the next timer.
   *
   * @returns a promise that resolves once the token is refreshed and the next refresh is armed.
   * @throws {@link KeycloakAuthenticationError} if the refresh call fails or returns no `access_token`.
   */
  private async refresh(): Promise<void> {
    if (this.deadlineInMs !== null && Date.now() >= this.deadlineInMs) {
      this.ngOnDestroy();
      return;
    }
    const response: KeycloakTokenResponse = await this.postTokenRequest({
      grant_type: "refresh_token",
      client_id: this.clientId,
      // refreshToken is non-null here (bootstrap stored it before arming any refresh), but TS keeps
      // the field's `string | null` type across the async boundary, so the assertion is required.
      /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- required under the build tsconfig */
      refresh_token: this.refreshToken as string
    });
    this.storeTokens(response);
    this.scheduleRefresh(response.expires_in);
  }

  /**
   * Arm a single timer for the next refresh, clamped to the bounded deadline.
   *
   * The delay is `expiresInRaw` minus {@link REFRESH_SKEW_IN_S}, floored at
   * {@link MIN_REFRESH_DELAY_IN_S}, then clamped to the time remaining before the
   * deadline. Stops silently once `tokenExpirationInS` has elapsed.
   *
   * @param expiresInRaw the `expires_in` (seconds) from the latest token response; a missing
   *   or non-positive value falls back to {@link MIN_REFRESH_DELAY_IN_S}.
   */
  private scheduleRefresh(expiresInRaw: number | undefined): void {
    if (this.stopped) {
      return;
    }
    const expiresInS: number =
      typeof expiresInRaw === "number" && expiresInRaw > 0 ? expiresInRaw : MIN_REFRESH_DELAY_IN_S;
    let delayInS: number = Math.max(expiresInS - REFRESH_SKEW_IN_S, MIN_REFRESH_DELAY_IN_S);

    if (this.deadlineInMs !== null) {
      const remainingInMs: number = this.deadlineInMs - Date.now();
      if (remainingInMs <= 0) {
        this.ngOnDestroy();
        return;
      }
      delayInS = Math.min(delayInS, remainingInMs / 1000);
    }

    // Arm outside Angular so the recurring timer does not keep the zone unstable.
    this.zone.runOutsideAngular((): void => {
      this.timer = setTimeout((): void => {
        void this.refresh();
      }, delayInS * 1000);
    });
  }

  /**
   * POST a form-encoded body to the token endpoint and return the parsed JSON.
   *
   * @param params the form fields to URL-encode (grant type, client id, credentials).
   * @returns the parsed {@link KeycloakTokenResponse}.
   * @throws {@link KeycloakAuthenticationError} on a transport error.
   */
  private async postTokenRequest(params: Record<string, string>): Promise<KeycloakTokenResponse> {
    const body: string = new URLSearchParams(params).toString();
    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    });
    try {
      return await firstValueFrom(
        this.http.post<KeycloakTokenResponse>(this.tokenEndpoint, body, { headers })
      );
    } catch (caughtError: unknown) {
      throw new KeycloakAuthenticationError(
        `Keycloak token endpoint request failed: ${KeycloakTokenProvider.describeError(caughtError)}`
      );
    }
  }

  /**
   * Store the access token (and any rotated refresh token) from a token response.
   *
   * Keycloak may omit the refresh token on a same-token refresh; the previous one is
   * kept in that case so it is never blanked out.
   *
   * @param response the parsed token-endpoint response.
   * @throws {@link KeycloakAuthenticationError} if the response carries no `access_token`.
   */
  private storeTokens(response: KeycloakTokenResponse): void {
    if (typeof response.access_token !== "string" || response.access_token.length === 0) {
      throw new KeycloakAuthenticationError("Keycloak token response did not contain an access_token");
    }
    this.accessToken = response.access_token;
    if (typeof response.refresh_token === "string" && response.refresh_token.length > 0) {
      this.refreshToken = response.refresh_token;
    }
  }

  /**
   * Validate the config and build the one-time login grant parameters in a single pass.
   *
   * Validating and building together lets the credential checks narrow the optional
   * `username` / `password` fields to `string` for the request shape, so no type
   * assertion or unreachable guard is needed.
   *
   * @param config the {@link KeycloakTokenProviderConfig} to validate.
   * @returns the form parameters for the offline-token (`grant_type=refresh_token`) or
   *   ROPC (`grant_type=password`) login.
   * @throws {@link KeycloakAuthenticationError} on a missing base field or an invalid
   *   credential combination (neither, or both, credential shapes supplied).
   */
  private validateAndBuildLoginRequest(config: KeycloakTokenProviderConfig): Record<string, string> {
    for (const key of ["keycloakUrl", "realm", "clientId"] as const) {
      if (typeof config[key] !== "string" || config[key].length === 0) {
        throw new KeycloakAuthenticationError(
          `KeycloakTokenProviderConfig.${key} is required and must be a non-empty string`
        );
      }
    }
    const refreshToken: string | undefined = config.refreshToken;
    const username: string | undefined = config.username;
    const password: string | undefined = config.password;
    const hasRefreshToken: boolean = typeof refreshToken === "string" && refreshToken.length > 0;
    const hasCredentials: boolean =
      typeof username === "string" && username.length > 0 && typeof password === "string" && password.length > 0;
    if (hasRefreshToken === hasCredentials) {
      throw new KeycloakAuthenticationError(
        "KeycloakTokenProviderConfig requires exactly one of: a non-empty refreshToken, " +
          "or a non-empty username + password pair"
      );
    }

    if (refreshToken !== undefined && refreshToken.length > 0) {
      return {
        grant_type: "refresh_token",
        client_id: config.clientId,
        refresh_token: refreshToken
      };
    }
    // hasCredentials === !hasRefreshToken here guarantees both are non-empty strings, but TS does
    // not propagate that from the boolean above; the assertions narrow them for the request shape.
    return {
      grant_type: "password",
      client_id: config.clientId,
      /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- required under the build tsconfig */
      username: username as string,
      password: password as string,
      /* eslint-enable @typescript-eslint/no-unnecessary-type-assertion */
      scope: "offline_access"
    };
  }

  /**
   * Build the OIDC token endpoint URL for a realm, tolerating a trailing slash.
   *
   * @param keycloakUrl the base Keycloak URL (trailing slashes are stripped).
   * @param realm the realm name; URL-encoded into the path.
   * @returns the fully-qualified `.../protocol/openid-connect/token` endpoint URL.
   */
  private static buildTokenEndpoint(keycloakUrl: string, realm: string): string {
    const base: string = keycloakUrl.replace(/\/+$/, "");
    return `${base}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/token`;
  }

  /**
   * Render an arbitrary thrown value into a short message for error wrapping.
   *
   * @param caughtError the value thrown by the failing token call.
   * @returns the error's `message` when it is an `Error`, otherwise its string form.
   */
  private static describeError(caughtError: unknown): string {
    if (caughtError instanceof Error) {
      return caughtError.message;
    }
    return typeof caughtError === "string" ? caughtError : JSON.stringify(caughtError);
  }
}
