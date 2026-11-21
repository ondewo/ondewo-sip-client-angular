import { sha256Hex } from "./sha256";

/**
 * Seconds before `expires_at` at which the access token is refreshed (spec `EXPIRY_LEEWAY`). Covers
 * clock skew and the round trip to Keycloak. Identical in every ONDEWO client SDK.
 */
export const REFRESH_SKEW_IN_S: number = 30;

/** Floor (seconds) of any background wait, so an `expires_in` of 0 cannot spin a hot loop. */
export const MIN_REFRESH_DELAY_IN_S: number = 1;

/**
 * First retry delay (seconds) after a FAILED refresh. Far above {@link MIN_REFRESH_DELAY_IN_S} on
 * purpose: ondewo runs one client per call container, so clients that fail together would otherwise
 * poll a shared realm at 1 Hz, together, for the whole outage.
 */
export const REFRESH_RETRY_BASE_DELAY_IN_S: number = 5;

/** Ceiling (seconds) of the failure backoff: a persistent outage is retried at most this often. */
export const REFRESH_RETRY_MAX_DELAY_IN_S: number = 300;

/** Exponent cap so `2 ** n` cannot grow without bound; `5 * 2^6 = 320` already exceeds the ceiling. */
export const MAX_REFRESH_RETRY_EXPONENT: number = 6;

/** Timeout (seconds) of one whole token-endpoint call. Must stay below {@link REFRESH_SKEW_IN_S}. */
export const HTTP_TIMEOUT_IN_S: number = 10;

/** An error body quoted into an error message is truncated to this many characters. */
export const MAX_ERROR_BODY_CHARS: number = 500;

/** How a non-empty secret is rendered by every string rendering of a configuration. */
export const REDACTED: string = "***REDACTED***";

/** The timing constants of the token session, overridable (shrinkable) by tests. */
export interface KeycloakTimings {
  /** See {@link REFRESH_SKEW_IN_S}. */
  expiryLeewayInS: number;
  /** See {@link MIN_REFRESH_DELAY_IN_S}. */
  minRefreshDelayInS: number;
  /** See {@link REFRESH_RETRY_BASE_DELAY_IN_S}. */
  retryBaseDelayInS: number;
  /** See {@link REFRESH_RETRY_MAX_DELAY_IN_S}. */
  retryMaxDelayInS: number;
  /** See {@link MAX_REFRESH_RETRY_EXPONENT}. */
  maxRetryExponent: number;
  /** See {@link HTTP_TIMEOUT_IN_S}. */
  httpTimeoutInS: number;
  /** See {@link MAX_ERROR_BODY_CHARS}. */
  maxErrorBodyChars: number;
}

/** The production timings: exactly the constants above. */
export const DEFAULT_KEYCLOAK_TIMINGS: Readonly<KeycloakTimings> = Object.freeze({
  expiryLeewayInS: REFRESH_SKEW_IN_S,
  minRefreshDelayInS: MIN_REFRESH_DELAY_IN_S,
  retryBaseDelayInS: REFRESH_RETRY_BASE_DELAY_IN_S,
  retryMaxDelayInS: REFRESH_RETRY_MAX_DELAY_IN_S,
  maxRetryExponent: MAX_REFRESH_RETRY_EXPONENT,
  httpTimeoutInS: HTTP_TIMEOUT_IN_S,
  maxErrorBodyChars: MAX_ERROR_BODY_CHARS
});

/**
 * The one error type of every Keycloak failure: login, refresh, and the lazy read of an expired
 * token. The original error, when there is one, is kept as `cause`. Its message never carries a
 * credential.
 */
export class KeycloakAuthenticationError extends Error {
  /**
   * @param message a human-readable description of the authentication failure.
   * @param options `cause`: the underlying error, kept as the standard `Error.cause`.
   */
  public constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
    this.name = "KeycloakAuthenticationError";
  }
}

/**
 * Raised by a {@link KeycloakTokenTransport} when the token endpoint could not be REACHED (connection
 * refused, DNS, TLS handshake, timeout). The session reports it as "could not reach the token
 * endpoint"; any other error a transport throws is treated as a defect of the transport.
 */
export class KeycloakTransportError extends Error {
  /**
   * @param message what failed.
   * @param options `cause`: the underlying network error, kept as the standard `Error.cause`.
   */
  public constructor(message: string, options: ErrorOptions = {}) {
    super(message, options);
    this.name = "KeycloakTransportError";
  }
}

/** One token-endpoint request handed to a {@link KeycloakTokenTransport}. */
export interface KeycloakTokenRequest {
  /** `<keycloakUrl>/realms/<realm>/protocol/openid-connect/token`. */
  url: string;
  /** The form fields, to be sent `application/x-www-form-urlencoded`. */
  form: Record<string, string>;
  /** Timeout of the whole call (seconds). */
  timeoutInS: number;
  /** Whether to verify the endpoint's TLS certificate (a browser transport cannot honour `false`). */
  verifySsl: boolean;
}

/** The raw HTTP answer of the token endpoint. */
export interface KeycloakTokenHttpResponse {
  /** HTTP status code. */
  status: number;
  /** The raw response body. */
  body: string;
}

/**
 * POST one form to the token endpoint. Resolves with ANY HTTP answer (the session judges the status),
 * rejects with a {@link KeycloakTransportError} when no answer could be obtained.
 */
export type KeycloakTokenTransport = (request: KeycloakTokenRequest) => Promise<KeycloakTokenHttpResponse>;

/** Log sink; levels as in every ONDEWO SDK (WARNING per failed refresh, INFO on recovery). */
export interface KeycloakLogger {
  /** One line per failed refresh. */
  warn(message: string): void;
  /** One line when refreshing recovers. */
  info(message: string): void;
  /** Diagnostic detail only. */
  debug(message: string): void;
}

/** The default {@link KeycloakLogger}: the browser console. */
export const CONSOLE_KEYCLOAK_LOGGER: KeycloakLogger = {
  warn: (message: string): void => console.warn(message),
  info: (message: string): void => console.info(message),
  debug: (message: string): void => console.debug(message)
};

/** Timer seam of the background refresher. */
export interface KeycloakScheduler {
  /** Arm `fn` to run in `delayInMs`; returns a handle for {@link clearTimeout}. */
  setTimeout(fn: () => void, delayInMs: number): unknown;
  /** Disarm a handle returned by {@link setTimeout}. */
  clearTimeout(handle: unknown): void;
}

/** The default {@link KeycloakScheduler}: the global timers (looked up per call, so fakes apply). */
export const GLOBAL_KEYCLOAK_SCHEDULER: KeycloakScheduler = {
  setTimeout: (fn: () => void, delayInMs: number): unknown => setTimeout(fn, delayInMs),
  clearTimeout: (handle: unknown): void => clearTimeout(handle as ReturnType<typeof setTimeout>)
};

/** Options of {@link KeycloakTokenSession.create}. `refreshToken` is deliberately the last field. */
export interface KeycloakTokenSessionOptions {
  /** Keycloak base URL, the part before `/realms/<realm>`; trailing `/` characters are stripped. */
  keycloakUrl: string;
  /** Realm, e.g. `ondewo-ccai-platform`. */
  realm: string;
  /** PUBLIC SDK client id; no client secret exists and none is ever sent. */
  clientId: string;
  /** Technical user of the password grant. */
  username?: string;
  /** Technical-user password. SECRET. */
  password?: string;
  /** Bounds auto-refresh, measured from the initial token acquisition; absent = unbounded. */
  tokenExpirationInS?: number | null;
  /** TLS verification of the token-endpoint call only (default `true`). */
  verifySsl?: boolean;
  /** The HTTP exchange with the token endpoint. */
  transport: KeycloakTokenTransport;
  /** MONOTONIC clock in seconds; defaults to `performance.now() / 1000`. */
  timeFn?: () => number;
  /** [0,1] jitter source of the failure backoff; defaults to `Math.random`. */
  randomFn?: () => number;
  /** Timer seam of the background refresher. */
  scheduler?: KeycloakScheduler;
  /** Log sink; defaults to the console. */
  logger?: KeycloakLogger;
  /** `false` skips the background refresher (test seam); default `true`. */
  startBackgroundRefresh?: boolean;
  /** Overrides of {@link DEFAULT_KEYCLOAK_TIMINGS} (test seam). */
  timings?: Partial<KeycloakTimings>;
  /** A handed-off Keycloak OFFLINE refresh token used instead of the password. SECRET. */
  refreshToken?: string;
}

/** What one shared refresh attempt ended with. */
interface RefreshOutcome {
  /** Whether the attempt failed. */
  failed: boolean;
  /** The failure, when it failed. */
  error: unknown;
}

/** Options of {@link KeycloakTokenSession.getAccessToken}. */
export interface KeycloakAccessTokenOptions {
  /**
   * Refresh even when the token still looks comfortably valid (e.g. after the server answered
   * `UNAUTHENTICATED`). A running backoff and the `tokenExpirationInS` deadline still apply.
   */
  force?: boolean;
}

/**
 * Full-jitter backoff delay (seconds) after `consecutiveFailures` failed refreshes: uniform in
 * `[base, ceiling]`, the ceiling doubling per failure up to the maximum.
 *
 * @param consecutiveFailures how many refreshes failed in a row (values below 1 count as 1).
 * @param randomFn jitter source; its value is clamped to [0, 1].
 * @param timings the timing constants to use.
 * @returns the delay in seconds.
 */
export function backoffDelayInS(
  consecutiveFailures: number,
  randomFn: () => number,
  timings: Readonly<KeycloakTimings> = DEFAULT_KEYCLOAK_TIMINGS
): number {
  const exponent: number = Math.min(Math.max(consecutiveFailures, 1) - 1, timings.maxRetryExponent);
  const ceilingInS: number = Math.min(timings.retryBaseDelayInS * (2 ** exponent), timings.retryMaxDelayInS);
  const fraction: number = Math.min(Math.max(randomFn(), 0), 1);
  return timings.retryBaseDelayInS + (fraction * (ceilingInS - timings.retryBaseDelayInS));
}

/** The parts of an error the messages quote. */
interface ErrorLike {
  /** The error type. */
  name?: string;
  /** The error text. */
  message: string;
}

/**
 * Render an error as `<ErrType>: <msg>`, the form every ONDEWO SDK quotes an error in.
 *
 * @param error the error to render.
 * @returns the rendering.
 */
function describeError(error: unknown): string {
  // Error-like, not only `instanceof Error`: Angular's HttpErrorResponse carries name + message
  // without extending Error.
  if (typeof error === "object" && error !== null && typeof (error as ErrorLike).message === "string") {
    const errorLike: ErrorLike = error as ErrorLike;
    return `${errorLike.name ?? "Error"}: ${errorLike.message}`;
  }
  // A primitive, or an object without a message: its default rendering is the best there is.
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return `${typeof error}: ${String(error)}`;
}

/**
 * Name the JSON type of a parsed value the way the error messages need it.
 *
 * @param value the parsed JSON value.
 * @returns `array`, `null`, `string`, `number` or `boolean`.
 */
function jsonTypeName(value: unknown): string {
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
}

/**
 * Wrap anything that is not already a {@link KeycloakAuthenticationError}.
 *
 * @param error the error raised by a token exchange.
 * @param action `login` or `refresh`.
 * @returns the typed error.
 */
function asAuthenticationError(error: unknown, action: string): KeycloakAuthenticationError {
  if (error instanceof KeycloakAuthenticationError) {
    return error;
  }
  return new KeycloakAuthenticationError(`Keycloak token ${action} failed (${describeError(error)})`, {
    cause: error
  });
}

/**
 * @param value a secret, possibly empty.
 * @returns {@link REDACTED} for a non-empty secret, the empty string otherwise.
 */
export function redactSecret(value: string | undefined | null): string {
  if (value === undefined || value === null || value.length === 0) {
    return "";
  }
  return REDACTED;
}

/**
 * The fields that identify one credential set, in the order the shared-session key hashes them.
 */
export interface KeycloakCredentialFields {
  /** Keycloak base URL. */
  keycloakUrl: string;
  /** Realm. */
  realm: string;
  /** Public client id. */
  clientId: string;
  /** Technical user. */
  username?: string;
  /** Password. */
  password?: string;
  /** Auto-refresh bound. */
  tokenExpirationInS?: number | null;
  /** TLS verification flag. */
  verifySsl?: boolean;
  /** Offline refresh token. */
  refreshToken?: string;
}

/**
 * Key of the shared-session registry: SHA-256 hex of the credential fields joined with NUL, in the
 * order of every ONDEWO SDK. Never an object identity, and it holds no secret substring.
 *
 * @param fields the credential set.
 * @returns 64 hex characters.
 */
export function keycloakSessionRegistryKey(fields: KeycloakCredentialFields): string {
  let tokenExpiration: string = "";
  if (fields.tokenExpirationInS !== undefined && fields.tokenExpirationInS !== null) {
    tokenExpiration = String(fields.tokenExpirationInS);
  }
  // Rendered the way the python SDK renders a bool, so every SDK hashes the same fields.
  let verifySsl: string = "True";
  if (fields.verifySsl === false) {
    verifySsl = "False";
  }
  const parts: string[] = [
    fields.keycloakUrl,
    fields.realm,
    fields.clientId,
    fields.username ?? "",
    fields.password ?? "",
    tokenExpiration,
    verifySsl,
    fields.refreshToken ?? ""
  ];
  return sha256Hex(parts.join("\0"));
}

/**
 * One Keycloak login and the access token it keeps fresh: the framework-free core of
 * `KeycloakTokenProvider`, behaving exactly like the token provider of every other ONDEWO SDK.
 *
 * - Start-up ({@link create}): ONE refresh grant with a handed-off offline token, or else ONE password
 *   grant. A refused offline token is never answered with a password login.
 * - Lazy path ({@link getAccessToken} / {@link authorizationMetadata}): inside {@link REFRESH_SKEW_IN_S}
 *   of expiry one refresh grant is sent, shared by every concurrent caller; while it fails, the
 *   still-valid token keeps being served and the jittered backoff decides when the next request may
 *   go out. Only an EXPIRED token whose refresh fails raises.
 * - Background: a timer refreshes ahead of expiry; no failure ever ends it, it backs off instead.
 *   It ends on {@link stop} or once `tokenExpirationInS` has elapsed.
 */
export class KeycloakTokenSession {
  /** Keycloak base URL without trailing `/`. */
  public readonly keycloakUrl: string;
  /** Realm. */
  public readonly realm: string;
  /** Public client id. */
  public readonly clientId: string;
  /** Technical user. */
  public readonly username: string;
  /** Auto-refresh bound in seconds, or `null`. */
  public readonly tokenExpirationInS: number | null;
  /** TLS verification flag of the token-endpoint call. */
  public readonly verifySsl: boolean;

  /** Password; never rendered. */
  private readonly password: string;
  /** The offline token handed in at start-up; never rendered. */
  private readonly configuredRefreshToken: string;
  /** Token endpoint URL. */
  private readonly tokenEndpoint: string;
  /** HTTP exchange. */
  private readonly transport: KeycloakTokenTransport;
  /** Monotonic clock (seconds). */
  private readonly timeFn: () => number;
  /** Backoff jitter. */
  private readonly randomFn: () => number;
  /** Timer seam. */
  private readonly scheduler: KeycloakScheduler;
  /** Log sink. */
  private readonly logger: KeycloakLogger;
  /** Timing constants. */
  private readonly timings: Readonly<KeycloakTimings>;

  /** The current access token. */
  private currentAccessToken: string = "";
  /** The current refresh token (rotated by Keycloak, kept when a response carries none). */
  private currentRefreshToken: string;
  /** Monotonic second at which the access token lapses. */
  private expiresAt: number = 0;
  /** Monotonic second after which auto-refresh stops, or `null`. */
  private loginDeadline: number | null = null;
  /** Consecutive failed refreshes; shared by the lazy path and the background refresher. */
  private failures: number = 0;
  /** No refresh request is sent before this monotonic second (0 = no backoff running). */
  private nextAttemptAt: number = 0;
  /** The refresh attempt in flight, shared by every caller. */
  private inFlight: Promise<RefreshOutcome> | null = null;
  /** The armed background timer handle. */
  private timer: unknown = null;
  /** Whether a background timer is armed. */
  private timerArmed: boolean = false;
  /** Whether the background refresher has ended. */
  private backgroundStopped: boolean = true;
  /** Whether {@link stop} ran. */
  private stopCalled: boolean = false;

  /**
   * @param options the session options.
   */
  private constructor(options: KeycloakTokenSessionOptions) {
    this.keycloakUrl = options.keycloakUrl.replace(/\/+$/, "");
    this.realm = options.realm;
    this.clientId = options.clientId;
    this.username = options.username ?? "";
    this.password = options.password ?? "";
    this.tokenExpirationInS = options.tokenExpirationInS ?? null;
    this.verifySsl = options.verifySsl ?? true;
    this.transport = options.transport;
    this.timeFn = options.timeFn ?? ((): number => performance.now() / 1000);
    this.randomFn = options.randomFn ?? Math.random;
    this.scheduler = options.scheduler ?? GLOBAL_KEYCLOAK_SCHEDULER;
    this.logger = options.logger ?? CONSOLE_KEYCLOAK_LOGGER;
    this.timings = { ...DEFAULT_KEYCLOAK_TIMINGS, ...(options.timings ?? {}) };
    this.configuredRefreshToken = options.refreshToken ?? "";
    this.currentRefreshToken = this.configuredRefreshToken;
    this.tokenEndpoint = `${this.keycloakUrl}/realms/${encodeURIComponent(this.realm)}/protocol/openid-connect/token`;
  }

  /**
   * Acquire the first token and start the background refresher.
   *
   * @param options the session options.
   * @returns the started session.
   * @throws KeycloakAuthenticationError when the initial acquisition fails (nothing is retried and
   *   no refresher is started).
   */
  public static async create(options: KeycloakTokenSessionOptions): Promise<KeycloakTokenSession> {
    const session: KeycloakTokenSession = new KeycloakTokenSession(options);
    await session.acquireInitialToken();
    if (options.startBackgroundRefresh ?? true) {
      session.backgroundStopped = false;
      session.scheduleNextBackgroundRefresh();
    }
    return session;
  }

  /** @returns the current access token as stored, without any refresh decision. */
  public get accessToken(): string {
    return this.currentAccessToken;
  }

  /** @returns the monotonic second at which the current access token lapses. */
  public get accessTokenExpiresAt(): number {
    return this.expiresAt;
  }

  /** @returns the monotonic second after which auto-refresh stops, or `null`. */
  public get autoRefreshDeadline(): number | null {
    return this.loginDeadline;
  }

  /** @returns how many refreshes have failed in a row. */
  public get consecutiveFailures(): number {
    return this.failures;
  }

  /** @returns the monotonic second before which no refresh request is sent (0 = none pending). */
  public get nextRefreshAttemptAt(): number {
    return this.nextAttemptAt;
  }

  /** @returns whether the background refresher is still running. */
  public get backgroundRefreshActive(): boolean {
    return !this.backgroundStopped;
  }

  /** @returns whether {@link stop} was called. */
  public get closed(): boolean {
    return this.stopCalled;
  }

  /**
   * The access token if it may be served WITHOUT a refresh decision that could send a request:
   * comfortably valid, or past the auto-refresh deadline. Lets an interceptor stay synchronous.
   *
   * @returns the token, or `null` when the caller must go through {@link getAccessToken}.
   */
  public peekAccessToken(): string | null {
    const now: number = this.timeFn();
    if (this.loginDeadline !== null && now >= this.loginDeadline) {
      return this.currentAccessToken;
    }
    if (now < this.expiresAt - this.timings.expiryLeewayInS) {
      return this.currentAccessToken;
    }
    return null;
  }

  /**
   * The access token to send right now, refreshing first when it is inside the leeway.
   *
   * @param options `force`: refresh even when the token still looks comfortably valid.
   * @returns the access token.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  public async getAccessToken(options: KeycloakAccessTokenOptions = {}): Promise<string> {
    await this.refreshIfWithinWindow(options.force ?? false);
    return this.currentAccessToken;
  }

  /**
   * The gRPC metadata entry to attach to an RPC.
   *
   * @returns `["authorization", "Bearer <token>"]`.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  public async authorizationMetadata(): Promise<[string, string]> {
    const token: string = await this.getAccessToken();
    return ["authorization", `Bearer ${token}`];
  }

  /**
   * Stop the background refresher, interrupting a pending wait (a backoff wait included) so no
   * further request is sent. Idempotent and safe from any state, also from inside a refresh. The lazy
   * path keeps working afterwards.
   */
  public stop(): void {
    this.stopCalled = true;
    this.backgroundStopped = true;
    this.disarmTimer();
  }

  /** Alias of {@link stop}. */
  public close(): void {
    this.stop();
  }

  /** @returns the configuration with every non-empty secret rendered as {@link REDACTED}. */
  public toJSON(): Record<string, unknown> {
    return {
      keycloakUrl: this.keycloakUrl,
      realm: this.realm,
      clientId: this.clientId,
      username: this.username,
      password: redactSecret(this.password),
      tokenExpirationInS: this.tokenExpirationInS,
      verifySsl: this.verifySsl,
      refreshToken: redactSecret(this.configuredRefreshToken)
    };
  }

  /** @returns a redacted rendering of the configuration. */
  public toString(): string {
    return `KeycloakTokenSession(${JSON.stringify(this.toJSON())})`;
  }

  /** P1-P4: one refresh grant with a handed-off token, else one password grant; then the deadline. */
  private async acquireInitialToken(): Promise<void> {
    const useRefreshToken: boolean = this.configuredRefreshToken.length > 0;
    let action: string = "login";
    if (useRefreshToken) {
      action = "refresh";
    }
    try {
      if (useRefreshToken) {
        await this.refreshGrant();
      } else {
        await this.passwordGrant();
      }
    } catch (error: unknown) {
      throw asAuthenticationError(error, action);
    }
    if (this.tokenExpirationInS !== null) {
      this.loginDeadline = this.timeFn() + this.tokenExpirationInS;
    }
  }

  /**
   * The refresh decision shared by the lazy path and the background refresher (R1-R6). Concurrent
   * callers share one in-flight attempt.
   *
   * @param force skip the "comfortably valid" short-cut.
   * @throws KeycloakAuthenticationError when the token has expired and cannot be refreshed.
   */
  private async refreshIfWithinWindow(force: boolean): Promise<void> {
    let skipValidityShortcut: boolean = force;
    for (;;) {
      if (this.inFlight !== null) {
        await this.inFlight;
        // Re-decide: the shared attempt either refreshed the token or armed the backoff.
        skipValidityShortcut = false;
        continue;
      }
      const now: number = this.timeFn();
      if (this.loginDeadline !== null && now >= this.loginDeadline) {
        return;
      }
      if (!skipValidityShortcut && now < this.expiresAt - this.timings.expiryLeewayInS) {
        return;
      }
      if (now < this.nextAttemptAt) {
        if (now < this.expiresAt) {
          return;
        }
        throw new KeycloakAuthenticationError(
          "The Keycloak access token has expired and the refresh is backing off after " +
            `${this.failures} consecutive failure(s); the next attempt is due in ` +
            `${(this.nextAttemptAt - now).toFixed(1)}s`
        );
      }
      const attempt: Promise<RefreshOutcome> = this.refreshGrant().then(
        (): RefreshOutcome => {
          this.recordSuccess();
          return { failed: false, error: null };
        },
        (error: unknown): RefreshOutcome => {
          this.recordFailure(error);
          return { failed: true, error };
        }
      );
      this.inFlight = attempt;
      let outcome: RefreshOutcome;
      try {
        outcome = await attempt;
      } finally {
        this.inFlight = null;
      }
      if (!outcome.failed) {
        return;
      }
      // The attempt may have taken up to the HTTP timeout: re-read the clock.
      if (this.timeFn() < this.expiresAt) {
        return;
      }
      throw asAuthenticationError(outcome.error, "refresh");
    }
  }

  /**
   * Count a failed refresh, arm the backoff from NOW (the moment it is recorded) and warn once.
   *
   * @param error the failure.
   */
  private recordFailure(error: unknown): void {
    const now: number = this.timeFn();
    this.failures += 1;
    const delayInS: number = backoffDelayInS(this.failures, this.randomFn, this.timings);
    this.nextAttemptAt = now + delayInS;
    const remainingInS: number = this.expiresAt - now;
    let validity: string = "the current access token has expired";
    if (remainingInS > 0) {
      validity = `the current access token stays valid for ${remainingInS.toFixed(1)}s`;
    }
    this.logger.warn(
      `Keycloak token refresh failed (attempt ${this.failures}); retrying in ${delayInS.toFixed(1)}s, ` +
        `${validity} (${describeError(error)})`
    );
  }

  /** Reset the backoff after a successful refresh, with one INFO line if it had been failing. */
  private recordSuccess(): void {
    if (this.failures > 0) {
      this.logger.info(`Keycloak token refresh recovered after ${this.failures} failed attempt(s)`);
    }
    this.failures = 0;
    this.nextAttemptAt = 0;
  }

  /** Arm the next background refresh per the loop of every ONDEWO SDK. */
  private scheduleNextBackgroundRefresh(): void {
    if (this.backgroundStopped) {
      return;
    }
    const now: number = this.timeFn();
    const deadline: number | null = this.loginDeadline;
    if (deadline !== null && now >= deadline) {
      this.backgroundStopped = true;
      return;
    }
    let delayInS: number = this.expiresAt - this.timings.expiryLeewayInS - now;
    if (this.failures > 0) {
      delayInS = this.nextAttemptAt - now;
    }
    delayInS = Math.max(delayInS, this.timings.minRefreshDelayInS);
    if (deadline !== null) {
      delayInS = Math.min(delayInS, deadline - now);
    }
    this.timerArmed = true;
    this.timer = this.scheduler.setTimeout((): void => {
      this.timerArmed = false;
      this.timer = null;
      if (this.backgroundStopped) {
        return;
      }
      void this.refreshIfWithinWindow(false)
        .catch((error: unknown): void => {
          // Already recorded and warned by recordFailure; never a second warning.
          this.logger.debug(`Keycloak background refresh will be retried (${describeError(error)})`);
        })
        .finally((): void => this.scheduleNextBackgroundRefresh());
    }, delayInS * 1000);
  }

  /** Disarm the background timer, if armed. */
  private disarmTimer(): void {
    if (this.timerArmed) {
      this.scheduler.clearTimeout(this.timer);
      this.timerArmed = false;
      this.timer = null;
    }
  }

  /** One password (ROPC) grant: exactly the five fields of every ONDEWO SDK. */
  private async passwordGrant(): Promise<void> {
    const payload: Record<string, unknown> = await this.postTokenRequest(
      {
        grant_type: "password",
        client_id: this.clientId,
        username: this.username,
        password: this.password,
        scope: "offline_access"
      },
      "login"
    );
    this.storeTokens(payload);
  }

  /** One refresh grant: exactly the three fields of every ONDEWO SDK. Never a password. */
  private async refreshGrant(): Promise<void> {
    const payload: Record<string, unknown> = await this.postTokenRequest(
      { grant_type: "refresh_token", client_id: this.clientId, refresh_token: this.currentRefreshToken },
      "refresh"
    );
    this.storeTokens(payload);
  }

  /**
   * POST one form and return the JSON object it answered with (E1-E4).
   *
   * @param form the form fields.
   * @param action `login` or `refresh`, for the error messages.
   * @returns the parsed JSON object.
   * @throws KeycloakAuthenticationError on every failure; a non-transport error of the transport
   *   itself is passed through for the caller to wrap.
   */
  private async postTokenRequest(form: Record<string, string>, action: string): Promise<Record<string, unknown>> {
    let response: KeycloakTokenHttpResponse;
    try {
      response = await this.transport({
        url: this.tokenEndpoint,
        form,
        timeoutInS: this.timings.httpTimeoutInS,
        verifySsl: this.verifySsl
      });
    } catch (error: unknown) {
      if (error instanceof KeycloakTransportError) {
        let reason: unknown = error;
        if (error.cause !== undefined) {
          reason = error.cause;
        }
        throw new KeycloakAuthenticationError(
          `Keycloak token ${action} could not reach the token endpoint (${describeError(reason)})`,
          { cause: error }
        );
      }
      throw error;
    }
    if (response.status < 200 || response.status >= 300) {
      throw new KeycloakAuthenticationError(
        `Keycloak token ${action} failed with status ${response.status}: ` +
          `${response.body.slice(0, this.timings.maxErrorBodyChars)}`
      );
    }
    let body: unknown;
    try {
      body = JSON.parse(response.body);
    } catch (error: unknown) {
      throw new KeycloakAuthenticationError(
        `Keycloak token ${action} returned status ${response.status} with a body that is not JSON`,
        { cause: error }
      );
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new KeycloakAuthenticationError(
        `Keycloak token ${action} returned a JSON ${jsonTypeName(body)} instead of an object`
      );
    }
    return body as Record<string, unknown>;
  }

  /**
   * Validate a token response completely, then adopt it (S1-S4): a malformed response changes nothing.
   *
   * @param payload the parsed token response.
   * @throws KeycloakAuthenticationError on a missing access token or a non-numeric `expires_in`.
   */
  private storeTokens(payload: Record<string, unknown>): void {
    const accessToken: unknown = payload["access_token"];
    if (typeof accessToken !== "string" || accessToken.length === 0) {
      const fields: string = Object.keys(payload)
        .sort()
        .map((name: string): string => `'${name}'`)
        .join(", ");
      throw new KeycloakAuthenticationError(
        "Keycloak token response did not contain an access_token; the response carried the fields " +
          `[${fields}] (values withheld: a token response is credential material)`
      );
    }
    // Only a MISSING expires_in means 0; an explicit null is as non-numeric as any other non-number.
    let expiresInRaw: unknown = 0;
    if ("expires_in" in payload) {
      expiresInRaw = payload["expires_in"];
    }
    let expiresIn: number = Number.NaN;
    if (typeof expiresInRaw === "number") {
      expiresIn = expiresInRaw;
    } else if (typeof expiresInRaw === "string" && expiresInRaw.trim().length > 0) {
      expiresIn = Number(expiresInRaw);
    }
    if (Number.isNaN(expiresIn)) {
      throw new KeycloakAuthenticationError("Keycloak token response carried a non-numeric expires_in (value withheld)");
    }
    this.currentAccessToken = accessToken;
    const refreshToken: unknown = payload["refresh_token"];
    if (typeof refreshToken === "string" && refreshToken.length > 0) {
      this.currentRefreshToken = refreshToken;
    }
    this.expiresAt = this.timeFn() + Math.max(expiresIn, 0);
  }
}

/** A counted hold on a shared {@link KeycloakTokenSession}. */
export interface KeycloakTokenSessionLease {
  /** The shared session. */
  readonly session: KeycloakTokenSession;
  /** Give the hold back; the last release stops the session. Idempotent. */
  release(): void;
}

/** One registry slot. */
interface RegistryEntry {
  /** The start-up (or started) session. */
  promise: Promise<KeycloakTokenSession>;
  /** The started session, once {@link promise} resolved. */
  session: KeycloakTokenSession | null;
  /** How many unreleased leases exist. */
  holders: number;
}

/** Sessions by scope (an HTTP client, a transport), then by credential key. */
const SESSION_REGISTRY: WeakMap<object, Map<string, RegistryEntry>> = new WeakMap<object, Map<string, RegistryEntry>>();

/**
 * Hold the ONE session of a credential set, starting it when none is live: every caller with the
 * same credentials and scope shares one login and one refresher. Concurrent first callers share one
 * start-up; a failed start-up is not cached; a stopped session is never handed out again.
 *
 * @param options the session options.
 * @param scope what the session is shared within (default: the transport), e.g. one Angular
 *   `HttpClient`, so a session never sends through another application's HTTP stack.
 * @returns a lease on the session; release it when done.
 * @throws KeycloakAuthenticationError when the start-up fails.
 */
export async function acquireKeycloakTokenSession(
  options: KeycloakTokenSessionOptions,
  scope: object = options.transport
): Promise<KeycloakTokenSessionLease> {
  const key: string = keycloakSessionRegistryKey(options);
  let sessions: Map<string, RegistryEntry> | undefined = SESSION_REGISTRY.get(scope);
  if (sessions === undefined) {
    sessions = new Map<string, RegistryEntry>();
    SESSION_REGISTRY.set(scope, sessions);
  }
  const scoped: Map<string, RegistryEntry> = sessions;
  let entry: RegistryEntry | undefined = scoped.get(key);
  if (entry === undefined || (entry.session !== null && entry.session.closed)) {
    const created: RegistryEntry = { promise: KeycloakTokenSession.create(options), session: null, holders: 0 };
    void created.promise.then(
      (started: KeycloakTokenSession): void => {
        created.session = started;
      },
      (): void => {
        // A pending entry is never replaced (only a closed, i.e. started, one is), so this is it.
        scoped.delete(key);
      }
    );
    scoped.set(key, created);
    entry = created;
  }
  const held: RegistryEntry = entry;
  held.holders += 1;
  let session: KeycloakTokenSession;
  try {
    session = await held.promise;
  } catch (error: unknown) {
    held.holders -= 1;
    throw error;
  }
  let released: boolean = false;
  return {
    session,
    release: (): void => {
      if (released) {
        return;
      }
      released = true;
      held.holders -= 1;
      if (held.holders === 0) {
        session.stop();
        if (scoped.get(key) === held) {
          scoped.delete(key);
        }
      }
    }
  };
}
