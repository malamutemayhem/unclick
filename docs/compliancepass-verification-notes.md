# CompliancePass Verification Notes

**Date:** 2026-05-28
**Branch:** `codex/compliancepass-complete-20260527`

## Current CompliancePass Receipt

- product: CompliancePass
- score: 99.3
- band: green
- checks_total: 27
- checks_pass: 26
- checks_partial: 1
- checks_fail: 0
- gaps: 1
- blocking_gap_count: 0
- valid_until: 2026-06-03 UTC, refreshed by `npm run compliancepass:report`

The former High/Critical dependency blocker is cleared. The former repo-wide lint error backlog is cleared. CompliancePass is green because no High or Critical gaps remain. The report still tracks one Medium follow-up: large-file reduction.

## Passing Proof

- `npm run build --workspace=@unclick/compliancepass`
- `npm run test --workspace=@unclick/compliancepass`
- `npm run compliancepass:report`
- `npm run build --workspace=apps/api`
- `npm test --workspace=apps/api` - 30 files, 686 tests
- `npm audit --audit-level=moderate --json` - 4 Moderate, 0 High, 0 Critical
- `npm ls vite esbuild --depth=3`
- `npx eslint . --format json` - exits 0 with 0 errors and 74 warnings
- `node scripts/build-dogfood-report.mjs --dry-run`
- `npm run test:compliancepass-receipt`
- `node --test scripts/build-dogfood-report.test.mjs`
- `npx vitest run src/__tests__/dogfood-report-proof-policy.test.ts`
- `npx vitest run src/compliancepass-tool.test.ts` from `packages/mcp-server`
- `npx vitest run src/qc-tool.test.ts` from `packages/mcp-server`
- `npm run build --workspace=@unclick/mcp-server`
- `npm run brainmap:check`
- `npm run build`
- `npm test`
- focused ESLint on the CompliancePass, MCP, dogfood, API, and shared-type files changed in this pass
- `git diff --check`

Additional guard checks:

- public CompliancePass report omits local `repo_path`
- public receipt guard rejects local path leakage
- evidence summaries redact secret-shaped values and local home/worktree paths
- each top-level gap carries evidence pointers
- dogfood blocks stale CompliancePass receipts older than 168 hours
- CompliancePass names the expected framework lenses and links the control index at `docs/compliancepass-control-index.md`
- CompliancePass publishes JSON, Markdown, and HTML report views at `public/enterprise/latest.*`
- GitHub Secret Protection and push protection proof is linked through screenshot receipt `ss_7915ye3zi`

## Research Refreshed

The framework pass was refreshed against official sources on 2026-05-28:

- NIST SP 800-218 SSDF v1.1 final baseline: https://csrc.nist.gov/pubs/sp/800/218/final
- NIST SSDF publications list, including SP 800-218A final AI profile and SP 800-218 Rev. 1 draft monitor item: https://csrc.nist.gov/Projects/ssdf/publications
- OWASP SAMM: https://owaspsamm.org/model/
- OpenSSF Scorecard: https://openssf.org/scorecard/
- SLSA current specification, currently v1.2: https://slsa.dev/spec/latest/
- SLSA provenance guidance: https://slsa.dev/spec/v0.1/provenance
- CSA CAIQ: https://cloudsecurityalliance.org/artifacts/caiq-v4-1
- Shared Assessments SIG: https://sharedassessments.org/about-sig/
- ISO/IEC 27001:2022: https://www.iso.org/standard/27001
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001

## Cleared This Pass

- Dependency audit High/Critical blocker: targeted upgrades and verified installs reduced `npm audit` from the earlier 34 total, 17 High state to 4 total, 0 High, 0 Critical.
- API build gap: `apps/api` now passes `tsc --noEmit`.
- API test proof: `apps/api` remains green at 30 test files and 686 passing tests.
- Hidden SQL seed parse errors: escaped embedded backticks and template-literal content in `apps/api/src/db/index.ts`.
- QR route response typing: `apps/api/src/routes/qr.ts` now returns a binary `Response` shape accepted by Hono and TypeScript.
- Ownership check schema mismatch: removed a stale `links.deletedAt` check because the `links` table has no deleted-at column.
- Pagination metadata typing: shared pagination metadata now accepts routes that expose `has_more`, `total_pages`, or both.
- Generated dist lint noise: nested `dist` folders are now ignored by ESLint.
- GitHub push-protection proof: `docs/security/current-posture.md` records the 2026-05-28 GitHub Advanced Security screenshot receipt `ss_7915ye3zi`, showing Secret Protection and push protection enabled for `malamutemayhem/unclick`.
- Framework control index: `docs/compliancepass-control-index.md` maps framework/control rows to CompliancePass check id, evidence path, owner, status, last proof, and freshness window.
- Dependency audit follow-up research: `drizzle-kit@1.0.0-rc.3` was tested and rejected because it broke the Drizzle CLI/API stack; the stable toolchain was restored and verified.
- Repo-wide lint noise reduction: ESLint now treats test/mock `any` usage as acceptable in test files while production `any` remains enforced; small production lint fixes cleared loose types, regex escapes, old `require`, and useless starter assignments in touched XPass/MCP utility areas.
- Repo-wide lint error backlog: `npx eslint . --format json` now exits 0 with 0 errors. Remaining findings are warnings only, mostly React compiler adoption items.

## Residual Readiness Gaps

### Repo-Wide Lint Warning Backlog

`npx eslint . --format json` now exits clean with 0 errors and 74 warnings across 55 files with findings. This is improved from the previous generated-dist count of 572 errors and 21 warnings across 102 files, from the pre-policy count of 475 errors and 21 warnings across 97 files, and from the last pass count of 70 errors and 24 warnings.

The visible classes are mostly:

- React compiler adoption warnings such as `set-state-in-effect`, `purity`, and `use-memo`
- React refresh export-shape warnings
- two traditional hook dependency warnings
- seven stale or unused ESLint directive warnings

The test-file `any` backlog is no longer counted as a production lint blocker. That was moved into ESLint policy because most of the previous findings were mocks and test harnesses rather than product code.

The CompliancePass files added or changed in this slice are covered by the focused ESLint command listed above.

### Large-File Review Risk

The large-file risk register is present and documents the top oversized source files. The gap remains Medium because the files are still oversized; the register is evidence of ownership, not a replacement for later reduction.

### Moderate Dependency Follow-Up

`npm audit` still reports 4 Moderate items in the Drizzle Kit development-tooling chain. The package manager's forced fix is a risky downgrade, so this stays routed to SecurityPass or the dependency-upgrade lane instead of being hidden.

The tested release-candidate path is also not acceptable yet: it removes the deprecated `@esbuild-kit` chain, but it failed CLI/API compatibility checks in this worktree.
