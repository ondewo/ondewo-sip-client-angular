import * as authApi from "./index";

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
    expect(authApi.AUTHORIZATION_HEADER).toBe("authorization");
    expect(authApi.BEARER_PREFIX).toBe("Bearer ");
    expect(authApi.TOKEN_PROVIDER).toBeDefined();
    expect(authApi.KEYCLOAK_TOKEN_PROVIDER_CONFIG).toBeDefined();
    expect(authApi.REFRESH_SKEW_IN_S).toBe(30);
    expect(authApi.MIN_REFRESH_DELAY_IN_S).toBe(1);
  });
});
