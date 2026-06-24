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

## The trust contract

The site network is built from **shapes**, not your data. The canary test in `src/shape.test.ts`
proves that real values never survive into a shape.

## Run tests

```bash
npx vitest run
```

## Extension scaffold

`extension/` holds a Manifest V3 scaffold (capture hook, background worker, glass-box panel). The
authoritative, tested logic lives in `src/`. `extension/core.js` is a hand-mirrored copy used by the
scaffold until the Phase 7.2 bundler step replaces it with a compiled bundle of `src/`.
