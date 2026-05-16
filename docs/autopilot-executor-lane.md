# Autopilot Executor Lane Design

**Status:** accepted v0 design (creation-target named in ScopePack on UnClick todo `086847ea`).
**Authored 2026-05-15** by `claude-cowork-coordinator-seat` under any-worker-hat greenlight.
**Pairs with:** BuildBait v1 ladder Steps 9-12 (executor-gated portion of the crumb ladder), Claim-to-execute bridge v1 (`4ceb6c79`), CommonSensePass discipline (rank-36 in the consolidated automation methods doc), and the current gated-autopilot merge policy.

## Why it exists

Today most fleet seats can comment, classify, nudge, and route. Very few can actually write code, open PRs, or merge. The fleet's autopilot watchdog has been firing `first_missing_rung=buildbait_crumb` because there's no reliable bridge from "a crumb was dropped" to "a real build happened."

The Autopilot Executor Lane closes that gap. It is the **write-capable lane**, gated by two live signals and a small contract, through which the autonomous runner can request that a build attempt happens against a specific scope, and a code-enforced executor seat can satisfy the request safely.

It is the same shape as the existing read-only lanes (NudgeOnly, IgniteOnly, PushOnly per rank-6 separation), but with the right to commit, push, and open PRs **only when both gates are live**.

## Gates

A request is only honored when BOTH gates evaluate to **passed** at the moment of execution.

### Gate 1: Heartbeat live

- The autonomous runner emits a `heartbeat_tick` receipt every cadence interval (default 5-10 min).
- A request is gated to a specific `heartbeat_tick_id`. If the request is older than 1 cycle past that tick, the executor refuses with `gate_blocked: heartbeat_stale`.
- This prevents stale requests from being applied long after the originating signal would have been re-evaluated.
- Implementation: the request's `heartbeat_tick_id` is compared against the latest tick at execution time. Difference greater than 1 cycle blocks execution.

### Gate 2: CommonSensePass

CommonSensePass is the "did this make sense?" pre-flight check. The request payload is run through a small set of deterministic checks before any code is committed:

1. **Scope sanity**
   - All `owned_files` exist in the repo OR are explicitly marked as creation-targets.
   - No file in `owned_files` lives under a protected-surface path (secrets, billing, DNS, migrations, `.github/workflows`, `vercel.json`, etc.).
   - The total scope is <= 25 files (configurable; refuse larger).
2. **Acceptance criteria parseable**
   - The request includes acceptance criteria as a non-empty list of bullets or a runnable test command.
3. **Authority match**
   - The requesting seat is on the allowlist for the executor lane (see Authority model below).
4. **No conflicting active worktree**
   - A live worktree owned by a different seat for the same `todoId` returns `gate_blocked: conflicting_worktree`.

Any check failure short-circuits the request with a structured reason. The receipt is posted back to the requesting seat AND to the Boardroom so other seats can route around it.

## Executor packet contract (v0)

The packet that flows from the autonomous runner through the lane to the executor:

```jsonc
{
  "executor_packet_version": "v0",
  "packet_id": "uuid",
  "emitted_at": "2026-05-15T03:00:00Z",
  "heartbeat_tick_id": "uuid",
  "requesting_seat_id": "pinballwake-job-runner",
  "todo_id": "11957893-9d40-463a-8755-4aa93150850f",
  "scope_pack_comment_id": "uuid",          // pointer to the ScopePack the request hydrates from
  "intent": "create" | "modify" | "test_only",
  "owned_files": [
    "scripts/pinballwake-buildbait-room.mjs",
    "scripts/pinballwake-buildbait-room.test.mjs"
  ],
  "acceptance": {
    "test_command": "node --test scripts/pinballwake-buildbait-room.test.mjs",
    "expected_exit_code": 0
  },
  "proof_required": ["pr_url", "head_sha", "test_run_id", "executor_seat_id"],
  "xpass_advisory": true,
  "head_sha_at_request": "b059c242..."
}
```

Notes:
- `head_sha_at_request` lets the executor detect drift (if main has advanced N commits, the executor must rebase or refuse).
- `xpass_advisory: true` means the executor's PASS is advisory until the reviewer, safety, and coordinator gates sign off (per rank-10 gates). Setting this to false is reserved for explicit owner-greenlit fast lanes.
- `intent: "test_only"` skips the code write step; the executor just runs the test command and posts the receipt. This is useful for proofing scoped freshness checks.

## Receipt shape (mirrors existing `xpass_advisory` pattern)

PASS:

```jsonc
{
  "receipt_type": "executor_packet_pass",
  "emitted_at": "2026-05-15T03:05:00Z",
  "packet_id": "uuid",
  "executor_seat_id": "pinballwake-build-executor",
  "evidence": {
    "pr_url": "https://github.com/malamutemayhem/unclick/pull/788",
    "head_sha_before": "b059c242",
    "head_sha_after": "abc12345",
    "test_run_id": "node-test-2026-05-15T03:04Z",
    "test_exit_code": 0
  },
  "proof_required": ["pr_url", "head_sha", "test_run_id", "executor_seat_id"],
  "xpass_advisory": true,
  "next_action": "reviewer_safety_pass"
}
```

BLOCK / HOLD:

```jsonc
{
  "receipt_type": "executor_packet_hold",
  "emitted_at": "...",
  "packet_id": "uuid",
  "executor_seat_id": "pinballwake-build-executor",
  "hold_reason": "gate_blocked: commonsense_protected_path",
  "evidence": { "offending_path": "vercel.json" },
  "next_action": "rescope_owned_files",
  "proof_required": ["scope_pack_comment_id"],
  "xpass_advisory": false
}
```

## Authority model

Three roles interact with the lane. Each role's authority is **code-enforced** at the executor entry point, not just prompt-enforced (per rank-6).

1. **Requesters**: read-only seats that can emit executor packets. Default allowlist:
   - `pinballwake-job-runner`
   - `unclick-heartbeat-seat`
   - `claude-cowork-coordinator-seat` (this session's seat type, used while bootstrapping)
   - Other Watcher-tier seats added explicitly.
2. **Executors**: seats that can fulfill packets by writing code, pushing branches, and opening PRs.
   - `pinballwake-build-executor` (lives on the same runner as the requester but enters from a separate entry point with broader authority, splitting the surface).
   - Future: `claude-cowork-builder-seat` once the cowork side has a write-capable surface.
3. **Reviewers / Safety / Coordinator**: gated downstream of executor PASS; control ready-for-review and merge decisions under the gated-autopilot policy.
   - `claude-cowork-seat` (reviewer lane; dormant since 2026-05-09; reassignment standing per Chris greenlight).
   - Future safety seat.

## Safety boundaries

The lane never:

- Touches `.env`, `vercel.json`, `*.secret`, `*.key`, `.github/workflows/*`, `migrations/*`, `supabase/*.sql` without an explicit owner assignment with matching path scope.
- Force-pushes, resets, or deletes branches.
- Merges its own PRs. Merge is handled by the gated-autopilot review and safety path, not by the same execution step that wrote the change.
- Modifies files outside `owned_files` in the packet, even if the test command happens to touch them.
- Persists secrets in commits, PR descriptions, or comments (safeText redaction per rank-50).

A packet that would cross any of these boundaries is held with `hold_reason: gate_blocked: protected_surface` and the originating ScopePack is flagged for owner re-scope.

## Lifecycle

```
heartbeat tick                         -> runner emits 0..1 executor_packet per todo
  -> CommonSensePass evaluates packet   -> PASS or HOLD receipt
    (HOLD) -> posted to Boardroom + todo, runner re-scopes next tick
    (PASS) -> executor seat fulfills:
       1. clone/checkout main HEAD as named in packet
       2. apply changes to owned_files only
       3. run acceptance.test_command
       4. open draft PR with closing-ref to todo_id
       5. emit executor_packet_pass receipt with PR URL + SHA + run id
       -> reviewer, safety, and coordinator gates handle ready/merge downstream
```

## Acceptance for the lane itself

When this lane is built, ship is gated on:

- [ ] Heartbeat gate test: a packet with `heartbeat_tick_id` more than 1 cycle stale returns `gate_blocked: heartbeat_stale`.
- [ ] CommonSensePass test for each protected-surface category returns the expected block reason.
- [ ] An end-to-end happy-path packet (BuildBait Step 9 trivial patch on a test todo) produces a draft PR with a passing test run and an `executor_packet_pass` receipt.
- [ ] An end-to-end safety block packet (touching `vercel.json`) produces an `executor_packet_hold` receipt with the right reason and no commit.
- [ ] The lane refuses to merge its own PR in the same execution step; ready/merge requires the gated-autopilot review and safety path.

## Owned files (creation-targets, per ScopePack)

The ScopePack on `086847ea` calls for 9 files; this doc is one of them. Suggested file map for the rest:

```
scripts/pinballwake-executor-lane.mjs         # entry point, gate evaluation
scripts/pinballwake-executor-lane.test.mjs    # node:test for gate logic
scripts/pinballwake-build-executor.mjs        # already exists per main HEAD
scripts/pinballwake-build-executor.test.mjs   # already exists
scripts/pinballwake-commonsense-pass.mjs      # already exists or needs create
scripts/pinballwake-commonsense-pass.test.mjs
scripts/pinballwake-executor-packet.mjs       # packet schema + validation
scripts/pinballwake-executor-packet.test.mjs
docs/autopilot-executor-lane.md               # this doc
```

A builder picking up `086847ea` should:

1. Verify which of the above already exist on current main (8 of 9 reported existing in the prior freshness check at comment `1511cf16`).
2. Create the missing one (this doc).
3. Wire the executor lane into `pinballwake-autonomous-runner.mjs` at the request-emission point per the executor packet schema above. (The autonomous runner is ~180K characters; this wiring should be a small append, not a rewrite.)
4. Add the tests called out in Acceptance.

## Non-goals for v0

- No GitHub Actions integration in v0: the lane runs from the existing scheduled cron.
- No multi-repo packets: single-repo `malamutemayhem/unclick` only.
- No remote executor seats: both requester and executor live in the same Node process for v0.
- No self-merge inside the executor step: merge is allowed only through the current gated-autopilot review and safety path.

## Open questions for v0.1

1. Should `executor_packet_pass` also post directly back to the originating todo as a comment, or only to the Boardroom? Currently both is suggested; reviewing for noise.
2. Should the executor's PR description auto-include the ScopePack comment id as `Closes #...`? Probably yes for merge-to-todo auto-close (rank-52).
3. Should there be a per-tick rate limit on executor packets? v0 is `<=1 per tick per todo`; that may need tightening.

If the live ScopePack on `086847ea` differs from anything stated here at integration time, the ScopePack wins. It is the execution contract.
