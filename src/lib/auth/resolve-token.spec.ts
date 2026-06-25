import { firstValueFrom, Observable, of, Subject, Subscription, throwError } from "rxjs";
import {
  AUTHORIZATION_HEADER,
  BEARER_PREFIX,
  buildBearerValue,
  once,
  resolveBearerValue,
  resolveToken
} from "./resolve-token";

/** A representative (structurally valid-looking) JWT access token used across the cases. */
const TOKEN: string = "eyJhbGciOi.payload.signature";

/**
 * Unit tests for the exported header constants. They are part of the public API
 * (re-exported from the barrel) so their exact values are contract, not detail.
 */
describe("constants", () => {
  /** The header name must be the lower-cased `authorization` (HTTP/2 + gRPC-web metadata convention). */
  it("uses a lower-case authorization header name", (): void => {
    expect(AUTHORIZATION_HEADER).toBe("authorization");
  });

  /** The scheme prefix must be exactly `Bearer ` (note the trailing space) so it concatenates cleanly with a token. */
  it("uses the standard bearer scheme prefix", (): void => {
    expect(BEARER_PREFIX).toBe("Bearer ");
  });
});

/**
 * Unit tests for {@link resolveToken}, which normalizes every shape a
 * `TokenProvider.getToken()` may return (string / null / Promise / Observable)
 * into a single `Observable<string | null>` that emits the usable token once.
 */
describe("resolveToken", () => {
  /** A ready synchronous string token is emitted unchanged. */
  it("resolves a synchronous string token", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(TOKEN))).resolves.toBe(TOKEN);
  });

  /** A `null` token (unauthenticated) is passed through as `null`. */
  it("resolves null when the token is null", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(null))).resolves.toBeNull();
  });

  /** An empty string is not a usable token and must collapse to `null`. */
  it("collapses an empty-string token to null", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(""))).resolves.toBeNull();
  });

  /** A whitespace-only string is not a usable token and must collapse to `null`. */
  it("collapses a whitespace-only token to null", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken("   "))).resolves.toBeNull();
  });

  /** A misbehaving source emitting `undefined` (off-type) must be treated as "no token", not crash. */
  it("collapses an undefined emission from a misbehaving source to null", async (): Promise<void> => {
    // A `TokenResult` source can emit `undefined` at runtime even though the
    // type says `string | null`; it must be treated as "no token", not crash.
    const source: Observable<string | null> = of(undefined as unknown as string | null);
    await expect(firstValueFrom(resolveToken(source))).resolves.toBeNull();
  });

  /** Surrounding whitespace is trimmed from a real token before it is emitted. */
  it("trims surrounding whitespace from a real token", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(`  ${TOKEN}  `))).resolves.toBe(TOKEN);
  });

  /** A `Promise<string>` source resolves to its token. */
  it("resolves a Promise-based token source", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(Promise.resolve(TOKEN)))).resolves.toBe(TOKEN);
  });

  /** A `Promise<null>` source resolves to `null`. */
  it("resolves a Promise that resolves to null", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(Promise.resolve(null)))).resolves.toBeNull();
  });

  /** An `Observable<string>` source emits its token. */
  it("resolves an Observable-based token source", async (): Promise<void> => {
    await expect(firstValueFrom(resolveToken(of(TOKEN)))).resolves.toBe(TOKEN);
  });

  /** An error from a Promise source propagates so an auth failure surfaces rather than being swallowed. */
  it("propagates an error from a Promise token source", async (): Promise<void> => {
    const boom: Error = new Error("token refresh failed");
    await expect(firstValueFrom(resolveToken(Promise.reject(boom)))).rejects.toBe(boom);
  });

  /** An error from an Observable source propagates verbatim. */
  it("propagates an error from an Observable token source", async (): Promise<void> => {
    const boom: Error = new Error("token stream failed");
    await expect(firstValueFrom(resolveToken(throwError(() => boom)))).rejects.toBe(boom);
  });

  /** Unsubscribing from the wrapper must tear down the underlying source subscription (no leak). */
  it("tears down the underlying subscription when the consumer unsubscribes", (): void => {
    const source: Subject<string | null> = new Subject<string | null>();
    const subscription: Subscription = resolveToken(source).subscribe();
    expect(source.observed).toBe(true);
    subscription.unsubscribe();
    expect(source.observed).toBe(false);
  });
});

/**
 * Unit tests for {@link buildBearerValue}, the pure helper that turns a resolved
 * token into the `Authorization` header value (or `null` when absent).
 */
describe("buildBearerValue", () => {
  /** A real token is prefixed with the bearer scheme. */
  it("prefixes a real token with the bearer scheme", (): void => {
    expect(buildBearerValue(TOKEN)).toBe(`${BEARER_PREFIX}${TOKEN}`);
  });

  /** A `null` token yields `null` so no empty `Bearer` header is ever built. */
  it("returns null for a null token", (): void => {
    expect(buildBearerValue(null)).toBeNull();
  });
});

/**
 * Unit tests for {@link resolveBearerValue}, the convenience wrapper that
 * combines {@link resolveToken} and {@link buildBearerValue} into a single
 * observable emitting the ready-to-use header value.
 */
describe("resolveBearerValue", () => {
  /** A present token yields the full `Bearer <token>` header value. */
  it("emits the bearer header value for a present token", async (): Promise<void> => {
    await expect(firstValueFrom(resolveBearerValue(TOKEN))).resolves.toBe(`${BEARER_PREFIX}${TOKEN}`);
  });

  /** No token yields `null`. */
  it("emits null when no token is available", async (): Promise<void> => {
    await expect(firstValueFrom(resolveBearerValue(null))).resolves.toBeNull();
  });

  /** An empty token yields `null`. */
  it("emits null for an empty token", async (): Promise<void> => {
    await expect(firstValueFrom(resolveBearerValue(""))).resolves.toBeNull();
  });

  /** An error from the token source propagates through the wrapper. */
  it("propagates an error from the token source", async (): Promise<void> => {
    const boom: Error = new Error("nope");
    await expect(firstValueFrom(resolveBearerValue(throwError(() => boom)))).rejects.toBe(boom);
  });

  /** Unsubscribing tears down the underlying source subscription (no leak). */
  it("tears down the underlying subscription when the consumer unsubscribes", (): void => {
    const source: Subject<string | null> = new Subject<string | null>();
    const subscription: Subscription = resolveBearerValue(source).subscribe();
    expect(source.observed).toBe(true);
    subscription.unsubscribe();
    expect(source.observed).toBe(false);
  });

  /** A token pushed asynchronously through an `Observable` source is wrapped into the header value. */
  it("emits the bearer value for a token pushed through an Observable source", async (): Promise<void> => {
    const source: Subject<string | null> = new Subject<string | null>();
    const promise: Promise<string | null> = firstValueFrom(resolveBearerValue(source));
    source.next(TOKEN);
    source.complete();
    await expect(promise).resolves.toBe(`${BEARER_PREFIX}${TOKEN}`);
  });
});

/**
 * Unit tests for {@link once}, the tiny `of`-wrapper that emits a single value
 * and completes.
 */
describe("once", () => {
  /** The supplied value is emitted exactly once. */
  it("emits the given value exactly once", async (): Promise<void> => {
    await expect(firstValueFrom(once("value"))).resolves.toBe("value");
  });
});
