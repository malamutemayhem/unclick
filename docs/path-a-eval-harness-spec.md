# Path A Eval Harness Spec: Proof-as-Reward

Status: spec / discussion draft. Companion to `path-a-harness-build-plan.md`
and `path-a-ground-truth-audit.md`.

This specs the one piece that is genuinely absent from the codebase and is the
real moat: a harness that scores real agent runs by verified outcome, turns
those scores into a learning signal, and proves the system improves over time
on a frozen fixture set rather than just "writing more notes."

It learns nothing about the base model's weights. It learns UnClick's own
policies: routing, memory ranking, completion gating, recovery. The reward is
proof, not self-report. That distinction is the whole design.

## Why this and not the other ideas

The audit found that the proof receipts (`xpass_receipt_v1`), the anti-fake-green
completion gate, the recovery packets, and the memory provenance fields already
exist. What does not exist is a loop that *closes*: nothing currently reads run
outcomes back into policy, and nothing measures whether a change actually helped.
Without this harness, every other improvement is a guess. With it, every other
improvement becomes measurable and compounding. It is also the hardest piece for
the frontier labs to copy, because it trains on data only UnClick holds: its own
verified run outcomes.

## Core principle: proof is the reward

A run is scored by whether it produced a verifiable artifact, not by whether the
agent said it was done. The signals already in the codebase that count as proof:

- An `xpass_aggregated_verdict` of `pass` whose `provenance.head_sha` matches
  the PR HEAD (already SHA-bound, already stale-aware).
- A `fishbowl-completion-policy` result of `allowed` (already enforces
  independent verifier and job-type proof).
- A merged PR / passing CI / deploy receipt.

Negative signals (already detectable in code): reopened work, a blocker comment
after proof, stale/unscoped receipts, `independent_verifier_required`,
`missing_proof`, rollback.

## Data model

Three new tables (Supabase, mirroring the local-backend pattern memory already
uses so it works offline too).

### `eval_trajectory`
One row per scored agent run.
```
trajectory_id        text primary key
job_ref              text            -- fishbowl todo / PR / dispatch id
agent_id             text
model_id             text            -- which brain ran it
policy_snapshot_id   text            -- which policy config was active (see below)
task_kind            text            -- docs/tests/backend/frontend/ui/...
started_at           timestamptz
ended_at             timestamptz
outcome              text            -- verified | missing_proof | reopened |
                                     --   stale | user_corrected | rolled_back
proof_receipt_id     text null       -- links to xpass_receipt_v1 when present
time_to_proof_ms     bigint null
rework_count         int default 0
notes                text null
```

### `eval_fixture`
A frozen, replayable case distilled from a real incident (the Recovery-Bench
pattern). Every fake-green or stale-stall becomes a regression fixture.
```
fixture_id           text primary key
source_trajectory_id text null
task_kind            text
input_packet         jsonb           -- route_packet + world-state to replay
expected_outcome     text            -- what "good" looks like
expected_min_proof   jsonb           -- required evidence kinds
frozen_at            timestamptz
active               boolean default true
```

### `eval_policy`
A versioned bundle of the knobs the harness is allowed to tune. Nothing here
touches model weights.
```
policy_id            text primary key
created_at           timestamptz
parent_policy_id     text null
config               jsonb           -- router weights, memory rank weights,
                                     --   gate thresholds, recovery params
baseline_metrics     jsonb null      -- frozen-fixture scores at creation
status               text            -- candidate | shadow | active | retired
```

## The loop

```
run -> trace -> receipt -> score -> (fixture | policy delta) -> regression-gate -> ship
```

1. **Run + trace.** Every meaningful agent run already passes through the
   completion gate and (for code) the xpass aggregator. The harness subscribes
   to those outputs and writes one `eval_trajectory` row. No new instrumentation
   in the agents themselves; it reads what the gate and aggregator already emit.
2. **Score.** Map the existing signals to an `outcome` and compute
   `time_to_proof_ms` and `rework_count`. Proof-positive only when the receipt
   is SHA-bound and fresh.
3. **Harvest.** Good trajectories become candidate playbooks/skills. Bad
   trajectories become `eval_fixture` rows (replayable).
4. **Propose a policy delta.** A change to `eval_policy.config` (e.g. a router
   weight, a memory-rank weight, a gate threshold). Bandit-style exploration is
   fine here (epsilon-greedy over the already-designed `writerlane-router`
   scoring), but the *promotion* decision is gated, not greedy.
5. **Regression-gate (the anti-self-deception step).** Replay the candidate
   policy against the frozen `eval_fixture` set. Promote to `active` only if it
   beats the parent on the core metrics. This is the DSPy/GEPA discipline:
   freeze baselines, only ship changes that beat them on held-out cases.
6. **Shadow before active.** New policies run in `shadow` (decisions logged, not
   enforced) until they accumulate enough wins, then flip to `active`.

## Metrics (the dashboard)

Computed over real trajectories, plotted over time on the frozen fixture set:

- **Job-completion truth rate**: % "done" with a fresh SHA-bound proof receipt.
- **Hallucinated-completion rate**: % "done" later reopened or with no/stale
  proof. (Target: down and to the right.)
- **Stale-recovery rate**: % stale jobs auto-recovered via a routed packet.
- **Memory-usefulness rate**: % retrieved memories that changed the outcome.
- **Time-to-proof**: median ms from job start to first valid proof receipt.
- **Rework rate**: reopen/redo count per completed job.
- **Routing-success rate**: per model/seat/task-kind proof-yield.

"Real learning" is defined operationally: improvement on these metrics over a
**frozen** fixture set. A policy that only "writes more notes" will not move the
truth rate on frozen fixtures and will not be promoted.

## Guardrails

- **Eval gaming.** The grader runs in an isolated context from the generator,
  and the verifier policy uses a different model family than the one that
  produced the work (the codebase already supports independent-verifier
  identities in the completion policy).
- **Proof integrity.** Reuse the SHA-binding already in `xpass_receipt_v1`;
  optionally harden hashed receipts to HMAC later. Never count self-report.
- **No weight training.** The harness tunes config bundles only. The harness
  ceiling is stated plainly: this raises how well UnClick *uses* a fixed brain,
  not the brain's reasoning.
- **Safety of replay.** Fixtures replay against sandboxed/dry-run consumers
  (`runRoutePacketConsumerDryRun` already exists) so regression runs never take
  destructive real actions.

## Build sequence (this harness only)

- **Step 1 (read-only):** write `eval_trajectory` rows by subscribing to the
  existing completion-gate and xpass outputs. Ship the dashboard. This alone
  gives the first honest truth-rate/time-to-proof numbers with zero behavior
  change. Lowest risk, immediate value.
- **Step 2:** turn real incidents into `eval_fixture` rows; build the dry-run
  replay runner on top of the existing route-packet consumer.
- **Step 3:** introduce `eval_policy` bundles and the regression-gate; run new
  policies in shadow.
- **Step 4:** wire the first real tuned policy (memory rank weights or the
  dead `writerlane-router`) and only promote on frozen-fixture wins.

Step 1 is the wedge: it is observation-only, reuses outputs that already exist,
and produces the metric that the whole strategy claims to care about (verified
completion vs apparent completion) before any risky change is made.
