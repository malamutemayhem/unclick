# PRD: XPass

**Status**: Naming contract locked. Implementation slices land through the individual Pass products.
**Last updated**: 2026-05-01.
**Owner**: Product and Pass-family maintainers.

## Why this exists

The Pass family is growing quickly. TestPass, UXPass, SEOPass, CopyPass, FidelityPass, LegalPass, SecurityPass, SlopPass, CommonSensePass, FlowPass, GEOPass, RotatePass, CompliancePass, and WakePass each need their own scope contract, but users should not have to remember which Pass to call for every situation.

CopyRoom is adjacent to XPass. It is the exact-copy room workers use when asked to reproduce source material 1:1. FidelityPass is the XPass/QC wrapper for that same exact-copy path. It should verify or wrap CopyRoom receipts instead of rebuilding a second exact-copy engine.

XPass is the umbrella/action name for orchestration across the Pass family.

The live completion inventory is tracked in `docs/prd/xpass-closure-board.md`.

It prevents three sources of drift:

1. inventing competing umbrella names like AllPass, PassRun, or PassHub
2. describing XPass as another sibling product instead of the conductor
3. routing every new check into a new Pass before the existing Pass surfaces are dogfooded

## One-sentence definition

XPass is the Pass-family conductor that chooses and runs the relevant scoped Pass checks for a target, then returns one combined receipt with evidence and exclusions.

## Naming contract

Use:

- **XPass** for the umbrella/conductor product
- **XPass run** for one orchestrated run across one or more Pass checks
- **XPass receipt** for the combined result users can inspect or share
- **Pass-family check** for a single underlying check such as TestPass, UXPass, or SecurityPass
- **Pass-family result** for the scoped output from one underlying Pass

Do not introduce:

- AllPass
- PassRun
- PassHub
- MetaPass
- SuperPass
- PassSuite as the product name

The sentence "XPass your build" means "run the relevant Pass-family checks for this target." The letter X is the variable, not a new sibling category.

## Product posture

XPass should feel:

- like an operator for the checks UnClick already trusts
- evidence-led and conservative
- easy to explain to a non-developer
- useful for unattended dogfooding and marketplace readiness

XPass should not feel:

- like a magic quality stamp
- like a replacement for the underlying Pass scopes
- like a way to bypass individual disclaimers
- like a broad product expansion before Connections and reliability substrate work are stable

## Continuous Improvement

XPass products are living checks, not frozen scorecards.

When an XPass run finds a new issue class, misses a real problem, creates a noisy false blocker, or repeatedly returns `N/A` where a useful check should exist, the result should feed Continuous Improver. The next action is not only to fix the target. It is also to improve the relevant XPass product so the same class of issue is easier to catch next time.

Continuous Improver should create or update a focused improvement job when:

- a pass misses a user-visible defect
- a pass blocks too loudly for minimal gain
- a pass cannot explain why it returned `PASS`, `BLOCKER`, `MISSING`, `NOT RUN`, or `N/A`
- a new repeated risk appears that no current pass owns
- workers keep needing a manual reminder to use a pass, CopyRoom, or a receipt rule
- evidence is too weak for the confidence the pass claims

Each improvement job should name the affected XPass product, the missed or noisy pattern, the proposed rule or fixture, and the proof needed before the update counts as done.

## Relationship to individual Passes

XPass does not own the finding logic for each Pass. It owns orchestration and presentation.

| Layer | Owns | Examples |
| --- | --- | --- |
| XPass | selection, ordering, shared run receipt, summary, exclusions | "Run TestPass plus SecurityPass because this is an MCP PR." |
| Individual Pass | domain checks, disclaimer, evidence, pass/fail semantics | TestPass probe results, CopyPass claim findings, SecurityPass hygiene findings |
| CopyRoom | exact 1:1 copying and copy-fidelity receipts | "Copy this source exactly and preserve every word, punctuation mark, line break, and structure." |
| FidelityPass | XPass/QC wrapper over CopyRoom fidelity evidence | "Verify the CopyRoom receipt proves source and output match, or return N/A when no exact copy is in scope." |
| CommonSensePass | sanity, contradiction, and false-PASS checks | "Does this healthy/done/no-work claim make sense against the evidence?" |
| WakePass | action-required dispatch and missed-ACK visibility | failed scheduled run needs a worker, stale check needs reclaim |
| Connections | credential and provider status used by checks | GitHub token valid, Search Console needs reconnect |

## Current family map

Working or exposed:

- TestPass
- UXPass
- SEOPass
- CopyPass
- FidelityPass
- LegalPass
- CommonSensePass

In build or scoped:

- SlopPass
- FlowPass
- SecurityPass
- GEOPass
- RotatePass
- CompliancePass
- WakePass

Archived or parked:

- BackstagePass as a brand/product. Old code may be borrowed when useful, but current user-facing language should prefer Connections or Connectors.

## Run receipt requirements

Every XPass receipt must show:

1. **Target**
   The exact PR, URL, MCP server, page, connector, or artifact inspected.
2. **Checks selected**
   Which Pass-family checks ran and why they were selected.
3. **Checks skipped**
   Which relevant checks did not run and why.
4. **Evidence**
   Links or structured artifacts from each underlying Pass result.
5. **Action needed**
   Clear next step when a result needs owner action.
6. **Staleness**
   When the receipt was generated and whether newer code, credentials, or deploys may invalidate it.
7. **Improvement signals**
   Repeated misses, noisy rules, unavailable passes, weak receipts, or new risk classes that should feed Continuous Improver.

An XPass receipt should behave like a complete checklist: every known XPass product should appear as `PASS`, `BLOCKER`, `MISSING`, `N/A`, or `NOT RUN`. `N/A` is the correct result when a check was considered and does not apply to the target.

## Public copy rules

Allowed public claims:

- XPass runs the relevant UnClick Pass-family checks for a target.
- XPass produces a combined receipt showing evidence, skipped checks, and next actions.
- XPass helps UnClick dogfood its own QA, UX, security, SEO, copy, and legal-review surfaces.

Disallowed public claims:

- XPass certifies quality, security, legality, SEO ranking, or production readiness.
- XPass replaces TestPass, UXPass, SecurityPass, CopyPass, LegalPass, or any other individual Pass.
- XPass proves every issue is gone.
- XPass can run checks when credentials, tokens, target access, or provider setup are missing.

## Routing rules

Use XPass when:

- the user asks for "all relevant checks"
- a PR or release needs a combined dogfood receipt
- a marketplace submission needs more than one Pass-family gate
- a scheduled dogfood run should produce one public receipt

Use an individual Pass when:

- the user asks for one specific domain
- the result needs a domain-specific disclaimer
- the check is still being built or validated
- credentials or target setup only exist for one Pass

Use CopyRoom when:

- the user asks to copy, duplicate, mirror, transcribe, preserve, or move source content exactly
- accuracy means byte-level, line-level, or word-for-word fidelity
- a worker would otherwise be tempted to summarize, rewrite, clean up, or "improve" copied text
- the work itself is the copying action

Use FidelityPass when:

- an XPass run or QC process needs to verify exact-copy work
- the target includes copied source material and the proof must confirm source and output match
- CopyRoom has already produced a receipt and XPass needs to include that receipt as evidence
- FidelityPass can call or wrap CopyRoom, but must not create a duplicate copy engine beside CopyRoom
- the right result is `N/A` when no 1:1 copy, transcription, mirroring, or preservation claim is in scope

Use CommonSensePass when:

- a worker is about to claim healthy, quiet, PASS, no-work, done, merge-ready, or duplicate-wake suppression
- evidence appears to contradict the proposed status
- a queue, job, or receipt says one thing while the live board says another
- a result could be technically green but operationally misleading

Use WakePass when:

- a run failed and somebody must act
- a scheduled check missed its ACK window
- a stale check needs reclaim or retry visibility

## Non-goals

XPass does not:

- invent new checks outside the Pass family
- merge individual Pass scope contracts
- hide uncertainty or missing credentials
- rename existing endpoints in this slice
- authorize broad Pass expansion while reliability substrate or Connections work is the current priority

## Implementation notes

The first useful implementation is not a dashboard. It is a small receipt orchestrator that can:

1. accept a target
2. choose a small set of already-working Pass checks
3. run or reference those checks
4. produce a combined JSON receipt
5. hand off failed action-needed paths to WakePass

Future UI should treat XPass as the top-level action and individual Passes as expandable evidence sections.
