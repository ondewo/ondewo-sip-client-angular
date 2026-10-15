// Copyright 2021-2026 ONDEWO GmbH
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/**
 * The release process: its step order, its read-only preflight and verification, the check that the
 * npm package is the release commit, and the pinned toolchain it runs on.
 *
 * Hermetic file-system assertions over the Makefile, Dockerfile.utils and the workflow; the few that
 * need the untracked `npm/` output of a local `make build` are reported as SKIPPED without it.
 *
 * @module
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { dirname, join, relative } from 'path';

/**
 * @param start - The directory to start from.
 * @returns The closest ancestor directory holding the Makefile (the repository root).
 */
function findRepoRoot(start: string): string {
	let dir: string = start;
	while (!existsSync(join(dir, 'Makefile'))) {
		dir = String(dirname(dir));
	}
	return dir;
}

/** The repository root. */
const REPO_ROOT: string = findRepoRoot(String(__dirname));
/** The Makefile holding the release recipes. */
const MAKEFILE: string = String(readFileSync(join(REPO_ROOT, 'Makefile'), 'utf8'));
/** The generated barrel; the committed copy also re-exports the hand-written auth surface. */
const PUBLIC_API_TS: string = join(REPO_ROOT, 'public-api.ts');
/** The publish folder the codegen container writes: untracked, present only after a local build. */
const NPM_PUBLISH_DIR: string = join(REPO_ROOT, 'npm');
/** Runs only where the untracked codegen output of a local `make build` is on disk. */
const itWithBuildOutput: jest.It = existsSync(join(NPM_PUBLISH_DIR, 'package.json')) ? it : it.skip;

/**
 * @param name - The variable name.
 * @returns The value of the `NAME=value` assignment in the Makefile.
 */
function makefileVariable(name: string): string {
	const matched: RegExpExecArray | null = new RegExp(`^${name}[ \\t]*[?:]?=[ \\t]*(.*)$`, 'm').exec(MAKEFILE);
	if (matched === null) {
		throw new Error(`${name} is not assigned in the Makefile`);
	}
	return matched[1].trim();
}

/**
 * @param target - The make target.
 * @returns The rule line and every recipe line after it, up to the next line starting in column 0.
 */
function recipeOf(target: string): string {
	const lines: string[] = MAKEFILE.split('\n');
	const start: number = lines.findIndex((line: string): boolean => line.startsWith(`${target}:`));
	if (start < 0) {
		throw new Error(`the Makefile has no ${target} target`);
	}
	const recipe: string[] = [lines[start]];
	for (const line of lines.slice(start + 1)) {
		if (line !== '' && !/^[ \t]/.test(line)) {
			break;
		}
		recipe.push(line);
	}
	return recipe.join('\n');
}

/**
 * @param target - The make target.
 * @returns The executed recipe lines, trimmed, without comments and blank lines.
 */
function recipeCommandLines(target: string): string[] {
	return recipeOf(target)
		.split('\n')
		.slice(1)
		.filter((line: string): boolean => !/^[ \t]*@?#/.test(line))
		.map((line: string): string => line.trim())
		.filter((line: string): boolean => line !== '');
}

/**
 * @param lines - The recipe lines.
 * @param step - The pattern naming the step.
 * @returns The index of the one line matching `step`; the test fails when it is missing or appears twice.
 */
function indexOfStep(lines: string[], step: RegExp): number {
	const matches: number[] = [];
	lines.forEach((line: string, index: number): void => {
		if (step.test(line)) {
			matches.push(index);
		}
	});
	expect({ step: String(step), matches: matches.length }).toEqual({ step: String(step), matches: 1 });
	return matches[0];
}

/**
 * @param jsonPath - The JSON file.
 * @returns Its parsed content.
 */
function readJson(jsonPath: string): Record<string, unknown> {
	return JSON.parse(String(readFileSync(jsonPath, 'utf8'))) as Record<string, unknown>;
}

/**
 * @param root - The directory to walk.
 * @returns Every file below it, relative to it, sorted.
 */
function filesBelow(root: string): string[] {
	const found: string[] = [];
	const walk: (directory: string) => void = (directory: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const absolute: string = join(directory, String(entry.name));
			if (entry.isDirectory()) {
				walk(absolute);
			} else {
				found.push(relative(root, absolute));
			}
		}
	};
	walk(root);
	return found.sort();
}

/**
 * @param target - The make target.
 * @returns The paths its recipe stages with a `git add` that is not allowed to fail (`${VAR}` expanded).
 */
function requiredStagedPaths(target: string): string[] {
	return recipeOf(target)
		.split('\n')
		.map((line: string): RegExpExecArray | null => /^\tgit add (.+)$/.exec(line))
		.filter((matched: RegExpExecArray | null): matched is RegExpExecArray => matched !== null)
		.map((matched: RegExpExecArray): string =>
			matched[1].trim().replace(/\$\{([A-Z_]+)\}/g, (_whole: string, name: string): string => makefileVariable(name))
		);
}

describe('the release order', (): void => {
	/**
	 * The order IS the safety property. The release used to push "Preparing for Release" to master
	 * before npm publish ran, so a bad npm token left master ahead of npm, and a bad GitHub token left
	 * npm, branch and tag published with no GitHub release. Now: nothing is built before the
	 * credentials, the version and the notes are checked; nothing is committed before the suite is
	 * green; nothing is pushed before npm accepted AND serves the package; the tag and the GitHub
	 * release come last and are verified.
	 */
	const RELEASE_STEPS: RegExp[] = [
		/^\$\(MAKE\) release_preflight$/,
		/^\$\(WITHOUT_CREDENTIALS\) \$\(MAKE\) build$/,
		/^\$\(WITHOUT_CREDENTIALS\) \$\(MAKE\) check_build$/,
		/^\$\(WITHOUT_CREDENTIALS\) \$\(MAKE\) release_tests$/,
		/^\$\(WITHOUT_CREDENTIALS\) \$\(MAKE\) run_precommit_hooks$/,
		/^git diff --cached --quiet \|\| git commit --no-verify -m /,
		/^\$\(MAKE\) check_tag_matches_package$/,
		/^\$\(MAKE\) publish_npm_via_docker$/,
		/^\$\(MAKE\) check_npm_published$/,
		/^git push$/,
		/^\$\(MAKE\) create_release_branch$/,
		/^\$\(MAKE\) create_release_tag$/,
		/^\$\(MAKE\) release_to_github_via_docker_image$/,
		/^\$\(MAKE\) release_verify$/
	];

	it('runs preflight, build, tests, commit, package check, publish, npm check, push, branch, tag, GitHub release, verify', (): void => {
		const lines: string[] = recipeCommandLines('release');
		const positions: number[] = RELEASE_STEPS.map((step: RegExp): number => indexOfStep(lines, step));
		expect(positions).toEqual([...positions].sort((a: number, b: number): number => a - b));
	});

	/** The preflight is the first thing the release does: no step may run before it. */
	it('starts with the preflight', (): void => {
		const lines: string[] = recipeCommandLines('release').filter((line: string): boolean => !line.startsWith('@echo'));
		expect(lines[0]).toBe('$(MAKE) release_preflight');
	});

	/** Everything the commit records is staged before it. */
	it('stages every path before the commit', (): void => {
		const lines: string[] = recipeCommandLines('release');
		const commit: number = indexOfStep(lines, /git commit/);
		const lastAdd: number = lines.map((line: string): boolean => /^-?git add /.test(line)).lastIndexOf(true);
		expect(lastAdd).toBeGreaterThan(0);
		expect(lastAdd).toBeLessThan(commit);
	});

	/**
	 * `-git commit` swallowed a failing commit, after which `git push` pushed nothing and npm
	 * published anyway. An empty index (a re-run) is the only tolerated "no commit".
	 */
	it('never ignores a failing commit or push', (): void => {
		expect(MAKEFILE).not.toMatch(/^\t-\s*git commit/m);
		expect(MAKEFILE).not.toMatch(/^\t-\s*git push/m);
	});

	it('creates the release branch and tag with failing pushes stopping the release', (): void => {
		expect(recipeCommandLines('create_release_branch')).toEqual([
			'git checkout -b "release/${ONDEWO_SIP_VERSION}"',
			'git push -u origin "release/${ONDEWO_SIP_VERSION}"'
		]);
		expect(recipeCommandLines('create_release_tag')).toEqual([
			'git tag -a ${ONDEWO_SIP_VERSION} -m "release/${ONDEWO_SIP_VERSION}"',
			'git push origin ${ONDEWO_SIP_VERSION}'
		]);
	});

	/** The full suite on exactly the lockfile, as CI runs it. */
	it('tests on a clean install of the lockfile', (): void => {
		expect(recipeCommandLines('release_tests')).toEqual([
			'$(NODE_RUN) npm ci --no-audit --no-fund --legacy-peer-deps',
			'$(NODE_RUN) npx jest --config jest.config.js --ci'
		]);
	});

	/** `git add` on a path that does not exist is fatal, after `make build` has already run. */
	it('stages no path that does not exist', (): void => {
		const missing: string[] = requiredStagedPaths('release').filter(
			(staged: string): boolean => !existsSync(join(REPO_ROOT, staged))
		);
		expect(missing).toEqual([]);
	});

	/** A generated artifact the release does not stage is published to npm but never committed. */
	it('stages every packaging artifact the manifest advertises', (): void => {
		const manifest: Record<string, unknown> = readJson(join(REPO_ROOT, 'package.json'));
		const staged: string[] = requiredStagedPaths('release');
		const unstaged: string[] = [manifest.module as string, manifest.typings as string, 'public-api.ts'].filter(
			(artifact: string): boolean =>
				!staged.some((path: string): boolean => artifact === path || artifact.startsWith(`${path}/`))
		);
		expect(unstaged).toEqual([]);
	});
});

describe('release_preflight and release_verify', (): void => {
	/** Every credential is proven valid against the service that will use it, before anything runs. */
	it('proves the npm token, the GitHub push permission and the git push access', (): void => {
		const recipe: string = recipeOf('release_preflight');
		expect(recipe).toContain('npm whoami --userconfig /tmp/npmrc');
		expect(recipe).toContain('gh api repos/$(GH_REPO_SLUG) --jq .permissions.push');
		expect(recipe).toContain('test "$$push" = "true"');
		expect(recipe).toContain('git push --dry-run origin HEAD');
		expect(makefileVariable('GH_REPO_SLUG')).toBe('ondewo/ondewo-sip-client-angular');
	});

	/** Anchored checks: the version is neither a tag, nor a release branch, nor on npm yet. */
	it('refuses a version that is already tagged, branched or published', (): void => {
		const recipe: string = recipeOf('release_preflight');
		expect(recipe).toContain('$(MAKE) --no-print-directory spc');
		expect(recipe).toContain('$(NPM_REGISTRY)/$(subst /,%2f,$(NPM_PACKAGE))/$(ONDEWO_SIP_VERSION)');
		const spc: string = recipeOf('spc');
		expect(spc).toContain('git rev-parse -q --verify "refs/tags/$(ONDEWO_SIP_VERSION)"');
		expect(spc).toContain('git rev-parse -q --verify "refs/heads/release/$(ONDEWO_SIP_VERSION)"');
		expect(spc).toContain('git ls-remote --exit-code --tags origin "refs/tags/$(ONDEWO_SIP_VERSION)"');
		expect(spc).toContain('git ls-remote --exit-code --heads origin "refs/heads/release/$(ONDEWO_SIP_VERSION)"');
		// `grep "${VERSION}"` matched 15.5.1 for 5.5.1 and read the dots as wildcards.
		expect(spc).not.toMatch(/\|\s*grep/);
	});

	it('requires non-empty release notes for the version', (): void => {
		expect(recipeOf('release_preflight')).toContain('$$($(RELEASE_NOTES_BODY) src/RELEASE.md)');
		expect(recipeOf('build_gh_release')).toContain('$$($(RELEASE_NOTES_BODY) RELEASE.md)');
	});

	/** The host needs only docker, make, git, perl and curl; node, npm and gh run in containers. */
	it('checks the host tools the release needs and nothing more', (): void => {
		expect(recipeOf('release_preflight')).toContain('for tool in docker make git perl curl; do');
	});

	it('verifies the tag on origin, a non-empty GitHub release and the npm version', (): void => {
		const verify: string = recipeOf('release_verify');
		expect(verify.split('\n')[0]).toMatch(/^release_verify: check_npm_published /);
		expect(verify).toContain('git ls-remote --exit-code --tags origin "refs/tags/$(ONDEWO_SIP_VERSION)"');
		expect(verify).toContain('gh release view "$(ONDEWO_SIP_VERSION)" --repo $(GH_REPO_SLUG) --json body --jq .body');
		expect(recipeOf('check_npm_published')).toContain('npm view "$(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION)" version');
		expect(makefileVariable('NPM_PACKAGE')).toBe(readJson(join(REPO_ROOT, 'package.json')).name);
		expect(makefileVariable('NPM_PACKAGE')).toBe(readJson(join(REPO_ROOT, 'src', 'package.json')).name);
	});

	/** The release driver sets one polling budget for every client. */
	it('lets the driver set the npm polling budget', (): void => {
		expect(makefileVariable('NPM_VERIFY_ATTEMPTS')).toBe('$(or $(VERIFY_ATTEMPTS),20)');
		expect(makefileVariable('NPM_VERIFY_DELAY_S')).toBe('$(or $(VERIFY_INTERVAL_S),30)');
	});
});

describe('the npm package matches the release commit', (): void => {
	/** Files npm/ carries that are rewritten on purpose; everything else must equal its committed twin. */
	const REWRITTEN: string[] = ['package.json', 'README.md', 'public-api.ts'];
	/** The one line the npm copy of the barrel leaves out: npm/ has no src/, so it would dangle there. */
	const AUTH_BARREL_LINE: string = "export * from './src/auth';";

	it('runs check_tag_matches_package over exactly the documented exemptions', (): void => {
		const recipe: string = recipeOf('check_tag_matches_package');
		expect(recipe).toContain('npm pack ./npm --dry-run --json --ignore-scripts');
		expect(recipe).toContain('git cat-file -e "HEAD:$$f"');
		expect(recipe).toContain(`grep -vxF "${AUTH_BARREL_LINE}"`);
		const exempted: string[] = [...recipe.matchAll(/^\t+([\w.|-]+)\)/gm)]
			.flatMap((matched: RegExpMatchArray): string[] => matched[1].split('|'))
			.sort();
		expect(exempted).toEqual([...REWRITTEN].sort());
	});

	it('keeps the auth barrel line in the committed public-api.ts', (): void => {
		expect(String(readFileSync(PUBLIC_API_TS, 'utf8')).split('\n')).toContain(AUTH_BARREL_LINE);
	});

	/**
	 * The npm copy of the barrel drops the auth line, so the auth surface reaches consumers only through
	 * ng-packagr's bundle and the typings entry point. Every name `src/auth/index.ts` exports must be
	 * exported there - derived from the barrel, so a new auth export is covered without editing this.
	 */
	it('exports the whole hand-written auth surface from the committed typings entry point', (): void => {
		const barrel: string = String(readFileSync(join(REPO_ROOT, 'src', 'auth', 'index.ts'), 'utf8'));
		const authNames: string[] = [...barrel.matchAll(/export\s*\{([^}]*)\}/g)]
			.flatMap((matched: RegExpMatchArray): string[] => matched[1].split(','))
			.map((name: string): string => name.trim())
			.filter((name: string): boolean => name !== '');
		const typings: string = String(readFileSync(join(REPO_ROOT, 'index.d.ts'), 'utf8'));
		const exported: string[] = [...typings.matchAll(/^export (?:type )?\{ (.*) \};$/gm)].flatMap(
			(matched: RegExpMatchArray): string[] => matched[1].split(', ')
		);
		expect(authNames).toContain('provideOndewoSipAuth');
		expect(authNames.filter((name: string): boolean => !exported.includes(name))).toEqual([]);
	});

	itWithBuildOutput('ships a public-api.ts equal to the committed one minus the auth barrel line', (): void => {
		const committed: string = String(readFileSync(PUBLIC_API_TS, 'utf8'))
			.split('\n')
			.filter((line: string): boolean => line !== AUTH_BARREL_LINE)
			.join('\n');
		expect(String(readFileSync(join(NPM_PUBLISH_DIR, 'public-api.ts'), 'utf8'))).toBe(committed);
	});

	itWithBuildOutput('ships every other file byte-equal to the repository root', (): void => {
		const differing: string[] = filesBelow(NPM_PUBLISH_DIR)
			.filter((file: string): boolean => !REWRITTEN.includes(file))
			.filter((file: string): boolean => {
				const twin: string = join(REPO_ROOT, file);
				return !existsSync(twin) || !readFileSync(twin).equals(readFileSync(join(NPM_PUBLISH_DIR, file)));
			});
		expect(differing).toEqual([]);
	});
});

describe('build and release toolchain', (): void => {
	/** Root-owned codegen output is handed back by a container, never by sudo on the host. */
	it('never runs sudo', (): void => {
		expect(MAKEFILE).not.toMatch(/^\t.*\bsudo\b/m);
	});

	it('pins the node image by version and digest, identically in the Makefile and Dockerfile.utils', (): void => {
		const nodeImage: string = makefileVariable('NODE_IMAGE');
		expect(nodeImage).toMatch(/^node:\d+\.\d+\.\d+-[a-z]+@sha256:[0-9a-f]{64}$/);
		const dockerfile: string = String(readFileSync(join(REPO_ROOT, 'Dockerfile.utils'), 'utf8'));
		expect(dockerfile).toContain(`ARG NODE_IMAGE=${nodeImage}`);
		expect(dockerfile).not.toMatch(/:latest\b/);
		expect(dockerfile).toMatch(/ARG GH_VERSION=\d+\.\d+\.\d+/);
		expect(dockerfile).toContain('sha256sum -c -');
	});

	/** The preflight builds only the tools stage, which must not need `make build` output. */
	it('keeps a tools stage that copies nothing from the build', (): void => {
		const dockerfile: string = String(readFileSync(join(REPO_ROOT, 'Dockerfile.utils'), 'utf8'));
		const tools: string = dockerfile.slice(dockerfile.indexOf(' AS tools'), dockerfile.indexOf(' AS release'));
		expect(tools).not.toMatch(/^COPY /m);
		expect(recipeOf('build_tools_docker_image')).toContain('--target tools');
	});

	/** The codegen image is the one build_compiler tagged with the pinned compiler version, run TTY-free. */
	it('generates with the version-tagged codegen image, the same arguments as src/package.json and no TTY', (): void => {
		expect(makefileVariable('ONDEWO_PROTO_COMPILER_GIT_BRANCH')).toMatch(/^tags\/\d+\.\d+\.\d+$/);
		expect(makefileVariable('CODEGEN_IMAGE')).toBe(
			'ondewo-angular-proto-compiler:$(patsubst tags/%,%,${ONDEWO_PROTO_COMPILER_GIT_BRANCH})'
		);
		expect(recipeOf('build_compiler')).toContain('docker tag ondewo-angular-proto-compiler:latest $(CODEGEN_IMAGE)');
		const codegen: string =
			recipeCommandLines('npm_run_build').find((line: string): boolean => line.includes('/input-volume')) ?? '';
		expect(codegen).toContain('docker run --rm ');
		expect(codegen).not.toMatch(/(?:^|\s)-{1,2}(?:it|ti|t|tty)(?=\s|$)/);
		expect(codegen.endsWith('$(CODEGEN_IMAGE) ondewo-sip-api ondewo')).toBe(true);
		const scripts: Record<string, string> = readJson(join(REPO_ROOT, 'src', 'package.json')).scripts as Record<
			string,
			string
		>;
		expect(scripts.generate.endsWith('ondewo-angular-proto-compiler ondewo-sip-api ondewo')).toBe(true);
		expect(scripts.generate).not.toMatch(/(?:^|\s)-{1,2}(?:it|ti|t|tty)(?=\s|$)/);
	});

	it('runs CI on every branch and tag with npm ci', (): void => {
		const workflow: string = String(readFileSync(join(REPO_ROOT, '.github', 'workflows', 'tests.yml'), 'utf8'));
		expect(workflow).toMatch(/branches:\n\s+- '\*\*'/);
		expect(workflow).toMatch(/tags:\n\s+- '\*'/);
		expect(workflow).toContain('runs-on: ubuntu-24.04');
		expect(workflow).toContain('npm ci ');
		expect(workflow).not.toMatch(/npm (?:install|i)\b/);
	});

	/**
	 * `.husky/pre-commit` runs `make prettier PRETTIER_WRITE=-w`, i.e. the formatter writes on every
	 * commit and during the release. It reformatted the committed `index.d.ts`, so the committed
	 * typings stopped being byte-equal to what npm ships - which check_tag_matches_package refuses.
	 */
	it('keeps the formatter away from every artifact the codegen and the test run produce', (): void => {
		const entries: Set<string> = new Set<string>(
			String(readFileSync(join(REPO_ROOT, '.prettierignore'), 'utf8'))
				.split('\n')
				.map((line: string): string => line.trim().replace(/\/$/, ''))
				.filter((line: string): boolean => line !== '' && !line.startsWith('#'))
		);
		const generated: string[] = ['api', 'fesm2022', 'npm', 'index.d.ts', 'public-api.ts', 'coverage'];
		expect(generated.filter((artifact: string): boolean => !entries.has(artifact))).toEqual([]);
	});
});
