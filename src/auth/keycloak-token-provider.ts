import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { inject, Injectable, InjectionToken, NgZone, OnDestroy } from "@angular/core";
import { catchError, firstValueFrom, map, Observable, of, throwError, timeout } from "rxjs";
import {
  acquireKeycloakTokenSession,
  GLOBAL_KEYCLOAK_SCHEDULER,
  KeycloakAuthenticationError,
  KeycloakLogger,
  KeycloakScheduler,
  KeycloakTokenHttpResponse,
  KeycloakTokenRequest,
  KeycloakTokenSession,
  KeycloakTokenSessionLease,
  KeycloakTokenTransport,
  KeycloakTransportError,
  redactSecret
} from "./keycloak-token-session";
import { TokenProvider, TokenResult } from "./token-provider";

export {
  KeycloakAuthenticationError,
  MAX_REFRESH_RETRY_EXPONENT,
  MIN_REFRESH_DELAY_IN_S,
  REFRESH_RETRY_BASE_DELAY_IN_S,
  REFRESH_RETRY_MAX_DELAY_IN_S,
  REFRESH_SKEW_IN_S
} from "./keycloak-token-session";

/** Options accepted by {@link KeycloakTokenProvider.ensureFreshToken}. */
export interface EnsureFreshTokenOptions {
  /**
   * Renew even when the cached access token still looks valid.
   *
   * Set this after the server has rejected a request with `UNAUTHENTICATED`: the
   * token may have been revoked, or the local clock may be ahead of Keycloak's,
   * in which case the cached expiry cannot be trusted. A running failure backoff
   * still applies, so a forced renewal never hammers an unavailable Keycloak.
   */
  force?: boolean;
}

/**
 * Runtime configuration for {@link KeycloakTokenProvider}.
 *
 * Authentication is performed against the *public* SDK Keycloak client (no
 * `client_secret` is ever sent). Supply **either** a long-lived offline
 * refresh token (`refreshToken`) **or** a username + password pair for a
 * one-time Resource-Owner-Password-Credentials (ROPC) login — the technical
 * user must be 2FA-exempt for the ROPC grant to succeed.
 *
 * `keycloakUrl`, `realm` and `clientId` are all-or-nothing: all three empty
 * means "no Keycloak" (no login, no `authorization` metadata); setting only
 * some of them is rejected.
 */
export interface KeycloakTokenProviderConfig {
  /** Base Keycloak URL, e.g. `https://auth.example.com/auth` (trailing slash tolerated). */
  keycloakUrl: string;
  /** Realm name, e.g. `ondewo-ccai-platform`. */
  realm: string;
  /** Public SDK client id, e.g. `ondewo-nlu-cai-sdk-public` (no `client_secret`). */
  clientId: string;
  /**
   * Deprecated alias of {@link refreshToken}, used only when `refreshToken` is empty.
   *
   * @deprecated use `refreshToken`.
   */
  offlineToken?: string;
  /** Technical-user email / username for the ROPC grant (not needed with a refresh token). */
  username?: string;
  /** Technical-user password for the ROPC grant. Never sent when a refresh token is configured. */
  password?: string;
  /**
   * Optional cap (seconds) on how long the auto-refresh runs after the
   * first login. Once it elapses no refresh is sent any more and the access
   * token is allowed to lapse. Omit to keep refreshing until the offline
   * session itself expires.
   */
  tokenExpirationInS?: number;
  /**
   * Whether to verify the Keycloak server's TLS certificate on the
   * token-endpoint call. Defaults to `true` (secure).
   *
   * NO-OP IN THIS ANGULAR/BROWSER CLIENT. The token request is made with
   * Angular's `HttpClient` (an XHR/fetch call), and in a browser the TLS
   * handshake is owned by the user agent — there is no `https.Agent`, undici
   * dispatcher, or `rejectUnauthorized` hook that app code can reach. The value
   * is accepted for cross-SDK config parity (it is part of the shared-login key)
   * but has no effect on the outgoing request here. For a self-signed
   * Keycloak/Envoy endpoint, trust the certificate at the browser/OS level.
   */
  keycloakVerifySsl?: boolean;
  /**
   * Optional [0,1] random source for the failure-backoff jitter; defaults to
   * `Math.random`. Tests inject a constant to make the retry delay exact.
   */
  randomFraction?: () => number;
  /**
   * Optional log sink for the refresh WARNING / recovery INFO lines; defaults to
   * the console. No credential ever reaches it.
   */
  logger?: KeycloakLogger;
  /**
   * A handed-off Keycloak OFFLINE refresh token. When set, start-up is ONE
   * `refresh_token` grant with it and no password grant is ever sent, not even
   * as a fallback when the token is refused. Takes precedence over
   * `username` / `password`.
   */
  refreshToken?: string;
}

/**
 * DI token under which the consuming application supplies the
 * {@link KeycloakTokenProviderConfig} for {@link KeycloakTokenProvider}.
 *
 * Example:
 *
 * ```ts
 * providers: [
 *   {
 *     provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG,
 *     useValue: {
 *       keycloakUrl: "https://auth.example.com/auth",
 *       realm: "ondewo-ccai-platform",
 *       clientId: "ondewo-nlu-cai-sdk-public",
 *       refreshToken: "<offline token>", // or: username + password
 *     } satisfies KeycloakTokenProviderConfig,
 *   },
 *   provideOndewoSipAuth(KeycloakTokenProvider),
 * ]
 * ```
 */
export const KEYCLOAK_TOKEN_PROVIDER_CONFIG: InjectionToken<KeycloakTokenProviderConfig> =
  new InjectionToken<KeycloakTokenProviderConfig>("ONDEWO_SIP_KEYCLOAK_TOKEN_PROVIDER_CONFIG");

/** The credentials a valid, Keycloak-configured {@link KeycloakTokenProviderConfig} resolves to. */
interface ResolvedCredentials {
  /** Keycloak base URL. */
  keycloakUrl: string;
  /** Realm. */
  realm: string;
  /** Public client id. */
  clientId: string;
  /** Technical user. */
  username: string;
  /** Password, possibly empty. */
  password: string;
  /** Auto-refresh bound, or `null`. */
  tokenExpirationInS: number | null;
  /** TLS verification flag. */
  verifySsl: boolean;
  /** Offline refresh token, possibly empty. */
  refreshToken: string;
}

/**
 * Validate a configuration before any network I/O.
 *
 * @param config the configuration.
 * @returns the resolved credentials, or `null` when no Keycloak is configured at all.
 * @throws KeycloakAuthenticationError on a partial Keycloak triple, on neither a password nor a
 *   refresh token, or on a password grant without a username.
 */
function resolveCredentials(config: KeycloakTokenProviderConfig): ResolvedCredentials | null {
  const keycloakUrl: string = config.keycloakUrl ?? "";
  const realm: string = config.realm ?? "";
  const clientId: string = config.clientId ?? "";
  const configured: number = [keycloakUrl, realm, clientId].filter((value: string): boolean => value.length > 0)
    .length;
  if (configured === 0) {
    return null;
  }
  if (configured < 3) {
    throw new KeycloakAuthenticationError(
      "The Keycloak fields `keycloakUrl`, `realm`, and `clientId` must be provided together in " +
        "KeycloakTokenProviderConfig."
    );
  }
  const refreshToken: string = config.refreshToken || config.offlineToken || "";
  const password: string = config.password ?? "";
  const username: string = config.username ?? "";
  if (refreshToken.length === 0 && password.length === 0) {
    throw new KeycloakAuthenticationError(
      "Either the field `password` or the field `refreshToken` (refresh_token; deprecated alias " +
        "`offlineToken`) is mandatory in KeycloakTokenProviderConfig."
    );
  }
  if (refreshToken.length === 0 && username.length === 0) {
    throw new KeycloakAuthenticationError(
      "KeycloakTokenProvider requires either an offlineToken or a username + password pair"
    );
  }
  return {
    keycloakUrl,
    realm,
    clientId,
    username,
    password,
    tokenExpirationInS: config.tokenExpirationInS ?? null,
    verifySsl: config.keycloakVerifySsl ?? true,
    refreshToken
  };
}

/**
 * Concrete, ready-to-use {@link TokenProvider} that logs in once against the
 * public Keycloak SDK client and keeps the access token fresh, behaving exactly
 * like the token provider of every other ONDEWO SDK (see {@link KeycloakTokenSession}):
 *
 * 1. **Start-up once** — ONE `refresh_token` grant with a configured
 *    `refreshToken`, or else ONE `grant_type=password` login with
 *    `scope=offline_access`. A refused refresh token is never answered with a
 *    password login.
 * 2. **Refresh ahead of expiry** — a background timer refreshes
 *    {@link REFRESH_SKEW_IN_S} before the token lapses; a failed refresh is
 *    retried with a jittered backoff (5 s doubling to 300 s) and never ends the
 *    loop. The optional `tokenExpirationInS` bounds it.
 * 3. **Serve the current token** — {@link getToken} answers synchronously while
 *    the token is comfortably valid; inside the leeway it returns a promise that
 *    runs one shared refresh, and keeps serving the still-valid token while that
 *    refresh fails. Only an expired token that cannot be refreshed rejects, with
 *    a {@link KeycloakAuthenticationError}.
 *
 * Providers with the same credentials on the same `HttpClient` share one login.
 *
 * Register it through `provideOndewoSipAuth` after supplying a
 * {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}. The first login is kicked off on
 * construction; call {@link whenReady} to await it explicitly (e.g. in an
 * `APP_INITIALIZER`).
 */
@Injectable({ providedIn: "root" })
export class KeycloakTokenProvider implements TokenProvider, OnDestroy {
  /** Angular HTTP client used for the token-endpoint calls (and the scope of the shared login). */
  private readonly http: HttpClient = inject(HttpClient);
  /** The Angular zone; the background refresh timer is armed outside it. */
  private readonly zone: NgZone = inject(NgZone);
  /**
   * The timers of the background refresh, armed outside Angular so the recurring timer does not
   * keep the zone unstable (which would stall `whenStable()`, SSR and hydration) between refreshes.
   */
  private readonly scheduler: KeycloakScheduler = {
    setTimeout: (fn: () => void, delayInMs: number): unknown =>
      this.zone.runOutsideAngular((): unknown => GLOBAL_KEYCLOAK_SCHEDULER.setTimeout(fn, delayInMs)),
    clearTimeout: (handle: unknown): void => GLOBAL_KEYCLOAK_SCHEDULER.clearTimeout(handle)
  };
  /**
   * The resolved runtime configuration, or `null` until {@link configure} supplies
   * one. Injected optionally so an application that only learns its credentials at
   * runtime (e.g. an embedded widget reading them from its URL) can register the
   * provider at bootstrap and configure it later.
   */
  private config: KeycloakTokenProviderConfig | null = inject(KEYCLOAK_TOKEN_PROVIDER_CONFIG, {
    optional: true
  });

  /**
   * Whether TLS-certificate verification is requested for the token-endpoint
   * call. Defaults to `true`. A NO-OP in this browser client (the browser owns the
   * TLS handshake). See {@link KeycloakTokenProviderConfig.keycloakVerifySsl}.
   */
  private verifySsl: boolean = true;

  /** The started session, or `null` before the first login / without Keycloak. */
  private session: KeycloakTokenSession | null = null;
  /** This provider's hold on the shared session, released on destroy / re-configure. */
  private lease: KeycloakTokenSessionLease | null = null;
  /** The start-up in flight, or `null`. */
  private starting: Promise<void> | null = null;
  /** Bumped by every start-up, so a superseded start-up drops its session. */
  private generation: number = 0;
  /** Whether {@link ngOnDestroy} has run. */
  private destroyed: boolean = false;

  /**
   * Promise settled by the *first* login attempt — the one started by the constructor when a
   * config was injected, otherwise the one started by the first {@link configure} call. It
   * resolves when that login succeeds and rejects when it fails; later attempts leave it as-is
   * (a settled promise cannot be re-settled), so callers tracking a re-{@link configure} must
   * await the promise `configure()` returns rather than {@link whenReady}.
   */
  private readonly ready: Promise<void>;
  /** Settles {@link ready} on the first successful login. */
  private resolveReady!: () => void;
  /** Settles {@link ready} when the first login fails. */
  private rejectReady!: (reason: unknown) => void;

  /**
   * The token-endpoint exchange over Angular's `HttpClient`: the raw body is kept as text so the
   * session can judge the status and parse the JSON itself; a status-0 answer, a timeout or any
   * other failure to get an answer becomes a {@link KeycloakTransportError}.
   *
   * @param request the token request.
   * @returns the HTTP answer.
   */
  private readonly transport: KeycloakTokenTransport = (
    request: KeycloakTokenRequest
  ): Promise<KeycloakTokenHttpResponse> => {
    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    });
    const response$: Observable<KeycloakTokenHttpResponse> = this.http
      .post(request.url, new URLSearchParams(request.form).toString(), {
        headers,
        observe: "response",
        responseType: "text"
      })
      .pipe(
        timeout({ first: request.timeoutInS * 1000 }),
        map(
          (response: HttpResponse<string>): KeycloakTokenHttpResponse => ({
            status: response.status,
            body: response.body ?? ""
          })
        ),
        catchError((error: unknown): Observable<KeycloakTokenHttpResponse> => {
          if (error instanceof HttpErrorResponse && error.status !== 0) {
            let body: string = "";
            if (typeof error.error === "string") {
              body = error.error;
            }
            return of({ status: error.status, body });
          }
          return throwError(
            (): KeycloakTransportError =>
              new KeycloakTransportError("the token endpoint gave no HTTP answer", { cause: error })
          );
        })
      );
    return firstValueFrom(response$);
  };

  /**
   * Build the provider and kick off the first login in the background.
   *
   * No network call is awaited here; {@link getToken} returns `null` until the
   * login resolves. Await {@link whenReady} to block until the first token is
   * available.
   */
  public constructor() {
    this.ready = new Promise<void>((resolve: () => void, reject: (reason: unknown) => void): void => {
      this.resolveReady = resolve;
      this.rejectReady = reject;
    });
    // Nothing is obliged to call whenReady(), so mark `ready` as observed here: a rejected login
    // that no one awaits would otherwise surface as an unhandled promise rejection (a console
    // error in the browser, a process warning under node). whenReady() callers still see it.
    void this.ready.catch((): void => undefined);
    if (this.config === null) {
      // No config at construction: stay idle until configure() supplies credentials.
      return;
    }
    void this.start(this.config).then(
      (): void => this.resolveReady(),
      (error: unknown): void => this.rejectReady(error)
    );
  }

  /**
   * Supply (or replace) the runtime configuration and log in with it.
   *
   * This is the entry point for credentials that are only known after the
   * application has bootstrapped — an embedded widget that reads a technical
   * user and secret from its own URL, for example. The previous login is
   * released (and stopped when nothing else shares it) before the new one runs,
   * so a provider can be re-pointed at a different technical user without being
   * re-created.
   *
   * When this is the provider's first login attempt it also settles {@link whenReady}; a later
   * re-configure does not, so track those through the promise returned here.
   *
   * @param config the configuration to adopt, replacing any earlier one.
   * @returns a promise that resolves once the login with `config` has completed.
   * @throws KeycloakAuthenticationError when the configuration is invalid or the
   *   login fails (the provider is left unauthenticated; {@link getToken} returns `null`).
   */
  public async configure(config: KeycloakTokenProviderConfig): Promise<void> {
    this.destroyed = false;
    try {
      await this.start(config);
    } catch (error: unknown) {
      // A provider constructed without a config has its first login here, so `ready` is still
      // pending; reject it rather than leaving every whenReady() awaiter hanging forever.
      this.rejectReady(error);
      throw error;
    }
    this.resolveReady();
  }

  /**
   * Return an access token that is safe to send right now, refreshing first when
   * the cached one is within {@link REFRESH_SKEW_IN_S} of lapsing.
   *
   * Concurrent calls share a single refresh, so a burst of requests arriving on
   * an expiring token issues one grant rather than one per request. When the
   * provider holds no session yet (the first login failed), the start-up is run
   * again — with the refresh token when one is configured.
   *
   * @param options renewal options; `force` renews even when the cached token
   *   still looks valid.
   * @returns the usable access token, or `null` when the provider has no
   *   Keycloak config (nothing to renew with).
   * @throws KeycloakAuthenticationError when the token has expired and cannot be
   *   refreshed, or the repeated start-up fails.
   */
  public async ensureFreshToken(options: EnsureFreshTokenOptions = {}): Promise<string | null> {
    if (this.config === null) {
      return null;
    }
    if (this.session === null) {
      await (this.starting ?? this.start(this.config));
    }
    if (this.session === null) {
      return null;
    }
    return this.session.getAccessToken({ force: options.force ?? false });
  }

  /**
   * Return the current access token for the auth interceptors.
   *
   * @returns the access token synchronously while it is comfortably valid; a
   *   promise running the shared refresh when it is inside the leeway (rejecting
   *   with a {@link KeycloakAuthenticationError} only when the token has expired
   *   and cannot be refreshed); while the first login is still in flight, a
   *   promise that waits for it and yields its token (`null` when it fails), so
   *   a request issued right after bootstrap is not sent unauthenticated; `null`
   *   without a Keycloak config or after a failed first login.
   */
  public getToken(): TokenResult {
    if (this.session === null) {
      if (this.starting === null) {
        return null;
      }
      return this.starting.then(
        (): Promise<string> | null => {
          if (this.session === null) {
            return null;
          }
          return this.session.getAccessToken();
        },
        (): null => null
      );
    }
    const token: string | null = this.session.peekAccessToken();
    if (token !== null) {
      return token;
    }
    return this.session.getAccessToken();
  }

  /**
   * The resolved TLS-verification setting from
   * {@link KeycloakTokenProviderConfig.keycloakVerifySsl} (defaults to `true`).
   * A NO-OP in this browser client.
   *
   * @returns `true` when TLS verification is requested (the default), `false`
   *   when the config explicitly opted out (still inert here).
   */
  public get keycloakVerifySsl(): boolean {
    return this.verifySsl;
  }

  /**
   * Await the first login so callers can guarantee a token is present before
   * issuing requests (e.g. from an `APP_INITIALIZER`).
   *
   * @returns a promise that resolves once the first access token is stored, or
   *   rejects with the {@link KeycloakAuthenticationError} from a failed login.
   */
  public whenReady(): Promise<void> {
    return this.ready;
  }

  /**
   * Release this provider's hold on the shared login; the background refresh stops once nothing
   * else shares it. Invoked automatically when the root injector is destroyed. The token stays
   * readable (and is still refreshed on demand) afterwards.
   */
  public ngOnDestroy(): void {
    this.destroyed = true;
    this.releaseLease();
  }

  /** @returns the configuration with every non-empty secret rendered as `***REDACTED***`. */
  public toJSON(): Record<string, unknown> {
    if (this.config === null) {
      return {};
    }
    return {
      ...this.config,
      password: redactSecret(this.config.password),
      offlineToken: redactSecret(this.config.offlineToken),
      refreshToken: redactSecret(this.config.refreshToken)
    };
  }

  /** @returns a redacted rendering of the configuration. */
  public toString(): string {
    return `KeycloakTokenProvider(${JSON.stringify(this.toJSON())})`;
  }

  /** Give the shared session back, if held. */
  private releaseLease(): void {
    if (this.lease !== null) {
      this.lease.release();
      this.lease = null;
    }
  }

  /**
   * Adopt `config`, drop the previous session and start (or join) the session of `config`.
   *
   * @param config the configuration to adopt.
   * @returns a promise that resolves once the session is started (immediately without Keycloak).
   */
  private start(config: KeycloakTokenProviderConfig): Promise<void> {
    this.generation += 1;
    const generation: number = this.generation;
    this.releaseLease();
    this.session = null;
    this.config = config;
    this.verifySsl = config.keycloakVerifySsl ?? true;
    const starting: Promise<void> = this.startSession(config, generation).finally((): void => {
      if (this.starting === starting) {
        this.starting = null;
      }
    });
    this.starting = starting;
    return starting;
  }

  /**
   * Validate `config` and hold the shared session of its credentials.
   *
   * @param config the configuration.
   * @param generation the start-up generation this call belongs to.
   * @returns a promise that resolves once the session is held (or no Keycloak is configured).
   */
  private async startSession(config: KeycloakTokenProviderConfig, generation: number): Promise<void> {
    const credentials: ResolvedCredentials | null = resolveCredentials(config);
    if (credentials === null) {
      return;
    }
    const lease: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(
      {
        ...credentials,
        transport: this.transport,
        randomFn: config.randomFraction,
        logger: config.logger,
        scheduler: this.scheduler
      },
      this.http
    );
    if (generation !== this.generation) {
      // configure() ran again meanwhile: this login is superseded.
      lease.release();
      return;
    }
    this.session = lease.session;
    if (this.destroyed) {
      lease.release();
      return;
    }
    this.lease = lease;
  }
}
