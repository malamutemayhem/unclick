# XPass Closure Board

**Status:** working inventory and completion board  
**Purpose:** keep the XPass product family honest until every check is either complete, deliberately parked, or clearly not applicable for a run.

## Operating Model

XPass should be a full checklist.

That means every XPass run considers the whole family and records each row as one of:

| Mark | Meaning |
| --- | --- |
| ✓ | complete enough to run as evidence today |
| ~ | real but not 100 percent complete |
| ✗ | not built enough to count |
| N/A | not applicable to this target or request |

This does not mean every expensive runner executes every time. The lightweight checklist always runs. Deep runners only run when the row applies.

## Current Completion Board

| XPass product | Keep? | Complete? | Current truth | To close the loop |
| --- | --- | --- | --- | --- |
| TestPass | Yes | ✓ | Strongest XPass product today. Package exists, tests exist, live MCP proof and dogfood receipt exist. | Keep as default trust gate and make sure receipts stay scoped to the target. |
| UXPass | Yes | ~ | Real package and runner exist, with visual audit work, viewport support, and dogfood fixtures. Still not enough to guarantee every mediocre UI becomes polished. | Finish annotated reports, stronger visual hierarchy checks, mobile and desktop evidence, and scheduled proof that does not clog the queue. |
| SecurityPass | Yes | ~ | Real package and guardrails exist. Public dogfood is intentionally scope-gated until safe recurring proof exists. | Add deny-by-default recurring runner proof and make security receipts visible without exposing secrets. |
| CopyPass | Yes | ~ | Real copy-quality package exists. It checks wording, claims, tone, clarity, and product copy risk. | Add recurring or on-demand live receipt surface and keep it separate from exact-copy fidelity. |
| FidelityPass | Yes | ✗ | Official XPass/QC wrapper over CopyRoom, but not a separate completed engine yet. | Implement wrapper behavior over CopyRoom receipts, including `N/A` when no 1:1 copy is in scope. Do not duplicate CopyRoom. |
| CopyRoom | Adjacent | ~ | Official exact-copy room. It is the office photocopier workers must use for 1:1 copying, transcription, mirroring, or preservation. | Reinforce worker usage and require a CopyRoom receipt whenever exact copying is requested. |
| LegalPass | Yes | ~ | Package and guardrail library exist, but much of the deeper execution is still guidance or fixture-led. | Turn legal and policy checks into scoped receipts with clear "not legal advice" boundaries. |
| SlopPass | Yes | ~ | Official AI/code quality product. Package, tests, product brief, and XPass selector wiring exist. | Finish live PR diff integration and make SlopPass the only public code-quality name. No QualityPass fork. |
| CommonSensePass | Yes | ~ | Real UnClick concept and protocol from context. It is the sanity gate before healthy, quiet, PASS, no-work, done, merge-ready, or duplicate-wake claims. Current checkout does not show it as a clean standalone package. | Restore or expose the tool surface, add the evidence envelope, build fixture pack, and enforce worker-wide adoption. |
| SEOPass | Yes | ~ | Package exists but is mostly scaffold or plan-level proof. | Add live metadata, sitemap, public-page, and search-readiness receipts. |
| GEOPass | Yes | ~ | Package exists but appears scaffolded around scanner shape and AI-search readiness. | Add live AI-search and geography/platform visibility checks, then feed shared evidence back to SEOPass. |
| FlowPass | Yes | ~ | Package exists with journey/report shape. | Add live browser journey runner, screenshots, console errors, and user-task completion evidence. |
| RotatePass | Yes | ~ | Docs and redaction guardrails exist. It likely shares evidence with SecurityPass and Connections. | Decide final boundary, then add credential rotation, ownership, staleness, and blast-radius receipts. |
| WakePass | Yes | ~ | Reliability layer exists through PinballWake, ACKs, leases, missed ACK reclaim, NudgeOnly, IgniteOnly, and PushOnly history. | Wrap the reliability substrate as the official WakePass product surface with receipts and dashboard copy. |
| CompliancePass | Yes | ~ | Official compliance and enterprise-readiness product. Seed public JSON and guard test exist. | Rename old EnterprisePass surfaces, keep "not certification" language, and add automated evidence checks. |

## Retired Or Historical Names

| Name | Status | Use instead |
| --- | --- | --- |
| EnterprisePass | Historical | CompliancePass |
| QualityPass | Retired | SlopPass |
| BackstagePass | Parked | Connections or Connectors |

## Checklist Rule For Each XPass Run

Every XPass receipt should show:

1. target inspected
2. full checklist row list
3. row status: `PASS`, `BLOCKER`, `MISSING`, `N/A`, or `NOT RUN`
4. evidence link or reason
5. owner action if blocked or missing
6. staleness or target SHA when relevant

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

1. Finish taxonomy cleanup: SlopPass not QualityPass, CompliancePass not EnterprisePass, FidelityPass wraps CopyRoom.
2. Add full-checklist output to the XPass gate so every row gets a visible status.
3. Finish FidelityPass wrapper over CopyRoom receipts, including `N/A`.
4. Restore or expose CommonSensePass as a worker-available tool and enforce it before trusted status claims.
5. Wire SlopPass into PR diff and code-quality receipts.
6. Add recurring receipts for CopyPass, SecurityPass, LegalPass, SEOPass, FlowPass, and CompliancePass.
7. Keep UXPass improving toward real visual critique, not only accessibility or fixture checks.
