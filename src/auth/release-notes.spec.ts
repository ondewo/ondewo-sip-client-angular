import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";

/**
 * The GitHub release body is sliced out of RELEASE.md by the Makefile's `CURRENT_RELEASE_NOTES`:
 * `perl -ne 'print if /^\#+ Release ONDEWO SIP Angular Client \Q${ONDEWO_SIP_VERSION}\E$$/../^\*{5}/'`.
 *
 * The slice starts at the heading that names EXACTLY the version (anchored at both ends, the dots
 * escaped by \Q..\E, so 19.1.0 or 9x1.0 never match 9.1.0) and ends at the next `*****` line. A
 * heading spelled any other way gives an EMPTY slice, which release_preflight and build_gh_release
 * refuse; a section without its closing separator runs into the next release's notes.
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
  const start: number = LINES.findIndex(
    (line: string): boolean => /^#+ /.test(line) && line.replace(/^#+ /, "") === `${SLICE_START} ${version}`
  );
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
      "perl -ne 'print if /^\\#+ Release ONDEWO SIP Angular Client \\Q" + "${ONDEWO_SIP_VERSION}\\E$$/../^\\*{5}/'"
    );
  });

  /**
   * Runs the Makefile's own RELEASE_NOTES_BODY program (make's escapes resolved) against a fixture,
   * so the anchoring is proven on the expression the release executes, not on a copy of it.
   */
  it("selects only the exactly-named, non-empty section with the Makefile expression", (): void => {
    const definition: string = /^RELEASE_NOTES_BODY=perl -ne '(.*)'$/m.exec(MAKEFILE)?.[1] ?? "";
    expect(definition).not.toBe("");
    const fixture: string = [
      "# Release History",
      "## Release ONDEWO SIP Angular Client 19.1.0",
      "wrong: 19.1.0",
      "prose, not a heading: Release ONDEWO SIP Angular Client 9.2.0",
      "*****",
      "## Release ONDEWO SIP Angular Client 9x1.0",
      "wrong: dots are wildcards",
      "*****",
      "## Release ONDEWO SIP Angular Client 9.1.0-rc1",
      "wrong: not anchored at the end",
      "*****",
      "## Release ONDEWO SIP Angular Client 9.1.0",
      "",
      "right",
      "*****",
      "## Release ONDEWO SIP Angular Client 9.2.0",
      "",
      "*****",
      ""
    ].join("\n");
    const body: (version: string) => string = (version: string): string =>
      String(
        execFileSync(
          "perl",
          ["-ne", definition.replace(/\\#/g, "#").replace(/\$\$/g, "$").replace("${ONDEWO_SIP_VERSION}", version)],
          { input: fixture }
        )
      );

    expect(body("9.1.0")).toBe("right\n");
    expect(body("9.2.0")).toBe("");
    expect(body("1.0")).toBe("");
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
