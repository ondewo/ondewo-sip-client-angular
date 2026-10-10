# Release History

*****************

## Release ONDEWO SIP Angular Client 5.5.0

### New Features

* Tracking API Version [5.5.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/5.5.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) ). The generated `SipClient` gains:
  * `sipSetCallMediaControl` (`SipSetCallMediaControlRequest`, `MediaControlSetting`, `MediaControlOwner`): call-scoped operator media control (mute the bot, pause its listening, mark invited participants present). Requires the `x-ondewo-expected-call-id` and `x-ondewo-sip-call-control-token` metadata.
  * `sipStreamCallAudio` (`SipCallAudioRequest` / `SipCallAudioResponse` and the `SipCallAudio*` messages): bidirectional live call audio. The gRPC-web protocol a browser speaks carries no client or bidirectional streams, so this method needs a transport that does.
  * `sipReportAnsweringMachineDetected`, the in-container answering machine detection report.
* New messages and fields: `AnsweringMachineDetectionResult`, status `OUTGOING_CALL_ANSWERING_MACHINE_DETECTED`, `SipStatus.amdResult` / `callId` / `botMuted` / `listeningPaused` / `callAudioStreams` / `sipResponseCode`, `SipEndCallRequest.endReason` (`ANSWERING_MACHINE`, `ANSWERING_MACHINE_VOICE_MESSAGE_LEFT`, `END_CALL_REASON_TRANSFERRED`) and `SipEndCallRequest.amdResult`, `SipTransferCallRequest.outcomeTimeoutMs`.
* Call identity: requests can be scoped to one call with the `x-ondewo-expected-call-id` gRPC metadatum; a different value is refused on `sipTransferCall`, `sipMute`, `sipUnMute` and `sipPlayWavFiles`.
* The API is purely additive: no field, enum value or RPC was renumbered or removed, so code written against 5.4.x keeps compiling. `SipGetSipStatus` / `SipGetSipStatusHistory` now declare `idempotency_level = NO_SIDE_EFFECTS` in the proto (no effect on the generated Angular code).

### Build

* Generated with ondewo-proto-compiler 5.15.5 (5.4.4 was generated with 5.15.2).

*****************

## Release ONDEWO SIP Angular Client 5.4.4

### Improvements

* **TLS endpoint builder for the browser gRPC-web client.** `buildGrpcWebHost(config)` turns the `host` / `port` /
  `useSecureChannel` fields every ONDEWO SDK takes into the gRPC-web base URL (the `host` setting of
  `@ngx-grpc/grpc-web-client`): `https://` by default; `http://` only with `useSecureChannel: false`, and then a
  `console.warn` naming `host:port`. A bare IPv6 literal is bracketed (`https://[::1]:8443`); a host that already
  carries an `http(s)://` scheme is used as given, and an `http://` URL together with `useSecureChannel: true` is
  refused.
* **Certificate and key fields are refused instead of being silently dropped.** In a browser the user agent owns the
  TLS handshake: it trusts its own certificate store and presents a client certificate only from the browser / OS
  store, so application code can neither add a CA nor attach a client identity. A non-empty `grpcCert`,
  `grpcClientCert` or `grpcClientKey` (or their snake_case spellings, listed in `BROWSER_UNSUPPORTED_TLS_FIELDS`)
  throws a `GrpcWebEndpointError`; a private key is never shipped to a browser. An empty host, a `host:port` string,
  and a port outside 1-65535 are refused as well. Error messages name the field, never its value.
* Mutual TLS works through the browser's certificate store, or by letting the gRPC-web proxy (Envoy) terminate the
  browser's TLS and use mutual TLS upstream. Node.js callers that need certificates in code use the nodejs client.
* README: new section "TLS, mutual TLS and certificates" (modes table, Angular example, openssl test PKI, security
  notes, troubleshooting of the browser's handshake errors).

### Tests

* Unit tests for every rule above; real-handshake tests run the built URL against an HTTPS server with an in-test
  openssl PKI (trusted CA, CRLF-encoded CA, unrelated CA, client certificate required, `[::1]`).
* A jest spec pins the release-notes slice: the Makefile's slice command, the spelling of every heading, the closing
  `*****` separators, one section per version, non-empty notes for the released version, and `src/RELEASE.md`
  identical to `RELEASE.md`.

### Documentation

* RELEASE.md regains the sections and bullets that only the GitHub release bodies or the tags carried, and
  misspelled headings now match the Makefile's slice.

### Build

* Generated with ondewo-proto-compiler 5.15.2 (5.4.3 was generated with 5.13.0).
* The release stages the regenerated root build outputs, so the release tag describes the package npm receives.
* The release no longer errors on the removed `esm2022` output or on `git pull` in a submodule pinned to a tag
  (detached HEAD); the missing pre-commit configuration was added.

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
* Tracking API Version [4.0.0](https://github.com/ondewo/ondewo-sip-api/releases/tag/4.0.0) ( [Documentation](https://ondewo.github.io/ondewo-sip-api/) )

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
