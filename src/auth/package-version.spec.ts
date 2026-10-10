import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";

/**
 * The client version is written in four places: the Makefile's `ONDEWO_SIP_VERSION` (the single source),
 * `src/package.json` (the manifest npm publishes), the root `package.json` (the manifest a consumer
 * installing this repository by commit hash reads) and the root `package-lock.json`. `make
 * update_package` stamps all three manifests. It used to stamp only `src/package.json`, and the
 * root manifest silently stayed several releases behind.
 */

/** The parts of a `package.json` / `package-lock.json` this spec reads. */
interface VersionedManifest {
  version?: string;
  packages?: Record<string, { version?: string }>;
}

/**
 * @param start the directory to start from.
 * @returns the closest ancestor directory holding the Makefile (the repository root).
 */
function findRepoRoot(start: string): string {
  let dir: string = start;
  while (!existsSync(join(dir, "Makefile"))) {
    dir = String(dirname(dir));
  }
  return dir;
}

const REPO_ROOT: string = findRepoRoot(String(__dirname));
const MAKEFILE: string = String(readFileSync(join(REPO_ROOT, "Makefile"), "utf8"));

/**
 * @param relativePath the manifest path relative to the repository root.
 * @returns the parsed manifest.
 */
function readManifest(relativePath: string): VersionedManifest {
  return JSON.parse(String(readFileSync(join(REPO_ROOT, relativePath), "utf8"))) as VersionedManifest;
}

/**
 * @param target the Makefile target name.
 * @returns the target's recipe lines that make executes (comment lines dropped).
 */
function recipeCommands(target: string): string[] {
  const lines: string[] = MAKEFILE.split("\n");
  const start: number = lines.findIndex((line: string): boolean => line.startsWith(`${target}:`));
  const commands: string[] = [];
  for (let index: number = start + 1; index < lines.length && lines[index].startsWith("\t"); index += 1) {
    if (!/^\t\s*#/.test(lines[index])) {
      commands.push(lines[index].trim());
    }
  }
  return commands;
}

const MAKEFILE_VERSION: string | undefined = /^ONDEWO_SIP_VERSION=(\S+)$/m.exec(MAKEFILE)?.[1];

describe("package version", (): void => {
  it("is pinned as major.minor.patch in the Makefile", (): void => {
    expect(MAKEFILE_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("keeps src/package.json on the Makefile version", (): void => {
    expect(readManifest("src/package.json").version).toBe(MAKEFILE_VERSION);
  });

  it("keeps the root package.json on the src/package.json version", (): void => {
    expect(readManifest("package.json").version).toBe(readManifest("src/package.json").version);
  });

  it("keeps both root entries of package-lock.json on the root package.json version", (): void => {
    const lock: VersionedManifest = readManifest("package-lock.json");
    const rootVersion: string | undefined = readManifest("package.json").version;
    expect(lock.version).toBe(rootVersion);
    expect(lock.packages?.[""]?.version).toBe(rootVersion);
  });

  it("is stamped into all three manifests by update_package", (): void => {
    const stamped: string[] = recipeCommands("update_package").map(
      (command: string): string => command.split(/\s+/).slice(-1)[0]
    );
    expect(stamped.sort()).toEqual(["package-lock.json", "package.json", "src/package.json"]);
  });

  it("is re-stamped after install_dependencies restores the committed manifests and before npm install", (): void => {
    const commands: string[] = recipeCommands("install_dependencies");
    const restored: number = commands.findIndex((command: string): boolean =>
      command.startsWith("git checkout -- package.json")
    );
    const restamped: number = commands.indexOf("make update_package");
    const installed: number = commands.findIndex((command: string): boolean => command.includes("npm install"));
    expect(restored).toBeGreaterThanOrEqual(0);
    expect(restamped).toBeGreaterThan(restored);
    expect(installed).toBeGreaterThan(restamped);
  });
});
