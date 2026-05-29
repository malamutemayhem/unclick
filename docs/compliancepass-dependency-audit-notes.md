# CompliancePass Dependency Audit Notes

**Date:** 2026-05-28
**Command:** `npm audit --audit-level=moderate --json`
**Scope:** Local UnClick worktree after the CompliancePass dependency-hardening pass.

## Summary

The dependency audit is materially improved and no longer has a High or Critical blocker:

- total: 4
- critical: 0
- high: 0
- moderate: 4

CompliancePass can treat the old High/Critical dependency cross as cleared. The remaining four items are Moderate and all trace to the same Drizzle Kit development-tooling chain:

- `drizzle-kit`
- `@esbuild-kit/esm-loader`
- `@esbuild-kit/core-utils`
- nested `esbuild@0.18.20`

`npm audit fix --force` proposes `drizzle-kit@0.18.1`, which is a risky downgrade from the current `drizzle-kit@0.31.10`. That path is not acceptable as a blind CompliancePass fix.

## 2026-05-28 Follow-Up Research

The current npm registry state was checked again during the final pass:

- `drizzle-kit@0.31.10` is still the stable `latest` release.
- That stable line still depends on deprecated `@esbuild-kit/esm-loader` and `@esbuild-kit/core-utils`, which is where the nested `esbuild@0.18.20` Moderate advisory comes from.
- `drizzle-kit@1.0.0-rc.3` removes the deprecated `@esbuild-kit` chain and made `npm audit` report 0 vulnerabilities in a test install.
- The release-candidate path was rejected because the Drizzle Kit CLI failed to load cleanly, and pairing it with `drizzle-orm@1.0.0-rc.3` broke the API build and tests.
- Rollback proof: `drizzle-kit@0.31.10` plus `drizzle-orm@0.45.2` restored `npm run build --workspace=apps/api`, `npm test --workspace=apps/api`, and `npm exec --workspace=apps/api -- drizzle-kit --help`.

## Direct Upgrade Groups Applied

- `@anthropic-ai/sdk`
- `@vercel/node`
- `drizzle-orm`
- `drizzle-kit`
- `fast-xml-parser`
- `hono`
- `@hono/node-server`
- `vite`
- `imap`
- Vercel transitive override set for `path-to-regexp`, `undici`, `minimatch`, `smol-toml`, and `ajv`
- root `esbuild` dev dependency to keep the top-level toolchain valid

## Verification

- `npm audit --audit-level=moderate --json` now reports 4 Moderate, 0 High, and 0 Critical.
- `npm ls vite esbuild --depth=3` exits cleanly.
- `npm run build --workspace=apps/api` passes.
- `npm test --workspace=apps/api` passes: 30 files, 686 tests.
- `npm exec --workspace=apps/api -- drizzle-kit --help` passes on the restored stable toolchain.

## CompliancePass Position

The former High/Critical dependency blocker is cleared. Keep the remaining Moderate Drizzle Kit development-tooling chain as a tracked follow-up for SecurityPass or the dependency-upgrade lane, because the package manager's offered fix is a breaking downgrade and the tested release-candidate path is not yet safe for this API stack.
