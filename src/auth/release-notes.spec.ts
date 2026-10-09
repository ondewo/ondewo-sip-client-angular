import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";

/**
 * The GitHub release body is sliced out of RELEASE.md by the Makefile's `CURRENT_RELEASE_NOTES`:
 * `perl -ne 'print if /Release ONDEWO SIP Angular Client ${ONDEWO_SIP_VERSION}/../^\*{5}/'`.
 *
 * The slice starts at the heading naming the version and ends at the next `*****` line. A heading
 * spelled any other way gives an EMPTY slice, and `gh release create -n ""` then publishes a release
 * without notes and without an error; a section without its closing separator runs into the next
 * release's notes.
 */

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
const RELEASE_NOTES: string = String(readFileSync(join(REPO_ROOT, "RELEASE.md"), "utf8"));
const MAKEFILE: string = String(readFileSync(join(REPO_ROOT, "Makefile"), "utf8"));
const SLICE_START: string = "Release ONDEWO SIP Angular Client";
const HEADING_PREFIX: string = `## ${SLICE_START} `;
const LINES: string[] = RELEASE_NOTES.split(/\r?\n/);

/**
 * Reproduce the Makefile's perl range for `version`.
 *
 * @param version the release version.
 * @returns the sliced lines, heading and closing separator included; empty when no heading matches.
 */
function releaseNotesSlice(version: string): string[] {
  const start: number = LINES.findIndex((line: string): boolean => line.includes(`${SLICE_START} ${version}`));
  if (start < 0) {
    return [];
  }
  let end: number = start + 1;
  while (end < LINES.length && !/^\*{5}/.test(LINES[end])) {
    end += 1;
  }
  return LINES.slice(start, end + 1);
}

describe("RELEASE.md release notes", (): void => {
  it("is sliced by the Makefile with the heading and separator pinned here", (): void => {
    expect(MAKEFILE).toContain(
      "perl -ne 'print if /Release ONDEWO SIP Angular Client " + "${ONDEWO_SIP_VERSION}/../^\\*{5}/'"
    );
  });

  it("spells every release heading the way the Makefile slices it", (): void => {
    const headings: string[] = LINES.filter((line: string): boolean => /^#+ .*release/i.test(line)).slice(1);

    expect(LINES[0]).toBe("# Release History");
    expect(headings.length).toBeGreaterThan(0);
    const pattern: RegExp = /^## Release ONDEWO SIP Angular Client \d+\.\d+\.\d+$/;
    expect(headings.filter((line: string): boolean => !pattern.test(line))).toEqual([]);
  });

  it("closes every section with a ***** separator before the next heading", (): void => {
    const unclosed: string[] = [];
    let open: string | null = null;
    for (const line of LINES) {
      if (line.startsWith(HEADING_PREFIX)) {
        if (open !== null) {
          unclosed.push(open);
        }
        open = line;
      } else if (/^\*{5}/.test(line)) {
        open = null;
      }
    }
    if (open !== null) {
      unclosed.push(open);
    }

    expect(unclosed).toEqual([]);
  });

  it("has one section per version", (): void => {
    const versions: string[] = LINES.filter((line: string): boolean => line.startsWith(HEADING_PREFIX)).map(
      (line: string): string => line.slice(HEADING_PREFIX.length)
    );

    const duplicates: string[] = versions.filter(
      (version: string, index: number): boolean => versions.indexOf(version) !== index
    );
    expect(duplicates).toEqual([]);
  });

  it("has non-empty notes for the version the Makefile releases", (): void => {
    const match: RegExpMatchArray | null = /^ONDEWO_SIP_VERSION\s*=\s*(\S+)\s*$/m.exec(MAKEFILE);
    const version: string = match?.[1] ?? "";
    const slice: string[] = releaseNotesSlice(version);
    const body: string[] = slice.slice(1, -1).filter((line: string): boolean => line.trim() !== "");

    expect(version).not.toBe("");
    expect(slice[0]).toBe(`${HEADING_PREFIX}${version}`);
    expect(slice[slice.length - 1]).toMatch(/^\*{5}/);
    expect(body.length).toBeGreaterThan(0);
  });

  it("keeps src/RELEASE.md (the copy the build publishes from) identical to RELEASE.md", (): void => {
    expect(String(readFileSync(join(REPO_ROOT, "src", "RELEASE.md"), "utf8"))).toBe(RELEASE_NOTES);
  });
});
