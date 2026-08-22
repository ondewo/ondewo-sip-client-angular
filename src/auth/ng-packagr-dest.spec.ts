import { existsSync, readFileSync } from "fs";
import { isAbsolute, relative, resolve } from "path";

/**
 * Layout guard for the hand-written auth surface.
 *
 * ng-packagr removes its configured `dest` directory before tsc compiles the library entry point,
 * so hand-written sources kept under `dest` are deleted before the generated `public-api.ts` that
 * re-exports them is compiled, and the build dies with `TS2307: Cannot find module './lib/auth'`.
 * `dest` is read from the ng-package.json the release build itself uses rather than written out
 * here, so a compiler release that moves the output directory moves this guard with it.
 */

/** Repository root, two levels above `src/auth`. */
const REPO_ROOT: string = resolve(__dirname, "..", "..");

/** Directory mounted into the proto compiler as the angular library source root. */
const LIBRARY_SOURCE_ROOT: string = resolve(REPO_ROOT, "src");

/**
 * ng-package.json candidates in the order `compile-proto-2-angular.sh` resolves them: a copy shipped
 * in the mounted source root wins, and only when none is there does the compiler copy its default.
 */
const NG_PACKAGE_CANDIDATES: string[] = [
  resolve(LIBRARY_SOURCE_ROOT, "ng-package.json"),
  resolve(REPO_ROOT, "ondewo-proto-compiler", "angular", "image-data", "default-lib-files", "ng-package.json")
];

/** The single ng-packagr setting this guard reads. */
interface NgPackageConfig {
  dest?: string;
}

/** Absolute path ng-packagr deletes before compiling, resolved from the configuration in force. */
function resolveNgPackagrDest(): string {
  const configPath: string | undefined = NG_PACKAGE_CANDIDATES.find((candidate: string): boolean =>
    existsSync(candidate)
  );
  if (configPath === undefined) {
    throw new Error(
      `No ng-package.json found; looked in ${NG_PACKAGE_CANDIDATES.join(", ")}. The ondewo-proto-compiler ` +
        "submodule has to be checked out for this guard to read the destination ng-packagr really deletes."
    );
  }
  const config: NgPackageConfig = JSON.parse(readFileSync(configPath, "utf8")) as NgPackageConfig;
  const dest: string | undefined = config.dest;
  if (dest === undefined || dest === "") {
    throw new Error(`${configPath} declares no "dest", so this guard cannot tell which directory is deleted.`);
  }
  return resolve(LIBRARY_SOURCE_ROOT, dest);
}

/** True when `candidate` is `parent` itself or lives underneath it. */
function isInside(parent: string, candidate: string): boolean {
  const relativePath: string = relative(parent, candidate);
  if (relativePath === "") {
    return true;
  }
  return !relativePath.startsWith("..") && !isAbsolute(relativePath);
}

describe("hand-written auth sources vs the ng-packagr output directory", () => {
  /** The barrel the generated public-api re-exports has to survive until tsc runs. */
  it("keeps the hand-written barrel outside the directory ng-packagr deletes", (): void => {
    const barrel: string = resolve(__dirname, "index.ts");
    expect(existsSync(barrel)).toBe(true);

    const dest: string = resolveNgPackagrDest();
    expect(isInside(dest, __dirname)).toBe(false);
    expect(isInside(dest, barrel)).toBe(false);
  });
});
