# Path A Ground-Truth Audit

Status: audit / discussion draft. Companion to `path-a-harness-build-plan.md`.

This is a code-level audit of what UnClick actually has against the primitives
the two external strategy reports assumed. It exists because the reports
repeatedly hedge that their key primitives are "implicit in the brief." Several
are real and further along than the reports assumed; one centerpiece is absent;
and the genuinely missing piece is not the one the reports emphasized most.

Every claim below was checked by reading the files named. Where something was
not found, that is stated plainly.

## Headline corrections to the build plan

1. **The anti-fake-green completion gate already substantially exists.** The
   build plan put it in Phase 1 as a thing to build. It is mostly built. See
   area 3.
2. **A SHA-bound receipt with provenance already exists** (`xpass_receipt_v1`).
   The "unified receipt schema" is therefore an *extension and consolidation*
   job, not a from-scratch design. See area 2.
3. **There is no shared evidence type.** Each pass defines its own
   `*Evidence` / `*Finding` / `*Verdict` schema. They are structurally similar
   but not unified, and `packages/core` does not contain a shared base. This is
   the real, narrow gap behind the "AnswerPass" idea. See area 2.
4. **The proof-as-reward / outcome-eval harness is genuinely absent.** This is
   the true green-field and the real moat. See `path-a-eval-harness-spec.md`.

## Area 1: Memory module

Location: `packages/mcp-server/src/memory/`. This is the strongest existing
asset and is not a stub.

Real:
- **Backend interface** (`types.ts`, `MemoryBackend`): a full operation surface
  including `searchMemory` (described as "full-text / hybrid search"),
  `searchFacts`, `searchLibrary`, `addFact`, `supersedeFact`, `invalidateFact`
  (audit row, does not delete), `manageDecay`, `logConversation`, `storeCode`,
  `upsertLibraryDoc`, `refreshTaxonomySnapshots`, `getMemoryStatus`.
- **Bi-temporal + provenance** on facts (`FactInput`: `valid_from`,
  `extractor_id`, `prompt_version`, `model_id`, plus git linkage `commit_sha` /
  `pr_number`). Tested in `__tests__/bitemporal.test.ts`.
- **Embeddings** (`embeddings.ts`): OpenAI `text-embedding-3-small` (1536 dims)
  with a deterministic dependency-free **local** fallback. Embeddings are
  opt-in, default off. Hybrid search tested in `__tests__/hybrid-search.test.ts`.
- **Conflict handling** (`conflicts.ts`): a `KNOWN_CONFLICTS` table,
  `detectConflicts`, and `buildConflictWarning`. Note: this is *tool*-level
  conflict detection (conflicting tool selections), not yet fact-vs-fact
  contradiction resolution at retrieval time.
- **Decay/quota** (`quota-policy.ts`, `manageDecay`), instrumentation, typed
  links, taxonomy snapshots with source receipts.

Gap vs strategy reports: retrieval *ranking* policy (what to surface when) and
**fact-level staleness/contradiction surfacing** are the levers, not basic
storage or recall. The provenance fields needed to do this already exist on the
fact model; they are just not yet used to score or down-rank at retrieval.

## Area 2: Proof "pass" family and receipts

Real and substantial. Each pass is its own package under `packages/`:
testpass, uxpass, flowpass, securitypass, seopass, legalpass, compliancepass,
geopass, copypass, commonsensepass, sloppass (plus qc, fidelitycopy as tools).

Each pass has its own Zod schema with a recognizable shape: an `*Evidence`
object (`kind`, `label`, `summary`, optional `source_url`), `*Finding`
(`severity`, `title`, recommendation, evidence[]), a per-check verdict, and a
report verdict (commonly `ready` / `needs-work` / `blocked` / `unknown`).
Examples confirmed: `FlowPassEvidenceSchema`, `CompliancePassEvidenceSchema`,
`SeoPassEvidenceSchema`, `GeoPassEvidenceSchema`.

Aggregation already exists: `xpass-aggregated-verdict-tool.ts` (806 lines).
- `CHECK_ORDER` lists 15 checks (including `uipass`, `rotatepass`,
  `fidelitypass`, and a planned `wakepass` slot).
- It normalizes each pass result (`NormalizedPassResult`) and computes a single
  `verdict` of `pass` / `pending` / `fail`.
- It emits a structured receipt `xpass_receipt_v1` with a `receipt_id` (hashed
  via `node:crypto` `createHash`), `provenance.head_sha`, a `full_checklist`,
  and an explicit `binding_rule`: "merge only when
  xpass_aggregated_verdict.verdict is pass and provenance.head_sha equals
  current PR HEAD." Stale or unscoped (missing target SHA) receipts block the
  verdict.

What this means: the decks' "AnswerPass / unified receipt for all claims" is
**partly already real** as the xpass receipt, and it is SHA-bound so stale
proof cannot pass. The hashing is integrity/identity, not HMAC signing (no
secret key); that is a reasonable later hardening, not a gap today.

The actual narrow gaps:
- **No shared evidence base type.** `packages/core` holds only DB tables
  (orgs, api_keys, usage_logs, webhooks) and API response types. There is no
  `core` evidence/finding/verdict schema the passes import. Unification happens
  late, by normalization inside the aggregator, rather than early, by every
  pass emitting a common shape.
- **`verdict-pack.ts` is inconsistent.** Present in only 5 passes (copypass,
  flowpass, legalpass, seopass, sloppass); absent in others.
- **Coverage of claims beyond passes.** Receipts cover CI-style checks. They do
  not yet cover arbitrary agent claims ("memory is still valid," "this worker
  is active," "this recommendation is supported"). That broader claim coverage
  is the legitimate kernel of an "AnswerPass" idea.

So "AnswerPass" should be scoped honestly as: (a) lift a shared evidence/verdict
type into `core`, (b) have each pass emit it natively, (c) extend the receipt
beyond CI checks to general claims. Not a new island; a consolidation.

## Area 3: Completion gate (anti-fake-green)

Already substantially built: `api/lib/fishbowl-completion-policy.ts` (177
lines), `evaluateFishbowlCompletionPolicy`.

Real:
- A **proof-positive** regex requiring observable evidence (PR #, commit/sha,
  branch diff, tests/build/CI passed, Playwright/screenshot, actions run link,
  deployed/deployment, explicit `NO_CODE_NEEDED`, receipt id).
- A **proof-negative** regex that blocks on blocker/hold/missing-proof,
  stale/false-green/reopened, scope mismatch.
- **Newest-comment-wins**: a blocker after the latest proof re-blocks "done."
- **Independent-verifier requirement**: the same agent cannot create and close
  a job; a different UnClick agent identity must add PASS/BLOCKER proof (may be
  the same AI subscription seat, not the same agent id). This is exactly the
  "shadow verifier / different reviewer" pattern the reports recommend, already
  enforced at the policy layer.
- **Job-type-aware proof**: UI/UX jobs need screenshot proof
  (`git_proof_required`, `release_or_live_proof_required`,
  `independent_verifier_required` result codes).

Gap: the gate keys off **comment text patterns**, not off a structured receipt
object. The high-value upgrade is to make the gate consume the
`xpass_receipt_v1` (and a future general claim receipt) directly, so "green"
depends on a typed, SHA-bound evidence node rather than regex over prose. That
is a smaller, sharper change than "build a completion gate."

## Area 4: Jobs, queue, recovery

Real (under `api/lib/`):
- Fishbowl job pipeline (`fishbowl-job-pipeline.ts`), completion policy,
  PR-merge reconcile (`fishbowl-pr-merge-reconcile.ts`), idea council,
  todo handoff, and **stale detection/release**
  (`fishbowl-todo-open-stale-release.ts`).
- Recovery packets: `route-packet-dispatch.ts` / `route-packet-consumer.ts` /
  `tether-route-packet.ts` build dispatch rows with `lease_owner`,
  `lease_expires_at`, `last_real_action_at`, an embedded `route_packet`, and a
  `RoutePacketDecision` receipt. `agent-obligations.ts` formalizes obligations.

Gap: detection and packet-building both exist, but the loop "stale detected ->
auto-mint recovery packet -> route to a fresh seat" is not fully wired
end-to-end. The pieces are there; the wiring is the work.

## Area 5: Liveness / wake

Real: `heartbeat-protocol.ts`, `check_signals` (signals dispatch in
`api/signals-dispatch.ts` and `packages/mcp-server/src/signals/`), pushonly
wake. "WakePass" is **not** a built component; it appears only as a reserved
slot in the xpass `CHECK_ORDER` and as naming in tests.

## Area 6: Routing / model selection

Mostly absent / dead code.
- `api/lib/writerlane/writerlane-router.ts` defines a pure scoring policy
  (`WriterLaneBackendProfile`, `WriterLaneSelectionPolicy`,
  `WriterLaneCandidateScore`) but the sibling config file states plainly it is
  **dead code**: "Nothing in this repo wires it yet." Default posture is
  free-models-only.
- A narrow live decision helper exists: `ai-provider-inventory.ts`
  (`decideAiProviderCall`), wired into `api/arena.ts`.

So there is a designed-but-unwired router and one live narrow chooser. A
learned, outcome-scored router is not present.

## Area 7: Eval / outcome harness

Absent. There is extensive *unit* testing (40+ test files in mcp-server,
per-pass `__tests__`, spend guards, schema validation) but no harness that
scores real agent *runs* by verified outcome, stores trajectories as fixtures,
or measures policy improvement over time. This is the subject of the companion
spec and is the highest-leverage green-field.

## Area 8: Tool surface

`tool-wiring.ts` is ~14.4k lines mapping tool names to API calls; consistent
with the advertised 450+ endpoints / 60+ integrations. Reliability scaffolding
exists (`reliability.ts`, `tool-failure-class.ts`, `tool-failure-report.ts`,
per-provider spend guards).

## Revised "what to actually build" (supersedes plan ordering)

Given the above, the honest priority order is:

1. **Lift a shared evidence/verdict/receipt type into `packages/core`** and have
   each pass emit it natively; generalize `xpass_receipt_v1` to cover non-CI
   claims. (This is the real "AnswerPass," scoped as consolidation.)
2. **Make the completion gate consume the receipt object**, not regex over
   comments. Reuse the existing independent-verifier logic.
3. **Wire stale-detection -> recovery-packet -> route** end-to-end using the
   parts that already exist.
4. **Build the eval/outcome harness** (companion spec). The moat.
5. Memory retrieval ranking + fact-level staleness surfacing (provenance fields
   already exist).
6. Wire the dead `writerlane-router` to outcome data once the harness produces
   it.

Everything in 1-3 is consolidation of existing code, which is why it is both
high-impact and lower-risk than the strategy decks implied.
