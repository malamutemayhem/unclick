# XPass Closure Board

**Status:** working inventory and completion board  
**Last truth refresh:** 2026-05-31 Australia/Sydney. PR #1219 merged the family reconciliation to `main`; this follow-up corrects the Admin UI from a tiny receipt wrapper into the intended large QC checklist view.
**Purpose:** keep the XPass product family honest until every check is either complete, deliberately parked, or clearly not applicable for a run.

## Operating Model

XPass should be a full QC checklist system.

That means every XPass run considers the whole family and records each row as one of:

| Mark | Meaning |
| --- | --- |
| ✓ | complete enough to run as evidence today |
| ~ | real but not 100 percent complete |
| ✗ | not built enough to count |
| N/A | not applicable to this target or request |

This does not mean every expensive runner executes every time. The lightweight checklist always considers the whole product family and every product-specific row. Deep runners only run when the row applies.

## Current Completion Board

| XPass product | Keep? | Complete? | Current truth | To close the loop |
| --- | --- | --- | --- | --- |
| TestPass | Yes | ✓ | Strongest XPass product today. Package exists, tests exist, live MCP proof and dogfood receipt exist. TestPass PR smoke is the standing cloud gate for the suite. | Keep as default trust gate and make sure receipts stay scoped to the target. |
| UXPass | Yes | ✓ | Annotated visual evidence receipt landed through PR #1219. Fetch-only runs warn when screenshot/mobile/desktop proof is missing. | Keep improving visual critique quality beyond accessibility and fixture checks. |
| SecurityPass | Yes | ✓ | Safe receipt surface landed through PR #1219. It exposes redacted SecurityPass run/status proof without leaking secrets. | Keep deny-by-default scope gates, and only add active probes with explicit future authorisation. |
| CopyPass | Yes | ✓ | Live receipt envelope landed through PR #1219. It separates copy-quality proof from exact 1:1 fidelity. | Keep CopyPass for wording, claims, tone, clarity, and product-copy risk. |
| FidelityPass | Yes | ✓ | CopyRoom wrapper with explicit `N/A` behavior landed through PR #1219. It does not duplicate CopyRoom. | Use FidelityPass only when exact 1:1 copying, transcription, mirroring, or preservation is in scope. |
| CopyRoom | Adjacent | ✓ | Official exact-copy room remains the source of truth for 1:1 copy receipts. FidelityPass wraps it rather than replacing it. | Require a CopyRoom receipt whenever exact copying is requested. |
| LegalPass | Yes | ✓ | Scoped receipt surface landed through PR #1219 with clear guidance-only and "not legal advice" boundaries. | Keep policy checks scoped and avoid certification or legal-advice claims. |
| SlopPass | Yes | ✓ | Live PR diff support landed through PR #1219. SlopPass is the public code-quality name; QualityPass stays retired. | Keep PR diff receipts target-SHA scoped and avoid forked quality-brand names. |
| CommonSensePass | Yes | ✓ | Worker-available tools, protocol playbook, fixture pack, and dogfood receipt were verified as no-code-needed and Boardroom-closed on 2026-05-30. | Enforce it before healthy, quiet, PASS, no-work, done, merge-ready, or duplicate-wake claims. |
| SEOPass | Yes | ✓ | Live metadata/search-readiness receipt landed through PR #1219. | Keep public-page, sitemap, robots, canonical, and search-readiness receipts current. |
| GEOPass | Yes | ✓ | Live AI-answer/readability receipt landed through PR #1219. | Feed shared answer-engine evidence back to SEOPass where useful. |
| FlowPass | Yes | ✓ | Live journey receipt envelope landed through PR #1219. | Keep journey evidence scoped to route, task, console, screenshot, and completion proof. |
| RotatePass | Yes | ✓ | Boundary receipt landed through PR #1219. It records credential ownership, staleness, blast-radius, and no-live-secret boundaries. | Keep proof public-safe: no raw credential values, no live secret probes, no destructive provider action. |
| WakePass | Yes | ✓ | Boundary receipt landed through PR #1219. It records ACK, stale reclaim, liveness, and no-live-wake boundaries. | Keep proof public-safe: no live queue touch, no live workers, no notifications, no route adapter calls. |
| CompliancePass | Yes | ✓ | Readiness receipt envelope landed through PR #1219 with "not certification" language. | Keep automated evidence checks readiness-only and cross-reference other Pass receipts. |

## 2026-05-30 Proof Snapshot

These rows were closed or verified during the 2026-05-30 XPass completion run:

| Slice | Proof |
| --- | --- |
| Aggregated XPass verdict | PR #1193, cloud-green, adds target-SHA-bound `xpass_aggregated_verdict`. |
| FidelityPass | PR #1200, cloud-green, CopyRoom wrapper with `N/A`. |
| CommonSensePass | Boardroom no-code closure, worker exposure and fixtures verified. |
| SlopPass | PR #1201, cloud-green, live PR diff support. |
| CopyPass | PR #1203, cloud-green, live receipt envelope. |
| SecurityPass | PR #1204, cloud-green, redacted safe receipt surface. |
| GEOPass | PR #1206, cloud-green, live AI-answer receipt. |
| LegalPass | PR #1207, cloud-green, scoped guidance receipt. |
| SEOPass | PR #1209, cloud-green, live search-readiness receipt. |
| FlowPass | PR #1210, cloud-green, live journey receipt. |
| CompliancePass | PR #1211, cloud-green, readiness receipt. |
| UXPass | PR #1212, cloud-green, annotated visual evidence receipt. |
| RotatePass | PR #1213, cloud-green, public-safe credential boundary receipt. |
| WakePass | PR #1214, cloud-green, public-safe wake boundary receipt. |

## Admin Presentation Rule

The Admin XPass page should feel like a large QC checklist, not an engineering dashboard and not a tiny receipt wrapper.

1. The XPass home shows a plain product card grid with the number of checklist rows per Pass.
2. Each product card opens that Pass's full QC checklist, not a five-row meta summary.
3. Each Pass owns product-specific groups. Example: CopyPass checks wording, claims, tone, source-copy, and AI-slop risk. SecurityPass checks secrets, auth, tenant scope, safe errors, and destructive-action gates.
4. Each checklist row uses simple marks: `PASS`, `FAIL`, `N/A`, `WARNING`, `ALERT`, or `WAITING`, with a short comment.
5. A report is green only when every relevant row is `PASS` or `N/A`.
6. PR numbers, hashes, and internal proof details stay behind the report, unless an operator deliberately opens evidence.

## Retired Or Historical Names

| Name | Status | Use instead |
| --- | --- | --- |
| EnterprisePass | Historical | CompliancePass |
| QualityPass | Retired | SlopPass |
| QCPass | Process wording | XPass final QC receipt unless Chris promotes it as its own product |
| BackstagePass | Parked | Connections or Connectors |

## Checklist Rule For Each XPass Run

Every XPass receipt should show:

1. target inspected
2. full product-specific checklist row list
3. row status: `PASS`, `FAIL`, `ALERT`, `WARNING`, `N/A`, or `WAITING`
4. evidence link or reason
5. owner action if blocked or missing
6. staleness or target SHA when relevant
7. improvement signals for Continuous Improver

Rows that do not apply should be explicit `N/A`. That is still useful quality control because it proves the system considered the risk and chose not to run it for a reason.

## Agile Evolution Rule

Every XPass product should improve through use.

When a row misses a real issue, blocks noisily, lacks evidence, or keeps returning `N/A` because the check is not mature enough yet, XPass should emit an improvement signal for Continuous Improver.

Continuous Improver then turns the signal into a focused job:

1. affected XPass product
2. missed, noisy, or weak pattern
3. proposed rule, fixture, scanner, or receipt change
4. proof needed before the improvement counts as done

This keeps the XPass range agile. The checklist does not just judge the product. It learns from the product.

## Next Closure Order

1. Ship the large per-Pass checklist catalog and Admin UI so operators see the real QC lists.
2. Wire future live XPass runs to populate each checklist row with real `PASS`, `FAIL`, `ALERT`, `WARNING`, or `N/A` results.
3. Keep UXPass improving toward real visual critique, not only accessibility or fixture checks.
4. Keep scheduled package and boundary sweeps target-SHA scoped; stale receipts must stay `WAITING`, not green.
5. When a Pass emits weak, noisy, or missing evidence, create a focused Continuous Improver job instead of marking the suite healthy by vibes.
