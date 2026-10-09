import {
  BROWSER_UNSUPPORTED_TLS_FIELDS,
  buildGrpcWebHost,
  GrpcWebEndpointConfig,
  GrpcWebEndpointError
} from "./grpc-web-endpoint";
import * as authApi from "./index";

/**
 * A PEM-shaped value (CRLF line ends); no test may ever see it again in an error or a log line. The
 * armour is split so secret scanners do not flag this fake as a committed key.
 */
const PEM_LABEL: string = ["PRIVATE", "KEY"].join(" ");
const FAKE_PEM: string = `-----BEGIN ${PEM_LABEL}-----\r\nTUFSS0VSLXNlY3JldA==\r\n-----END ${PEM_LABEL}-----\r\n`;

/**
 * Build a config the way untyped JavaScript (or a config shared with the Node SDKs) would, with
 * fields {@link GrpcWebEndpointConfig} does not declare.
 *
 * @param fields the raw config fields.
 * @returns the same object, typed as a config.
 */
function untypedConfig(fields: Record<string, unknown>): GrpcWebEndpointConfig {
  return fields as unknown as GrpcWebEndpointConfig;
}

/**
 * Run `action`, expect it to throw a {@link GrpcWebEndpointError}, and return that error.
 *
 * @param action the call expected to throw.
 * @returns the thrown error.
 */
function captureError(action: () => unknown): GrpcWebEndpointError {
  try {
    action();
  } catch (caught: unknown) {
    expect(caught).toBeInstanceOf(GrpcWebEndpointError);
    return caught as GrpcWebEndpointError;
  }
  throw new Error("expected a GrpcWebEndpointError");
}

/**
 * The browser SDK's share of the ONDEWO TLS contract: https by default, http only on request and
 * with a warning naming host:port, IPv6 bracketing, and a refusal of every certificate / key
 * field a browser cannot use -- without ever echoing a value.
 */
describe("buildGrpcWebHost", (): void => {
  let warn: jest.SpyInstance;

  beforeEach((): void => {
    warn = jest.spyOn(console, "warn").mockImplementation((): void => undefined);
  });

  afterEach((): void => {
    warn.mockRestore();
  });

  /**
   * @returns the message of the first console warning.
   */
  function firstWarning(): string {
    return (warn.mock.calls as string[][])[0][0];
  }

  describe("scheme", (): void => {
    it("uses https by default and does not warn", (): void => {
      expect(buildGrpcWebHost({ host: "nlu.example.com", port: 443 })).toBe("https://nlu.example.com:443");
      expect(warn).not.toHaveBeenCalled();
    });

    it("uses https when useSecureChannel is true", (): void => {
      expect(buildGrpcWebHost({ host: "nlu.example.com", port: "8443", useSecureChannel: true })).toBe(
        "https://nlu.example.com:8443"
      );
    });

    it("uses http when useSecureChannel is false and warns naming host:port", (): void => {
      const url: string = buildGrpcWebHost({ host: "localhost", port: 8080, useSecureChannel: false });

      expect(url).toBe("http://localhost:8080");
      expect(warn).toHaveBeenCalledTimes(1);
      expect(firstWarning()).toContain("localhost:8080");
    });

    it("omits the port when none is given", (): void => {
      expect(buildGrpcWebHost({ host: "nlu.example.com" })).toBe("https://nlu.example.com");
    });
  });

  describe("host forms", (): void => {
    it("brackets a bare IPv6 literal", (): void => {
      expect(buildGrpcWebHost({ host: "::1", port: 50051 })).toBe("https://[::1]:50051");
      expect(buildGrpcWebHost({ host: "2001:db8::10" })).toBe("https://[2001:db8::10]");
      expect(buildGrpcWebHost({ host: "::ffff:127.0.0.1", port: 1 })).toBe("https://[::ffff:127.0.0.1]:1");
    });

    it("leaves a bracketed IPv6 host alone and names it in the insecure warning", (): void => {
      expect(buildGrpcWebHost({ host: "[::1]", port: 8080, useSecureChannel: false })).toBe("http://[::1]:8080");
      expect(firstWarning()).toContain("[::1]:8080");
    });

    it("leaves an IPv4 address alone", (): void => {
      expect(buildGrpcWebHost({ host: "127.0.0.1", port: 8443 })).toBe("https://127.0.0.1:8443");
    });

    it("returns an https URL host unchanged", (): void => {
      expect(buildGrpcWebHost({ host: "https://nlu.example.com:8443/grpc" })).toBe("https://nlu.example.com:8443/grpc");
      expect(buildGrpcWebHost({ host: "HTTPS://nlu.example.com" })).toBe("HTTPS://nlu.example.com");
      expect(warn).not.toHaveBeenCalled();
    });

    it("returns an http URL host unchanged when insecure is requested, warning without credentials", (): void => {
      expect(buildGrpcWebHost({ host: "http://user:s3cret@localhost:8080", useSecureChannel: false })).toBe(
        "http://user:s3cret@localhost:8080"
      );
      expect(warn).toHaveBeenCalledTimes(1);
      expect(firstWarning()).toContain("localhost:8080");
      expect(firstWarning()).not.toContain("s3cret");
    });

    it("refuses an http URL host when a secure channel is requested", (): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "http://localhost:8080" })).message).toContain(
        "useSecureChannel is true"
      );
    });

    it("refuses a port next to a URL host", (): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "https://nlu.example.com", port: 443 })).message).toContain(
        "port must be omitted"
      );
    });

    it("refuses a scheme other than http/https", (): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "ws://nlu.example.com" })).message).toContain(
        "http:// or https://"
      );
    });

    it("refuses a URL host that does not parse", (): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "https://" })).message).toContain("not a valid URL");
    });

    it("refuses a host:port string", (): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "nlu.example.com:443" })).message).toContain(
        "must not contain a port"
      );
    });

    it.each(["", "   "])("refuses an empty host %p", (host: string): void => {
      expect(captureError(() => buildGrpcWebHost({ host })).message).toContain("host must be a non-empty string");
    });

    it("refuses a non-string host from untyped JavaScript", (): void => {
      const config: GrpcWebEndpointConfig = untypedConfig({ host: 42 });
      expect(captureError(() => buildGrpcWebHost(config)).message).toContain("host must be a non-empty string");
    });

    it.each([0, 65536, 1.5, "", "abc", -1])("refuses the port %p", (port: number | string): void => {
      expect(captureError(() => buildGrpcWebHost({ host: "localhost", port })).message).toContain(
        "between 1 and 65535"
      );
    });
  });

  describe("certificate and key fields", (): void => {
    it.each([...BROWSER_UNSUPPORTED_TLS_FIELDS])(
      "refuses %s without echoing its value",
      (field: string): void => {
        const config: GrpcWebEndpointConfig = untypedConfig({ host: "nlu.example.com", [field]: FAKE_PEM });

        const error: GrpcWebEndpointError = captureError(() => buildGrpcWebHost(config));

        expect(error.name).toBe("GrpcWebEndpointError");
        expect(error.message).toContain(`GrpcWebEndpointConfig.${field} is not supported`);
        expect(error.message).toContain("never ship a private key");
        expect(error.message).not.toContain("BEGIN");
        expect(error.message).not.toContain("TUFSS0VSLXNlY3JldA");
      }
    );

    it("refuses half a client pair as well (no partial identity is ever accepted)", (): void => {
      const config: GrpcWebEndpointConfig = untypedConfig({
        host: "nlu.example.com",
        grpcClientCert: FAKE_PEM
      });

      expect(captureError(() => buildGrpcWebHost(config)).message).toContain("grpcClientCert");
    });

    it("refuses an identity on an insecure endpoint before warning", (): void => {
      const config: GrpcWebEndpointConfig = untypedConfig({
        host: "localhost",
        useSecureChannel: false,
        grpcClientKey: FAKE_PEM
      });

      expect(captureError(() => buildGrpcWebHost(config)).message).toContain("grpcClientKey");
      expect(warn).not.toHaveBeenCalled();
    });

    it("treats empty / null certificate fields as unset (plain TLS)", (): void => {
      const config: GrpcWebEndpointConfig = untypedConfig({
        host: "nlu.example.com",
        grpcCert: "",
        grpcClientCert: "",
        grpcClientKey: "",
        grpc_client_key: null
      });

      expect(buildGrpcWebHost(config)).toBe("https://nlu.example.com");
    });

    it("covers the camelCase and snake_case spellings of every certificate field", (): void => {
      expect([...BROWSER_UNSUPPORTED_TLS_FIELDS].sort()).toEqual(
        ["grpcCert", "grpcClientCert", "grpcClientKey", "grpc_cert", "grpc_client_cert", "grpc_client_key"].sort()
      );
    });
  });
});

/** The helper reaches consumers only through the auth barrel the package entry point star-exports. */
describe("auth barrel", (): void => {
  it("re-exports the gRPC-web endpoint helper", (): void => {
    const config: authApi.GrpcWebEndpointConfig = { host: "localhost", port: 443 };

    expect(authApi.buildGrpcWebHost(config)).toBe("https://localhost:443");
    expect(authApi.GrpcWebEndpointError).toBe(GrpcWebEndpointError);
    expect(authApi.BROWSER_UNSUPPORTED_TLS_FIELDS).toBe(BROWSER_UNSUPPORTED_TLS_FIELDS);
  });
});
