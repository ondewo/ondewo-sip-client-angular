import * as authApi from "./index";
import * as providerModule from "./keycloak-token-provider";

/**
 * Unit tests guarding the public API barrel (`./index`). They lock the exported
 * surface so an accidental rename or dropped re-export of any hand-written auth
 * symbol is caught at test time rather than by a downstream consumer.
 */
describe("auth public API barrel", () => {
  /** Every hand-written auth symbol (interceptors, provider helper, token helpers, constants, DI token) must be re-exported. */
  it("re-exports the full hand-written auth surface", (): void => {
    expect(typeof authApi.authHttpInterceptor).toBe("function");
    expect(typeof authApi.AuthGrpcInterceptor).toBe("function");
    expect(typeof authApi.provideOndewoSipAuth).toBe("function");
    expect(typeof authApi.provideKeycloakTokenProvider).toBe("function");
    expect(typeof authApi.KeycloakTokenProvider).toBe("function");
    expect(typeof authApi.KeycloakAuthenticationError).toBe("function");
    expect(typeof authApi.resolveToken).toBe("function");
    expect(typeof authApi.resolveBearerValue).toBe("function");
    expect(typeof authApi.buildBearerValue).toBe("function");
    expect(authApi.AUTHORIZATION_HEADER).toBe("Authorization");
    expect(authApi.BEARER_PREFIX).toBe("Bearer ");
    expect(authApi.TOKEN_PROVIDER).toBeDefined();
    expect(authApi.KEYCLOAK_TOKEN_PROVIDER_CONFIG).toBeDefined();
    expect(authApi.REFRESH_SKEW_IN_S).toBe(30);
    expect(authApi.MIN_REFRESH_DELAY_IN_S).toBe(1);
  });

  /** The framework-free session core, its registry and its constants are public too. */
  it("re-exports the Keycloak session core with the constants of every ONDEWO SDK", (): void => {
    expect(typeof authApi.KeycloakTokenSession.create).toBe("function");
    expect(typeof authApi.acquireKeycloakTokenSession).toBe("function");
    expect(typeof authApi.backoffDelayInS).toBe("function");
    expect(typeof authApi.keycloakSessionRegistryKey).toBe("function");
    expect(typeof authApi.KeycloakTransportError).toBe("function");
    expect(typeof authApi.redactSecret).toBe("function");
    expect(typeof authApi.CONSOLE_KEYCLOAK_LOGGER.warn).toBe("function");
    expect(typeof authApi.GLOBAL_KEYCLOAK_SCHEDULER.setTimeout).toBe("function");
    expect(authApi.DEFAULT_KEYCLOAK_TIMINGS.expiryLeewayInS).toBe(30);
    expect(authApi.HTTP_TIMEOUT_IN_S).toBe(10);
    expect(authApi.MAX_ERROR_BODY_CHARS).toBe(500);
    expect(authApi.MAX_REFRESH_RETRY_EXPONENT).toBe(6);
    expect(authApi.REFRESH_RETRY_BASE_DELAY_IN_S).toBe(5);
    expect(authApi.REFRESH_RETRY_MAX_DELAY_IN_S).toBe(300);
    expect(authApi.REDACTED).toBe("***REDACTED***");
  });

  /** The constants keycloak-token-provider.ts exported before the core moved out stay importable from it. */
  it("keeps the constants exported from the provider module", (): void => {
    expect(providerModule.KeycloakAuthenticationError).toBe(authApi.KeycloakAuthenticationError);
    expect(providerModule.MAX_REFRESH_RETRY_EXPONENT).toBe(6);
    expect(providerModule.REFRESH_RETRY_BASE_DELAY_IN_S).toBe(5);
    expect(providerModule.REFRESH_RETRY_MAX_DELAY_IN_S).toBe(300);
    expect(providerModule.MIN_REFRESH_DELAY_IN_S).toBe(1);
    expect(providerModule.REFRESH_SKEW_IN_S).toBe(30);
  });

  /** The runtime-configuration and on-demand-renewal entry points are part of the public surface. */
  it("exposes configure() and ensureFreshToken() on KeycloakTokenProvider", (): void => {
    expect(typeof authApi.KeycloakTokenProvider.prototype.configure).toBe("function");
    expect(typeof authApi.KeycloakTokenProvider.prototype.ensureFreshToken).toBe("function");
  });
});
