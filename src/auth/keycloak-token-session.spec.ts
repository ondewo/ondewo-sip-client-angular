import { createHash } from "crypto";
import {
  acquireKeycloakTokenSession,
  backoffDelayInS,
  CONSOLE_KEYCLOAK_LOGGER,
  DEFAULT_KEYCLOAK_TIMINGS,
  GLOBAL_KEYCLOAK_SCHEDULER,
  HTTP_TIMEOUT_IN_S,
  KeycloakAuthenticationError,
  KeycloakLogger,
  KeycloakScheduler,
  keycloakSessionRegistryKey,
  KeycloakTimings,
  KeycloakTokenHttpResponse,
  KeycloakTokenRequest,
  KeycloakTokenSession,
  KeycloakTokenSessionLease,
  KeycloakTokenSessionOptions,
  KeycloakTokenTransport,
  KeycloakTransportError,
  MAX_ERROR_BODY_CHARS,
  MAX_REFRESH_RETRY_EXPONENT,
  MIN_REFRESH_DELAY_IN_S,
  REDACTED,
  redactSecret,
  REFRESH_RETRY_BASE_DELAY_IN_S,
  REFRESH_RETRY_MAX_DELAY_IN_S,
  REFRESH_SKEW_IN_S
} from "./keycloak-token-session";

/**
 * The cross-SDK test catalogue (T01-T54) of the Keycloak token handling, run against the
 * framework-free {@link KeycloakTokenSession} with a scripted transport, a fake monotonic clock, a
 * fixed jitter and a fake scheduler: no network and no real sleeps (except T26's 50 ms transport
 * delay and T41, which runs the real timers on shrunk constants). The ids match every other ONDEWO
 * SDK. The DI adapter and the configuration rules (T55-T62) are in keycloak-token-provider.spec.ts.
 */

/** One scripted answer of the fake token endpoint. */
type Step = KeycloakTokenHttpResponse | Error | ((request: KeycloakTokenRequest) => Promise<KeycloakTokenHttpResponse>);

/** A fake monotonic clock in seconds, starting at 1000. */
class FakeClock {
  /** The current monotonic second. */
  public now: number = 1000;

  /** The clock function handed to the session. */
  public readonly timeFn: () => number = (): number => this.now;

  /**
   * @param seconds how far to move the clock.
   */
  public advance(seconds: number): void {
    this.now += seconds;
  }
}

/** A scripted token endpoint that records every request. */
class FakeTransport {
  /** Every request, in order. */
  public readonly requests: KeycloakTokenRequest[] = [];

  /**
   * @param script the answers, in order; a {@link sticky} step repeats forever once reached.
   * @param sticky an answer repeated once the script is exhausted (`null`: exhaustion is an error).
   */
  public constructor(
    private readonly script: Step[],
    private readonly sticky: Step | null = null
  ) {}

  /** @returns the `grant_type` of every request, in order. */
  public get grants(): string[] {
    return this.requests.map((request: KeycloakTokenRequest): string => request.form["grant_type"]);
  }

  /** The transport function handed to the session. */
  public readonly transport: KeycloakTokenTransport = (request: KeycloakTokenRequest): Promise<KeycloakTokenHttpResponse> => {
    this.requests.push(request);
    const step: Step | undefined = this.script.shift() ?? this.sticky ?? undefined;
    if (step === undefined) {
      return Promise.reject(new Error("the fake token endpoint has no scripted answer left"));
    }
    if (typeof step === "function") {
      return step(request);
    }
    if (step instanceof Error) {
      return Promise.reject(step);
    }
    return Promise.resolve(step);
  };
}

/** A scheduler that records every wait and runs one only when the test fires it. */
class FakeScheduler implements KeycloakScheduler {
  /** Every armed wait, in seconds, in order. */
  public readonly waits: number[] = [];
  /** The armed callback, or `null`. */
  private pending: { fn: () => void; delayInS: number } | null = null;

  /** @param clock the clock a fired wait advances. */
  public constructor(private readonly clock: FakeClock) {}

  /** @returns whether a wait is armed. */
  public get armed(): boolean {
    return this.pending !== null;
  }

  /**
   * @param fn the callback.
   * @param delayInMs the wait.
   * @returns a handle.
   */
  public setTimeout(fn: () => void, delayInMs: number): unknown {
    const delayInS: number = delayInMs / 1000;
    this.waits.push(delayInS);
    this.pending = { fn, delayInS };
    return this.pending;
  }

  /** @param handle the handle to disarm. */
  public clearTimeout(handle: unknown): void {
    if (this.pending === handle) {
      this.pending = null;
    }
  }

  /**
   * Let the armed wait time out: advance the clock by it (unless `advance` is false), run the
   * callback and let the refresh it starts settle.
   *
   * @param advance whether to move the clock by the wait.
   * @returns whether a wait was armed.
   */
  public async fire(advance: boolean = true): Promise<boolean> {
    const pending: { fn: () => void; delayInS: number } | null = this.pending;
    if (pending === null) {
      return false;
    }
    this.pending = null;
    if (advance) {
      this.clock.advance(pending.delayInS);
    }
    pending.fn();
    await settle();
    return true;
  }
}

/** A logger that records every line. */
class RecordingLogger implements KeycloakLogger {
  /** WARNING lines. */
  public readonly warnings: string[] = [];
  /** INFO lines. */
  public readonly infos: string[] = [];
  /** DEBUG lines. */
  public readonly debugs: string[] = [];

  /** @param message the line. */
  public warn(message: string): void {
    this.warnings.push(message);
  }

  /** @param message the line. */
  public info(message: string): void {
    this.infos.push(message);
  }

  /** @param message the line. */
  public debug(message: string): void {
    this.debugs.push(message);
  }

  /** @returns every line of every level. */
  public get all(): string[] {
    return [...this.warnings, ...this.infos, ...this.debugs];
  }
}

/** @returns a promise that resolves once every queued promise continuation has run. */
function settle(): Promise<void> {
  return new Promise<void>((resolve: () => void): void => {
    setTimeout(resolve, 0);
  });
}

/**
 * @param accessToken the access token.
 * @param extra further response fields (`expires_in` defaults to 300).
 * @returns a 200 token response.
 */
function tokenResponse(accessToken: string, extra: Record<string, unknown> = {}): KeycloakTokenHttpResponse {
  return { status: 200, body: JSON.stringify({ access_token: accessToken, expires_in: 300, ...extra }) };
}

/**
 * @param status the HTTP status.
 * @param body the raw body.
 * @returns a raw HTTP answer.
 */
function answer(status: number, body: string = ""): KeycloakTokenHttpResponse {
  return { status, body };
}

/** HTTP 400 for a dead offline session, the default refusal of the catalogue. */
const REFUSED: KeycloakTokenHttpResponse = answer(
  400,
  JSON.stringify({ error: "invalid_grant", error_description: "Offline user session not found" })
);

/** HTTP 503 with a JSON body. */
const UNAVAILABLE: KeycloakTokenHttpResponse = answer(503, JSON.stringify({ error: "unavailable" }));

/** A test harness: one session over the fakes. */
interface Harness {
  /** The session under test. */
  session: KeycloakTokenSession;
  /** The scripted endpoint. */
  endpoint: FakeTransport;
  /** The fake clock. */
  clock: FakeClock;
  /** The fake scheduler. */
  scheduler: FakeScheduler;
  /** The recorded log. */
  logger: RecordingLogger;
}

/** Harness options. */
interface HarnessOptions extends Partial<Omit<KeycloakTokenSessionOptions, "transport">> {
  /** The answer repeated once the script is exhausted. */
  sticky?: Step;
  /** The jitter fraction (default 0). */
  jitter?: number;
}

/**
 * Start a session over the fakes. Defaults: password grant, background refresher on.
 *
 * @param script the endpoint script; the first step answers the start-up.
 * @param options session overrides.
 * @returns the harness.
 */
async function start(script: Step[], options: HarnessOptions = {}): Promise<Harness> {
  const clock: FakeClock = new FakeClock();
  const endpoint: FakeTransport = new FakeTransport(script, options.sticky ?? null);
  const scheduler: FakeScheduler = new FakeScheduler(clock);
  const logger: RecordingLogger = new RecordingLogger();
  const jitter: number = options.jitter ?? 0;
  const session: KeycloakTokenSession = await KeycloakTokenSession.create({
    keycloakUrl: "https://auth.example.com/auth",
    realm: "ondewo-ccai-platform",
    clientId: "ondewo-nlu-cai-sdk-public",
    username: "technical-user@example.com",
    password: "pw",
    transport: endpoint.transport,
    timeFn: clock.timeFn,
    randomFn: (): number => jitter,
    scheduler,
    logger,
    ...options
  });
  return { session, endpoint, clock, scheduler, logger };
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
 * Await `promise`, assert it rejected with a {@link KeycloakAuthenticationError} and return it.
 *
 * @param promise a promise expected to reject.
 * @returns the typed error.
 */
async function authErrorOf(promise: Promise<unknown>): Promise<KeycloakAuthenticationError> {
  const error: unknown = await rejectionOf(promise);
  expect(error).toBeInstanceOf(KeycloakAuthenticationError);
  return error as KeycloakAuthenticationError;
}

describe("Keycloak token session (cross-SDK catalogue)", (): void => {
  describe("A. backoff ladder", (): void => {
    it("T01 doubles the ceiling per failure up to the maximum", (): void => {
      const delays: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n: number): number =>
        backoffDelayInS(n, (): number => 1)
      );
      expect(delays).toEqual([5, 10, 20, 40, 80, 160, 300, 300, 300, 300]);
    });

    it("T02 stays at the base with jitter 0", (): void => {
      for (let n: number = 1; n <= 19; n++) {
        expect(backoffDelayInS(n, (): number => 0)).toBe(5);
      }
    });

    it("T03 draws uniformly inside the window", (): void => {
      expect(backoffDelayInS(2, (): number => 0.5)).toBe(7.5);
      expect(backoffDelayInS(3, (): number => 0.25)).toBe(8.75);
    });

    it("T04 clamps a faulty jitter source into [base, ceiling]", (): void => {
      for (const fraction of [-1, -0.001, 1.5, 1e9]) {
        const delay: number = backoffDelayInS(4, (): number => fraction);
        expect(delay).toBeGreaterThanOrEqual(5);
        expect(delay).toBeLessThanOrEqual(40);
      }
    });

    it("T05 treats a failure count below 1 as 1", (): void => {
      expect(backoffDelayInS(0, (): number => 1)).toBe(5);
      expect(backoffDelayInS(-3, (): number => 1)).toBe(5);
    });

    it("T06 never overflows on a huge failure count", (): void => {
      expect(backoffDelayInS(1e9, (): number => 1)).toBe(300);
      expect(backoffDelayInS(Number.MAX_SAFE_INTEGER, (): number => 1)).toBe(300);
    });

    it("T07 keeps the constant relations and the production values of every SDK", (): void => {
      expect(REFRESH_RETRY_BASE_DELAY_IN_S).toBeGreaterThan(MIN_REFRESH_DELAY_IN_S);
      expect(REFRESH_RETRY_BASE_DELAY_IN_S * (2 ** MAX_REFRESH_RETRY_EXPONENT)).toBeGreaterThanOrEqual(
        REFRESH_RETRY_MAX_DELAY_IN_S
      );
      expect(HTTP_TIMEOUT_IN_S).toBeLessThan(REFRESH_SKEW_IN_S);
      const production: KeycloakTimings = {
        expiryLeewayInS: 30,
        minRefreshDelayInS: 1,
        retryBaseDelayInS: 5,
        retryMaxDelayInS: 300,
        maxRetryExponent: 6,
        httpTimeoutInS: 10,
        maxErrorBodyChars: 500
      };
      expect({ ...DEFAULT_KEYCLOAK_TIMINGS }).toEqual(production);
      expect(MAX_ERROR_BODY_CHARS).toBe(500);
      expect(Object.isFrozen(DEFAULT_KEYCLOAK_TIMINGS)).toBe(true);
    });
  });

  describe("B. the background loop survives every failure", (): void => {
    it("T08 recovers from a refused refresh", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), REFUSED, tokenResponse("acc-3")]);
      await harness.scheduler.fire();
      await harness.scheduler.fire();
      expect(harness.endpoint.grants).toEqual(["password", "refresh_token", "refresh_token"]);
      expect(harness.session.accessToken).toBe("acc-3");
      expect(harness.session.consecutiveFailures).toBe(0);
    });

    /** Every failure kind of the catalogue, as the fake endpoint answers it. */
    const failureKinds: [string, () => Step][] = [
      ["a network error", (): Step => new KeycloakTransportError("network is unreachable")],
      [
        "a refused connection",
        (): Step => new KeycloakTransportError("connect failed", { cause: new Error("ECONNREFUSED") })
      ],
      ["a timeout", (): Step => new KeycloakTransportError("timed out", { cause: new Error("Timeout has occurred") })],
      ["a non-auth error of the transport (a bug)", (): Step => new TypeError("undefined is not a function")],
      ["HTTP 503 with a JSON body", (): Step => UNAVAILABLE],
      ["HTTP 502 with an empty body", (): Step => answer(502)],
      ["200 with a non-JSON body", (): Step => answer(200, "<html>bad gateway</html>")],
      ["200 with a JSON array", (): Step => answer(200, "[1,2]")],
      ["200 without an access_token", (): Step => answer(200, JSON.stringify({ expires_in: 300 }))],
      ["200 with a non-numeric expires_in", (): Step => answer(200, JSON.stringify({ access_token: "x", expires_in: "soon" }))]
    ];

    it.each(failureKinds)("T09 is not ended by %s", async (_kind: string, failure: () => Step): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), failure(), tokenResponse("acc-ok")]);
      await harness.scheduler.fire();
      await harness.scheduler.fire();
      expect(harness.endpoint.requests).toHaveLength(3);
      expect(harness.session.accessToken).toBe("acc-ok");
      expect(harness.session.backgroundRefreshActive).toBe(true);
      expect(harness.logger.warnings).toHaveLength(1);
    });

    it("T10 keeps retrying a persistent failure", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { sticky: UNAVAILABLE });
      for (let wait: number = 0; wait < 6; wait++) {
        expect(await harness.scheduler.fire()).toBe(true);
      }
      expect(harness.endpoint.grants).toEqual(["password", ...new Array<string>(6).fill("refresh_token")]);
      expect(harness.session.accessToken).toBe("acc-1");
      expect(harness.session.consecutiveFailures).toBe(6);
      expect(harness.scheduler.armed).toBe(true);
    });

    it("T11 never falls back to a password grant", async (): Promise<void> => {
      const invalidClient: KeycloakTokenHttpResponse = answer(401, JSON.stringify({ error: "invalid_client" }));
      const harness: Harness = await start([tokenResponse("acc-1")], { sticky: invalidClient });
      for (let wait: number = 0; wait < 10; wait++) {
        await harness.scheduler.fire();
      }
      // A lazy read of the now-expired token must not log in either.
      harness.clock.advance(10000);
      await authErrorOf(harness.session.getAccessToken());
      expect(harness.endpoint.grants.filter((grant: string): boolean => grant === "password")).toHaveLength(1);
    });
  });

  describe("C. the background loop backs off", (): void => {
    it("T12 waits for the leeway first and for the base after a failure", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE]);
      await harness.scheduler.fire();
      expect(harness.scheduler.waits).toEqual([270, 5]);
    });

    it("T13 climbs the ladder while the endpoint stays down", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { sticky: UNAVAILABLE, jitter: 1 });
      for (let wait: number = 0; wait < 9; wait++) {
        await harness.scheduler.fire();
      }
      expect(harness.scheduler.waits.slice(1)).toEqual([5, 10, 20, 40, 80, 160, 300, 300, 300]);
    });

    it("T14 resets the ladder on success, with one recovery INFO", async (): Promise<void> => {
      const harness: Harness = await start(
        [tokenResponse("acc-1"), UNAVAILABLE, UNAVAILABLE, tokenResponse("acc-4", { expires_in: 120 }), UNAVAILABLE],
        { jitter: 1 }
      );
      for (let wait: number = 0; wait < 4; wait++) {
        await harness.scheduler.fire();
      }
      expect(harness.scheduler.waits).toEqual([270, 5, 10, 90, 5]);
      expect(harness.logger.infos).toEqual(["Keycloak token refresh recovered after 2 failed attempt(s)"]);
    });

    it("T15 measures the backoff from when the failure is recorded", async (): Promise<void> => {
      const started: Harness[] = [];
      const slowFailure: Step = (): Promise<KeycloakTokenHttpResponse> => {
        started[0].clock.advance(HTTP_TIMEOUT_IN_S);
        return Promise.resolve(UNAVAILABLE);
      };
      const harness: Harness = await start([tokenResponse("acc-1"), slowFailure]);
      started.push(harness);
      await harness.scheduler.fire();
      expect(harness.scheduler.waits).toEqual([270, 5]);
      expect(harness.session.nextRefreshAttemptAt).toBe(1000 + 270 + 10 + 5);
    });

    it("T16 stops by itself at the deadline, also during a backoff", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1", { expires_in: 30 })], {
        sticky: UNAVAILABLE,
        jitter: 1,
        tokenExpirationInS: 100
      });
      for (let wait: number = 0; wait < 50 && (await harness.scheduler.fire()); wait++) {
        // fire until the loop stops arming waits
      }
      expect(harness.scheduler.armed).toBe(false);
      expect(harness.session.backgroundRefreshActive).toBe(false);
      expect(harness.clock.now).toBeLessThanOrEqual(1000 + 100 + 1);
      for (const wait of harness.scheduler.waits) {
        expect(wait).toBeLessThanOrEqual(100);
      }
    });

    it("T17 sends nothing more once stopped during a backoff wait", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE], { sticky: tokenResponse("never") });
      await harness.scheduler.fire();
      expect(harness.scheduler.armed).toBe(true);
      harness.session.stop();
      expect(await harness.scheduler.fire()).toBe(false);
      expect(harness.endpoint.grants).toEqual(["password", "refresh_token"]);
    });

    it("T18 a closed session ends the loop, also when closed while its refresh is in flight", async (): Promise<void> => {
      const started: Harness[] = [];
      const closingRefresh: Step = (): Promise<KeycloakTokenHttpResponse> => {
        started[0].session.close();
        return Promise.resolve(tokenResponse("acc-2"));
      };
      const harness: Harness = await start([tokenResponse("acc-1"), closingRefresh], { sticky: tokenResponse("never") });
      started.push(harness);
      await harness.scheduler.fire();
      expect(harness.session.accessToken).toBe("acc-2");
      expect(harness.session.closed).toBe(true);
      expect(harness.session.backgroundRefreshActive).toBe(false);
      expect(harness.scheduler.armed).toBe(false);
      expect(harness.endpoint.requests).toHaveLength(2);
    });

    it("does not run a wait that fires after the session was stopped", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { sticky: tokenResponse("never") });
      const scheduler: FakeScheduler = harness.scheduler;
      // A real timer may still fire once after clearTimeout raced it; the callback must check.
      const pending: { fn: () => void } = (scheduler as unknown as { pending: { fn: () => void } }).pending;
      harness.session.stop();
      pending.fn();
      await settle();
      expect(harness.endpoint.requests).toHaveLength(1);
    });
  });

  describe("D. the lazy path shares the backoff", (): void => {
    it("T19 serves the still-valid token when its refresh fails", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE], { startBackgroundRefresh: false });
      harness.clock.advance(271);
      expect(await harness.session.authorizationMetadata()).toEqual(["authorization", "Bearer acc-1"]);
      expect(harness.logger.warnings).toHaveLength(1);
      expect(harness.logger.warnings[0]).toContain("refresh failed (attempt 1)");
      expect(harness.logger.warnings[0]).toContain("stays valid for 29.0s");
    });

    it("T20 sends no request while backing off", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], {
        sticky: UNAVAILABLE,
        startBackgroundRefresh: false
      });
      harness.clock.advance(275);
      for (let call: number = 0; call < 100; call++) {
        expect(await harness.session.getAccessToken()).toBe("acc-1");
        harness.clock.advance(0.04);
      }
      expect(harness.endpoint.grants).toEqual(["password", "refresh_token"]);
    });

    it("T21 raises for an expired token while backing off", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], {
        sticky: UNAVAILABLE,
        jitter: 1,
        startBackgroundRefresh: false
      });
      harness.clock.advance(299);
      expect(await harness.session.getAccessToken()).toBe("acc-1");
      harness.clock.advance(2);
      const error: KeycloakAuthenticationError = await authErrorOf(harness.session.getAccessToken());
      expect(error.message).toBe(
        "The Keycloak access token has expired and the refresh is backing off after 1 consecutive failure(s); " +
          "the next attempt is due in 3.0s"
      );
      expect(harness.endpoint.requests).toHaveLength(2);
    });

    it("T22 raises the refusal for an expired token whose refresh fails", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), REFUSED], { startBackgroundRefresh: false });
      harness.clock.advance(400);
      const error: KeycloakAuthenticationError = await authErrorOf(harness.session.getAccessToken());
      expect(error.message).toContain("status 400");
      expect(error.message).toContain("Offline user session not found");
      expect(harness.logger.warnings[0]).toContain("the current access token has expired");
    });

    it("T23 wraps a non-auth transport error with it as the cause", async (): Promise<void> => {
      const bug: Error = new Error("boom");
      const harness: Harness = await start([tokenResponse("acc-1"), bug], { startBackgroundRefresh: false });
      harness.clock.advance(400);
      const error: KeycloakAuthenticationError = await authErrorOf(harness.session.getAccessToken());
      expect(error.message).toBe("Keycloak token refresh failed (Error: boom)");
      expect(error.cause).toBe(bug);
    });

    it("T23 renders a non-Error rejection of the transport too", async (): Promise<void> => {
      const harness: Harness = await start(
                // A transport that breaks the contract by rejecting with a non-Error is exactly the case here.
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        [tokenResponse("acc-1"), (): Promise<KeycloakTokenHttpResponse> => Promise.reject("plain string")],
        { startBackgroundRefresh: false }
      );
      harness.clock.advance(400);
      const error: KeycloakAuthenticationError = await authErrorOf(harness.session.getAccessToken());
      expect(error.message).toBe("Keycloak token refresh failed (string: plain string)");
      expect(error.cause).toBe("plain string");
    });

    it("T23 renders an error-like rejection without a name as Error", async (): Promise<void> => {
      const harness: Harness = await start(
                // An error-like object without a name is exactly the case here.
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        [tokenResponse("acc-1"), (): Promise<KeycloakTokenHttpResponse> => Promise.reject({ message: "no name" })],
        { startBackgroundRefresh: false }
      );
      harness.clock.advance(400);
      const error: KeycloakAuthenticationError = await authErrorOf(harness.session.getAccessToken());
      expect(error.message).toBe("Keycloak token refresh failed (Error: no name)");
    });

    it("T24 recovers lazily after the backoff", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE, tokenResponse("acc-3")], {
        startBackgroundRefresh: false
      });
      harness.clock.advance(280);
      expect(await harness.session.getAccessToken()).toBe("acc-1");
      harness.clock.advance(5);
      expect(await harness.session.authorizationMetadata()).toEqual(["authorization", "Bearer acc-3"]);
      expect(harness.session.consecutiveFailures).toBe(0);
      expect(harness.session.nextRefreshAttemptAt).toBe(0);
      expect(harness.logger.infos).toEqual(["Keycloak token refresh recovered after 1 failed attempt(s)"]);
    });

    it("T25 a lazy failure schedules the background loop", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE, tokenResponse("acc-3")], {
        jitter: 1
      });
      harness.clock.advance(280);
      expect(await harness.session.getAccessToken()).toBe("acc-1");
      harness.clock.advance(2);
      // The wait armed at start-up times out now, without moving the clock any further.
      await harness.scheduler.fire(false);
      expect(harness.scheduler.waits[1]).toBeCloseTo(3.0, 6);
      await harness.scheduler.fire();
      expect(harness.session.accessToken).toBe("acc-3");
    });

    it("T26 single-flights 16 concurrent callers into one request", async (): Promise<void> => {
      const slowNetworkError: Step = (): Promise<KeycloakTokenHttpResponse> =>
        new Promise<KeycloakTokenHttpResponse>(
          (_resolve: (value: KeycloakTokenHttpResponse) => void, reject: (reason: unknown) => void): void => {
            setTimeout((): void => reject(new KeycloakTransportError("network is unreachable")), 50);
          }
        );
      const harness: Harness = await start([tokenResponse("acc-1", { expires_in: 20 })], {
        sticky: slowNetworkError,
        startBackgroundRefresh: false
      });
      const caller: () => Promise<string[]> = async (): Promise<string[]> => {
        const values: string[] = [];
        for (let call: number = 0; call < 20; call++) {
          const [, value]: [string, string] = await harness.session.authorizationMetadata();
          values.push(value);
        }
        return values;
      };
      const results: string[][] = await Promise.all(Array.from({ length: 16 }, caller));
      const allValues: string[] = results.flat();
      expect(allValues).toHaveLength(320);
      expect(new Set(allValues)).toEqual(new Set(["Bearer acc-1"]));
      expect(harness.endpoint.grants).toEqual(["password", "refresh_token"]);
    });

    it("refreshes on a forced read even while the token looks valid, and honours a running backoff", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), tokenResponse("acc-2"), UNAVAILABLE], {
        startBackgroundRefresh: false
      });
      expect(harness.session.peekAccessToken()).toBe("acc-1");
      expect(await harness.session.getAccessToken({ force: true })).toBe("acc-2");
      expect(await harness.session.getAccessToken({ force: true })).toBe("acc-2");
      // Backing off now: a forced read sends nothing more.
      expect(await harness.session.getAccessToken({ force: true })).toBe("acc-2");
      expect(harness.endpoint.requests).toHaveLength(3);
    });

    it("peeks the token only while no refresh decision is due", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], {
        startBackgroundRefresh: false,
        tokenExpirationInS: 1000
      });
      expect(harness.session.peekAccessToken()).toBe("acc-1");
      harness.clock.advance(270);
      expect(harness.session.peekAccessToken()).toBeNull();
      harness.clock.advance(1000);
      // Past the deadline the token is served as-is and allowed to lapse (R1).
      expect(harness.session.peekAccessToken()).toBe("acc-1");
      expect(await harness.session.getAccessToken()).toBe("acc-1");
      expect(harness.endpoint.requests).toHaveLength(1);
    });
  });

  describe("E. response validation", (): void => {
    const networkFailures: [string, KeycloakTransportError, string][] = [
      ["a generic network error", new KeycloakTransportError("network is unreachable"), "KeycloakTransportError: network is unreachable"],
      [
        "a refused connection",
        new KeycloakTransportError("x", { cause: Object.assign(new Error("ECONNREFUSED"), { name: "ConnectionRefusedError" }) }),
        "ConnectionRefusedError: ECONNREFUSED"
      ],
      [
        "a timeout",
        new KeycloakTransportError("x", { cause: Object.assign(new Error("Timeout has occurred"), { name: "TimeoutError" }) }),
        "TimeoutError: Timeout has occurred"
      ]
    ];

    it.each(networkFailures)(
      "T27 reports %s at start-up as unreachable",
      async (_kind: string, failure: KeycloakTransportError, rendered: string): Promise<void> => {
        const error: KeycloakAuthenticationError = await authErrorOf(start([failure]));
        expect(error.message).toBe(`Keycloak token login could not reach the token endpoint (${rendered})`);
        expect(error.cause).toBe(failure);
      }
    );

    it("T28 rejects a non-JSON 200 at start-up", async (): Promise<void> => {
      const error: KeycloakAuthenticationError = await authErrorOf(start([answer(200, "<html>bad gateway</html>")]));
      expect(error.message).toBe("Keycloak token login returned status 200 with a body that is not JSON");
      expect(error.cause).toBeInstanceOf(SyntaxError);
    });

    it.each([
      ["[1,2]", "array"],
      ['"text"', "string"],
      ["42", "number"],
      ["true", "boolean"],
      ["null", "null"]
    ])("T29 rejects the JSON %s at start-up", async (body: string, type: string): Promise<void> => {
      const error: KeycloakAuthenticationError = await authErrorOf(start([answer(200, body)]));
      expect(error.message).toBe(`Keycloak token login returned a JSON ${type} instead of an object`);
    });

    it("T30 truncates a long error body", async (): Promise<void> => {
      const page: string = `<html>${"x".repeat(10000)}</html>`;
      const error: KeycloakAuthenticationError = await authErrorOf(start([answer(502, page)]));
      expect(error.message.length).toBeLessThan(500 + 200);
      expect(error.message.startsWith("Keycloak token login failed with status 502: <html>xxx")).toBe(true);
    });

    it("T31 names the fields, never the values, of a response without an access token", async (): Promise<void> => {
      const body: string = JSON.stringify({ refresh_token: "secret-offline-token-77", expires_in: 300 });
      const error: KeycloakAuthenticationError = await authErrorOf(start([answer(200, body)]));
      expect(error.message).toBe(
        "Keycloak token response did not contain an access_token; the response carried the fields " +
          "['expires_in', 'refresh_token'] (values withheld: a token response is credential material)"
      );
      expect(error.message).not.toContain("secret-offline-token-77");
    });

    it.each([[""], [42], [null]])("T31 rejects the access_token %p", async (accessToken: unknown): Promise<void> => {
      const error: KeycloakAuthenticationError = await authErrorOf(
        start([answer(200, JSON.stringify({ access_token: accessToken }))])
      );
      expect(error.message).toContain("did not contain an access_token");
    });

    it("T32 keeps every field of the previous token on a non-numeric expires_in", async (): Promise<void> => {
      const harness: Harness = await start(
        [tokenResponse("acc-1"), answer(200, JSON.stringify({ access_token: "acc-2", refresh_token: "r-2", expires_in: "soon" }))],
        { startBackgroundRefresh: false }
      );
      harness.clock.advance(280);
      expect(await harness.session.getAccessToken()).toBe("acc-1");
      expect(harness.session.accessTokenExpiresAt).toBe(1300);
      expect(harness.logger.warnings[0]).toContain("non-numeric expires_in (value withheld)");
    });

    it.each([[true], [{}], [null], ["  "]])("T32 rejects the expires_in %p", async (expiresIn: unknown): Promise<void> => {
      const error: KeycloakAuthenticationError = await authErrorOf(
        start([answer(200, JSON.stringify({ access_token: "acc-1", expires_in: expiresIn }))])
      );
      expect(error.message).toBe("Keycloak token response carried a non-numeric expires_in (value withheld)");
    });

    it("T33 accepts a numeric string expires_in", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1", { expires_in: "300" })]);
      expect(harness.session.accessTokenExpiresAt).toBe(1300);
    });

    it("T34 treats a negative expires_in as already expired, and a missing one as 0", async (): Promise<void> => {
      const negative: Harness = await start([tokenResponse("acc-1", { expires_in: -50 })]);
      expect(negative.session.accessTokenExpiresAt).toBe(1000);
      const missing: Harness = await start([answer(200, JSON.stringify({ access_token: "acc-1" }))]);
      expect(missing.session.accessTokenExpiresAt).toBe(1000);
      // An expired token still gets the 1 s floor, not a hot loop.
      expect(missing.scheduler.waits).toEqual([1]);
    });

    it("T35 keeps the previous refresh token when a response carries none", async (): Promise<void> => {
      const harness: Harness = await start(
        [
          tokenResponse("acc-1", { refresh_token: "off-1" }),
          tokenResponse("acc-2"),
          tokenResponse("acc-3", { refresh_token: "" })
        ],
        { startBackgroundRefresh: false, sticky: tokenResponse("acc-4") }
      );
      for (let read: number = 0; read < 3; read++) {
        harness.clock.advance(280);
        await harness.session.getAccessToken();
      }
      expect(harness.endpoint.requests.slice(1).map((request: KeycloakTokenRequest): string => request.form["refresh_token"])).toEqual(
        ["off-1", "off-1", "off-1"]
      );
    });

    it("T36 sends exactly the grant forms, URL and timeout of every SDK", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], {
        keycloakUrl: "https://auth.example.com/auth//",
        startBackgroundRefresh: false,
        sticky: tokenResponse("acc-2")
      });
      harness.clock.advance(280);
      await harness.session.getAccessToken();
      const [login, refresh]: KeycloakTokenRequest[] = harness.endpoint.requests;
      expect(login.url).toBe("https://auth.example.com/auth/realms/ondewo-ccai-platform/protocol/openid-connect/token");
      expect(login.form).toEqual({
        grant_type: "password",
        client_id: "ondewo-nlu-cai-sdk-public",
        username: "technical-user@example.com",
        password: "pw",
        scope: "offline_access"
      });
      expect(refresh.form).toEqual({
        grant_type: "refresh_token",
        client_id: "ondewo-nlu-cai-sdk-public",
        refresh_token: ""
      });
      expect(login.timeoutInS).toBe(10);
      expect(login.verifySsl).toBe(true);
      expect(harness.session.keycloakUrl).toBe("https://auth.example.com/auth");
    });

    it("URL-encodes the realm and hands verifySsl to the transport", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { realm: "a b", verifySsl: false });
      expect(harness.endpoint.requests[0].url).toBe("https://auth.example.com/auth/realms/a%20b/protocol/openid-connect/token");
      expect(harness.endpoint.requests[0].verifySsl).toBe(false);
    });
  });

  describe("F. no credential in logs or errors", (): void => {
    it("T37 logs the failure and the recovery but no secret", async (): Promise<void> => {
      const secrets: string[] = ["pw-never-logged-5d1c", "acc-secret-1", "off-secret-1", "acc-secret-2"];
      const harness: Harness = await start(
        [
          tokenResponse("acc-secret-1", { refresh_token: "off-secret-1" }),
          REFUSED,
          tokenResponse("acc-secret-2")
        ],
        { password: "pw-never-logged-5d1c" }
      );
      await harness.scheduler.fire();
      await harness.scheduler.fire();
      const log: string = harness.logger.all.join("\n");
      expect(log).toContain("refresh failed (attempt 1)");
      expect(log).toContain("recovered");
      for (const secret of secrets) {
        expect(log).not.toContain(secret);
        expect(String(harness.session)).not.toContain(secret);
        expect(JSON.stringify(harness.session)).not.toContain(secret);
      }
      const errors: KeycloakAuthenticationError[] = [
        await authErrorOf(start([answer(200, JSON.stringify({ refresh_token: "off-secret-1" }))], { password: "pw-never-logged-5d1c" })),
        await authErrorOf(start([REFUSED], { password: "pw-never-logged-5d1c", refreshToken: "off-secret-1" }))
      ];
      for (const error of errors) {
        for (const secret of secrets) {
          expect(error.message).not.toContain(secret);
        }
      }
    });

    it("renders the configuration with every non-empty secret redacted and an empty one empty", async (): Promise<void> => {
      const withToken: Harness = await start([tokenResponse("acc-1")], { refreshToken: "off-handed-0" });
      expect(withToken.session.toJSON()).toEqual({
        keycloakUrl: "https://auth.example.com/auth",
        realm: "ondewo-ccai-platform",
        clientId: "ondewo-nlu-cai-sdk-public",
        username: "technical-user@example.com",
        password: REDACTED,
        tokenExpirationInS: null,
        verifySsl: true,
        refreshToken: REDACTED
      });
      expect(String(withToken.session)).toContain("KeycloakTokenSession(");
      expect(String(withToken.session)).not.toContain("off-handed-0");
      const withoutSecrets: Harness = await start([tokenResponse("acc-1")], { password: "", refreshToken: "" });
      expect(withoutSecrets.session.toJSON()["password"]).toBe("");
      expect(withoutSecrets.session.toJSON()["refreshToken"]).toBe("");
      expect(redactSecret(undefined)).toBe("");
      expect(redactSecret(null)).toBe("");
      expect(redactSecret("x")).toBe("***REDACTED***");
    });
  });

  describe("G. stop / close", (): void => {
    it("T38 stops twice without a background refresher", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { startBackgroundRefresh: false });
      expect(harness.session.backgroundRefreshActive).toBe(false);
      harness.session.stop();
      harness.session.close();
      expect(harness.session.closed).toBe(true);
    });

    it("T39 can be stopped from inside its own refresh, and the lazy path still works afterwards", async (): Promise<void> => {
      const started: Harness[] = [];
      const stoppingFailure: Step = (): Promise<KeycloakTokenHttpResponse> => {
        started[0].session.stop();
        started[0].session.stop();
        return Promise.resolve(UNAVAILABLE);
      };
      const harness: Harness = await start([tokenResponse("acc-1"), stoppingFailure, tokenResponse("acc-3")]);
      started.push(harness);
      await harness.scheduler.fire();
      expect(harness.scheduler.armed).toBe(false);
      // After stop the token is still refreshed on demand.
      harness.clock.advance(10);
      expect(await harness.session.getAccessToken()).toBe("acc-3");
    });

    // T40 (a refused / timed-out thread join during stop) has no counterpart: a browser session has no
    // thread to join, and stop() only disarms a timer.
  });

  describe("H. real timers end to end", (): void => {
    it("T41 recovers through every failure kind on the real timer and clock", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([
        tokenResponse("acc-1", { expires_in: 0.1 }),
        new KeycloakTransportError("network is unreachable"),
        UNAVAILABLE,
        new Error("generic failure"),
        tokenResponse("acc-ok", { expires_in: 3600 })
      ]);
      const logger: RecordingLogger = new RecordingLogger();
      const session: KeycloakTokenSession = await KeycloakTokenSession.create({
        keycloakUrl: "https://auth.example.com/auth",
        realm: "ondewo-ccai-platform",
        clientId: "ondewo-nlu-cai-sdk-public",
        username: "u",
        password: "pw",
        transport: endpoint.transport,
        logger,
        timings: { expiryLeewayInS: 0.05, minRefreshDelayInS: 0.01, retryBaseDelayInS: 0.05, retryMaxDelayInS: 0.05 }
      });
      const deadline: number = Date.now() + 10000;
      while (session.accessToken !== "acc-ok" && Date.now() < deadline) {
        await new Promise<void>((resolve: () => void): void => {
          setTimeout(resolve, 10);
        });
      }
      expect(session.accessToken).toBe("acc-ok");
      expect(session.backgroundRefreshActive).toBe(true);
      expect(endpoint.grants).toEqual(["password", "refresh_token", "refresh_token", "refresh_token", "refresh_token"]);
      expect(logger.warnings).toHaveLength(3);
      session.stop();
      expect(session.backgroundRefreshActive).toBe(false);
    });

    it("uses the global timers and the console by default", async (): Promise<void> => {
      jest.useFakeTimers();
      const warn: jest.SpyInstance = jest.spyOn(console, "warn").mockImplementation((): void => undefined);
      const info: jest.SpyInstance = jest.spyOn(console, "info").mockImplementation((): void => undefined);
      const debug: jest.SpyInstance = jest.spyOn(console, "debug").mockImplementation((): void => undefined);
      try {
        const endpoint: FakeTransport = new FakeTransport([tokenResponse("acc-1"), UNAVAILABLE, tokenResponse("acc-2")]);
        const session: KeycloakTokenSession = await KeycloakTokenSession.create({
          keycloakUrl: "https://auth.example.com/auth",
          realm: "r",
          clientId: "c",
          refreshToken: "off-1",
          transport: endpoint.transport
        });
        await jest.advanceTimersByTimeAsync(270 * 1000);
        expect(warn).toHaveBeenCalledTimes(1);
        expect(debug).toHaveBeenCalledTimes(0);
        await jest.advanceTimersByTimeAsync(5 * 1000);
        expect(info).toHaveBeenCalledWith("Keycloak token refresh recovered after 1 failed attempt(s)");
        expect(session.accessToken).toBe("acc-2");
        session.stop();
        expect(jest.getTimerCount()).toBe(0);
        CONSOLE_KEYCLOAK_LOGGER.debug("direct");
        expect(debug).toHaveBeenCalledWith("direct");
        GLOBAL_KEYCLOAK_SCHEDULER.clearTimeout(GLOBAL_KEYCLOAK_SCHEDULER.setTimeout((): void => undefined, 1));
        expect(jest.getTimerCount()).toBe(0);
      } finally {
        warn.mockRestore();
        info.mockRestore();
        debug.mockRestore();
        jest.useRealTimers();
      }
    });

    it("logs a DEBUG, never a second WARNING, when a background refresh raises", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1", { expires_in: 31 }), UNAVAILABLE]);
      // The first wait is the 1 s floor; let it fire only once the token has expired.
      harness.clock.advance(100);
      await harness.scheduler.fire(false);
      expect(harness.logger.warnings).toHaveLength(1);
      expect(harness.logger.debugs).toEqual([
        "Keycloak background refresh will be retried (KeycloakAuthenticationError: Keycloak token refresh failed " +
          'with status 503: {"error":"unavailable"})'
      ]);
      expect(harness.scheduler.armed).toBe(true);
    });
  });

  describe("I. offline-token start-up", (): void => {
    it("T42 starts with one refresh grant and no password", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], { password: "", refreshToken: "off-handed-0" });
      expect(harness.endpoint.requests[0].form).toEqual({
        grant_type: "refresh_token",
        client_id: "ondewo-nlu-cai-sdk-public",
        refresh_token: "off-handed-0"
      });
      expect(harness.session.accessToken).toBe("acc-1");
    });

    it("T43 never sends the password configured alongside the token", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), UNAVAILABLE, tokenResponse("acc-3")], {
        refreshToken: "off-handed-0",
        startBackgroundRefresh: false
      });
      harness.clock.advance(280);
      await harness.session.getAccessToken();
      harness.clock.advance(10);
      expect(await harness.session.getAccessToken()).toBe("acc-3");
      expect(harness.endpoint.grants).toEqual(["refresh_token", "refresh_token", "refresh_token"]);
      for (const request of harness.endpoint.requests) {
        expect(request.form).not.toHaveProperty("password");
      }
    });

    it("T44 a refused start-up token raises, without a password fallback", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([REFUSED], tokenResponse("never"));
      const error: KeycloakAuthenticationError = await authErrorOf(
        KeycloakTokenSession.create({
          keycloakUrl: "https://auth.example.com/auth",
          realm: "r",
          clientId: "c",
          username: "u",
          password: "pw",
          transport: endpoint.transport,
          refreshToken: "off-handed-0"
        })
      );
      expect(error.message).toContain("Keycloak token refresh failed with status 400");
      expect(endpoint.grants).toEqual(["refresh_token"]);
    });

    it("T44 wraps a transport bug at start-up", async (): Promise<void> => {
      const bug: TypeError = new TypeError("x is not a function");
      const error: KeycloakAuthenticationError = await authErrorOf(start([bug]));
      expect(error.message).toBe("Keycloak token login failed (TypeError: x is not a function)");
      expect(error.cause).toBe(bug);
      const tokenError: KeycloakAuthenticationError = await authErrorOf(start([bug], { refreshToken: "off-1" }));
      expect(tokenError.message).toBe("Keycloak token refresh failed (TypeError: x is not a function)");
    });

    it("T45 sends the rotated token on the next refresh", async (): Promise<void> => {
      const harness: Harness = await start(
        [tokenResponse("acc-1", { refresh_token: "off-rotated" }), tokenResponse("acc-2")],
        { refreshToken: "off-handed-0" }
      );
      await harness.scheduler.fire();
      expect(harness.endpoint.requests[1].form["refresh_token"]).toBe("off-rotated");
      expect(harness.session.accessToken).toBe("acc-2");
    });

    it("T46 arms the deadline on the token path too", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1")], {
        refreshToken: "off-handed-0",
        tokenExpirationInS: 200,
        sticky: tokenResponse("acc-n")
      });
      expect(harness.session.autoRefreshDeadline).toBe(1200);
      for (let wait: number = 0; wait < 20 && (await harness.scheduler.fire()); wait++) {
        // fire until the loop stops
      }
      expect(harness.session.backgroundRefreshActive).toBe(false);
      expect(harness.clock.now).toBeLessThanOrEqual(1201);
    });

    it("T47 the loop survives a failing offline token", async (): Promise<void> => {
      const harness: Harness = await start([tokenResponse("acc-1"), REFUSED, REFUSED, tokenResponse("acc-4")], {
        refreshToken: "off-handed-0"
      });
      for (let wait: number = 0; wait < 3; wait++) {
        await harness.scheduler.fire();
      }
      expect(harness.endpoint.grants).toEqual(["refresh_token", "refresh_token", "refresh_token", "refresh_token"]);
      expect(harness.session.accessToken).toBe("acc-4");
    });
  });

  describe("J. shared-session registry", (): void => {
    /**
     * @param endpoint the scripted endpoint shared by every session of the test.
     * @param overrides credential overrides.
     * @returns session options over `endpoint`.
     */
    function options(endpoint: FakeTransport, overrides: Partial<KeycloakTokenSessionOptions> = {}): KeycloakTokenSessionOptions {
      return {
        keycloakUrl: "https://auth.example.com/auth",
        realm: "r",
        clientId: "c",
        username: "u",
        password: "pw",
        transport: endpoint.transport,
        startBackgroundRefresh: false,
        ...overrides
      };
    }

    it("T48 hands the same credentials the same session, started once", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([], tokenResponse("acc-1"));
      const [first, second]: KeycloakTokenSessionLease[] = await Promise.all([
        acquireKeycloakTokenSession(options(endpoint)),
        acquireKeycloakTokenSession(options(endpoint))
      ]);
      const third: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      expect(second.session).toBe(first.session);
      expect(third.session).toBe(first.session);
      expect(endpoint.requests).toHaveLength(1);
      first.release();
      first.release();
      second.release();
      expect(first.session.closed).toBe(false);
      third.release();
      expect(first.session.closed).toBe(true);
    });

    it.each([
      ["username", { username: "other" }],
      ["password", { password: "other" }],
      ["realm", { realm: "other" }],
      ["keycloakUrl", { keycloakUrl: "https://other.example.com/auth" }],
      ["clientId", { clientId: "other" }],
      ["tokenExpirationInS", { tokenExpirationInS: 60 }],
      ["verifySsl", { verifySsl: false }],
      ["refreshToken", { refreshToken: "off-1" }]
    ])("T49 hands a different %s a different session", async (_field: string, change: Partial<KeycloakTokenSessionOptions>): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([], tokenResponse("acc-1"));
      const first: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      const second: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint, change));
      expect(second.session).not.toBe(first.session);
      expect(endpoint.requests).toHaveLength(2);
    });

    it("T50 starts 50 sessions for 50 dropped configs, with exactly those users in order", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([], tokenResponse("acc-1"));
      const usernames: string[] = Array.from({ length: 50 }, (_unused: unknown, index: number): string => `user-${index}`);
      for (const username of usernames) {
        (await acquireKeycloakTokenSession(options(endpoint, { username }))).release();
      }
      expect(endpoint.requests.map((request: KeycloakTokenRequest): string => request.form["username"])).toEqual(usernames);
    });

    it("T51 separates two token-only configs with empty passwords", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([], tokenResponse("acc-1"));
      const tenantA: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(
        options(endpoint, { password: "", refreshToken: "off-tenant-a" })
      );
      const tenantB: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(
        options(endpoint, { password: "", refreshToken: "off-tenant-b" })
      );
      expect(tenantB.session).not.toBe(tenantA.session);
      expect(endpoint.requests.map((request: KeycloakTokenRequest): string => request.form["refresh_token"])).toEqual([
        "off-tenant-a",
        "off-tenant-b"
      ]);
    });

    it("T52/T53 derives a 64-hex key that holds neither the refresh token nor the password", (): void => {
      const fields: KeycloakTokenSessionOptions = options(new FakeTransport([]), {
        password: "pw-secret-53",
        refreshToken: "off-secret-52"
      });
      const key: string = keycloakSessionRegistryKey(fields);
      expect(key).toMatch(/^[0-9a-f]{64}$/);
      expect(key).not.toContain("off-secret-52");
      expect(key).not.toContain("pw-secret-53");
      // The derivation of every SDK: the fields joined with NUL, verify_ssl rendered True / False.
      expect(keycloakSessionRegistryKey({ keycloakUrl: "u", realm: "r", clientId: "c" })).toBe(
        keycloakSessionRegistryKey({
          keycloakUrl: "u",
          realm: "r",
          clientId: "c",
          username: "",
          password: "",
          tokenExpirationInS: null,
          verifySsl: true,
          refreshToken: ""
        })
      );
      expect(
        keycloakSessionRegistryKey({ keycloakUrl: "u", realm: "r", clientId: "c", username: "n", password: "p", tokenExpirationInS: 60, verifySsl: false, refreshToken: "t" })
      ).toBe(createHash("sha256").update(["u", "r", "c", "n", "p", "60", "False", "t"].join("\0"), "utf8").digest("hex"));
    });

    it("T54 never hands out a closed session", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([], tokenResponse("acc-1"));
      const first: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      first.session.close();
      const second: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      expect(second.session).not.toBe(first.session);
      expect(second.session.closed).toBe(false);
      // Releasing the stale lease must not drop the live entry.
      first.release();
      const third: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      expect(third.session).toBe(second.session);
      expect(endpoint.requests).toHaveLength(2);
    });

    it("does not cache a failed start-up, and fails every concurrent waiter", async (): Promise<void> => {
      const endpoint: FakeTransport = new FakeTransport([REFUSED], tokenResponse("acc-1"));
      const failures: unknown[] = await Promise.all([
        rejectionOf(acquireKeycloakTokenSession(options(endpoint))),
        rejectionOf(acquireKeycloakTokenSession(options(endpoint)))
      ]);
      expect(failures[0]).toBeInstanceOf(KeycloakAuthenticationError);
      expect(failures[1]).toBe(failures[0]);
      const lease: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpoint));
      expect(lease.session.accessToken).toBe("acc-1");
      expect(endpoint.requests).toHaveLength(2);
    });

    it("scopes sessions: another transport never shares a session", async (): Promise<void> => {
      const endpointA: FakeTransport = new FakeTransport([], tokenResponse("acc-a"));
      const endpointB: FakeTransport = new FakeTransport([], tokenResponse("acc-b"));
      const a: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpointA));
      const b: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpointB));
      expect(b.session).not.toBe(a.session);
      const scope: object = {};
      const c: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpointA), scope);
      const d: KeycloakTokenSessionLease = await acquireKeycloakTokenSession(options(endpointB), scope);
      expect(d.session).toBe(c.session);
    });
  });

  it("exposes the typed errors with their names and causes", (): void => {
    const cause: Error = new Error("root");
    const error: KeycloakAuthenticationError = new KeycloakAuthenticationError("m", { cause });
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("KeycloakAuthenticationError");
    expect(error.cause).toBe(cause);
    expect(new KeycloakAuthenticationError("m").cause).toBeUndefined();
    const transportError: KeycloakTransportError = new KeycloakTransportError("t");
    expect(transportError.name).toBe("KeycloakTransportError");
    expect(transportError.cause).toBeUndefined();
  });
});
