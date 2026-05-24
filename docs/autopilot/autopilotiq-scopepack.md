# AutopilotIQ ScopePack

AutopilotIQ is the learning and improvement layer for UnClick AutoPilot.
It records what AutoPilot tried, scores what worked, replays failures, and
recommends safer future policy. It starts as logging, scoring, replay, and
shadow recommendations. It must not make risky production decisions until
explicit gates exist and Chris has approved the chip class.

Canonical links:

- Boardroom: `9e131baf-3f9e-4907-af59-680435a7686d`
- GitHub issue: `malamutemayhem/unclick#944`
- Parent program: Agentic AI, Boardroom `5d9e31c9-1894-4821-ad57-64fad3aed09a`, GitHub `#933`
- Priority: after JobSmith, UXPass, SeatRelay, stale WakePass repair, and Orchestrator proof packet

## Operator Intent

Plain English: UnClick should improve over time by remembering which actions
worked, which actions failed, and what should happen differently next time.

AutopilotIQ tracks:

- action taken
- worker or seat involved
- job type
- tools used
- proof produced
- result
- reward score
- penalty score
- replay lesson
- next recommended policy

Good rewards:

- real proof landed
- PR checks passed
- screenshot proof captured
- stale job rescued
- correct worker or tool chosen
- Chris not bothered unnecessarily
- job finished cleanly

Penalties:

- false DONE
- missing proof
- duplicate claim
- stale owner
- wrong tool
- failed CI
- unnecessary Chris interruption
- unclear handoff

## Safety Shape

AutopilotIQ is not a free-running decision brain at v0. It is a measured
learning loop with visible proof.

Rules:

- Phase 1 to 4 are read-only or non-acting.
- Phase 5 can act only on low-risk, pre-approved chip classes.
- Every action, recommendation, feedback label, gate change, and override is logged.
- Tenant data never crosses tenant boundaries.
- No fixed universal thresholds without learned per-chip-class baselines.
- One active chip per seat still applies.
- AutopilotIQ never bypasses ProofTruth, Boardroom source truth, CopyRoom rules, or reviewer independence.

Hard stop conditions:

- Any unapproved chip class receives an acting recommendation.
- Any false DONE rate regression appears.
- Any AutoPilot action bypasses the recorder.
- Any Chris correction is lost or applied without a feedback receipt.
- Any secret, token, billing, credential, or private payload is written to learning logs.

## Data Model v0

AutopilotIQ needs append-only facts first. Later phases can read these facts,
but they cannot rewrite history.

### `autopilotiq_action_log`

Purpose: black-box recorder for every AutoPilot action or proposed action.

Required fields:

- `id`
- `tenant_id`
- `action_id`
- `job_id`
- `job_type`
- `actor_agent_id`
- `seat_type`
- `tool_ids`
- `action_kind`
- `input_refs`
- `proof_refs`
- `result_state`
- `created_at`
- `redaction_state`

Constraints:

- append-only
- no raw secrets
- no raw full transcript storage
- proof references point to source receipts, PRs, checks, screenshots, or Boardroom comments

### `autopilotiq_outcome_log`

Purpose: records what happened after an action.

Required fields:

- `id`
- `action_id`
- `outcome_kind`
- `reward_score`
- `penalty_score`
- `net_score`
- `evidence_refs`
- `reviewer_agent_id`
- `created_at`

### `autopilotiq_replay_lesson`

Purpose: stores replay output from closed jobs.

Required fields:

- `id`
- `job_id`
- `lesson`
- `failure_mode`
- `next_policy_hint`
- `source_action_ids`
- `created_at`

### `autopilotiq_shadow_recommendation`

Purpose: non-acting recommendation stream.

Required fields:

- `id`
- `job_id`
- `recommended_action`
- `confidence`
- `reason`
- `source_action_ids`
- `would_have_changed_outcome`
- `expires_at`
- `created_at`

### `autopilotiq_gate_config`

Purpose: explicit acting permission for low-risk chip classes only.

Required fields:

- `id`
- `chip_class`
- `risk_level`
- `allowed_actions`
- `kill_switch_enabled`
- `approved_by`
- `approved_at`
- `expires_at`

### `autopilotiq_feedback_label`

Purpose: Chris corrections and reviewer labels as training signals.

Required fields:

- `id`
- `source_kind`
- `source_id`
- `label`
- `severity`
- `applies_to_action_ids`
- `created_by`
- `created_at`

## Six Phases

| Phase | Build | Acceptance | Proof |
| --- | --- | --- | --- |
| 1 | Black-box recorder | Every AutoPilot action writes an immutable action row before acting. | PR, migration, tests, sample recorded action. |
| 2 | Reward and penalty scoreboard | Scores are computed from logged events and proof, not vibes. | PR, scoring tests, admin screenshot if UI exists. |
| 3 | ReplayRoom | Closed jobs can replay actions, outcomes, proof, and lessons. | PR, replay tests, at least three replay fixtures. |
| 4 | Shadow learner | Recommendations are logged but cannot act. | PR, non-acting tests, shadow diff report. |
| 5 | Gated learner | Acts only on pre-approved low-risk chip classes with kill switch. | PR, gate audit, rollback test, kill-switch test. |
| 6 | Human feedback loop | Chris corrections become labeled signals visible in score and replay. | PR, sample feedback round trip, ingestion tests. |

## Phase 1 Scope

Build the recorder first. Do not build the learner first.

Owned files should likely include:

- `api/lib/autopilotiq-action-log.ts`
- `api/autopilotiq-action-log.test.ts`
- `api/memory-admin.ts` only if an admin endpoint is needed
- a migration for `autopilotiq_action_log`
- optional docs update in this file

Acceptance:

- A helper can build a redacted action log row from an AutoPilot action packet.
- The helper refuses secret-shaped fields.
- The helper stores only source pointers for proof and inputs.
- Tests cover proof refs, tool refs, redaction, missing job id, and append-only intent.
- No acting policy changes ship in Phase 1.

Non-goals:

- no reward scoring
- no UI
- no automated routing
- no owner assignment
- no PR merge automation
- no production gate flips

## Reward and Penalty Rubric v0

Start with explicit scoring so it is inspectable.

Suggested reward points:

- `+5` real proof landed
- `+4` PR checks passed
- `+4` screenshot proof captured for UI work
- `+4` stale job rescued
- `+3` correct worker or tool chosen
- `+3` job finished cleanly
- `+2` Chris not bothered unnecessarily
- `+2` clear handoff with source links

Suggested penalties:

- `-10` false DONE
- `-8` missing proof on a close claim
- `-6` duplicate claim
- `-6` stale owner left unhandled
- `-5` wrong tool or wrong worker route
- `-5` failed CI caused by avoidable miss
- `-4` unnecessary Chris interruption
- `-4` unclear handoff

The score is advisory until the gated learner phase. It should never override
ProofTruth, Boardroom truth, or an explicit Chris decision.

## ReplayRoom Requirements

ReplayRoom should answer:

- What did AutoPilot see?
- What action did it take?
- Which worker or tool did it use?
- What proof did it produce?
- What happened next?
- What reward or penalty was assigned?
- What should change next time?

Replay output must link back to source receipts. It must not invent missing
proof. If proof is missing, that is the lesson.

## Shadow Learner Requirements

Shadow mode recommends without acting.

Required proof:

- shadow recommendation id
- source action ids
- current policy
- recommended policy
- confidence
- expected benefit
- reason not acted

Shadow recommendations expire after 30 days unless confirmed by outcome data
or Chris feedback.

## Gated Learner Requirements

The gated learner can act only when all are true:

- chip class is explicitly approved
- action is low risk
- kill switch is healthy
- confidence exceeds the learned baseline for that chip class
- ProofTruth says the required evidence exists
- Boardroom source truth is fresh
- no active human blocker exists
- no duplicate claim exists

Never allow in early gated phases:

- financial action
- credential or secret action
- DNS or billing action
- data deletion
- external contact
- production deploy
- PR merge
- job DONE mark without independent proof

## Chris Feedback Loop

Chris corrections are high-signal training events. They must become structured
labels, not vanish into chat.

Feedback labels:

- `false_done`
- `proof_missing`
- `duplicate_claim`
- `wrong_priority`
- `wrong_worker`
- `wrong_tool`
- `good_save`
- `good_no_interrupt`
- `good_replay_lesson`

Every label needs:

- source receipt
- affected action or job
- severity
- whether it changes a future policy
- reviewer or Chris source

## Build Order

1. Add the recorder data contract and testable redaction helper.
2. Wire one low-risk AutoPilot lane to write action rows in shadow mode.
3. Add reward and penalty scoring as pure functions.
4. Add replay fixtures for recent proof-integrity incidents.
5. Add admin read surface only after the data contract is stable.
6. Add gated learner only after multiple weeks of shadow data.

## Completion Rules

Do not mark the AutopilotIQ program DONE until all six phases have landed with
proof. Individual phase cards can be completed independently only with:

- PR or commit link
- focused tests or CI
- screenshot if UI changed
- Boardroom proof comment
- reviewer pass from a different agent identity or declared reviewer hat

