import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injector, runInInjectionContext } from "@angular/core";
import { firstValueFrom, Observable, of, throwError } from "rxjs";
import { authHttpInterceptor } from "./auth-http.interceptor";
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from "./resolve-token";
import { TOKEN_PROVIDER, TokenProvider, TokenResult } from "./token-provider";

/** A representative JWT-shaped access token used across the cases. */
const TOKEN: string = "header.payload.signature";

/** The expected `Authorization` header value for {@link TOKEN}. */
const BEARER: string = `${BEARER_PREFIX}${TOKEN}`;

/** An arbitrary target URL for the intercepted request (value is irrelevant to the assertions). */
const URL: string = "https://api.example.com/ondewo.sip.Sip/SipStartSession";

/** A `TokenProvider` whose `getToken` returns a caller-supplied value. */
class StubTokenProvider implements TokenProvider {
  /**
   * @param value the {@link TokenResult} every `getToken()` call should return.
   */
  public constructor(private readonly value: TokenResult) {}

  /**
   * @returns the caller-supplied {@link TokenResult}.
   */
  public getToken(): TokenResult {
    return this.value;
  }
}

/** Outcome of one interceptor run: the captured forwarded request and its event stream. */
interface RunResult {
  /** The request actually handed to the `next` handler (throws if `next` was never invoked). */
  forwarded: HttpRequest<unknown>;
  /** The stream of HTTP events produced by the interceptor. */
  events: Observable<HttpEvent<unknown>>;
}

/**
 * Drive {@link authHttpInterceptor} inside an injection context that provides the
 * given `TokenProvider`, capturing the request actually handed to the next
 * handler. The fake `next` echoes a sentinel data event so the stream is
 * observable end-to-end.
 *
 * @param tokenResult the {@link TokenResult} the stubbed provider should return.
 * @param request the outgoing request to push through the interceptor.
 * @returns the {@link RunResult} exposing the forwarded request and event stream.
 */
function run(tokenResult: TokenResult, request: HttpRequest<unknown>): RunResult {
  const injector: Injector = Injector.create({
    providers: [{ provide: TOKEN_PROVIDER, useValue: new StubTokenProvider(tokenResult) }]
  });

  let forwarded: HttpRequest<unknown> | undefined;
  const next: HttpHandlerFn = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
    forwarded = req;
    return of({ type: 0 } as HttpEvent<unknown>);
  };

  const events: Observable<HttpEvent<unknown>> = runInInjectionContext(injector, () =>
    authHttpInterceptor(request, next)
  );
  // `forwarded` is assigned synchronously only for the sync-token paths; the
  // caller awaits `events` before reading it for async paths.
  return {
    get forwarded(): HttpRequest<unknown> {
      if (forwarded === undefined) {
        throw new Error("next handler was not invoked");
      }
      return forwarded;
    },
    events
  };
}

/**
 * Build a bare `GET` request to {@link URL}, optionally seeded with headers.
 *
 * @param headers optional initial headers (e.g. a pre-set `Authorization`).
 * @returns a fresh {@link HttpRequest}.
 */
function newRequest(headers?: HttpHeaders): HttpRequest<unknown> {
  return new HttpRequest("GET", URL, headers === undefined ? undefined : { headers });
}

/**
 * Unit tests for {@link authHttpInterceptor}, the functional Angular HTTP
 * interceptor that attaches the current Keycloak token as a bearer credential.
 */
describe("authHttpInterceptor", () => {
  /** A synchronous token is attached as the `Authorization: Bearer <token>` header. */
  it("attaches the bearer header when a synchronous token is present", async (): Promise<void> => {
    const result: RunResult = run(TOKEN, newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  /** A `null` token leaves the original request object untouched (no header, same reference). */
  it("forwards the original request untouched when the token is null", async (): Promise<void> => {
    const request: HttpRequest<unknown> = newRequest();
    const result: RunResult = run(null, request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  /** An empty-string token is treated as absent: the request is forwarded untouched. */
  it("forwards untouched when the token is an empty string", async (): Promise<void> => {
    const request: HttpRequest<unknown> = newRequest();
    const result: RunResult = run("", request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  /** A `Promise`-based token is resolved before the request is sent. */
  it("resolves a Promise-based token before sending", async (): Promise<void> => {
    const result: RunResult = run(Promise.resolve(TOKEN), newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  /** An `Observable`-based token is resolved before the request is sent. */
  it("resolves an Observable-based token before sending", async (): Promise<void> => {
    const result: RunResult = run(of(TOKEN), newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  /** When an async source resolves to `null`, the request must not be cloned (same reference forwarded). */
  it("does not clone the request when the token source resolves to null", async (): Promise<void> => {
    const request: HttpRequest<unknown> = newRequest();
    const result: RunResult = run(Promise.resolve(null), request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
  });

  /** A caller-supplied `Authorization` header wins: the interceptor neither overwrites it nor calls the provider. */
  it("leaves an explicitly-set Authorization header untouched", async (): Promise<void> => {
    const preset: string = `${BEARER_PREFIX}caller-supplied`;
    const request: HttpRequest<unknown> = newRequest(new HttpHeaders({ [AUTHORIZATION_HEADER]: preset }));
    const result: RunResult = run(TOKEN, request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(preset);
  });

  /** An error from the token source propagates and the request is never sent. */
  it("propagates an error raised by the token source without sending the request", async (): Promise<void> => {
    const boom: Error = new Error("token refresh failed");
    const result: RunResult = run(throwError(() => boom), newRequest());
    await expect(firstValueFrom(result.events)).rejects.toBe(boom);
  });
});
