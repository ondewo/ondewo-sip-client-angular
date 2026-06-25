import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injector, runInInjectionContext } from "@angular/core";
import { firstValueFrom, Observable, of, throwError } from "rxjs";
import { authHttpInterceptor } from "./auth-http.interceptor";
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from "./resolve-token";
import { TOKEN_PROVIDER, TokenProvider, TokenResult } from "./token-provider";

const TOKEN = "header.payload.signature";
const BEARER = `${BEARER_PREFIX}${TOKEN}`;
const URL = "https://api.example.com/ondewo.sip.Sip/SipStartSession";

/** A `TokenProvider` whose `getToken` returns a caller-supplied value. */
class StubTokenProvider implements TokenProvider {
  constructor(private readonly value: TokenResult) {}

  public getToken(): TokenResult {
    return this.value;
  }
}

interface RunResult {
  forwarded: HttpRequest<unknown>;
  events: Observable<HttpEvent<unknown>>;
}

/**
 * Drive `authHttpInterceptor` inside an injection context that provides the
 * given `TokenProvider`, capturing the request actually handed to the next
 * handler. The fake `next` echoes a sentinel data event so the stream is
 * observable end-to-end.
 */
function run(tokenResult: TokenResult, request: HttpRequest<unknown>): RunResult {
  const injector = Injector.create({
    providers: [{ provide: TOKEN_PROVIDER, useValue: new StubTokenProvider(tokenResult) }]
  });

  let forwarded: HttpRequest<unknown> | undefined;
  const next: HttpHandlerFn = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
    forwarded = req;
    return of({ type: 0 } as HttpEvent<unknown>);
  };

  const events = runInInjectionContext(injector, () => authHttpInterceptor(request, next));
  // `forwarded` is assigned synchronously only for the sync-token paths; the
  // caller awaits `events` before reading it for async paths.
  return { get forwarded(): HttpRequest<unknown> {
      if (forwarded === undefined) {
        throw new Error("next handler was not invoked");
      }
      return forwarded;
    }, events };
}

function newRequest(headers?: HttpHeaders): HttpRequest<unknown> {
  return new HttpRequest("GET", URL, headers === undefined ? undefined : { headers });
}

describe("authHttpInterceptor", () => {
  it("attaches the bearer header when a synchronous token is present", async () => {
    const result = run(TOKEN, newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("forwards the original request untouched when the token is null", async () => {
    const request = newRequest();
    const result = run(null, request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  it("forwards untouched when the token is an empty string", async () => {
    const request = newRequest();
    const result = run("", request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  it("resolves a Promise-based token before sending", async () => {
    const result = run(Promise.resolve(TOKEN), newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("resolves an Observable-based token before sending", async () => {
    const result = run(of(TOKEN), newRequest());
    await firstValueFrom(result.events);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("does not clone the request when the token source resolves to null", async () => {
    const request = newRequest();
    const result = run(Promise.resolve(null), request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
  });

  it("leaves an explicitly-set Authorization header untouched", async () => {
    const preset = `${BEARER_PREFIX}caller-supplied`;
    const request = newRequest(new HttpHeaders({ [AUTHORIZATION_HEADER]: preset }));
    const result = run(TOKEN, request);
    await firstValueFrom(result.events);
    expect(result.forwarded).toBe(request);
    expect(result.forwarded.headers.get(AUTHORIZATION_HEADER)).toBe(preset);
  });

  it("propagates an error raised by the token source without sending the request", async () => {
    const boom = new Error("token refresh failed");
    const result = run(throwError(() => boom), newRequest());
    await expect(firstValueFrom(result.events)).rejects.toBe(boom);
  });
});
