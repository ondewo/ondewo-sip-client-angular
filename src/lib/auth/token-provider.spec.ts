import { InjectionToken } from "@angular/core";
import { TOKEN_PROVIDER } from "./token-provider";

/**
 * Unit tests for the {@link TOKEN_PROVIDER} dependency-injection token — the
 * single seam through which a consuming application feeds its
 * {@link TokenProvider} implementation into this library.
 */
describe("TOKEN_PROVIDER", () => {
  /**
   * The token must be a real Angular {@link InjectionToken} (so it can be used
   * with `useExisting` / `useValue` / `inject`) and must carry the descriptive,
   * namespaced debug description used to identify it in DI error messages.
   */
  it("is an InjectionToken with a descriptive name", (): void => {
    expect(TOKEN_PROVIDER).toBeInstanceOf(InjectionToken);
    expect(TOKEN_PROVIDER.toString()).toContain("ONDEWO_SIP_TOKEN_PROVIDER");
  });
});
