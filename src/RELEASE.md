# Release History

*****************

## Release ONDEWO SIP Angular Client 5.4.3

### Bug Fixes

* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) The hand-written auth surface moved from `src/lib/auth` to `src/auth`. `lib` is ng-packagr's `dest` (declared in the proto compiler's `ng-package.json`) and ng-packagr deletes `dest` before tsc compiles the entry point, so hand-written sources kept under it were gone by the time the generated public-api barrel re-exported them and the library build died with `error TS2307: Cannot find module './lib/auth'`. `src/auth` is also the first location the compiler's `generate-public-api.sh` looks in, and the layout `ondewo-nlu-client-angular` already builds green with.
* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) The Makefile now pins [ondewo-proto-compiler 5.13.0](https://github.com/ondewo/ondewo-proto-compiler/releases/tag/5.13.0), the version that re-exports the hand-written auth barrel from the generated public-api. 5.4.2 announced that re-export but was built with the 5.11.0 the Makefile still pinned - which emits no such export - so no `AuthGrpcInterceptor`, `KeycloakTokenProvider`, `provideOndewoSipAuth` or `authHttpInterceptor` symbol reached the published package.

### Improvements

* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) A jest guard (`src/auth/ng-packagr-dest.spec.ts`) reads `dest` out of the ng-package.json the build itself uses and fails when the hand-written barrel sits inside it, so the deletion trap cannot be re-armed by a later move. CI checks out submodules so the guard can read that configuration instead of a hard-coded directory name.
* Tracking API Version [5.4.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.4.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) )

*****************

## Release ONDEWO SIP Angular Client 5.4.2

### Bug Fixes

* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) Regenerated with [ondewo-proto-compiler 5.13.0](https://github.com/ondewo/ondewo-proto-compiler/releases/tag/5.13.0).
* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) The hand-written `auth/` surface is now re-exported from the generated public-api barrel. It was compiled and shipped inside the package but nothing re-exported it, so importing a symbol from the package root did not resolve and consumers could only deep-import the module. The re-export is emitted by the compiler, so it survives the regeneration that rewrites the barrel on every build.
* [[OND221-2830]](https://ondewo.atlassian.net/browse/OND221-2830) Tooling: `conventional-pre-commit` now runs before `giticket` at the commit-msg stage - with giticket first, its `[OND221-2830] fix: ...` rewrite was no longer valid Conventional Commits and every commit on a ticket branch failed. `README.md` is prettier-ignored where `.prettierrc` sets `useTabs` and markdownlint's MD010 de-tabs the same blocks, and the codegen `docker run` invocations no longer pass `-it`, which fails outside a TTY.

***************** 
## Release ONDEWO SIP Angular Client 5.4.1 
 
### Bug Fixes 
 * GitHub release notes are no longer empty: the root RELEASE.md, which the release body is read from, is now kept in sync with src/RELEASE.md, which the release notes are written into. 
 * The husky pre-commit hook no longer aborts an automated release by invoking pre-commit in a repo that ships no .pre-commit-config.yaml. 
 
### Improvements 
 * Tracking API Version [5.4.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.4.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 


***************** 
## Release ONDEWO SIP Angular Client 5.4.0 
 
### Improvements 
 * Tracking API Version [5.4.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.4.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 


***************** 
## Release ONDEWO SIP Angular Client 5.3.0 
 
### Improvements 
 * Tracking API Version [5.3.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.3.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 


***************** 
## Release ONDEWO SIP Angular Client 5.2.0 
 
### Improvements 
 * Tracking API Version [5.2.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.2.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 

***************** 
## Release ONDEWO SIP Angular Client 5.1.0 
 
### Improvements
 * Optimized for Angular 16 (esm2022 and fesm2022)
 * Tracking API Version [4.0.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.1.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 

***************** 
## Release ONDEWO SIP Angular Client 4.0.0 
 
### Improvements 
 * Tracking API Version [4.0.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/4.0.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ) 

*****************

## Release ONDEWO SIP Angular Client 3.1.0

* Track version 3.1.0 of [ONDEWO SIP API](https://github.com/ondewo/ondewo-sip-api/releases/3.1.0)
* [[OND211-2039]](https://ondewo.atlassian.net/browse/OND211-2039) - Implemented automated release for GitHub and NPM
* [[OND211-2039]](https://ondewo.atlassian.net/browse/OND211-2039) - Added pre-commit hooks and adjusted files to them

*****************
