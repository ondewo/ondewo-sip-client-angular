import { firstValueFrom, of, Subject, throwError } from "rxjs";
import {
  AUTHORIZATION_HEADER,
  BEARER_PREFIX,
  buildBearerValue,
  once,
  resolveBearerValue,
  resolveToken
} from "./resolve-token";

const TOKEN = "eyJhbGciOi.payload.signature";

describe("constants", () => {
  it("uses a lower-case authorization header name", () => {
    expect(AUTHORIZATION_HEADER).toBe("authorization");
  });

  it("uses the standard bearer scheme prefix", () => {
    expect(BEARER_PREFIX).toBe("Bearer ");
  });
});

describe("resolveToken", () => {
  it("resolves a synchronous string token", async () => {
    await expect(firstValueFrom(resolveToken(TOKEN))).resolves.toBe(TOKEN);
  });

  it("resolves null when the token is null", async () => {
    await expect(firstValueFrom(resolveToken(null))).resolves.toBeNull();
  });

  it("collapses an empty-string token to null", async () => {
    await expect(firstValueFrom(resolveToken(""))).resolves.toBeNull();
  });

  it("collapses a whitespace-only token to null", async () => {
    await expect(firstValueFrom(resolveToken("   "))).resolves.toBeNull();
  });

  it("collapses an undefined emission from a misbehaving source to null", async () => {
    // A `TokenResult` source can emit `undefined` at runtime even though the
    // type says `string | null`; it must be treated as "no token", not crash.
    const source = of(undefined as unknown as string | null);
    await expect(firstValueFrom(resolveToken(source))).resolves.toBeNull();
  });

  it("trims surrounding whitespace from a real token", async () => {
    await expect(firstValueFrom(resolveToken(`  ${TOKEN}  `))).resolves.toBe(TOKEN);
  });

  it("resolves a Promise-based token source", async () => {
    await expect(firstValueFrom(resolveToken(Promise.resolve(TOKEN)))).resolves.toBe(TOKEN);
  });

  it("resolves a Promise that resolves to null", async () => {
    await expect(firstValueFrom(resolveToken(Promise.resolve(null)))).resolves.toBeNull();
  });

  it("resolves an Observable-based token source", async () => {
    await expect(firstValueFrom(resolveToken(of(TOKEN)))).resolves.toBe(TOKEN);
  });

  it("propagates an error from a Promise token source", async () => {
    const boom = new Error("token refresh failed");
    await expect(firstValueFrom(resolveToken(Promise.reject(boom)))).rejects.toBe(boom);
  });

  it("propagates an error from an Observable token source", async () => {
    const boom = new Error("token stream failed");
    await expect(firstValueFrom(resolveToken(throwError(() => boom)))).rejects.toBe(boom);
  });

  it("tears down the underlying subscription when the consumer unsubscribes", () => {
    const source = new Subject<string | null>();
    const subscription = resolveToken(source).subscribe();
    expect(source.observed).toBe(true);
    subscription.unsubscribe();
    expect(source.observed).toBe(false);
  });
});

describe("buildBearerValue", () => {
  it("prefixes a real token with the bearer scheme", () => {
    expect(buildBearerValue(TOKEN)).toBe(`${BEARER_PREFIX}${TOKEN}`);
  });

  it("returns null for a null token", () => {
    expect(buildBearerValue(null)).toBeNull();
  });
});

describe("resolveBearerValue", () => {
  it("emits the bearer header value for a present token", async () => {
    await expect(firstValueFrom(resolveBearerValue(TOKEN))).resolves.toBe(`${BEARER_PREFIX}${TOKEN}`);
  });

  it("emits null when no token is available", async () => {
    await expect(firstValueFrom(resolveBearerValue(null))).resolves.toBeNull();
  });

  it("emits null for an empty token", async () => {
    await expect(firstValueFrom(resolveBearerValue(""))).resolves.toBeNull();
  });

  it("propagates an error from the token source", async () => {
    const boom = new Error("nope");
    await expect(firstValueFrom(resolveBearerValue(throwError(() => boom)))).rejects.toBe(boom);
  });

  it("tears down the underlying subscription when the consumer unsubscribes", () => {
    const source = new Subject<string | null>();
    const subscription = resolveBearerValue(source).subscribe();
    expect(source.observed).toBe(true);
    subscription.unsubscribe();
    expect(source.observed).toBe(false);
  });

  it("emits the bearer value for a token pushed through an Observable source", async () => {
    const source = new Subject<string | null>();
    const promise = firstValueFrom(resolveBearerValue(source));
    source.next(TOKEN);
    source.complete();
    await expect(promise).resolves.toBe(`${BEARER_PREFIX}${TOKEN}`);
  });
});

describe("once", () => {
  it("emits the given value exactly once", async () => {
    await expect(firstValueFrom(once("value"))).resolves.toBe("value");
  });
});
