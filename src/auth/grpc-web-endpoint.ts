/**
 * Builds the gRPC-web endpoint URL (`host` setting of `@ngx-grpc/grpc-web-client`) from the
 * same `host` / `port` / `useSecureChannel` fields every ONDEWO SDK takes.
 *
 * In a browser the TLS handshake belongs to the user agent: it verifies the server against
 * its own (OS / browser) trust store and presents a client certificate only from the
 * browser's certificate store. Application code can neither add a CA nor attach a client
 * identity, and a private key must never be shipped to a browser. The certificate fields the
 * other SDKs accept (`grpcCert`, `grpcClientCert`, `grpcClientKey`) are therefore refused
 * here instead of being silently dropped.
 */

/** Connection settings for a gRPC-web endpoint (an Envoy / gRPC-web proxy in front of the ONDEWO server). */
export interface GrpcWebEndpointConfig {
  /**
   * Host name or IP address (`nlu.example.com`, `10.0.0.5`, `::1`, `[::1]`), or a complete base
   * URL with scheme (`https://nlu.example.com:8443/grpc`), which is then used as given.
   */
  host: string;
  /** Port; omit it for the scheme's default port. Must be omitted when `host` is a URL. */
  port?: number | string;
  /** `true` (default): `https://`. `false`: plain `http://`, logged as a warning -- never in production. */
  useSecureChannel?: boolean;
}

/**
 * Certificate / key fields of the other ONDEWO SDKs' configs (camelCase and snake_case) that a
 * browser cannot use. A non-empty value in any of them makes {@link buildGrpcWebHost} throw.
 */
export const BROWSER_UNSUPPORTED_TLS_FIELDS: readonly string[] = [
  "grpcCert",
  "grpcClientCert",
  "grpcClientKey",
  "grpc_cert",
  "grpc_client_cert",
  "grpc_client_key"
];

/** Raised for an unusable {@link GrpcWebEndpointConfig}. The message names fields, never their values. */
export class GrpcWebEndpointError extends Error {
  /**
   * @param message a description of the problem that names the offending field.
   */
  public constructor(message: string) {
    super(message);
    this.name = "GrpcWebEndpointError";
  }
}

/** A URL scheme at the start of `host` (`https://…`). */
const SCHEME_PATTERN: RegExp = /^[a-z][a-z0-9+.-]*:\/\//i;

/** A bare IPv6 literal: hex digits, dots (embedded IPv4) and at least two colons. */
const BARE_IPV6_PATTERN: RegExp = /^(?=(?:[^:]*:){2})[0-9a-f:.]+$/i;

/**
 * Return the gRPC-web base URL for `config`: `https://host:port` by default, `http://host:port`
 * when `useSecureChannel` is `false` (with a warning naming `host:port`). A bare IPv6 literal is
 * bracketed (`https://[::1]:8443`); a bracketed host or a host that already carries a scheme is
 * left alone.
 *
 * ```ts
 * GrpcWebClientModule.forRoot({ settings: { host: buildGrpcWebHost({ host: "nlu.example.com", port: 443 }) } })
 * ```
 *
 * @param config the endpoint settings.
 * @returns the base URL to pass as the gRPC-web client's `host` setting.
 * @throws GrpcWebEndpointError when a certificate / key field is set, the host is empty or
 *   carries a port, the port is invalid, or an `http://` URL is combined with
 *   `useSecureChannel: true`.
 */
export function buildGrpcWebHost(config: GrpcWebEndpointConfig): string {
  const fields: Record<string, unknown> = config as unknown as Record<string, unknown>;
  for (const field of BROWSER_UNSUPPORTED_TLS_FIELDS) {
    const value: unknown = fields[field];
    if (value !== undefined && value !== null && value !== "") {
      throw new GrpcWebEndpointError(
        `GrpcWebEndpointConfig.${field} is not supported by a browser gRPC-web client: the browser owns the TLS ` +
          "handshake, trusts its own certificate store and presents a client certificate only from the browser/OS " +
          "store. Remove the field (never ship a private key to a browser); see the README section " +
          "'TLS, mutual TLS and certificates'."
      );
    }
  }

  const host: unknown = config.host;
  if (typeof host !== "string" || host.trim() === "") {
    throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must be a non-empty string");
  }
  const secure: boolean = config.useSecureChannel !== false;

  if (SCHEME_PATTERN.test(host)) {
    if (config.port !== undefined) {
      throw new GrpcWebEndpointError(
        "GrpcWebEndpointConfig.port must be omitted when GrpcWebEndpointConfig.host is a URL; put the port in the URL"
      );
    }
    let url: URL;
    try {
      url = new URL(host);
    } catch {
      throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host is not a valid URL");
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new GrpcWebEndpointError("GrpcWebEndpointConfig.host must use the http:// or https:// scheme");
    }
    if (url.protocol === "http:") {
      if (secure) {
        throw new GrpcWebEndpointError(
          "GrpcWebEndpointConfig.host uses http:// but useSecureChannel is true; use an https:// URL " +
            "or set useSecureChannel: false"
        );
      }
      // URL.host leaves out any user:password@ part, so the warning cannot leak credentials
      warnInsecure(url.host);
    }
    return host;
  }

  let bareHost: string = host;
  if (!host.startsWith("[") && host.includes(":")) {
    if (!BARE_IPV6_PATTERN.test(host)) {
      throw new GrpcWebEndpointError(
        "GrpcWebEndpointConfig.host must not contain a port; set GrpcWebEndpointConfig.port instead"
      );
    }
    bareHost = `[${host}]`;
  }

  let authority: string = bareHost;
  if (config.port !== undefined) {
    const port: number = Number(config.port);
    if (String(config.port).trim() === "" || !Number.isInteger(port) || port < 1 || port > 65535) {
      throw new GrpcWebEndpointError("GrpcWebEndpointConfig.port must be an integer between 1 and 65535");
    }
    authority = `${bareHost}:${port}`;
  }

  if (secure) {
    return `https://${authority}`;
  }
  warnInsecure(authority);
  return `http://${authority}`;
}

/**
 * Warn, through the console the host application already uses, that requests (and bearer
 * tokens) to `authority` travel unencrypted.
 *
 * @param authority the `host:port` the insecure channel targets.
 */
function warnInsecure(authority: string): void {
  console.warn(
    `ONDEWO gRPC-web: insecure http:// endpoint ${authority}; requests and bearer tokens are sent unencrypted. ` +
      "Use useSecureChannel: true (https://) outside local development."
  );
}
