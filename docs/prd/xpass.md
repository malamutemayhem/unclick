# PRD: XPass

**Status**: Naming contract locked. Implementation slices land through the individual Pass products.
**Last updated**: 2026-05-29.
**Owner**: Product and XPass maintainers.

## Why this exists

The XPass product line is growing quickly. TestPass, UXPass, SEOPass, CopyPass, FidelityPass, LegalPass, SecurityPass, SlopPass, CommonSensePass, FlowPass, GEOPass, RotatePass, WakePass, and CompliancePass each need their own scope contract, but users should not have to remember which Pass to call for every situation.

CopyRoom is adjacent to XPass. It is the exact-copy room workers use when asked to reproduce source material 1:1. FidelityPass is the XPass/QC wrapper for that same exact-copy path. It should verify or wrap CopyRoom receipts instead of rebuilding a second exact-copy engine.

XPass is the umbrella/action name for orchestration across the XPass products.

It prevents three sources of drift:

1. inventing competing umbrella names like AllPass, PassRun, or PassHub
2. describing XPass as another sibling product instead of the conductor
3. routing every new check into a new Pass before the existing Pass surfaces are dogfooded

## One-sentence definition

XPass is the conductor that chooses and runs the relevant scoped XPass product checks for a target, then returns one combined receipt with evidence and exclusions.

## Naming contract

Use:

- **XPass** for the umbrella/conductor product
- **XPass run** for one orchestrated run across one or more Pass checks
- **XPass receipt** for the combined result users can inspect or share
- **XPass product check** for a single underlying check such as TestPass, UXPass, or SecurityPass
- **XPass product result** for the scoped output from one underlying Pass

Do not introduce:

- AllPass
- PassRun
- PassHub
- MetaPass
- SuperPass
- PassSuite as the product name

The sentence "XPass your build" means "run the relevant XPass product checks for this target." The letter X is the variable, not a new sibling category.

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
| WakePass | action-required dispatch and missed-ACK visibility | failed scheduled run needs a worker, stale check needs reclaim |
| Connections | credential and provider status used by checks | GitHub token valid, Search Console needs reconnect |

## Current family map

Live gates or public dogfood:

- TestPass
- UXPass
- CommonSensePass
- WakePass

Package-ready or merged product tools:

- SlopPass
- SecurityPass
- SEOPass
- CopyPass
- FidelityPass
- LegalPass
- FlowPass
- GEOPass

Boundary or guidance:

- RotatePass
- WakePass
- CompliancePass (formerly EnterprisePass) readiness surface

Public dogfood receipts stay conservative: a Pass can be package-ready and useful in XPass routing while the public dogfood result remains pending until a recurring receipt has actually run.
Package-backed products promote through the scheduled XPass package sweep. Boundary or guidance products promote only through a public-safe boundary sweep that does not touch secrets, live queues, unsafe security probes, or compliance-certification claims.

The canonical XPass product index lives in [`docs/pass-family-index.md`](../pass-family-index.md). The file path is retained for link stability; it is the single place to look up tier, brief, dogfood path, and XPass routing trigger for every Pass.

Archived or parked:

- BackstagePass as a brand/product. Old code may be borrowed when useful, but current user-facing language should prefer Connections or Connectors.

Legacy naming:

- EnterprisePass is the old internal name for CompliancePass.
- QualityPass is retired wording for SlopPass.
- QCPass is process wording for a final XPass/QC receipt, not an official XPass product unless Chris explicitly promotes it.

## XPass product promotion ladder

A Pass moves between tiers only when the receipts in the lower tier are clean. The ladder is one direction only; nothing demotes a Pass silently.

| From | To | Promotion criteria |
| --- | --- | --- |
| Idea | Package-ready | Brief committed under `docs/`, package scaffold with deterministic checks, MCP tools wired, package sweep entry green |
| Package-ready | Live gate or public dogfood | One recurring receipt has actually run, dogfood promotion receipt accepts only a full current XPass package sweep (no partial, unknown, or missing matrix), Crews Council recommendation is at most "consider" |
| Live | Live with badge | At least four green recurring receipts in a row, no outstanding action-needed items, public copy passes CopyPass |
| Any | Boundary or guidance | Pass touches secrets, live queues, unsafe security probes, or compliance-certification claims that cannot be safely dogfooded in public; receipt restricted to a boundary sweep |

Demotion only happens through an explicit PR that updates this PRD, the XPass product index, the dogfood index, and any BrainMap entries in the same change. Silent demotion through a quiet config flip is not allowed.

## Run receipt requirements

Every XPass receipt must show:

1. **Target**
   The exact PR, URL, MCP server, page, connector, or artifact inspected.
2. **Checks selected**
   Which XPass product checks ran and why they were selected.
3. **Checks skipped**
   Which relevant checks did not run and why.
4. **Evidence**
   Links or structured artifacts from each underlying Pass result.
5. **Action needed**
   Clear next step when a result needs owner action.
6. **Staleness**
   When the receipt was generated and whether newer code, credentials, or deploys may invalidate it.
7. **Crews Council recommendation**
   Whether this target needs no Council, should consider a Council, or should run a recommended Council before owners treat the evidence as a final decision.
8. **Improvement signals**
   Repeated misses, noisy rules, unavailable passes, weak receipts, or new risk classes that should feed Continuous Improver.

XPass should recommend full Crews only for judgement-heavy targets. It should not call a full Council for every run. Examples that deserve a Council recommendation: launch go/no-go, legal/security plus public claims, conflicting Pass evidence, accepted skipped checks on broad targets, or Crews/Council product changes.

For material targets, XPass may also attach `lite_check` anti-rubber-stamp questions. Council Lite is a prompt/checklist, not a full Crews run. It keeps dissent visible without bloating every proof run.

An XPass receipt should behave like a complete checklist: every known XPass product should appear as `PASS`, `BLOCKER`, `MISSING`, `N/A`, or `NOT RUN`. `N/A` is the correct result when a check was considered and does not apply to the target.

### Receipt schema sketch

The receipt is the contract. Implementations live in package code, but the canonical shape is:

```ts
interface XPassReceipt {
  receipt_id: string;            // ulid or uuid
  generated_at: string;          // ISO 8601 UTC
  target: {
    kind: 'pr' | 'url' | 'mcp_server' | 'connector' | 'package' | 'artifact';
    ref: string;                 // PR URL, page URL, MCP base, package name
    sha?: string;                // git sha when target is a PR or commit
    sweep: 'package' | 'boundary' | 'targeted';
  };
  checks_selected: Array<{
    pass: XPassProductId;        // 'testpass' | 'uxpass' | ...
    reason: string;              // why this Pass was selected for this target
    result_ref: string;          // pointer to the XPass product result artifact
  }>;
  checks_skipped: Array<{
    pass: XPassProductId;
    reason: 'no_credentials' | 'out_of_scope' | 'package_not_ready'
          | 'boundary_only' | 'target_unsupported' | 'manual_exclude';
    note?: string;
  }>;
  full_checklist: Array<{
    pass: XPassProductId;
    status: 'PASS' | 'BLOCKER' | 'MISSING' | 'NOT RUN' | 'N/A';
    reason: string;
  }>;
  verdict: 'pass' | 'warn' | 'fail' | 'pending';
  action_needed?: Array<{
    pass: XPassProductId;
    item: string;                // one human sentence
    handoff: 'wakepass' | 'owner_review' | 'connections_reconnect';
  }>;
  improvement_signals?: Array<{
    pass: XPassProductId;
    signal: 'missed_issue' | 'noisy_blocker' | 'weak_receipt'
          | 'pass_not_available' | 'new_risk_class' | 'worker_reminder_needed';
    action: string;
  }>;
  staleness: {
    target_observed_at: string;  // when the target was last fetched
    invalidates_on: Array<'new_commit' | 'new_deploy' | 'cred_rotation' | 'time_window'>;
    window_hours?: number;       // for time_window invalidation
  };
  council: {
    recommendation: 'none' | 'consider' | 'recommended';
    lite_check?: string[];       // anti-rubber-stamp prompts attached for material targets
  };
  provenance: {
    repo: string;                // 'malamutemayhem/unclick'
    head_sha: string;            // signed PR-SHA that produced this receipt
    runner: string;              // worker or seat that produced the receipt
    xpass_version: string;       // semver of the orchestrator
  };
}
```

The receipt is intended to be small, link-rich, and machine-merge-safe. Heavy per-Pass evidence stays in the underlying XPass product result and is referenced by `result_ref`, never inlined into the receipt body.

### PR-SHA provenance binding (anti-stomp)

A receipt must bind to the exact PR-SHA it observed. Two rules follow:

1. **No fail-to-pass overrides on a different SHA.** A subsequent receipt that flips an item from fail to pass must either reference the same `head_sha`, or be marked as a fresh run on a new SHA. The orchestrator rejects edit calls that try to swap the verdict on a stored receipt without producing a new receipt.
2. **No silent receipt reuse.** A receipt fetched by a different PR cannot be presented as evidence for the second PR. The receipt's `target.sha` must match the consumer's intended SHA. Mismatches return `pending` plus a fresh-run handoff to WakePass.

This is the anti-stomp posture for XPass. It does not replace TestPass's per-tool anti-stomp pack; it sits above it so the combined receipt also resists fail-to-pass tampering at the orchestrator layer.

## Public copy rules

Allowed public claims:

- XPass runs the relevant UnClick XPass product checks for a target.
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
- a marketplace submission needs more than one XPass product gate
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

Use WakePass when:

- a run failed and somebody must act
- a scheduled check missed its ACK window
- a stale check needs reclaim or retry visibility

## Closure Board, BrainMap, ScopePack: shared vocabulary

These terms appear across the admin board, PR bodies, and other PRDs. XPass relies on the same meanings, so they are defined here once.

| Term | Definition | Owns the artifact |
| --- | --- | --- |
| **Closure Board** | The job-receipt view on `/admin/jobs` that tracks whether work has shipped with proof. A green chip on the Closure Board requires a stored receipt that references the work. | Jobs/Boardroom admin |
| **BrainMap** | The generated map of UnClick's product and code surfaces at `docs/UnClick-brainmap.generated.{json,md}`. Refreshed by `npm run brainmap:check`. Used by the dogfood receipt to prove the receipt was produced against the current surface map. | Brainmap generator |
| **ScopePack** | A small handover packet that carries the brief, target, and acceptance bar from idea or chat into a Boardroom job. ScopePacks are what XPass should ingest as the target description for non-PR targets. | Boardroom |
| **Dogfood receipt** | The public, recurring XPass receipt that proves UnClick runs its own XPass product checks on UnClick. Promotion only accepts a full current XPass package sweep. | XPass + Dogfood index |
| **Package sweep** | Scheduled run of the package-level XPass product checks across all package-ready products. The matrix must be complete and current for a dogfood promotion to count. | Scheduled XPass runner |
| **Boundary sweep** | Public-safe receipt that exercises boundary or guidance Passes (currently RotatePass and WakePass) without touching secrets, live queues, or compliance claims. | Scheduled XPass runner |
| **Council Lite** | A prompt/checklist attached to material XPass receipts, surfacing anti-rubber-stamp questions without invoking a full Crews Council run. | XPass + Crews |

When in doubt, prefer these terms over invented synonyms. If a new term is needed, add it here in the same PR that introduces it.

## Non-goals

XPass does not:

- invent new checks outside the XPass product line
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

The receipt path on disk follows the dogfood pattern already in use: package sweep receipts live under `public/xpass/package-sweep.json`, boundary sweep receipts under `public/xpass/boundary-sweep.json`, and per-target receipts under `public/xpass/receipts/<id>.json`. Keeping the receipt shape consistent across sweeps makes the public dogfood page a thin renderer instead of a parallel data model.
