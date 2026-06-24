# @unclick/browser-extension

UnClick Local browser extension - Phase 7 "discovery sensor".

See `docs/connectors/browser-extension-starter-plan.md` for the full plan and
`docs/connectors/spec.md` (Phases 7-12) for the parent architecture.

## What it does

Watches sites you already use and learns their **shape** (endpoints, field names, response
structure) so connectors can be drafted automatically. It strips every **value** on the device
before anything is stored. It does not act on sites, store credentials, or upload anything in this
slice.

## Core modules

- `src/shape.ts` - capture an exchange, strip all values, produce a type-only shape.
- `src/privacy.ts` - off / me-only / public tiers (default me-only) and the k-anonymity gate.
- `src/connector-draft.ts` - merge shapes into a connector draft; classify read vs write.
- `src/redaction-report.ts` - value-free preview of what stripping removed.
- `src/memory.ts` - build the save_fact request (key only in the Authorization header).
- `src/status.ts` - connection + signals summaries and the toolbar badge.
- `src/coverage.ts` - honest per-host coverage counts and the learn-this-site decision.

## The trust contract

The site network is built from **shapes**, not your data. The canary tests in `src/shape.test.ts`
and `src/redaction-report.test.ts` prove that real values never survive into a shape or report.

## Run tests

This package is plain source for now (not an npm workspace), so its tests run via the repo's vitest.
The root CI includes `packages/browser-extension/src/**` in the root vitest run. Locally:

```bash
cd packages/browser-extension && npx vitest run
```

A `package.json` plus a `package-lock.json` entry returns with the Phase 7.2 bundler/publish step;
for now it is omitted so the strict root `npm ci` rail stays green.

## Extension scaffold

`extension/` holds a Manifest V3 scaffold (capture hook, background worker, glass-box panel, options
page). The authoritative, tested logic lives in `src/`. `extension/core.js` and `extension/api.js`
are hand-mirrors of the TS core used by the scaffold until the Phase 7.2 bundler replaces them with a
compiled bundle of `src/`.
