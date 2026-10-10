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
	});

	it('reach npm through .npmrc environment interpolation, never through its argv', (): void => {
		expect((MAKEFILE.match(/_authToken/g) ?? []).length).toBe(1);
		expect(MAKEFILE).toContain("npm config set '//registry.npmjs.org/:_authToken' '$${NPM_AUTOMATION_TOKEN}'");
	});

	it('reach the release sub-make through its environment', (): void => {
		const recipe: string = recipeOf('run_release_with_devops');

		expect(recipe).not.toContain('$(info)');
		expect(recipe).not.toContain('$(shell');
		expect(recipe).toContain('set -a');
		expect(recipe).toContain("grep -h -E '^(GITHUB_GH_TOKEN|NPM_AUTOMATION_TOKEN)='");
		expect(recipe).toMatch(/\$\(MAKE\) release$/);
		expect(/\bmake\b[^\n]*\$\(info\)/.exec(MAKEFILE)).toBeNull();
		expect(new RegExp(`(?:\\bmake|\\$\\(MAKE\\))[^\\n]*\\b${SECRET_NAME}=`).exec(RECIPE_LINES.join('\n'))).toBeNull();
	});

	it('are never interpolated into a workflow run line', (): void => {
		expect(workflowSecretLines()).toEqual([]);
	});
});
