/**
 * Jest configuration for the hand-written Keycloak bearer-auth surface (Angular 20, ESM).
 * Uses jest-preset-angular so Angular/rxjs/@ngx-grpc ESM is transformed correctly; coverage is
 * gated on src/lib/auth only (every generated protobuf/gRPC-web stub is excluded).
 */
const GENERATED_STUB_PATTERNS = [
	"\\.pb\\.ts$", "\\.pbsc\\.ts$", "\\.pbconf\\.ts$", "_pb\\.js$", "_pb\\.ts$",
	"_pb\\.d\\.ts$", ".*ServiceClientPb\\.ts$", "_grpc_web_pb\\.(js|ts|d\\.ts)$",
];
module.exports = {
	preset: "jest-preset-angular",
	setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
	roots: ["<rootDir>/src/lib/auth", "<rootDir>/src/lib/examples"],
	testMatch: ["**/*.spec.ts"],
	moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
	collectCoverage: true,
	coverageDirectory: "<rootDir>/coverage",
	coverageReporters: ["text", "text-summary", "lcov"],
	collectCoverageFrom: ["src/lib/auth/**/*.ts", "!src/lib/auth/**/*.spec.ts"],
	coveragePathIgnorePatterns: ["/node_modules/", "/src/ondewo-sip-api/", "/api/", "\\.spec\\.ts$", ...GENERATED_STUB_PATTERNS],
	coverageThreshold: { global: { branches: 100, functions: 100, lines: 100, statements: 100 } },
};
