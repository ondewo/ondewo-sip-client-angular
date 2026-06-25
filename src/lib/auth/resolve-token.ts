import { from, isObservable, Observable, of, Subscriber, Subscription } from "rxjs";
import { TokenResult } from "./token-provider";

/**
 * The HTTP / gRPC header under which the bearer credential is attached.
 *
 * Lower-case on purpose: gRPC-web metadata keys are case-insensitive but are
 * conventionally lower-cased, and HTTP/2 requires lower-case header names.
 */
export const AUTHORIZATION_HEADER: string = "authorization";

/** The credential scheme prefix prepended to the raw access token. */
export const BEARER_PREFIX: string = "Bearer ";

/**
 * Normalize the value returned by a `TokenProvider.getToken()` call — which may
 * be a `string`, `null`, a `Promise` or an `Observable` — into a single
 * `Observable<string | null>` that emits exactly once.
 *
 * A non-empty token is returned trimmed; `null`, `undefined`, an empty string
 * and a whitespace-only string are all collapsed to `null` so callers have a
 * single "no usable token" signal and never build an empty `Bearer` header.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the usable token, or `null` when absent.
 */
export function resolveToken(result: TokenResult): Observable<string | null> {
  const source: Observable<string | null> = isObservable(result)
    ? result
    : from(Promise.resolve(result));

  return new Observable<string | null>((subscriber: Subscriber<string | null>): (() => void) => {
    const subscription: Subscription = source.subscribe({
      next: (token: string | null): void => subscriber.next(normalizeToken(token)),
      error: (caughtError: unknown): void => subscriber.error(caughtError),
      complete: (): void => subscriber.complete()
    });
    return (): void => subscription.unsubscribe();
  });
}

/**
 * Build the `Authorization` header value for a resolved token, or `null` when
 * the token is absent.
 *
 * @param token a usable token, or `null`.
 * @returns the `"Bearer <token>"` string, or `null` when there is no token.
 */
export function buildBearerValue(token: string | null): string | null {
  return token === null ? null : `${BEARER_PREFIX}${token}`;
}

/**
 * Convenience wrapper: emit the ready-to-use `Authorization` header value, or
 * `null` when no token is available.
 *
 * @param result the raw value returned by `TokenProvider.getToken()`.
 * @returns an observable emitting the bearer header value, or `null`.
 */
export function resolveBearerValue(result: TokenResult): Observable<string | null> {
  return new Observable<string | null>((subscriber: Subscriber<string | null>): (() => void) => {
    const subscription: Subscription = resolveToken(result).subscribe({
      next: (token: string | null): void => subscriber.next(buildBearerValue(token)),
      error: (caughtError: unknown): void => subscriber.error(caughtError),
      complete: (): void => subscriber.complete()
    });
    return (): void => subscription.unsubscribe();
  });
}

/**
 * Collapse every "no usable token" value to `null` and trim a real token.
 *
 * @param token the raw token emitted by the source.
 * @returns the trimmed token, or `null` when empty / whitespace-only / absent.
 */
function normalizeToken(token: string | null | undefined): string | null {
  if (token === null || token === undefined) {
    return null;
  }
  const trimmed: string = token.trim();
  return trimmed.length === 0 ? null : trimmed;
}

/**
 * Wrap a synchronous value as a single-emission observable. Used by callers that
 * want to stay in the observable world without importing `rxjs` `of` directly.
 *
 * @param value the value to emit.
 * @returns an observable emitting `value` once and completing.
 */
export function once<T>(value: T): Observable<T> {
  return of(value);
}
