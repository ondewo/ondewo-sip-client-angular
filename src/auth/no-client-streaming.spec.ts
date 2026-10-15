import { Dirent, existsSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";

/**
 * The public API must not expose a method whose REQUEST is a stream, and must expose every other one.
 *
 * gRPC-web, the protocol this library speaks from a browser, carries unary and server-streaming
 * calls only. ngx-grpc nevertheless generated `foo(requestData: Observable<FooRequest>)` for every
 * client-streaming and bidirectional-streaming RPC - a method that type-checks and can never work
 * (5.5.0 shipped `sipStreamCallAudio` that way). ondewo-proto-compiler 5.15.7 omits them, like
 * protoc-gen-grpc-web does for the js and typescript SDKs. Their request and response messages
 * stay exported; every other method stays.
 *
 * The expectations are DERIVED from the `rpc` lines of the pinned ondewo-sip-api protos, so the next
 * API release that adds or removes an RPC moves this spec with it instead of failing the release on a
 * stale hand-written list. Only the cases that motivated it are pinned by name.
 */

/**
 * @param start the directory to start from.
 * @returns the closest ancestor directory holding the Makefile (the repository root).
 */
function findRepoRoot(start: string): string {
  let dir: string = start;
  while (!existsSync(join(dir, "Makefile"))) {
    dir = String(dirname(dir));
  }
  return dir;
}

const REPO_ROOT: string = findRepoRoot(String(__dirname));
const TYPINGS: string = String(readFileSync(join(REPO_ROOT, "index.d.ts"), "utf8"));
/** The protos the codegen compiles (`ondewo-sip-api ondewo`: the api submodule's `ondewo/` tree). */
const PROTO_ROOT: string = join(REPO_ROOT, "src", "ondewo-sip-api", "ondewo");

/** One `rpc` of a proto `service`. */
interface Rpc {
  service: string;
  name: string;
  requestStreaming: boolean;
  request: string;
  response: string;
}

/**
 * @param directory the directory to walk.
 * @returns every `.proto` file below it.
 */
function protoFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry: Dirent): string[] => {
    const absolute: string = join(directory, String(entry.name));
    if (entry.isDirectory()) {
      return protoFiles(absolute);
    }
    return absolute.endsWith(".proto") ? [absolute] : [];
  });
}

/** @returns every rpc of every service of the pinned protos. */
function pinnedRpcs(): Rpc[] {
  if (!existsSync(PROTO_ROOT)) {
    throw new Error(`${PROTO_ROOT} is missing - check out the src/ondewo-sip-api submodule`);
  }
  const rpcs: Rpc[] = [];
  for (const file of protoFiles(PROTO_ROOT)) {
    let service: string = "";
    for (const line of String(readFileSync(file, "utf8")).split("\n")) {
      const declared: RegExpExecArray | null = /^\s*service\s+(\w+)/.exec(line);
      if (declared !== null) {
        service = declared[1];
      }
      const rpc: RegExpExecArray | null =
        /^\s*rpc\s+(\w+)\s*\(\s*(stream\s+)?([\w.]+)\s*\)\s*returns\s*\(\s*(?:stream\s+)?([\w.]+)\s*\)/.exec(line);
      if (rpc !== null) {
        rpcs.push({
          service,
          name: rpc[1],
          requestStreaming: rpc[2] !== undefined,
          request: rpc[3].split(".").slice(-1)[0],
          response: rpc[4].split(".").slice(-1)[0]
        });
      }
    }
  }
  return rpcs;
}

/**
 * @param rpcName the proto rpc name.
 * @returns the method name ngx-grpc generates for it (lower camel case).
 */
function methodName(rpcName: string): string {
  return rpcName.charAt(0).toLowerCase() + rpcName.slice(1);
}

const RPCS: Rpc[] = pinnedRpcs();
const REQUEST_STREAMING: Rpc[] = RPCS.filter((rpc: Rpc): boolean => rpc.requestStreaming);
const CALLABLE: Rpc[] = RPCS.filter((rpc: Rpc): boolean => !rpc.requestStreaming);

describe("public API (index.d.ts) and gRPC-web streaming", (): void => {
  it("reads the rpcs of the pinned protos, including the cases this spec was written for", (): void => {
    expect(REQUEST_STREAMING.map((rpc: Rpc): string => methodName(rpc.name))).toContain("sipStreamCallAudio");
    expect(CALLABLE.map((rpc: Rpc): string => methodName(rpc.name))).toContain("sipGetSipStatus");
  });

  it("exposes no client method whose request is a stream", (): void => {
    const offending: string[] = TYPINGS.split(/\r?\n/).filter((line: string): boolean =>
      /requestData\??\s*:\s*Observable</.test(line)
    );
    expect(offending).toEqual([]);
  });

  it("has no method, plain or $raw, for any client- or bidi-streaming rpc", (): void => {
    const present: string[] = REQUEST_STREAMING.map((rpc: Rpc): string => methodName(rpc.name)).filter(
      (method: string): boolean => new RegExp(`\\b${method}\\s*(\\(|:\\s*\\()\\s*requestData`).test(TYPINGS)
    );
    expect(present).toEqual([]);
  });

  it("still exports the request and response messages of the streaming rpcs", (): void => {
    const missing: string[] = REQUEST_STREAMING.flatMap((rpc: Rpc): string[] => [rpc.request, rpc.response]).filter(
      (message: string): boolean => !new RegExp(`declare class ${message} implements GrpcMessage`).test(TYPINGS)
    );
    expect(missing).toEqual([]);
  });

  it("exposes every other rpc as a method of its service client, plain and $raw", (): void => {
    const missing: string[] = CALLABLE.flatMap((rpc: Rpc): string[] => {
      const method: string = methodName(rpc.name);
      const expected: [string, RegExp][] = [
        [`${rpc.service}Client`, new RegExp(`declare class ${rpc.service}Client\\b`)],
        [`${method}()`, new RegExp(`\\b${method}\\(requestData: [\\w.]+,`)],
        [`$raw.${method}`, new RegExp(`\\b${method}: \\(requestData: [\\w.]+,`)]
      ];
      return expected
        .filter(([, pattern]: [string, RegExp]): boolean => !pattern.test(TYPINGS))
        .map(([label]: [string, RegExp]): string => label);
    });
    expect(missing).toEqual([]);
  });
});
