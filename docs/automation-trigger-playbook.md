# Automation Trigger Playbook

**Status:** accepted v0 worker guide.
**Owner:** UnClick fleet.
**Use when:** a worker needs to move a stuck job, wake a seat, request proof, or choose the least noisy automation path.

This playbook preserves the proven trigger methods in one durable place so they do not live only in chat. It is guidance for workers, not an extra scheduler.

Hard rule: keep only one Codex or local heartbeat schedule. Everything else should run inside UnClick native jobs, receipts, PinballWake, QueuePush, WakePass, or GitHub plumbing.

## Ranking

| Rank | Method | Best use | Effectiveness | Worker rule |
| --- | --- | --- | --- | --- |
| 1 | Human typing or subscription chat trigger | Chris is present, a decision is needed, or a live chat wake is already happening | Very high | Save the turn first, read Orchestrator, then act. Do not ask Chris to run scripts. |
| 2 | Single heartbeat tether | Regular unattended progress, queue health, and one safe useful step per wake | Very high | Use the existing UnClick Heartbeat only. Do not create more local schedules. |
| 3 | Exact ScopePack | Turning vague jobs into buildable work | Very high | Include owned files, protected surfaces, smallest next step, proof, tests, and stop conditions. |
| 4 | Proof receipt | Closing loops after a PR, test, review, merge, or blocker check | Very high | Post the proof where the job lives. Include PR, SHA, run id, or exact blocker. |
| 5 | CommonSensePass gate | Blocking false PASS, false done, stale proof, duplicate wake, unsafe merge-ready, and no-work claims | High | Run before merge-ready, done, quiet, duplicate, or no-work claims where the evidence could be stale. |
| 6 | PinballWake wake | Stale ACKs, missed check-ins, stuck workers, or a queue item that needs routing | High | Wake only action-needed items. Quiet health checks should stay quiet. |
| 7 | QueuePush or NudgeOnly | Small routing hints, stale owner reminders, duplicate wake suppression, or missing proof reminders | Medium high | They may nudge or request a receipt. They must not assign ownership, mark done, merge, or set truth. |
| 8 | IgniteOnly | Verified wake packets after a trusted bridge says a worker should be woken | Medium high | Emit only compact wake packets with source evidence and expected receipt. No build or source-state mutation. |
| 9 | BuildBait crumb | Breaking big work into the next smallest build step | Medium | Use before writing code when scope is still too broad. Steps that write code must pass executor gates. |
| 10 | GitHub Actions | CI, preview deploys, smoke checks, and plumbing receipts | Medium | Treat Actions as evidence and plumbing only. Do not use Actions as the brain or source of truth. |
| 11 | Stale-worker reclaim | Recovering work when an assigned worker is quiet beyond the lane window | Medium | Leave a reclaim proof, preserve prior work, then either reassign or attach a smaller ScopePack. |

## Pick The Right Move

Use this order when a job is not moving:

1. Refresh live state: Memory, Orchestrator, Boardroom, Jobs, then repo or PR state if needed.
2. If there is a critical safety or production blocker, handle only the safe read-only step unless owner approval is explicit.
3. If the job is vague, add an exact ScopePack instead of trying to build from loose text.
4. If the job is stale but scoped, claim it, do one bounded step, and post proof.
5. If another worker owns it and the claim is fresh, leave a narrow handoff or choose another job.
6. If proof is missing, request the smallest proof: PR link, commit SHA, run id, check result, or blocker line.
7. If a wake is needed, use NudgeOnly first, IgniteOnly only after verification, and PushOnly only for a compact worker push envelope.
8. If the job is safe and the checks are green, merge only under the gated autopilot policy.
9. If blocked, try one safe unblock, then write the blocker in plain English and move down the queue.

## Trigger Patterns

### Live Chat Trigger

Use when Chris is actively steering, confused, or making a decision. This is the strongest signal because it has human context.

Required receipt:

```text
ACK/CLAIM
Seat: <agent id>
Job/PR: <id or link>
Scope: <exact files or area>
Next: <one bounded step>
ETA: <time>
Blocker: none or exact blocker
```

### Heartbeat Tether

Use for unattended progress. The heartbeat should do one safe useful step, not just report that the queue exists.

Good heartbeat steps:

- merge a green, low-risk PR
- fix a failed check
- attach a missing ScopePack
- add a small doc or test PR
- post a proof receipt
- mark a proof-complete job done

Bad heartbeat steps:

- repeating the same blocked status every cycle
- creating new schedules
- making Chris run local commands
- touching secrets, billing, DNS, auth, production data, or migrations without explicit approval

### ScopePack

Use when a job is broad, stale, or missing owned files.

Minimum fields:

```text
ScopePack
todo_id:
lane:
owned_files:
protected_surfaces:
smallest_safe_step:
acceptance:
verification:
non_overlap:
stop_conditions:
```

### Proof Receipt

Use when a worker claims progress. A claim without proof is not a closure.

Accepted proof:

- PR URL plus head SHA
- merge commit SHA
- GitHub run URL or job id
- local command and result
- Boardroom comment id
- sanitized count or policy name for read-only database checks

Never include raw secrets, API keys, tokens, passwords, connection strings, or plaintext credential values.

### NudgeOnly, IgniteOnly, PushOnly

Use these lanes in sequence:

1. NudgeOnly spots a painpoint or asks for a receipt.
2. IgniteOnly turns verified evidence into a worker wake packet.
3. PushOnly emits the worker-facing push envelope.

None of these lanes can build, merge, close, approve, assign ownership, mark done, or overwrite source-of-truth state.

### GitHub Actions

Use Actions as a proof source:

- CI passed
- CI failed with exact job
- Vercel preview passed
- TestPass smoke ran
- dirty-branch hygiene passed

Do not use Actions to decide product direction, hide blockers, or override Orchestrator or Boardroom state.

## Completion Rules

A worker can mark a job done only when:

- the acceptance criteria are satisfied
- proof is posted on the job or PR
- the final state is visible from live sources
- no fresh blocker remains

Use this final format:

```text
PASS: <what moved>; proof: <id/link/test>; next: <next step>.
BLOCKER: <what stopped>; checked: <proof>; need: <smallest missing thing>.
HOLD: <why skipped>; next picked: <job id or none>.
```

## Safety Holds

Stop and route instead of acting when the next step includes:

- secrets or raw credentials
- auth provider changes
- billing
- DNS or domains
- production data mutation
- destructive database changes
- force push, reset, or branch deletion
- broad refactors without owned files
- compliance or certification claims beyond proof or guidance

If a safety hold is hit, leave a blocker receipt and choose the next safe job. Movement beats waiting, but only when the move is safe.
