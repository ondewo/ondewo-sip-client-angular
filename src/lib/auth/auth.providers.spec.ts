import { EnvironmentProviders, Provider } from "@angular/core";
import { GRPC_INTERCEPTORS } from "@ngx-grpc/core";
import { AuthGrpcInterceptor } from "./auth-grpc.interceptor";
import { provideOndewoSipAuth } from "./auth.providers";
import { TOKEN_PROVIDER, TokenProvider, TokenResult } from "./token-provider";

/** A concrete `TokenProvider` the consumer would register. */
class KeycloakTokenProvider implements TokenProvider {
  public getToken(): TokenResult {
    return "token-from-keycloak";
  }
}

/**
 * `makeEnvironmentProviders` wraps the provider array in an opaque
 * `EnvironmentProviders` whose flat list lives under the internal `ɵproviders`
 * field. Reading it lets us assert the exact wiring without bootstrapping a full
 * Angular environment injector (which would need zone.js / TestBed).
 */
function flatten(environmentProviders: EnvironmentProviders): Provider[] {
  return (environmentProviders as unknown as { ɵproviders: Provider[] }).ɵproviders;
}

describe("provideOndewoSipAuth", () => {
  it("registers the supplied TokenProvider class so it is instantiable", () => {
    const providers = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    expect(providers).toContain(KeycloakTokenProvider);
  });

  it("aliases TOKEN_PROVIDER to the supplied implementation via useExisting", () => {
    const providers = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    const tokenBinding = providers.find(
      (provider: Provider): boolean =>
        typeof provider === "object" && provider !== null && "provide" in provider && provider.provide === TOKEN_PROVIDER
    );
    expect(tokenBinding).toEqual({ provide: TOKEN_PROVIDER, useExisting: KeycloakTokenProvider });
  });

  it("registers AuthGrpcInterceptor as a multi GRPC_INTERCEPTORS provider", () => {
    const providers = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    const interceptorBinding = providers.find(
      (provider: Provider): boolean =>
        typeof provider === "object" &&
        provider !== null &&
        "provide" in provider &&
        provider.provide === GRPC_INTERCEPTORS
    );
    expect(interceptorBinding).toEqual({
      provide: GRPC_INTERCEPTORS,
      useClass: AuthGrpcInterceptor,
      multi: true
    });
  });
});
