import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting, TestRequest } from "@angular/common/http/testing";
import { EnvironmentProviders, NgZone, Provider } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  KEYCLOAK_TOKEN_PROVIDER_CONFIG,
  KeycloakTokenProvider,
  KeycloakTokenProviderConfig
} from "./keycloak-token-provider";
import { KeycloakLogger } from "./keycloak-token-session";

/** The token endpoint of {@link CONFIG}. */
const TOKEN_ENDPOINT: string = "https://auth.example.com/auth/realms/ondewo/protocol/openid-connect/token";

/** A logger that swallows every line. */
const LOGGER: KeycloakLogger = {
  warn: (): void => undefined,
  info: (): void => undefined,
  debug: (): void => undefined
};

/** A password-grant configuration. */
const CONFIG: KeycloakTokenProviderConfig = {
  keycloakUrl: "https://auth.example.com/auth",
  realm: "ondewo",
  clientId: "ondewo-nlu-cai-sdk-public",
  username: "technical-user@example.com",
  password: "s3cret",
  randomFraction: (): number => 0,
  logger: LOGGER
};

/** The provider under test and its HTTP mock. */
interface SetupResult {
  /** The provider built through DI. */
  provider: KeycloakTokenProvider;
  /** The HTTP testing backend. */
  httpMock: HttpTestingController;
}

/**
 * @param config the configuration to register, or `null` for none.
 * @returns the provider and its HTTP mock.
 */
function setup(config: KeycloakTokenProviderConfig | null): SetupResult {
  const providers: (Provider | EnvironmentProviders)[] = [provideHttpClient(), provideHttpClientTesting()];
  if (config !== null) {
    providers.push({ provide: KEYCLOAK_TOKEN_PROVIDER_CONFIG, useValue: config });
  }
  TestBed.configureTestingModule({ providers });
  return { provider: TestBed.inject(KeycloakTokenProvider), httpMock: TestBed.inject(HttpTestingController) };
}

/**
 * @param request the pending token request.
 * @param accessToken the access token to hand out.
 * @param expiresIn the lifetime in seconds.
 */
function flushToken(request: TestRequest, accessToken: string, expiresIn: number = 300): void {
  request.flush(JSON.stringify({ access_token: accessToken, refresh_token: "refresh-1", expires_in: expiresIn }));
}

/**
 * The Angular-zone behaviour this SDK's KeycloakTokenProvider had before it was aligned with every
 * ONDEWO SDK, kept: the background refresh timer is armed outside Angular.
 */
describe("KeycloakTokenProvider in the Angular zone", (): void => {
  beforeEach((): void => {
    jest.useFakeTimers();
  });

  afterEach((): void => {
    TestBed.resetTestingModule();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("arms the background refresh timer outside Angular and still refreshes", async (): Promise<void> => {
    const result: SetupResult = setup(CONFIG);
    const zone: NgZone = TestBed.inject(NgZone);
    const outside: jest.SpyInstance = jest.spyOn(zone, "runOutsideAngular");
    flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), "access-1", 60);
    await result.provider.whenReady();
    expect(outside).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(30_000);
    flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), "access-2", 60);
    await jest.advanceTimersByTimeAsync(0);
    expect(result.provider.getToken()).toBe("access-2");
    expect(outside).toHaveBeenCalledTimes(2);
  });

  it("disarms the timer it armed outside Angular when the login is released", async (): Promise<void> => {
    const result: SetupResult = setup(CONFIG);
    flushToken(result.httpMock.expectOne(TOKEN_ENDPOINT), "access-1", 60);
    await result.provider.whenReady();
    expect(jest.getTimerCount()).toBe(1);
    result.provider.ngOnDestroy();
    expect(jest.getTimerCount()).toBe(0);
    await jest.advanceTimersByTimeAsync(120_000);
    result.httpMock.expectNone(TOKEN_ENDPOINT);
  });
});
