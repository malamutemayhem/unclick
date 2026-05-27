# CompliancePass Verification Notes

**Date:** 2026-05-27
**Branch:** `codex/compliancepass-complete-20260527`

## Current CompliancePass Receipt

- product: CompliancePass
- score: 95.8
- band: amber
- checks_total: 27
- gaps: 5
- valid_until: 2026-06-03, refreshed by `npm run compliancepass:report`

The amber band is intentional. The score is high, but a high-severity dependency audit backlog remains open and should not be presented as green readiness. The report also now tracks medium residuals for repo-wide lint, large-file ownership, GitHub push-protection proof, and the framework control-index gap.

The public dogfood receipt also treats CompliancePass as blocked while this amber/high-severity gap remains. A complete receipt is not enough for dogfood passing status.

## Passing Proof

- `npm run build --workspace=@unclick/compliancepass`
- `npm run test --workspace=@unclick/compliancepass`
- `npm run compliancepass:report`
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
- `npx eslint packages/compliancepass/src packages/mcp-server/src/compliancepass-tool.ts packages/mcp-server/src/compliancepass-tool.test.ts scripts/build-compliancepass-report.mjs scripts/enterprisepass-receipt-guard.test.mjs scripts/build-dogfood-report.mjs scripts/build-dogfood-report.test.mjs`
- `git diff --check`

Additional guard checks:

- public CompliancePass report omits local `repo_path`
- public receipt guard rejects local path leakage
- evidence summaries redact secret-shaped values and local home/worktree paths
- each top-level gap carries evidence pointers
- dogfood blocks CompliancePass when the report is amber/red or has high/critical gaps
- dogfood blocks stale CompliancePass receipts older than 168 hours
- CompliancePass names the expected framework lenses while keeping a medium gap open until control-level mapping exists
- CompliancePass now publishes JSON, Markdown, and HTML report views at `public/enterprise/latest.*`

## Residual Readiness Gaps

### Dependency Audit Backlog

`npm audit --audit-level=moderate --json` reports:

- total: 34
- critical: 0
- high: 17
- moderate: 17

The dry-run command `npm audit fix --package-lock-only --ignore-scripts --dry-run --json` reported zero package changes. Treat this as a SecurityPass or dependency-upgrade lane, not a blind forced update.

### Repo-Wide Lint Backlog

`npm run lint` currently fails outside the CompliancePass slice with 569 existing errors and 19 warnings. The visible classes are mostly:

- test files using `any`
- React hook `set-state-in-effect` findings
- a few isolated no-useless-assignment, no-control-regex, prefer-const, no-empty, and no-require-imports findings

The CompliancePass files added or changed in this slice lint clean with the focused ESLint command listed above.

### Secret-Scanning Repo-Level Proof

The docs record GitHub push protection as policy, and SecurityPass includes a gitleaks probe, but `docs/security/current-posture.md` still says the repo-level push-protection setting should be confirmed in GitHub settings. CompliancePass therefore treats this as partial proof until a settings screenshot, GitHub API receipt, or blocking secret-scan workflow receipt is linked.

### Large-File Review Risk

The large-file risk register is present and documents the top oversized source files. The gap remains medium because the files are still oversized; the register is evidence of ownership, not a replacement for later reduction.

### Framework Control Index

`docs/compliancepass-framework-mapping.md` now maps current evidence to ISO/IEC 27001:2022, ISO/IEC 42001:2023, NIST SP 800-218 v1.1, OWASP SAMM v2, OpenSSF Scorecard, SLSA, SIG, CAIQ, and VC technical due diligence language.

The gap remains medium because this is Phase 0 evidence alignment. CompliancePass still needs a generated control-by-control index with evidence rows, owner, status, and last-proof timestamp for each mapped control before this can be treated as complete buyer-ready framework mapping.
