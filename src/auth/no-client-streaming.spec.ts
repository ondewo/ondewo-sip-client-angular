import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";

/**
 * The public API must not expose a method whose REQUEST is a stream.
 *
 * gRPC-web, the protocol this library speaks from a browser, carries unary and server-streaming
 * calls only. ngx-grpc nevertheless generated `foo(requestData: Observable<FooRequest>)` for every
 * client-streaming and bidirectional-streaming RPC - a method that type-checks and can never work
 * (5.5.0 shipped `sipStreamCallAudio` that way). ondewo-proto-compiler 5.15.7 omits them, like
 * protoc-gen-grpc-web does for the js and typescript SDKs. Their request and response messages
 * stay exported; every other method stays.
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

/** The client/bidi streaming RPCs of the compiled protos, as ngx-grpc names their methods. */
const REQUEST_STREAMING_METHODS: string[] = ["sipStreamCallAudio"];
/** Their request and response messages, which must stay exported. */
const REQUEST_STREAMING_MESSAGES: string[] = ["SipCallAudioRequest", "SipCallAudioResponse"];
/** A unary method of the same service, which must stay (the sip protos have no server stream). */
const UNARY_METHOD: string = "sipGetSipStatus";

describe("public API (index.d.ts) and gRPC-web streaming", (): void => {
  it("exposes no client method whose request is a stream", (): void => {
    const offending: string[] = TYPINGS.split(/\r?\n/).filter((line: string): boolean =>
      /requestData\??\s*:\s*Observable</.test(line)
    );
    expect(offending).toEqual([]);
  });

  it.each(REQUEST_STREAMING_METHODS)("has no %s method, plain or $raw", (method: string): void => {
    expect(TYPINGS).not.toMatch(new RegExp(`\\b${method}\\s*(\\(|:\\s*\\()\\s*requestData`));
  });

  it.each(REQUEST_STREAMING_MESSAGES)("still exports the message %s", (message: string): void => {
    expect(TYPINGS).toMatch(new RegExp(`declare class ${message} implements GrpcMessage`));
  });

  it("keeps the other methods of the service", (): void => {
    expect(TYPINGS).toMatch(new RegExp(`\\b${UNARY_METHOD}\\(requestData: [\\w.]+,`));
  });
});
