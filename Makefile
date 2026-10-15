export
# ---------------- BEFORE RELEASE ----------------
# 1 - Update Version Number
# 2 - Update src/RELEASE.md
# -------------- Release Process Steps (make ondewo_release) --------------
# 1 - Load the credentials from devops-accounts and delete the clone again
# 2 - release_preflight: credentials valid, version unreleased, notes present (read-only)
# 3 - Build, check the build, run the test suite and the pre-commit hooks (no credentials)
# 4 - Commit locally, check the npm package matches the commit
# 5 - Publish to npm and wait until npm serves the version
# 6 - Push, create and push the release branch and tag, create the GitHub release
# 7 - release_verify: tag, GitHub release notes and npm version are all there

########################################################
# 		Variables
########################################################

ONDEWO_SIP_VERSION=5.5.1
SIP_API_GIT_BRANCH=tags/5.5.0
# Must name the tag the committed ondewo-proto-compiler submodule points at, otherwise
# check_out_correct_submodule_versions checks the submodule BACK to the older tag.
ONDEWO_PROTO_COMPILER_GIT_BRANCH=tags/5.15.7
ONDEWO_PROTO_COMPILER_DIR=ondewo-proto-compiler
SIP_APIS_DIR=src/ondewo-sip-api
SIP_PROTOS_DIR=${SIP_APIS_DIR}/ondewo
GITHUB_GH_TOKEN?=
NPM_AUTOMATION_TOKEN?=
IMAGE_UTILS_NAME=ondewo-sip-client-utils-angular:${ONDEWO_SIP_VERSION}
# The first stage of Dockerfile.utils: node + gh only, buildable before `make build` produced npm/.
IMAGE_TOOLS_NAME=ondewo-sip-client-tools-angular:${ONDEWO_SIP_VERSION}
# The codegen image, tagged with the proto-compiler version the submodule is pinned to (build.sh only tags :latest).
CODEGEN_IMAGE=ondewo-angular-proto-compiler:$(patsubst tags/%,%,${ONDEWO_PROTO_COMPILER_GIT_BRANCH})
# Pinned by version AND digest. Also the FROM of Dockerfile.utils (kept equal by src/auth/release-process.spec.ts).
NODE_IMAGE=node:24.14.0-bookworm@sha256:5a593d74b632d1c6f816457477b6819760e13624455d587eef0fa418c8d0777b
PRETTIER_WRITE?=

NPM_PACKAGE=@ondewo/sip-client-angular
NPM_REGISTRY=https://registry.npmjs.org
# How long release_verify waits for npm to serve a freshly published version (20 x 30 s). The release
# driver (ondewo-sip-api) sets VERIFY_ATTEMPTS / VERIFY_INTERVAL_S for every client alike.
NPM_VERIFY_ATTEMPTS?=$(or $(VERIFY_ATTEMPTS),20)
NPM_VERIFY_DELAY_S?=$(or $(VERIFY_INTERVAL_S),30)

# The section of RELEASE.md whose heading is EXACTLY `#... Release ONDEWO SIP Angular Client <version>`
# (anchored, version dots escaped by \Q..\E), up to the next ***** separator.
CURRENT_RELEASE_NOTES=`cat RELEASE.md \
	| perl -ne 'print if /^\#+ Release ONDEWO SIP Angular Client \Q${ONDEWO_SIP_VERSION}\E$$/../^\*{5}/'`
# The same section minus its heading and separator, without blank lines: empty means "no notes".
RELEASE_NOTES_BODY=perl -ne 'print if (/^\#+ Release ONDEWO SIP Angular Client \Q${ONDEWO_SIP_VERSION}\E$$/../^\*{5}/) && !/^\#+ Release / && !/^\*{5}/ && /\S/'

GH_REPO_SLUG=ondewo/ondewo-sip-client-angular
GH_REPO="https://github.com/${GH_REPO_SLUG}"
DEVOPS_ACCOUNT_GIT=ondewo-devops-accounts
# Shell prefix for a recipe line that needs a token: when a token is not already in the environment and
# DEVOPS_ACCOUNT_DIR names a devops-accounts clone (the release driver hands over an absolute path), both
# are read from it into THIS line's environment - never onto an argv, never printed. So release_preflight
# and release_verify also work standalone with only DEVOPS_ACCOUNT_DIR set.
LOAD_CREDENTIALS=if [ -n "$${DEVOPS_ACCOUNT_DIR:-}" ] && { [ -z "$${GITHUB_GH_TOKEN:-}" ] || [ -z "$${NPM_AUTOMATION_TOKEN:-}" ]; }; then \
		test -d "$${DEVOPS_ACCOUNT_DIR}" || { echo "ERROR: DEVOPS_ACCOUNT_DIR is not a directory"; exit 1; }; \
		credentials=$$(grep -h -E '^(GITHUB_GH_TOKEN|NPM_AUTOMATION_TOKEN)=' "$${DEVOPS_ACCOUNT_DIR}/account_github.env" "$${DEVOPS_ACCOUNT_DIR}/account_npm.env") \
			|| { echo "ERROR: cannot read the tokens from DEVOPS_ACCOUNT_DIR"; exit 1; }; \
		set -a; eval "$$credentials"; set +a; unset credentials; \
	fi;

# Every step that does not publish runs without the release credentials: npm install scripts of
# third-party packages, the test suite and the pre-commit hooks never see a token.
WITHOUT_CREDENTIALS=env -u GITHUB_GH_TOKEN -u NPM_AUTOMATION_TOKEN
# A node toolchain command: on the host when npm is installed there, otherwise in NODE_IMAGE as the
# invoking user, with the repository mounted at its own path and no credentials.
NODE_RUN=$(if $(shell command -v npm 2>/dev/null),$(WITHOUT_CREDENTIALS),docker run --rm --user $$(id -u):$$(id -g) -e HOME=/tmp -e CI -v "$(CURDIR)":"$(CURDIR)" -w "$(CURDIR)" $(NODE_IMAGE))
.DEFAULT_GOAL := help
########################################################
#       ONDEWO Standard Make Targets
########################################################

setup_developer_environment_locally: install_packages install_precommit_hooks ## Installs all needed packages and precommit hooks

install_packages: ## Install npm packages
	npm i

run_precommit_hooks: ## Runs all precommit hooks (eslint, prettier, and pre-commit where installed)
	$(NODE_RUN) .husky/pre-commit

install_precommit_hooks: ## Install precommit hooks
	npx husky install
	uv tool install pre-commit || pipx install pre-commit || pip install --user pre-commit

prettier: ## Checks formatting with Prettier - Use PRETTIER_WRITE=-w to also automatically apply corrections where needed
	node_modules/.bin/prettier --config .prettierrc --check --ignore-path .prettierignore $(PRETTIER_WRITE) ./

eslint: ## Checks Code Logic and Typing
	./node_modules/.bin/eslint --config eslint.config.mjs .

TEST: ## Prints some important variables
	@echo "Release Notes: \n \n$(CURRENT_RELEASE_NOTES)"
	@echo "GH Token: \t $(if $(GITHUB_GH_TOKEN),<set>,<unset>)"
	@echo "NPM Name: \t $(if $(NPM_USERNAME),<set>,<unset>)"
	@echo "NPM Password: \t $(if $(NPM_PASSWORD),<set>,<unset>)"

help: ## Print usage info about help targets
	# (first comment after target starting with double hashes ##)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-40s\033[0m %s\n", $$1, $$2}'

makefile_chapters: ## Shows all sections of Makefile
	@echo `cat Makefile| grep "########################################################" -A 1 | grep -v "########################################################"`

check_build: ## Checks if all built proto-code is there
	@rm -rf build_check.txt
	@rm -rf build_check_temp.txt
	@for proto in `find src/ondewo-sip-api/ondewo -iname "*.proto*"`; \
	do \
		echo $${proto} | cut -d "/" -f 5 | cut -d "." -f 1 >> build_check_temp.txt; \
		cat build_check_temp.txt >> build_check.txt; \
	done
	@echo "`sort build_check.txt | uniq`" > build_check.txt
	@perl -i -pe "s/\_/\-/g" build_check.txt

	@for file in `cat build_check.txt`;\
	do \
		find api -iname "*pb*" | grep -q $${file}; \
		if test $$? != 0; then  echo "No Proto-Code for $${file} in api" & exit 1;fi; \
		# find esm2022 -iname "*pb*" | grep -q $${file}; \
		# if test $$? != 0; then  echo "No Proto-Code for $${file} in esm2022" & exit 1;fi; \
		find fesm2022 -iname "*ondewo-sip-client-angular*" | wc -l | grep -q "2"; \
		if test $$? != 0; then  echo "No Proto-Code for $${file} in fesm2022" & exit 1;fi; \
	done
	@rm -rf build_check.txt
	@rm -rf build_check_temp.txt

########################################################
#       Repo Specific Make Targets
########################################################

########################################################
#		Release

# The step order is the safety property and is pinned by src/auth/release-process.spec.ts ("the release
# order"): nothing is committed before the suite is green, nothing is pushed before npm accepted the
# package, and no branch, tag or GitHub release exists for a version npm does not serve.
release: ## Create the npm and GitHub release (run through ondewo_release, which supplies the credentials)
	@echo "Start Release"
	$(MAKE) release_preflight
	# The driver (ondewo-sip-api release_client) writes the new entry into src/RELEASE.md; the GitHub
	# release body and src/auth/release-notes.spec.ts read the root RELEASE.md, which must be the same file.
	cp src/RELEASE.md RELEASE.md
	$(WITHOUT_CREDENTIALS) $(MAKE) build
	$(WITHOUT_CREDENTIALS) $(MAKE) check_build
	$(WITHOUT_CREDENTIALS) $(MAKE) release_tests
	$(WITHOUT_CREDENTIALS) $(MAKE) run_precommit_hooks
	git status
	git add api
	git add fesm2022
	git add src
	git add README.md
	git add RELEASE.md
	# public-api.d.ts / public-api.d.ts.map are NOT staged: the codegen container deletes both
	# (`rm -rf public-api.d.ts` in compile-proto-2-angular.sh) and emits the barrel as
	# public-api.ts plus the flattened typings entry point index.d.ts, which `typings` points at.
	# `git add` on a path that does not exist is fatal, and an unstaged index.d.ts would publish
	# typings to npm that were never committed.
	git add public-api.ts
	git add index.d.ts
	git add ondewo-sip-client-angular.d.ts
	git add ondewo-sip-client-angular.d.ts.map
	git add ondewo-sip-client-angular.metadata.json
	git add package-lock.json
	git add package.json
	-git add tsconfig.json
	git add Makefile
	git add ${ONDEWO_PROTO_COMPILER_DIR}
	git add ${SIP_APIS_DIR}
	git status
	# Nothing staged (a re-run) is fine; a commit that FAILS must stop the release.
	git diff --cached --quiet || git commit --no-verify -m "Preparing for Release ${ONDEWO_SIP_VERSION}"
	$(MAKE) check_tag_matches_package
	$(MAKE) publish_npm_via_docker
	$(MAKE) check_npm_published
	git push
	$(MAKE) create_release_branch
	$(MAKE) create_release_tag
	$(MAKE) release_to_github_via_docker_image
	$(MAKE) release_verify
	@echo "Finished Release"

release_preflight: ## Read-only: fails before anything is built, committed, published or pushed
	@echo "START release_preflight for $(ONDEWO_SIP_VERSION)"
	@for tool in docker make git perl curl; do \
		command -v $$tool >/dev/null 2>&1 || { echo "ERROR: release_preflight: '$$tool' is not installed on this host"; exit 1; }; \
	done; echo "-- host tools: docker make git perl curl"
	@$(MAKE) --no-print-directory spc
	@test -n "$$($(RELEASE_NOTES_BODY) src/RELEASE.md)" \
		|| { echo "ERROR: release_preflight: src/RELEASE.md has no non-empty section headed exactly '## Release ONDEWO SIP Angular Client $(ONDEWO_SIP_VERSION)'"; exit 1; }; \
		echo "-- release notes: src/RELEASE.md documents $(ONDEWO_SIP_VERSION)"
	@status=$$(curl -s -o /dev/null -w '%{http_code}' "$(NPM_REGISTRY)/$(subst /,%2f,$(NPM_PACKAGE))/$(ONDEWO_SIP_VERSION)"); \
		case "$$status" in \
			404) echo "-- npm: $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION) is not published yet";; \
			200) echo "ERROR: release_preflight: $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION) is already on npm"; exit 1;; \
			*) echo "ERROR: release_preflight: the npm registry answered HTTP $$status for $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION)"; exit 1;; \
		esac
	@git push --dry-run origin HEAD >/dev/null 2>&1 \
		|| { echo "ERROR: release_preflight: 'git push --dry-run origin HEAD' failed - this host cannot push to origin"; exit 1; }; \
		echo "-- git: this host can push to origin"
	@$(LOAD_CREDENTIALS) test -n "$${NPM_AUTOMATION_TOKEN:-}" || { echo "ERROR: release_preflight: NPM_AUTOMATION_TOKEN is not set"; exit 1; }
	@$(LOAD_CREDENTIALS) test -n "$${GITHUB_GH_TOKEN:-}" || { echo "ERROR: release_preflight: GITHUB_GH_TOKEN is not set"; exit 1; }
	@$(MAKE) --no-print-directory build_tools_docker_image
	@# A throw-away userconfig inside a throw-away container; npm substitutes the token from the
	@# environment, so it is never on an argv and never written to this host.
	@$(LOAD_CREDENTIALS) user=$$(docker run --rm -e NPM_AUTOMATION_TOKEN $(IMAGE_TOOLS_NAME) sh -c \
			'umask 077 && printf "%s\n" "//registry.npmjs.org/:_authToken=\$${NPM_AUTOMATION_TOKEN}" > /tmp/npmrc && npm whoami --userconfig /tmp/npmrc --registry $(NPM_REGISTRY)/' 2>/dev/null) \
		&& test -n "$$user" \
		|| { echo "ERROR: release_preflight: NPM_AUTOMATION_TOKEN is not accepted by $(NPM_REGISTRY) (npm whoami failed)"; exit 1; }; \
		echo "-- npm: the token authenticates as $$user"
	@$(LOAD_CREDENTIALS) push=$$(docker run --rm -e GITHUB_GH_TOKEN $(IMAGE_TOOLS_NAME) sh -c \
			'GH_TOKEN="$$GITHUB_GH_TOKEN" gh api repos/$(GH_REPO_SLUG) --jq .permissions.push' 2>/dev/null); \
		test "$$push" = "true" \
		|| { echo "ERROR: release_preflight: GITHUB_GH_TOKEN cannot push to $(GH_REPO_SLUG) (permissions.push: '$$push')"; exit 1; }; \
		echo "-- GitHub: the token can push to $(GH_REPO_SLUG)"
	@echo "DONE release_preflight: nothing was built, committed, published or pushed"

release_tests: ## The full jest suite on a clean install (npm ci), without the release credentials
	$(NODE_RUN) npm ci --no-audit --no-fund --legacy-peer-deps
	$(NODE_RUN) npx jest --config jest.config.js --ci

# Every file the npm tarball ships must be committed and byte-equal at HEAD, so the git tag is the
# source of what npm serves. npm/ mirrors the repository root, except for three files the codegen and
# the build rewrite on purpose, each checked for what it must still share with its committed twin:
#   package.json   ng-packagr's generated manifest (no devDependencies, no scripts): same name + version.
#   README.md      the build cuts the GitHub-only release section out of the npm copy.
#   public-api.ts  the codegen writes the npm copy stubs-only: npm/ has no src/, so the root barrel's
#                  `export * from './src/auth';` would dangle there. Equal to the root copy minus that line.
#                  (The auth surface still ships: ng-packagr bundled it into fesm2022/ and index.d.ts.)
check_tag_matches_package: ## Read-only: every file npm pack ships is committed and byte-equal at HEAD
	@files=$$(mktemp) && trap 'rm -f "$$files"' EXIT \
		&& $(NODE_RUN) npm pack ./npm --dry-run --json --ignore-scripts 2>/dev/null \
		| perl -MJSON::PP -0777 -ne 'print "$$_->{path}\n" for @{ decode_json($$_)->[0]{files} }' > "$$files" \
		&& test -s "$$files" || { echo "ERROR: check_tag_matches_package: npm pack ./npm listed no files - run make build first"; exit 1; }; \
	fail=0; count=0; \
	while IFS= read -r f; do \
		count=$$((count + 1)); \
		case "$$f" in \
			package.json) \
				perl -MJSON::PP -0777 -e 'my ($$a, $$b) = map { decode_json($$_) } @ARGV; exit(($$a->{name} eq $$b->{name} && $$a->{version} eq $$b->{version}) ? 0 : 1)' \
					"$$(cat npm/package.json)" "$$(git show HEAD:package.json)" \
					|| { echo "DIFFERS: npm/package.json name/version vs HEAD:package.json"; fail=1; };; \
			README.md) ;; \
			public-api.ts) \
				git show HEAD:public-api.ts | grep -vxF "export * from './src/auth';" | cmp -s - npm/public-api.ts \
					|| { echo "DIFFERS: npm/public-api.ts vs HEAD:public-api.ts minus the src/auth line"; fail=1; };; \
			*) \
				if ! git cat-file -e "HEAD:$$f" 2>/dev/null; then echo "NOT COMMITTED: $$f"; fail=1; \
				elif ! git show "HEAD:$$f" | cmp -s - "npm/$$f"; then echo "DIFFERS FROM HEAD: $$f"; fail=1; fi;; \
		esac; \
	done < "$$files"; \
	test $$fail -eq 0 || { echo "ERROR: check_tag_matches_package: the npm package does not match HEAD"; exit 1; }; \
	echo "DONE check_tag_matches_package: $$count files match HEAD"

check_npm_published: ## Read-only: waits until npm serves the version (NPM_VERIFY_ATTEMPTS x NPM_VERIFY_DELAY_S)
	@for attempt in $$(seq 1 $(NPM_VERIFY_ATTEMPTS)); do \
		served=$$($(NODE_RUN) npm view "$(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION)" version 2>/dev/null); \
		if [ "$$served" = "$(ONDEWO_SIP_VERSION)" ]; then echo "-- npm serves $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION)"; exit 0; fi; \
		echo "-- npm does not serve $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION) yet (attempt $$attempt/$(NPM_VERIFY_ATTEMPTS))"; \
		sleep $(NPM_VERIFY_DELAY_S); \
	done; \
	echo "ERROR: npm does not serve $(NPM_PACKAGE)@$(ONDEWO_SIP_VERSION)"; exit 1

release_verify: check_npm_published ## Read-only: the tag is on origin, the GitHub release has notes, npm serves the version
	@git ls-remote --exit-code --tags origin "refs/tags/$(ONDEWO_SIP_VERSION)" >/dev/null \
		|| { echo "ERROR: release_verify: tag $(ONDEWO_SIP_VERSION) is not on origin"; exit 1; }; \
		echo "-- git: tag $(ONDEWO_SIP_VERSION) is on origin"
	@$(MAKE) --no-print-directory build_tools_docker_image
	@$(LOAD_CREDENTIALS) body=$$(docker run --rm -e GITHUB_GH_TOKEN $(IMAGE_TOOLS_NAME) sh -c \
			'GH_TOKEN="$$GITHUB_GH_TOKEN" gh release view "$(ONDEWO_SIP_VERSION)" --repo $(GH_REPO_SLUG) --json body --jq .body' 2>&1) \
		|| { echo "ERROR: release_verify: gh could not read GitHub release $(ONDEWO_SIP_VERSION) (GITHUB_GH_TOKEN rejected, or no release): $$(printf '%s\n' "$$body" | head -1)"; exit 1; }; \
		test -n "$$(printf '%s' "$$body" | tr -d '[:space:]')" \
		|| { echo "ERROR: release_verify: GitHub release $(ONDEWO_SIP_VERSION) is missing or has an empty body"; exit 1; }; \
		echo "-- GitHub: release $(ONDEWO_SIP_VERSION) has notes"
	@echo "DONE release_verify: $(ONDEWO_SIP_VERSION) is released"

gh_release: build_utils_docker_image release_to_github_via_docker_image ## Builds Utils Image and Releases to Github

npm_release: ## Releases to NPM
	@echo "Start NPM Release"
	npm publish ./npm --access public
	@echo "Finished NPM Release"

create_release_branch: ## Create Release Branch and push it to origin
	git checkout -b "release/${ONDEWO_SIP_VERSION}"
	git push -u origin "release/${ONDEWO_SIP_VERSION}"

create_release_tag: ## Create Release Tag and push it to origin
	git tag -a ${ONDEWO_SIP_VERSION} -m "release/${ONDEWO_SIP_VERSION}"
	git push origin ${ONDEWO_SIP_VERSION}

# Runs INSIDE the utils container. gh reads the token from GH_TOKEN for this one call; nothing logs in,
# nothing is persisted. "$${GITHUB_GH_TOKEN}" is expanded by the shell from the environment;
# $(GITHUB_GH_TOKEN) would be expanded by make INTO the recipe line, i.e. onto the argv of `/bin/sh -c`.
build_gh_release: ## Generate Github Release with CLI
	@test -n "$$($(RELEASE_NOTES_BODY) RELEASE.md)" || { echo "ERROR: no non-empty 'Release ONDEWO SIP Angular Client $(ONDEWO_SIP_VERSION)' section in RELEASE.md"; exit 1; }
	GH_TOKEN="$${GITHUB_GH_TOKEN}" gh release create --repo $(GH_REPO) "$(ONDEWO_SIP_VERSION)" -n "$(CURRENT_RELEASE_NOTES)" -t "Release ${ONDEWO_SIP_VERSION}"

########################################################
#		Docker

push_to_gh: build_gh_release ## Releases to Github (inside the utils container)
	@echo 'Released to Github'

build_compiler: ## Builds Ondewo-Proto-Compiler and tags it with the pinned compiler version
	cd ondewo-proto-compiler/angular && sh build.sh
	docker tag ondewo-angular-proto-compiler:latest $(CODEGEN_IMAGE)

release_to_github_via_docker_image: build_utils_docker_image ## Release to Github via docker
	@docker run --rm \
		-e GITHUB_GH_TOKEN \
		${IMAGE_UTILS_NAME} make push_to_gh

build_tools_docker_image: ## Build the tools stage of the utils image (node + gh; needs no build output)
	@docker build -q --target tools -f Dockerfile.utils -t ${IMAGE_TOOLS_NAME} . >/dev/null

build_utils_docker_image: ## Build utils docker image
	docker build -f Dockerfile.utils -t ${IMAGE_UTILS_NAME} .

publish_npm_via_docker: build_utils_docker_image ## Builds Code, Docker-Image and Releases to NPM
	@docker run --rm \
		-e NPM_AUTOMATION_TOKEN \
		${IMAGE_UTILS_NAME} make docker_npm_release

# npm reads the literal `${NPM_AUTOMATION_TOKEN}` from .npmrc and substitutes the environment value,
# so the token itself never appears on npm's argv.
docker_npm_release: ## Release to npm with docker image
	node --version
	npm --version
	@npm config set '//registry.npmjs.org/:_authToken' '$${NPM_AUTOMATION_TOKEN}'
	npm whoami
	make npm_release

########################################################
#		DEVOPS-ACCOUNTS

# Credentials are read into this shell's environment (anchored `^NAME=` lines only, so a comment
# mentioning a name cannot break a value) and the devops-accounts clone is DELETED before the release
# starts - and by the EXIT trap when the clone or the read fails. It is cloned into a temporary
# directory outside the repository, because the codegen container mounts the repository root.
# `make release NAME=<value>` would put every value on make's argv, which /proc/<pid>/cmdline shows
# to every user on the host. When DEVOPS_ACCOUNT_DIR names an existing directory (the driver's one
# temporary clone for all clients), it is read and left to the driver to delete.
ondewo_release: spc ## Release with credentials from devops-accounts repo
	@set -e; \
	clone=""; \
	if [ -n "$${DEVOPS_ACCOUNT_DIR:-}" ] && [ -d "$${DEVOPS_ACCOUNT_DIR}" ]; then \
		accounts="$${DEVOPS_ACCOUNT_DIR}"; \
	else \
		clone=$$(mktemp -d); \
		trap 'rm -rf "$$clone"' EXIT; \
		git clone -q --depth 1 git@bitbucket.org:ondewo/$(DEVOPS_ACCOUNT_GIT).git "$$clone/$(DEVOPS_ACCOUNT_GIT)"; \
		accounts="$$clone/$(DEVOPS_ACCOUNT_GIT)"; \
	fi; \
	credentials=$$(grep -h -E '^(GITHUB_GH_TOKEN|NPM_AUTOMATION_TOKEN)=' "$$accounts/account_github.env" "$$accounts/account_npm.env"); \
	set -a; \
	eval "$$credentials"; \
	set +a; \
	unset credentials; \
	if [ -n "$$clone" ]; then rm -rf "$$clone"; fi; \
	$(MAKE) release

# Anchored: an existing 19.1.0 tag or 9.1.0x branch must not block 9.1.0, and dots are not wildcards.
spc: ## Checks (anchored) that neither the release tag nor the release branch exists, locally or on origin
	@if git rev-parse -q --verify "refs/tags/$(ONDEWO_SIP_VERSION)" >/dev/null; then echo "-- Test 1: Tag $(ONDEWO_SIP_VERSION) exists locally!!"; exit 1; fi
	@if git rev-parse -q --verify "refs/heads/release/$(ONDEWO_SIP_VERSION)" >/dev/null; then echo "-- Test 2: Branch release/$(ONDEWO_SIP_VERSION) exists locally!!"; exit 1; fi
	@rc=0; git ls-remote --exit-code --tags origin "refs/tags/$(ONDEWO_SIP_VERSION)" >/dev/null || rc=$$?; \
		if [ $$rc -eq 0 ]; then echo "-- Test 3: Tag $(ONDEWO_SIP_VERSION) exists on origin!!"; exit 1; \
		elif [ $$rc -ne 2 ]; then echo "-- Test 3: cannot list the tags of origin (git ls-remote exit $$rc)"; exit 1; fi
	@rc=0; git ls-remote --exit-code --heads origin "refs/heads/release/$(ONDEWO_SIP_VERSION)" >/dev/null || rc=$$?; \
		if [ $$rc -eq 0 ]; then echo "-- Test 4: Branch release/$(ONDEWO_SIP_VERSION) exists on origin!!"; exit 1; \
		elif [ $$rc -ne 2 ]; then echo "-- Test 4: cannot list the branches of origin (git ls-remote exit $$rc)"; exit 1; fi
	@echo "-- Tests 1-4: neither tag $(ONDEWO_SIP_VERSION) nor branch release/$(ONDEWO_SIP_VERSION) exists"

########################################################
# Build

update_package: ## Updates Package Version in src/package.json and in the committed root package.json and package-lock.json
	@perl -i -pe "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"${ONDEWO_SIP_VERSION}\"/g" src/package.json
	# The root manifest carries the version too, and it is the one a consumer installing this repo
	# by commit hash actually reads. It cannot simply be generated: install_dependencies restores
	# it with `git checkout --` (see there), so it is stamped here from the same single source.
	@perl -i -pe "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"${ONDEWO_SIP_VERSION}\"/g" package.json
	# The lockfile repeats the root version twice (top level and packages[""]); only those two are
	# stamped, never a dependency's version.
	@perl -0777 -i -pe 's/\A(\{\s*"name":\s*"[^"]*",\s*"version":\s*)"[0-9]+\.[0-9]+\.[0-9]+"/$${1}"${ONDEWO_SIP_VERSION}"/; s/("packages":\s*\{\s*"":\s*\{\s*"name":\s*"[^"]*",\s*"version":\s*)"[0-9]+\.[0-9]+\.[0-9]+"/$${1}"${ONDEWO_SIP_VERSION}"/' package-lock.json

build: refuse_devops_clone_in_tree check_out_correct_submodule_versions build_compiler update_package npm_run_build ## Build Code with Proto-Compiler
	-cd src/ondewo-sip-api && git checkout -- '**/*.proto' && cd ../..
	@$(eval README_CUT_LINES:=$(shell cat -n src/README.md | perl -ne 'print if /START OF GITHUB README/../END OF GITHUB README/' | grep -o -E '[0-9]+' | perl -pe 's/^0+//' | awk 'NR==1; END{print}'))
	@$(eval DELETE_LINES:=$(shell echo ${README_CUT_LINES}| perl -pe "s/[[:space:]]/,/"))
	@perl -i -ne 'BEGIN{($$s,$$e)=split/,/,"${DELETE_LINES}"} print unless $$. >= $$s && $$. <= $$e' npm/README.md
	make install_dependencies

# The codegen container mounts the repository root read-write, so a devops-accounts clone inside it
# would be handed to a container that has no use for credentials. ondewo_release clones into a
# temporary directory outside the repository; a leftover clone here stops the build.
refuse_devops_clone_in_tree: ## Fails when a devops-accounts clone sits in the repository root
	@if [ -e "$(DEVOPS_ACCOUNT_GIT)" ]; then \
		echo "ERROR: ./$(DEVOPS_ACCOUNT_GIT) exists; the codegen container mounts this directory. Delete it - ondewo_release clones the accounts into a temporary directory"; \
		exit 1; \
	fi

install_dependencies:
	# Deliberate: ng-packagr writes a generated root manifest over this one during npm_run_build,
	# and that generated manifest carries no devDependencies and no test scripts. Restoring the
	# committed file puts the tooling back — but it also reverts the version bump, which is why
	# update_package runs again immediately below, BEFORE npm ci installs from the lockfile.
	# npm ci installs exactly the committed package-lock.json, so the build never re-resolves a
	# dependency: the `npm i --save-dev <tool>` loop this replaced re-resolved eslint and its
	# plugins on every release and could silently move them to a different major.
	git checkout -- package.json package-lock.json 2>/dev/null || true
	make update_package
	rm -rf node_modules && $(NODE_RUN) npm ci --include=dev --legacy-peer-deps --no-audit --no-fund

check_out_correct_submodule_versions: ## Fetches all Submodules and checks out specified branch
	@echo "START checking out correct submodule versions ..."
	git submodule update --init --recursive
	git -C ${SIP_APIS_DIR} fetch --all
	git -C ${SIP_APIS_DIR} checkout ${SIP_API_GIT_BRANCH}
	@# The *_GIT_BRANCH vars normally pin a tag (tags/<version>), which leaves the submodule on a
	@# detached HEAD and makes `git pull` fail with "You are not currently on a branch" on every
	@# release. They have also held a real branch during feature work
	@# (SIP_API_GIT_BRANCH=OND211-2418-add-keycloak-for-2-fa), where the pull is what advances the
	@# checkout past what `fetch --all` left behind - so pull only when HEAD is on a branch, and
	@# stay non-fatal.
	-if git -C ${SIP_APIS_DIR} symbolic-ref -q HEAD >/dev/null; then git -C ${SIP_APIS_DIR} pull; fi
	git -C ${ONDEWO_PROTO_COMPILER_DIR} fetch --all
	git -C ${ONDEWO_PROTO_COMPILER_DIR} checkout ${ONDEWO_PROTO_COMPILER_GIT_BRANCH}
	-if git -C ${ONDEWO_PROTO_COMPILER_DIR} symbolic-ref -q HEAD >/dev/null; then git -C ${ONDEWO_PROTO_COMPILER_DIR} pull; fi
	@echo "DONE checking out correct submodule versions."

# The container src/package.json's `generate` script starts, run directly so the build needs no host
# npm, and with the version-tagged image build_compiler produced. The codegen runs as root, so the
# files it writes are handed back to the invoking user by the same image - no sudo on the host.
npm_run_build: ## Generates the stubs and the library in the proto-compiler container
	@echo "START npm run build ..."
	docker run --rm -v "$(CURDIR)/src":/input-volume -v "$(CURDIR)":/output-volume $(CODEGEN_IMAGE) ondewo-sip-api ondewo
	docker run --rm --entrypoint chown -v "$(CURDIR)":/output-volume $(CODEGEN_IMAGE) -R "$$(id -u):$$(id -g)" /output-volume
	@echo "DONE npm run build."

npm_run_generate: ## Runs test
	@echo "START generate files ..."
	cd src/ && npm run generate && cd ..
	-cd src/ondewo-sip-api && git checkout -- '**/*.proto' && cd ../..
	@echo "DONE generating files ."

test-in-ondewo-aim: ## Runs test
	@echo "START copying files to local AIM for testing ..."
	cd src/ && npm run test-in-ondewo-aim && cd ..
	@echo "DONE copying files to local AIM for testing."

test-in-ondewo-aim-copy-only: ## Runs test
	@echo "START copying files to local AIM for testing ..."
	cd src/ && npm run test-in-ondewo-aim-copy-only && cd ..
	@echo "DONE copying files to local AIM for testing."
