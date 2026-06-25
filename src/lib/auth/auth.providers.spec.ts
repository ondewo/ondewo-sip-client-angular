import { EnvironmentProviders, Provider } from "@angular/core";
import { GRPC_INTERCEPTORS } from "@ngx-grpc/core";
import { AuthGrpcInterceptor } from "./auth-grpc.interceptor";
import { provideKeycloakTokenProvider, provideOndewoSipAuth } from "./auth.providers";
import { KEYCLOAK_TOKEN_PROVIDER_CONFIG, KeycloakTokenProviderConfig } from "./keycloak-token-provider";
import { TOKEN_PROVIDER, TokenProvider, TokenResult } from "./token-provider";

/** A concrete `TokenProvider` the consumer would register. */
class KeycloakTokenProvider implements TokenProvider {
  /**
   * @returns a fixed stand-in token (the real implementation would read it from Keycloak).
   */
  public getToken(): TokenResult {
    return "token-from-keycloak";
  }
}

/**
 * `makeEnvironmentProviders` wraps the provider array in an opaque
 * `EnvironmentProviders` whose flat list lives under the internal `ɵproviders`
 * field. Reading it lets us assert the exact wiring without bootstrapping a full
 * Angular environment injector (which would need zone.js / TestBed).
 *
 * @param environmentProviders the opaque providers bundle returned by {@link provideOndewoSipAuth}.
 * @returns the flat list of underlying Angular {@link Provider}s.
 */
function flatten(environmentProviders: EnvironmentProviders): Provider[] {
  return (environmentProviders as unknown as { ɵproviders: Provider[] }).ɵproviders;
}

/**
 * Unit tests for {@link provideOndewoSipAuth}, the DI helper that wires a
 * consumer's `TokenProvider` into the library and registers the gRPC
 * interceptor.
 */
describe("provideOndewoSipAuth", () => {
  /** The supplied provider class is registered directly so Angular can instantiate it. */
  it("registers the supplied TokenProvider class so it is instantiable", (): void => {
    const providers: Provider[] = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    expect(providers).toContain(KeycloakTokenProvider);
  });

  /** `TOKEN_PROVIDER` is aliased to the supplied class via `useExisting` (shared singleton, not a new instance). */
  it("aliases TOKEN_PROVIDER to the supplied implementation via useExisting", (): void => {
    const providers: Provider[] = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    const tokenBinding: Provider | undefined = providers.find(
      (provider: Provider): boolean =>
        typeof provider === "object" &&
        provider !== null &&
        "provide" in provider &&
        provider.provide === TOKEN_PROVIDER
    );
    expect(tokenBinding).toEqual({ provide: TOKEN_PROVIDER, useExisting: KeycloakTokenProvider });
  });

  /** The gRPC interceptor is registered as a `multi` `GRPC_INTERCEPTORS` provider (appended, not replacing others). */
  it("registers AuthGrpcInterceptor as a multi GRPC_INTERCEPTORS provider", (): void => {
    const providers: Provider[] = flatten(provideOndewoSipAuth(KeycloakTokenProvider));
    const interceptorBinding: Provider | undefined = providers.find(
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

/**
 * Unit tests for {@link provideKeycloakTokenProvider}, the DI helper that binds the
 * built-in provider's configuration under {@link KEYCLOAK_TOKEN_PROVIDER_CONFIG}.
 */
describe("provideKeycloakTokenProvider", () => {
  /** A representative config the consumer would pass. */
  const config: KeycloakTokenProviderConfig = {
    keycloakUrl: "https://auth.example.com/auth",
    realm: "ondewo-ccai-platform",
    clientId: "ondewo-nlu-cai-sdk-public",
    refreshToken: "offline-token"
  };

  /** The config is bound to `KEYCLOAK_TOKEN_PROVIDER_CONFIG` via `useValue`. */
  it("binds the config under KEYCLOAK_TOKEN_PROVIDER_CONFIG via useValue", (): void => {
    const providers: Provider[] = flatten(provideKeycloakTokenProvider(config));
    expect(providers).toContainEqual({ provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: config });
  });
});
