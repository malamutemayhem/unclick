# Handover - UnClick Browser Extension ("UnClick Local")

**As of:** 2026-06-25
**State:** Phase 7.0 + 4 day-one features MERGED to `main` (PR #1584, squash commit `05fc390`). CI green.
**You inherit this by:** `git checkout main && git pull`. It is all there. Do NOT rebuild it.
**Parent spec:** `docs/connectors/spec.md` (Phases 7-12 "UnClick Local"). Full plan: `docs/connectors/browser-extension-starter-plan.md`. Features: `packages/browser-extension/DAY-ONE-FEATURES.md`.

## What exists

Path: `packages/browser-extension/`

- `src/` (tested TypeScript core, 43 tests pass, tsc clean):
  - `shape.ts` - strips every captured value on device into a type-only Shape (the trust core)
  - `privacy.ts` - off / me_only / public tiers (default me_only) + k-anonymity gate
  - `connector-draft.ts` - merge shapes; classify read vs write
  - `redaction-report.ts` - value-free "what was stripped" preview
  - `memory.ts` - save_fact request builders (key only in the Authorization header)
  - `status.ts` - connection + signals summaries + toolbar badge
  - `coverage.ts` - per-host counts + learn-this-site decision
  - `*.test.ts` - includes CANARY tests proving no captured value survives into a shape or report
- `extension/` - Manifest V3 scaffold: `inject.js` (page hook), `content.js`, `background.js` (strips on device, applies tier, save-to-memory, status), `panel.html` / `panel.js` (glass box: status, save-page, coverage, redaction preview), `options.html` / `options.js` (API key), `manifest.json`, plus `core.js` / `api.js`.

## Invariants - do not break (the canary tests enforce these)

1. Shape, not data: only structure (endpoint, names, schema) is kept; values are dropped on device.
2. Reads can auto-promote; writes are always consent-gated and never auto-promoted.
3. Public sharing only past the k-anonymity threshold; per-site default is me_only.
4. API key travels only in the Authorization header, never in a body or log.

## Gotchas (read before editing)

- **NOT an npm workspace.** `package.json` was removed so the strict root `npm ci` rail stays green (the 790KB `package-lock.json` could not be regenerated through the connector). Tests run via the root `vitest.config.ts` path-include (like `copypass`). If you re-add `package.json` you MUST also regenerate `package-lock.json` or CI (`Website (root package)`) breaks at `npm ci`.
- **Two mirror files:** `extension/core.js` and `extension/api.js` are hand-mirrors of `src/*.ts`. Keep them in sync until the Phase 7.2 bundler makes `src/` the single source. Adding the bundler is the right next infra step.
- **Style:** no em dashes anywhere in code or content (repo rule).
- **Pushing from the remote env:** plain `git push` is blocked (proxy creds). Use the UnClick GitHub connector `github_action push_files`; if a branch ref 404s, `create_branch` first. Commit early and often so work is not lost to container wipes.
- `status` calls `check_signals` + `keychain_status` best-effort; response parsing may need tweaks against the live MCP. Summarizers degrade gracefully.

## Verify locally

```
cd packages/browser-extension
npx vitest run                      # 43 pass
npx tsc --noEmit -p tsconfig.json   # clean
```

## Next (deferred, per spec)

7.1 wire off / me-only / public + "learn this site?" prompt. 7.2 bundle TS core into the extension + local MCP server / native messaging (fork `hangwin/mcp-chrome`). 7.3 opt-in public upload behind k-anonymity. 8 Co-Pilot execution. 9 alias email / TOTP. 10 mandate layer. 11 skill marketplace. 12 Bonded Cloud. Each behind the consent boundary; prompt injection is flagged in `docs/security/current-posture.md`.

## To actually run it in a browser

Load unpacked: chrome://extensions -> Developer mode -> Load unpacked -> `packages/browser-extension/extension` -> set API key in its Settings. Public install = Chrome Web Store, later.

## Ownership

This package now has ONE owner (the browser chat). Other lanes: stay out of `packages/browser-extension/**` to avoid stomping.
