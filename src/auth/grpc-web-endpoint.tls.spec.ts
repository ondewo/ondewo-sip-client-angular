import { execFileSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { createServer, request, Server } from "https";
import { AddressInfo } from "net";
import { tmpdir } from "os";
import { join } from "path";
import { buildGrpcWebHost } from "./grpc-web-endpoint";

/**
 * Real TLS handshakes against the URL {@link buildGrpcWebHost} builds.
 *
 * In a browser the handshake itself belongs to the user agent, so what the SDK controls is the
 * URL: these tests prove that the https URL it builds (incl. a bracketed IPv6 literal) reaches a
 * real TLS endpoint that is verified against the trusted CA, and that a server demanding a client
 * certificate refuses a client that has none (the browser must present one from its own store).
 * Node's TLS stack stands in for the browser's trust store. The PKI is generated at test time
 * with the openssl CLI; no key is committed. Without openssl the suite is skipped.
 */

/** Whether the openssl CLI is available to build the test PKI. */
function hasOpenssl(): boolean {
  try {
    execFileSync("openssl", ["version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/** PEM material of the in-test PKI. */
interface TestPki {
  ca: string;
  otherCa: string;
  serverCert: string;
  serverKey: string;
  clientCert: string;
  clientKey: string;
}

/**
 * Generate a CA, a second unrelated CA, and a server certificate for localhost / 127.0.0.1 / ::1.
 *
 * @param dir a scratch directory.
 * @returns the PEMs.
 */
function createPki(dir: string): TestPki {
  const openssl: (args: string[]) => void = (args: string[]): void => {
    execFileSync("openssl", args, { cwd: dir, stdio: "ignore" });
  };
  const ec: string[] = ["-newkey", "ec", "-pkeyopt", "ec_paramgen_curve:prime256v1", "-nodes"];
  openssl(["req", "-x509", ...ec, "-days", "2", "-subj", "/CN=Test CA", "-keyout", "ca.key", "-out", "ca.pem"]);
  openssl(["req", "-x509", ...ec, "-days", "2", "-subj", "/CN=Other CA", "-keyout", "other.key", "-out", "other.pem"]);
  writeFileSync(
    join(dir, "server.ext"),
    "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1\nextendedKeyUsage=serverAuth\n"
  );
  openssl(["req", ...ec, "-subj", "/CN=localhost", "-keyout", "server.key", "-out", "server.csr"]);
  openssl([
    "x509",
    "-req",
    "-in",
    "server.csr",
    "-CA",
    "ca.pem",
    "-CAkey",
    "ca.key",
    "-CAcreateserial",
    "-days",
    "2",
    "-extfile",
    "server.ext",
    "-out",
    "server.pem"
  ]);
  writeFileSync(join(dir, "client.ext"), "extendedKeyUsage=clientAuth\n");
  openssl(["req", ...ec, "-subj", "/CN=test-client", "-keyout", "client.key", "-out", "client.csr"]);
  openssl([
    "x509",
    "-req",
    "-in",
    "client.csr",
    "-CA",
    "ca.pem",
    "-CAkey",
    "ca.key",
    "-CAcreateserial",
    "-days",
    "2",
    "-extfile",
    "client.ext",
    "-out",
    "client.pem"
  ]);
  const read: (name: string) => string = (name: string): string => String(readFileSync(join(dir, name), "utf8"));
  return {
    ca: read("ca.pem"),
    otherCa: read("other.pem"),
    serverCert: read("server.pem"),
    serverKey: read("server.key"),
    clientCert: read("client.pem"),
    clientKey: read("client.key")
  };
}

/**
 * Start an https server answering 200 on `bindHost`.
 *
 * @param pki the PKI.
 * @param bindHost the address to listen on.
 * @param requireClientCert whether the server demands a client certificate signed by the CA.
 * @returns the listening server.
 */
async function startServer(pki: TestPki, bindHost: string, requireClientCert: boolean): Promise<Server> {
  const server: Server = createServer(
    { cert: pki.serverCert, key: pki.serverKey, ca: pki.ca, requestCert: requireClientCert, rejectUnauthorized: true },
    (_req: IncomingMessage, res: ServerResponse): void => {
      res.end("ok");
    }
  );
  await new Promise<void>((resolve: () => void, reject: (reason: unknown) => void): void => {
    server.once("error", reject);
    server.listen(0, bindHost, resolve);
  });
  return server;
}

/** TLS settings of one test request. */
interface GetOptions {
  /** PEM of the CA to trust. */
  ca: string;
  /** The name to verify instead of the URL's host (SNI and certificate check). */
  servername?: string;
  /** Client certificate PEM (what a browser would take from its certificate store). */
  cert?: string;
  /** Client key PEM. */
  key?: string;
}

/**
 * GET `url` and resolve with the HTTP status, or reject with the TLS error.
 *
 * @param url the URL to request.
 * @param options the TLS settings.
 * @returns the HTTP status code.
 */
async function get(url: string, options: GetOptions): Promise<number> {
  return new Promise<number>((resolve: (status: number) => void, reject: (reason: unknown) => void): void => {
    const req: ReturnType<typeof request> = request(url, { ...options, agent: false }, (res: IncomingMessage): void => {
      res.resume();
      resolve(Number(res.statusCode ?? 0));
    });
    req.on("error", reject);
    req.end();
  });
}

/**
 * Whether the host can bind the IPv6 loopback.
 *
 * @param pki the PKI.
 * @returns `true` when `::1` is usable.
 */
async function ipv6Available(pki: TestPki): Promise<boolean> {
  try {
    const server: Server = await startServer(pki, "::1", false);
    server.close();
    return true;
  } catch {
    return false;
  }
}

let describeTls: jest.Describe = describe.skip;
if (hasOpenssl()) {
  describeTls = describe;
}

describeTls("buildGrpcWebHost against a real TLS endpoint", (): void => {
  let dir: string;
  let pki: TestPki;
  const servers: Server[] = [];

  beforeAll((): void => {
    dir = mkdtempSync(join(tmpdir(), "ondewo-tls-"));
    pki = createPki(dir);
  });

  afterAll((): void => {
    rmSync(dir, { recursive: true, force: true });
  });

  afterEach((): void => {
    for (const server of servers.splice(0)) {
      server.close();
    }
  });

  /**
   * @param bindHost the address to listen on.
   * @param requireClientCert whether a client certificate is demanded.
   * @returns the port the server listens on.
   */
  async function serve(bindHost: string, requireClientCert: boolean = false): Promise<number> {
    const server: Server = await startServer(pki, bindHost, requireClientCert);
    servers.push(server);
    return Number((server.address() as AddressInfo).port);
  }

  it("completes the handshake with the trusted CA (plain TLS)", async (): Promise<void> => {
    const port: number = await serve("127.0.0.1");

    await expect(get(buildGrpcWebHost({ host: "localhost", port }), { ca: pki.ca })).resolves.toBe(200);
  });

  it("completes the handshake with a CRLF CA PEM", async (): Promise<void> => {
    const port: number = await serve("127.0.0.1");

    const crlfCa: string = pki.ca.replace(/\n/g, "\r\n");

    await expect(get(buildGrpcWebHost({ host: "localhost", port }), { ca: crlfCa })).resolves.toBe(200);
  });

  it("fails the handshake, without crashing, when the server is signed by an unrelated CA", async (): Promise<void> => {
    const port: number = await serve("127.0.0.1");

    await expect(get(buildGrpcWebHost({ host: "localhost", port }), { ca: pki.otherCa })).rejects.toMatchObject({
      code: expect.stringMatching(
        /SELF_SIGNED_CERT_IN_CHAIN|UNABLE_TO_VERIFY_LEAF_SIGNATURE|UNABLE_TO_GET_ISSUER_CERT/
      ) as unknown
    });
  });

  it("is refused by a server that requires a client certificate when none is presented", async (): Promise<void> => {
    const port: number = await serve("127.0.0.1", true);
    const url: string = buildGrpcWebHost({ host: "localhost", port });

    await expect(get(url, { ca: pki.ca })).rejects.toHaveProperty("message");
    // control: the same server accepts a client identity signed by its CA (mutual TLS) ...
    await expect(get(url, { ca: pki.ca, cert: pki.clientCert, key: pki.clientKey })).resolves.toBe(200);
  });

  it("reaches a bracketed IPv6 endpoint built from a bare ::1", async (): Promise<void> => {
    if (!(await ipv6Available(pki))) {
      console.warn("IPv6 loopback unavailable; skipping the ::1 handshake");
      return;
    }
    const port: number = await serve("::1");
    const url: string = buildGrpcWebHost({ host: "::1", port });

    expect(url).toBe(`https://[::1]:${port}`);
    // Node's certificate check matches "::1" against the expanded IP SAN as a string and fails, so the
    // name is checked against the DNS SAN instead; the connection still goes to the bracketed literal.
    await expect(get(url, { ca: pki.ca, servername: "localhost" })).resolves.toBe(200);
  });
});
