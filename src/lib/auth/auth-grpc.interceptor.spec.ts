import { GrpcEvent, GrpcMessage, GrpcRequest } from "@ngx-grpc/common";
import { GrpcHandler } from "@ngx-grpc/core";
import { firstValueFrom, Observable, of, throwError } from "rxjs";
import { AuthGrpcInterceptor } from "./auth-grpc.interceptor";
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from "./resolve-token";
import { TokenProvider, TokenResult } from "./token-provider";

const TOKEN = "header.payload.signature";
const BEARER = `${BEARER_PREFIX}${TOKEN}`;

/** A `TokenProvider` whose `getToken` returns a caller-supplied value. */
class StubTokenProvider implements TokenProvider {
  constructor(private readonly value: TokenResult) {}

  public getToken(): TokenResult {
    return this.value;
  }
}

/** Minimal stand-in for `@ngx-grpc`'s `GrpcMetadata` (set/has/get over a map). */
class FakeMetadata {
  private readonly map = new Map<string, string>();

  constructor(initial?: Record<string, string>) {
    if (initial !== undefined) {
      for (const key of Object.keys(initial)) {
        this.map.set(key, initial[key]);
      }
    }
  }

  public set(name: string, value: string): void {
    this.map.set(name, value);
  }

  public has(name: string): boolean {
    return this.map.has(name);
  }

  public get(name: string): string | undefined {
    return this.map.get(name);
  }
}

const SENTINEL = { sentinel: true } as unknown as GrpcEvent<GrpcMessage>;

interface RunResult {
  metadata: FakeMetadata;
  events: Observable<GrpcEvent<GrpcMessage>>;
  handled: () => GrpcRequest<GrpcMessage, GrpcMessage>;
}

/**
 * Build a request carrying the given metadata, run it through the interceptor
 * with a `next` handler that records the request it received and emits a
 * sentinel event.
 */
function run(tokenResult: TokenResult, metadata: FakeMetadata): RunResult {
  const interceptor = new AuthGrpcInterceptor(new StubTokenProvider(tokenResult));
  const request = { requestMetadata: metadata } as unknown as GrpcRequest<GrpcMessage, GrpcMessage>;

  let handledRequest: GrpcRequest<GrpcMessage, GrpcMessage> | undefined;
  const next = {
    handle: (req: GrpcRequest<GrpcMessage, GrpcMessage>): Observable<GrpcEvent<GrpcMessage>> => {
      handledRequest = req;
      return of(SENTINEL);
    }
  } as unknown as GrpcHandler;

  const events = interceptor.intercept(request, next);
  return {
    metadata,
    events,
    handled: (): GrpcRequest<GrpcMessage, GrpcMessage> => {
      if (handledRequest === undefined) {
        throw new Error("next handler was not invoked");
      }
      return handledRequest;
    }
  };
}

describe("AuthGrpcInterceptor", () => {
  it("sets the bearer metadata when a synchronous token is present", async () => {
    const result = run(TOKEN, new FakeMetadata());
    await firstValueFrom(result.events);
    expect(result.metadata.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("emits the downstream event from the next handler", async () => {
    const result = run(TOKEN, new FakeMetadata());
    await expect(firstValueFrom(result.events)).resolves.toBe(SENTINEL);
  });

  it("leaves metadata untouched when the token is null", async () => {
    const result = run(null, new FakeMetadata());
    await firstValueFrom(result.events);
    expect(result.metadata.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  it("leaves metadata untouched when the token is an empty string", async () => {
    const result = run("", new FakeMetadata());
    await firstValueFrom(result.events);
    expect(result.metadata.has(AUTHORIZATION_HEADER)).toBe(false);
  });

  it("resolves a Promise-based token before delegating", async () => {
    const result = run(Promise.resolve(TOKEN), new FakeMetadata());
    await firstValueFrom(result.events);
    expect(result.metadata.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("resolves an Observable-based token before delegating", async () => {
    const result = run(of(TOKEN), new FakeMetadata());
    await firstValueFrom(result.events);
    expect(result.metadata.get(AUTHORIZATION_HEADER)).toBe(BEARER);
  });

  it("leaves an existing authorization entry untouched and skips the token provider", async () => {
    const preset = `${BEARER_PREFIX}caller-supplied`;
    const provider = new StubTokenProvider(TOKEN);
    const getTokenSpy = jest.spyOn(provider, "getToken");
    const interceptor = new AuthGrpcInterceptor(provider);
    const metadata = new FakeMetadata({ [AUTHORIZATION_HEADER]: preset });
    const request = { requestMetadata: metadata } as unknown as GrpcRequest<GrpcMessage, GrpcMessage>;
    const next = { handle: (): Observable<GrpcEvent<GrpcMessage>> => of(SENTINEL) } as unknown as GrpcHandler;

    await firstValueFrom(interceptor.intercept(request, next));

    expect(metadata.get(AUTHORIZATION_HEADER)).toBe(preset);
    expect(getTokenSpy).not.toHaveBeenCalled();
  });

  it("propagates an error raised by the token source without delegating", async () => {
    const boom = new Error("token refresh failed");
    const result = run(throwError(() => boom), new FakeMetadata());
    await expect(firstValueFrom(result.events)).rejects.toBe(boom);
  });
});
