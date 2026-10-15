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
 * Release credentials reach every process through the environment, never through its argv.
 *
 * `/proc/<pid>/cmdline` (and `ps`) is world-readable, so a token on the command line of docker, npm, make or
 * `/bin/sh -c` is visible to every user on the release host for the life of the process. make expands `$(NAME)`
 * and `${NAME}` INTO a recipe line before the shell runs it, so a recipe reads a credential as `$${NAME}`, which
 * the shell expands from the exported environment.
 *
 * @module
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

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

/** The repository root (the compiled spec runs from a build directory below it). */
const REPO_ROOT: string = findRepoRoot(String(__dirname));
/** The Makefile holding the release recipes. */
const MAKEFILE: string = String(readFileSync(join(REPO_ROOT, 'Makefile'), 'utf8'));
/** The recipe lines (make hands every tab-indented line to `/bin/sh -c`). */
const RECIPE_LINES: string[] = MAKEFILE.split('\n').filter((line: string): boolean => line.startsWith('\t'));
/** A variable name that holds a credential. */
const SECRET_NAME: string = '[A-Z0-9_]*(?:TOKEN|PASSWORD|USERNAME|SECRET|API_KEY)[A-Z0-9_]*';
/** The GitHub workflows, if any. */
const WORKFLOWS_DIR: string = join(REPO_ROOT, '.github', 'workflows');

/**
 * @param target - The make target.
 * @returns The target's rule line and recipe, up to the next blank line.
 */
function recipeOf(target: string): string {
	const start: number = MAKEFILE.indexOf(`\n${target}:`);
	if (start < 0) {
		throw new Error(`the Makefile has no ${target} target`);
	}
	return MAKEFILE.slice(start + 1).split('\n\n')[0];
}

/** @returns Every workflow line that interpolates a secret anywhere but into a plain `NAME: ${{ secrets.X }}` mapping. */
function workflowSecretLines(): string[] {
	const files: string[] = existsSync(WORKFLOWS_DIR)
		? readdirSync(WORKFLOWS_DIR).map((file: string): string => String(file))
		: [];
	return files.flatMap((file: string): string[] =>
		String(readFileSync(join(WORKFLOWS_DIR, file), 'utf8'))
			.split('\n')
			.filter((line: string): boolean => line.includes('secrets.'))
			.filter((line: string): boolean => !/^\s*[\w-]+:\s*\$\{\{\s*secrets\.\w+\s*\}\}\s*$/.test(line))
			.map((line: string): string => `${file}: ${line.trim()}`)
	);
}

/** @returns The recipe lines on which make itself would expand a credential. */
function recipeLinesExpandingASecret(): string[] {
	// `$(if $(NAME),<set>,<unset>)` only renders whether NAME is set; `$$` is the shell's own expansion.
	const expanded: RegExp = new RegExp(`(?<!\\$)\\$[({]${SECRET_NAME}[)}]`);
	const presenceCheck: RegExp = new RegExp(`\\$\\(if \\$[({]${SECRET_NAME}[)}],`, 'g');
	return RECIPE_LINES.filter((line: string): boolean => expanded.test(line.replace(presenceCheck, '')));
}

describe('release credentials', (): void => {
	it('are never expanded by make into a recipe line', (): void => {
		expect(recipeLinesExpandingASecret()).toEqual([]);
	});

	it('reach docker run by name only', (): void => {
		expect(new RegExp(`(?:-e|--env)[\\s=]+${SECRET_NAME}=`).exec(MAKEFILE)).toBeNull();
		expect(recipeOf('release_to_github_via_docker_image')).toMatch(/-e GITHUB_GH_TOKEN \\/);
		expect(recipeOf('publish_npm_via_docker')).toMatch(/-e NPM_AUTOMATION_TOKEN \\/);
		expect(recipeOf('release_preflight')).toContain('docker run --rm -e NPM_AUTOMATION_TOKEN $(IMAGE_TOOLS_NAME)');
		expect(recipeOf('release_preflight')).toContain('docker run --rm -e GITHUB_GH_TOKEN $(IMAGE_TOOLS_NAME)');
	});

	it('reach npm through .npmrc environment interpolation, never through its argv', (): void => {
		const authLines: string[] = MAKEFILE.split('\n').filter((line: string): boolean => line.includes('_authToken'));
		expect(authLines.length).toBe(2);
		expect(MAKEFILE).toContain("npm config set '//registry.npmjs.org/:_authToken' '$${NPM_AUTOMATION_TOKEN}'");
		// The preflight writes a throw-away userconfig; the shell writes the literal ${NPM_AUTOMATION_TOKEN}.
		expect(MAKEFILE).toContain('"//registry.npmjs.org/:_authToken=\\$${NPM_AUTOMATION_TOKEN}"');
	});

	it('reach gh through GH_TOKEN for one call, never through a login', (): void => {
		expect(MAKEFILE).not.toContain('gh auth login');
		expect(recipeOf('build_gh_release')).toContain('GH_TOKEN="$${GITHUB_GH_TOKEN}" gh release create');
	});

	it('reach the release sub-make through its environment', (): void => {
		const recipe: string = recipeOf('ondewo_release');

		expect(recipe).not.toContain('$(info)');
		expect(recipe).not.toContain('$(shell');
		expect(recipe).toContain('set -a');
		expect(recipe).toContain("grep -h -E '^(GITHUB_GH_TOKEN|NPM_AUTOMATION_TOKEN)='");
		expect(recipe).toMatch(/\$\(MAKE\) release$/);
		expect(/\bmake\b[^\n]*\$\(info\)/.exec(MAKEFILE)).toBeNull();
		expect(new RegExp(`(?:\\bmake|\\$\\(MAKE\\))[^\\n]*\\b${SECRET_NAME}=`).exec(RECIPE_LINES.join('\n'))).toBeNull();
	});

	/**
	 * The devops-accounts clone holds every credential the team has, not only the two this release
	 * reads. It used to survive any failing release (its `rm -rf` ran only after `make release`
	 * succeeded) inside the repository root, which the codegen container mounts read-write.
	 */
	it('delete the devops-accounts clone before the release starts, and on failure', (): void => {
		const recipe: string = recipeOf('ondewo_release');
		const read: number = recipe.indexOf('grep -h -E');
		const deleted: number = recipe.indexOf('if [ -n "$$clone" ]; then rm -rf "$$clone"; fi');
		const released: number = recipe.indexOf('$(MAKE) release');

		expect(recipe).toContain('trap \'rm -rf "$$clone"\' EXIT');
		expect(recipe).toContain('clone=$$(mktemp -d)');
		expect(read).toBeGreaterThan(recipe.indexOf("trap 'rm -rf"));
		expect(deleted).toBeGreaterThan(read);
		expect(released).toBeGreaterThan(deleted);
		expect(MAKEFILE).not.toMatch(/^clone_devops_accounts:/m);
		expect(MAKEFILE).not.toMatch(/^run_release_with_devops:/m);
	});

	/** The driver clones the accounts once for all clients and hands the directory over. */
	it('read a DEVOPS_ACCOUNT_DIR the driver hands over instead of cloning again', (): void => {
		const recipe: string = recipeOf('ondewo_release');
		expect(recipe).toContain('if [ -n "$${DEVOPS_ACCOUNT_DIR:-}" ] && [ -d "$${DEVOPS_ACCOUNT_DIR}" ]; then');
		// A Makefile assignment would override the driver's environment value.
		expect(MAKEFILE).not.toMatch(/^DEVOPS_ACCOUNT_DIR\s*[:?]?=/m);
	});

	/**
	 * The release driver runs release_preflight and release_verify on their own with only an absolute
	 * DEVOPS_ACCOUNT_DIR set. Every recipe line that needs a token loads it from there first - into that
	 * line's shell environment, read by an anchored grep, never onto an argv.
	 */
	it('are loaded from DEVOPS_ACCOUNT_DIR by every preflight and verify line that needs one', (): void => {
		const loader: string = /^LOAD_CREDENTIALS=([\s\S]*?\tfi;)$/m.exec(MAKEFILE)?.[1] ?? '';
		expect(loader).toContain('if [ -n "$${DEVOPS_ACCOUNT_DIR:-}" ]');
		expect(loader).toContain("grep -h -E '^(GITHUB_GH_TOKEN|NPM_AUTOMATION_TOKEN)='");
		expect(loader).toContain('set -a; eval "$$credentials"; set +a; unset credentials;');
		for (const [target, count] of [
			['release_preflight', 4],
			['release_verify', 1]
		] as [string, number][]) {
			const tokenLines: string[] = recipeOf(target)
				.split('\n')
				.filter((line: string): boolean => /NPM_AUTOMATION_TOKEN|GITHUB_GH_TOKEN/.test(line) && line.startsWith('\t@'));
			expect(tokenLines.length).toBe(count);
			expect(tokenLines.filter((line: string): boolean => !line.startsWith('\t@$(LOAD_CREDENTIALS) '))).toEqual([]);
		}
	});

	/** The codegen container mounts the repository root, so the build refuses a clone that sits there. */
	it('never sit in the tree the codegen container mounts', (): void => {
		expect(MAKEFILE).toMatch(/^build: refuse_devops_clone_in_tree /m);
		expect(recipeOf('refuse_devops_clone_in_tree')).toContain('if [ -e "$(DEVOPS_ACCOUNT_GIT)" ]; then');
	});

	/** Install scripts of third-party packages, the tests and the hooks never see a token. */
	it('are removed from every step that does not publish', (): void => {
		const scrub: RegExp = /^WITHOUT_CREDENTIALS=env -u GITHUB_GH_TOKEN -u NPM_AUTOMATION_TOKEN$/m;
		expect(scrub.exec(MAKEFILE)).not.toBeNull();
		for (const step of ['build', 'check_build', 'release_tests', 'run_precommit_hooks']) {
			expect(recipeOf('release')).toContain(`\t$(WITHOUT_CREDENTIALS) $(MAKE) ${step}\n`);
		}
		const nodeRun: string = /^NODE_RUN=(.*)$/m.exec(MAKEFILE)?.[1] ?? '';
		expect(nodeRun.startsWith('$(if $(shell command -v npm 2>/dev/null),$(WITHOUT_CREDENTIALS),docker run ')).toBe(
			true
		);
		expect(nodeRun).not.toMatch(new RegExp(`-e ${SECRET_NAME}`));
	});

	/** A placeholder `ENV NAME=<...>` becomes the "token" when the host variable is unset. */
	it('are never baked into an image or sent in a build context', (): void => {
		const dockerfile: string = String(readFileSync(join(REPO_ROOT, 'Dockerfile.utils'), 'utf8'));
		expect(new RegExp(`^(?:ENV|ARG)\\s+${SECRET_NAME}`, 'm').exec(dockerfile)).toBeNull();
		const ignore: string[] = String(readFileSync(join(REPO_ROOT, '.dockerignore'), 'utf8'))
			.split('\n')
			.map((line: string): string => line.trim())
			.filter((line: string): boolean => line !== '' && !line.startsWith('#'));
		expect(ignore[0]).toBe('*');
		const allowed: string[] = ignore.filter((line: string): boolean => line.startsWith('!'));
		for (const secretBearing of ['ondewo-devops-accounts', 'node_modules', '.git', 'src', 'ondewo-proto-compiler']) {
			expect(allowed).not.toContain(`!${secretBearing}`);
		}
	});

	it('are never interpolated into a workflow run line', (): void => {
		expect(workflowSecretLines()).toEqual([]);
	});
});
