# Path A Build Plan: UnClick as a Proof-First Agent Control Plane

Status: concept / discussion draft. Not a committed roadmap.

This document is a grounded synthesis. It combines two external strategy
reports (saved as `agentic_1_2` and `agentic_2_2` in working notes) with a
direct read of what UnClick's code actually contains today. Where the strategy
reports assumed a primitive exists, this plan checks it against the repo and
says plainly what is real, what is partial, and what is aspirational.

> Update: a deeper read followed this draft. See
> `path-a-ground-truth-audit.md` for the file-by-file audit and
> `path-a-eval-harness-spec.md` for the learning loop. Two corrections from
> that audit are folded in below: (a) the anti-fake-green completion gate and an
> independent-verifier requirement ALREADY exist in
> `api/lib/fishbowl-completion-policy.ts`, so Phases 1-2 are about typing and
> wiring, not green-fielding; (b) `memory/conflicts.ts` is tool-conflict
> detection, not memory-claim conflict resolution.

## The frame (and the honest ceiling)

UnClick is a harness. It runs on top of frontier models it does not train. So
the goal is not to out-think Claude or GPT. It cannot. The goal is to be the
layer that makes any frontier model more reliable, less forgetful, more
accountable, and more useful across sessions than it is on its own.

That means our edge has to come from the apparatus around the brain: memory
quality, proof of what actually happened, recovery from stale or failed work,
and learning from outcomes. None of that needs base-model training. All of it
is engineering and taste. The wins compound on data only UnClick holds (its own
run outcomes), which is exactly the kind of moat the labs find awkward to copy,
because an independent overseer that audits every model including theirs is a
trust feature for users and a conflict for them.

The one-line positioning: **proof-first agent control plane**. Not "AI
operating system" (too broad, now lab-owned). The differentiator is verifiable
truth state: we know what is true, what is stale, who owns it, what still needs
proof, and what should happen next.

## Ground truth: what UnClick already has

This is the important part, because both strategy reports hedged that the key
primitives were only "implicit in the brief." The repo says otherwise on most
of them.

REAL and substantial:

- **Memory module** (`packages/mcp-server/src/memory/`). Deep, not a stub. Has
  `embeddings.ts` (semantic vectors when OpenAI embeddings are enabled;
  defaults to a deterministic local hash embedding otherwise), bitemporal
  handling (`__tests__/bitemporal.test.ts`, `valid_from`, `asOf`), hybrid
  search (`__tests__/hybrid-search.test.ts`), typed links, session state,
  quota/decay policy (`manageDecay`, `invalidateFact`), fact provenance
  (extractor/model/prompt/commit/PR linkage), instrumentation, and a local +
  Supabase backend. This is the strongest existing asset. The strategy reports
  treated "memory quality" as a thing to build. Most of it is here; the work is
  sharpening retrieval and surfacing contradictions, not starting over. (Note:
  `conflicts.ts` is TOOL-conflict detection, not memory-claim resolution;
  contradiction surfacing at retrieval time is still a real gap.)
- **Proof "pass" family.** A whole fleet of verifiers already exists as tools
  and as standalone packages: flowpass, xpass, testpass, uxpass, securitypass,
  seopass, legalpass, compliancepass, geopass, copypass, commonsensepass,
  sloppass, qc, fidelitycopy. `xpass-aggregated-verdict` already aggregates
  verdicts across passes. This is the embryo of the proof system both reports
  said to build.
- **Fishbowl coordination + job pipeline.** `api/lib/fishbowl-*` is the real
  control-plane substrate: completion policy, job pipeline, PR-merge reconcile,
  todo handoff, and crucially `fishbowl-todo-open-stale-release.ts` (stale work
  detection and release). `orchestrator-context.ts` is a real continuity
  surface.
- **Recovery packets.** `route-packet-dispatch.ts` and `tether-route-packet.ts`
  plus `agent-obligations.ts` already move work between seats with context. This
  is the self-healing-queue primitive in early form.
- **Reliability scaffolding.** `reliability.ts`, `tool-failure-class.ts`,
  `tool-failure-report.ts`, and per-provider spend guards exist.
- **Tool surface.** `tool-wiring.ts` is ~14k lines wiring the catalog;
  consistent with the 450+ endpoint / 60+ integration claim.

PARTIAL / dead code:

- **Model router.** `api/lib/writerlane/writerlane-router.ts` exists but is
  explicitly marked dead code ("Nothing in this repo wires it yet"). A real
  provider-decision helper (`ai-provider-inventory.ts`,
  `decideAiProviderCall`) is wired into `arena.ts`. So routing is a stub plus a
  narrow live helper, not a learned router.

ASPIRATIONAL / NOT in the code (flagged so we do not build on fiction):

- **AnswerPass.** Zero matches anywhere in the repo. Both strategy reports make
  AnswerPass the centerpiece ("AnswerPass everywhere," "unified receipt model
  for all claims"). It does not exist yet. This is the single biggest gap
  between the strategy decks and reality.
- **Unified receipt schema.** The word "receipt" appears ~100 times but
  scattered. There is no single shared evidence schema across the passes.
  `xpass-aggregated-verdict` is the closest real anchor to build it on.
- **Outcome-eval / proof-as-reward learning loop.** Lots of unit tests, but no
  harness that scores agent runs by verified outcome and feeds that back into
  policy. Not found.
- **"AnswerPass" and "WakePass"** as built components. AnswerPass has zero
  matches. WakePass is a reserved slot in the xpass `CHECK_ORDER`, not a
  package. Both are real ideas, not yet real code.
- **"QueuePush," "continuity kernel," "Truth Kernel"** as separately built
  objects. The real equivalents are Fishbowl + `orchestrator-context.ts`. These
  are partly-built things under aspirational names, not missing components.

### Terminology reconciliation (important)

The strategy decks and the code use different words for the SAME things. This
caused my first audit to wrongly flag "Boardroom" as absent. The mapping:

| Product / strategy wording | Actual code |
|---|---|
| Boardroom (Jobs) | Fishbowl (`api/lib/fishbowl-*.ts`) |
| Overseer Truth Kernel | continuity kernel = promoted `orchestrator-context.ts` + world-state diff |
| QueuePush | Fishbowl job/queue state |
| WakePass | reserved `wakepass` slot in xpass `CHECK_ORDER` (not built) |
| XPass receipt | `xpass_receipt_v1` (real, SHA-bound) |
| AnswerPass | NOT built; the name we should give the shared receipt type |

Boardroom and Fishbowl are one concept with two names. That naming drift is a
real, recurring cost (it confused this very audit). Whether to collapse it in
code is a separate decision flagged at the end of this doc.

## The build plan

Sequenced so each phase ships something real and de-risks the next. The
through-line: make proof the unit of both truth and learning.

### Phase 1 (first ~30 days): Unify proof. Kill fake-green.

The passes already exist but each is its own island. The first move is a
**shared receipt schema** every pass emits, anchored on the existing
`xpass-aggregated-verdict`. Canonical fields:

```
claim, subject, owner, sources, evidence_type, freshness,
confidence, verification_status, disagreement_status,
risk_level, next_required_proof
```

The completion gate ITSELF already exists. `fishbowl-completion-policy.ts`
already blocks "done" without proof (regex over PR/commit/test/deploy/screenshot
language), already enforces proof freshness ordering, and already requires an
independent verifier (a different agent_id must add PASS proof). So Phase 1 is
NOT building the gate. It is upgrading the gate to consume a typed receipt as
first-class input instead of regex-matching prose, with the regex kept as a
free-text fallback. No proof, still not done; but "proof" becomes a structured
object with evidence and freshness rather than a string match.

This is also where "AnswerPass" should actually be born: not as a new island,
but as the name for this unified receipt layer sitting over the existing pass
family.

### Phase 2 (~60 days): Continuity people feel + a shadow verifier.

- **Continuity kernel.** Promote `orchestrator-context.ts` into a compact,
  durable per-job state object every seat reads before acting and writes after:
  current owner, objective, active blocker, latest verified evidence, stale
  risk, next smallest useful action. Add a **world-state diff** ("what changed
  since last session across memory, jobs, PRs, blockers").
- **Shadow verifier.** A critic step on completions, ideally a different model
  family than the generator, gating the receipt before it ships. Cheap, high
  payoff, catches mistakes pre-ship.
- **Memory sharpening.** The module is strong; the lever now is staleness
  labeling and conflict surfacing at retrieval time (build on `conflicts.ts`
  and the bitemporal work), so the right thing surfaces at the right moment.

### Phase 3 (~90 days): Self-healing queue + learned routing.

- **Self-healing queue.** When `fishbowl-todo-open-stale-release` fires, don't
  just alert. Mint a recovery packet (objective, world-state, latest proofs,
  failed attempts, open blockers, missing evidence, smallest next action) and
  route it. The packet plumbing (`route-packet-dispatch`) already exists; this
  wires detection to recovery.
- **Wire the router.** Turn the dead `writerlane-router` into a live
  contextual-bandit-style selector across model/tool/seat, scored by predicted
  proof-yield, cost, and latency. Start simple (epsilon-greedy over the
  provider-inventory helper that is already live).

### Phase 4 (6-12 months): The learning loop (the real moat).

State -> action -> outcome -> score -> policy update, where the score is
**proof, not self-report**:

- Every run produces a trace; every trace produces receipts; every receipt is
  scored against observable outcome (verified completion, missing proof,
  reopened work, stale ownership, user correction, rollback).
- Good traces become reusable playbooks/skills. Bad traces become regression
  fixtures and policy updates.
- Critically, "improved" must mean measurable lift on frozen fixtures (truth
  rate up, time-to-proof down, rework down), not "wrote more notes." Build the
  eval harness that does not exist yet; it is the missing piece that makes
  everything above compound.

### Optional, late-bound: small owned models.

Not the bet. Only after enough labeled traces exist, QLoRA-tune tiny models for
narrow internal jobs where labels come free from telemetry: a memory reranker,
a route classifier, a stale-risk predictor, a receipt-risk triager. These are
micro-policy accelerators, not a mini frontier lab. The harness ceiling still
binds: they sharpen the apparatus, they do not raise base-model reasoning.

## Ranked build list

1. Unified receipt schema (born as AnswerPass) over the existing pass family. Very high impact, medium effort.
2. Anti-fake-green completion gate in Fishbowl. Very high impact, medium effort.
3. Continuity kernel + world-state diff. High impact, medium effort.
4. Shadow verifier on completions. High impact, low-medium effort.
5. Memory staleness + conflict surfacing at retrieval. High impact, medium effort.
6. Self-healing queue (detection -> recovery packet -> route). High impact, medium effort.
7. Proof-as-reward learning loop + eval harness. Very high impact, high effort. The moat.
8. Wire the dead router into a learned selector. Medium-high impact, medium effort.
9. Optional small models for routing/ranking/extraction. Medium impact, additive.

## Do not bother

- More autonomous agents / deeper chains as a headline. Reliability compounds
  downward (five 95% steps is ~77% end to end). Add verifiers, not seats.
- "Sentience" / synthetic inner-life framing. No product value, erodes trust,
  unverifiable. Explicitly out of scope.
- Competing on raw integration count alone. MCP commoditizes breadth. Win on
  curation, reliability, and proof.
- A proprietary non-portable memory graph as the moat. Portability and
  governance are the differentiators, not another vector store.
- Chasing memory leaderboards (LoCoMo, etc.). Build outcome evals on real
  UnClick jobs instead.

## How we will know it worked

A dashboard on real jobs: job-completion truth rate (% "done" with real
proof), hallucinated-completion rate, stale-recovery rate, memory-usefulness
rate (retrieved memory that changed the outcome), time-to-proof, rework rate,
cross-session continuity score. Real learning is improvement on a frozen
fixture set over time, not more notes written.

## Bottom line

There is a real build here, and it is further along than the strategy decks
assumed. The pass family, the memory module, Fishbowl, and the recovery
plumbing already exist. The missing spine is a unified proof receipt
(mis-named AnswerPass in the decks, currently absent), the completion gate that
consumes it, and the eval-scored learning loop that turns proof into the reward
signal. Build those three and UnClick stops being "another agent harness" and
becomes the place where any frontier model is held accountable. That is the
winnable game on Path A, and it does not require beating Claude at training.

## Recommended first slice (consolidated)

A third planning pass (ChatGPT) independently proposed the same shape and added
a sharper sequencing instinct worth adopting: lead with a read-model + recovery,
not with the receipt schema. Since the audit found the completion gate already
exists, this ordering is better. Consolidated first slice:

1. **Overseer Truth Kernel** (= continuity kernel). One compact state model
   reading Fishbowl/Boardroom jobs, live seats, xpass receipts, PRs, commits,
   deploys, tests, memory, check-ins. It answers: what is true, what is stale,
   what is blocked, who owns it, what has proof vs only claims proof, what
   happens next. Built on `orchestrator-context.ts`.
2. **Stale Recovery MVP.** Wire `fishbowl-todo-open-stale-release` (detection,
   exists) to `route-packet-dispatch` (packet, exists) so a stale worker yields
   a recovery packet (job, last state, proof present, proof missing, safest next
   action, which seat/model takes it), not just an alert.

This slice is practical, uses context that already exists, and immediately makes
the system feel more intelligent: it turns messy agent activity into clear,
proof-backed next actions. The shared receipt type ("AnswerPass") and the
learning loop follow, in that order.

## Open decision: the Boardroom/Fishbowl rename

The product says Boardroom; the code says Fishbowl. Options: (a) documented
alias only, leave code as-is (cheapest, zero risk); (b) rename user-facing
strings to Boardroom, keep code Fishbowl; (c) full code rename Fishbowl ->
Boardroom (touches many `fishbowl-*.ts` files, tools, tests, and FLEET_SYNC;
high collision risk with other active lanes). This is a judgment call for the
owner, not something to refactor unilaterally.
