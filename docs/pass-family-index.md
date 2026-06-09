# XPass product index

**Status**: Canonical lookup for every XPass product. Aligns with the locked naming contract in [`docs/prd/xpass.md`](./prd/xpass.md). File path is retained for link stability.
**Last updated**: 2026-05-31.
**Owner**: Product and XPass maintainers.

## How to read this

Each row names a Pass, its current promotion tier, the brief that owns the scope contract, the public dogfood surface (if any), and the rule XPass uses to decide whether to route a target to that Pass. The promotion ladder lives in the XPass PRD.

If a row here disagrees with the locked PRD, the PRD wins. If a row here disagrees with an individual brief, the brief wins for scope details and this file wins for tier and routing.

Status note: PR #1219 merged the 2026-05-30 XPass receipt surfaces into `main`. The current correction is presentation and checklist depth: each Pass should expose a large product-specific QC checklist, with hundreds of rows across the XPass family, not only a small receipt summary.

## Live gates or public dogfood

| Pass | Brief | Dogfood surface | XPass routes here when |
| --- | --- | --- | --- |
| TestPass | [`docs/prd/testpass.md`](./prd/testpass.md), [`docs/testpass-phase-9a-visual-brief.md`](./testpass-phase-9a-visual-brief.md) | `public/testpass/` recurring runs and `/admin/testpass` | the target is an MCP server, marketplace submission, or a PR that touches a tool wiring |
| UIPass | [`docs/uipass-product-brief.md`](./uipass-product-brief.md) | Admin checklist surface first | the target changes layout, spacing, typography, mobile fit, hierarchy, screenshots, visual consistency, or polish |
| UXPass | [`docs/uxpass-product-brief.md`](./uxpass-product-brief.md) | `public/uxpass/site-sweep.json` and `/admin/uxpass` | the target changes a journey, form, onboarding path, feedback, recovery, navigation, or task-completion experience |
| CommonSensePass | [`docs/commonsensepass-rule-matrix.md`](./commonsensepass-rule-matrix.md) | embedded checks under the dogfood index | the target is automation, orchestration logic, or anywhere a "no green chip without evidence" rule applies |
| WakePass | [`docs/prd/wakepass.md`](./prd/wakepass.md) | action-needed feed on the admin jobs page and public-safe boundary sweep | a Pass result needs an owner to act, a scheduled check missed its ACK, or a receipt has gone stale |

## Package-ready

These have shipped product packages and MCP tools. They get promoted to the dogfood page only when a full current XPass package sweep proves them safe.

| Pass | Brief | Promotes through | XPass routes here when |
| --- | --- | --- | --- |
| SlopPass | [`docs/sloppass-product-brief.md`](./sloppass-product-brief.md), [`docs/prd/sloppass-chunk2.md`](./prd/sloppass-chunk2.md) | scheduled package sweep | the target is a PR diff, source file, or any artifact where deterministic static smells apply |
| SecurityPass | [`docs/securitypass-product-brief.md`](./securitypass-product-brief.md), [`docs/prd/securitypass-chunk2.md`](./prd/securitypass-chunk2.md) | scheduled package sweep, scope-gated probes | the target is in declared scope and the run is either static evidence or an explicitly authorised active probe |
| SEOPass | [`docs/seopass-product-brief.md`](./seopass-product-brief.md) | scheduled package sweep | the target is a public URL or a site sweep entry asking for search-readiness evidence |
| CopyPass | [`docs/copypass-product-brief.md`](./copypass-product-brief.md), [`docs/prd/copypass-chunk2.md`](./prd/copypass-chunk2.md) | scheduled package sweep | the target is a copy block (hero, pricing, ad, email, legal, or product copy) supplied by the caller or by a CopyRoom packet |
| FidelityPass | [`docs/prd/xpass-closure-board.md`](./prd/xpass-closure-board.md) | CopyRoom receipt wrapper | the target includes exact 1:1 copying, transcription, mirroring, or preservation that needs copy-fidelity proof |
| LegalPass | [`docs/legalpass-product-brief.md`](./legalpass-product-brief.md) | scheduled package sweep | the target is a privacy policy, ToS, OSS licence text, or an issue-spotter request scoped to phase-one hats |
| FlowPass | [`docs/flowpass-product-brief.md`](./flowpass-product-brief.md) | scheduled package sweep | the target is a user-flow fixture or a public journey with safe fixture evidence |
| GEOPass | [`docs/geopass-product-brief.md`](./geopass-product-brief.md) | scheduled package sweep | the target is a public URL and the question is "is this readable by AI answer engines" |

## Boundary or guidance

These cannot dogfood in public the same way. They use the boundary sweep, which keeps secrets, live queues, unsafe probes, and certification claims out of the receipt.

| Pass | Brief | Promotes through | XPass routes here when |
| --- | --- | --- | --- |
| RotatePass | [`docs/rotatepass-chunk-2-prd.md`](./rotatepass-chunk-2-prd.md), [`docs/rotatepass-local-phase0.md`](./rotatepass-local-phase0.md) | public-safe boundary sweep | the target is a credential rotation, connector hygiene check, or a redaction-guard request |
| WakePass (boundary) | [`docs/prd/wakepass.md`](./prd/wakepass.md) | public-safe boundary sweep | the target is an action-needed dispatch or missed-ACK visibility check that should appear in the boundary receipt |
| CompliancePass | [`docs/compliancepass-product-brief.md`](./compliancepass-product-brief.md), [`docs/compliancepass-control-index.md`](./compliancepass-control-index.md) | readiness-only output, no certification | the target needs a future-regret readiness snapshot that cross-references other Pass receipts |

## Archived or parked

- **BackstagePass** as a brand/product. Code may be borrowed when useful. User-facing language should prefer Connections or Connectors. Treat any UI string, marketing page, or new brief that names BackstagePass publicly as a CopyPass finding.

## Legacy naming pointers

- **EnterprisePass** is the old internal name for CompliancePass. Existing receipts under `public/enterprise/` keep the legacy path for link stability; the `product` field inside the JSON is `CompliancePass`.
- **QualityPass** is retired wording for SlopPass.
- **QCPass** is process wording for a final XPass/QC receipt, not an official XPass product unless the operator explicitly promotes it.

## Maintenance rule

When a Pass moves tiers, the PR that moves it must update three places in the same change:

1. this file (tier column and routing rule)
2. [`docs/prd/xpass.md`](./prd/xpass.md) XPass product map and, if needed, the promotion ladder
3. the dogfood index and any BrainMap entry that mentions the Pass

Silent tier changes are not allowed. The Closure Board green chip depends on these three places agreeing.
