import { InjectionToken } from "@angular/core";
import { TOKEN_PROVIDER } from "./token-provider";

describe("TOKEN_PROVIDER", () => {
  it("is an InjectionToken with a descriptive name", () => {
    expect(TOKEN_PROVIDER).toBeInstanceOf(InjectionToken);
    expect(TOKEN_PROVIDER.toString()).toContain("ONDEWO_SIP_TOKEN_PROVIDER");
  });
});
