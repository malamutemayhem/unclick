# 2026-06-21 Tenant lane split: "AI job board empty" + shrunken memory

**Status:** root cause found; live data repair applied during investigation; code-side prevention shipped in this PR.

**Surfaces hit:** Boardroom (jobs board), Memory admin counts, Orchestrator history.

**Operator:** Chris (`byrneck@gmail.com`).

## One-paragraph summary

UnClick had two tenant "filing cabinets" for the same operator. The signed-in
web app opened the current cabinet (a registered api_keys lane with zero jobs).
Some workers still carried an old raw `uc_*` key, and `/api/memory-admin`
accepted that key by hashing it directly without checking it was a registered,
active key. So jobs, memory, signals, and automation history were written into a
second, orphaned lane that the web app could never resolve to. Nothing was
deleted; the live UI was reading the smaller, newer lane while the history sat
in the older one.

## What the operator saw

- Boardroom jobs board rendered empty: `active_todo_count: 0`, `queued: 0`,
  `in_progress: 0`, no Boardroom messages.
- Memory admin showed a much smaller record count than expected.
- Orchestrator reported "0 active jobs" and treated the board as healthy/quiet.

## Root cause

Boardroom and memory rows are scoped by `api_key_hash`. The Jobs screen
(`src/pages/admin/AdminJobs.tsx`) calls `/api/memory-admin`, which resolves the
caller's tenant in `resolveApiKeyHash` (`api/memory-admin.ts`). Two auth paths
behaved differently:

1. **Web UI session JWT**: resolves the signed-in user to their `api_keys` row
   and uses that row's `key_hash`. This landed on the registered lane
   `6c6cb0c3f4...64a212`, which had no jobs.
2. **Raw `uc_*` / `agt_*` token**: the agent path hashed the raw token and
   trusted it as a tenant lane **without confirming the hash existed in
   `api_keys`**. A stale/unregistered key therefore minted a real, parallel
   workspace under the orphan hash `9940983a9d...ab9f1e`. Workers wrote jobs and
   memory there; the web app read the registered lane instead.

The offending line was, in effect, `return sha256hex(token)` for any key with a
`uc_` / `agt_` prefix. There was no equivalent of the stricter check that
`validateApiKey()` in `api/mcp.ts` (and `resolveTestPassRunActor()` in
`api/testpass-run.ts`) already performed.

### Lane evidence (read-only, at time of investigation)

| Lane | Registered api_keys row? | Notable contents |
|---|---|---|
| `6c6cb0c3f4...64a212` (canonical web lane) | yes (`uc_5763d`, label `default`) | 0 todos initially; ~645 memory records |
| `9940983a9d...ab9f1e` (orphan legacy lane) | **no** | 510 todos, ~9.7k Boardroom messages, ~24k memory records, ~25k signals, ~5k autopilot events, credential rows |

## Why continuous improvement missed it

The improvement surfaces inspected the **currently resolved lane** and never
reconciled across lanes:

- Orchestrator read 0 jobs for the resolved lane and returned a health PASS.
- There was no historical baseline ("this tenant used to have jobs") and no
  service-role tenant-integrity audit ("Boardroom/memory rows exist under a hash
  with no `api_keys` row").
- A quiet board was treated as quiet, not as suspicious.

The missing rule: **zero jobs is healthy only after proving the resolved lane is
the intended lane.**

## What was repaired live (before this PR)

Performed during the investigation, on the production data, not in this repo:

1. Snapshotted the canonical and orphan lanes (archives held by the operator;
   contain private production data, not committed here).
2. Migrated the Boardroom/job operating tables from the orphan hash to the
   canonical hash (rooms, todos, messages, comments, ideas, votes, dispatches,
   worker profiles). The jobs board now renders again: 72 open, 5 in progress,
   384 done, 49 dropped; Orchestrator sees the restored queue.
3. **Memory was deliberately not bulk-migrated.** The orphan lane holds older
   facts, sessions, conversation logs, signals, and credential rows; a blind
   merge would reintroduce stale facts and noisy signals into live memory.
   Selective recovery is tracked separately.

## What this PR ships (prevention, code side)

- `resolveAgentApiKeyHash()` in `api/memory-admin.ts`: a raw `uc_*` / `agt_*`
  key must match a registered, **active** `api_keys` row before it can act as a
  tenant. Unregistered or revoked keys are rejected (callers turn `null` into a
  401), so a stale key can no longer fork an orphan lane. Rejections log only
  the non-secret hash prefix, never the token, so attempts stay observable.
- `api/memory-admin-agent-key-validation.test.ts`: regression pack pinning the
  contract (registered active key accepted; unregistered rejected; revoked
  rejected; legacy rows treated as active; fails closed on lookup error; token
  never logged).

This closes the *write* path that created the split. It does not, by itself,
detect a split that already exists.

## Follow-ups (tracked as Boardroom jobs)

- `b952a77d-43fe-...` - ship the api/memory-admin hardening + a lane-integrity
  worker (this PR delivers the hardening half).
- `c4d29673-beb1-...` - prevention program: one tenant resolver everywhere, a
  global lane-integrity worker across Jobs/Memory/Orchestrator/signals/autopilot,
  drop-vs-orphan warnings, and tenant proof in worker receipts.
- `80e8f975-8462-...` - selective, deduped memory recovery from the orphan lane
  (library/context first; facts with dedupe; sessions/logs/signals/credentials
  reviewed, never blind-merged).

Likely-related prior signal: Boardroom job `80b5c54a-4642-4fda-8b5d-2c5a44cd1324`
("/api/memory-admin sustained 401s"), consistent with auth/lane churn on this
endpoint.

## Recommended detective controls (next)

- **Lane-integrity worker** (global): group every user-scoped table by tenant
  hash, left-join `api_keys`, and emit an action-needed signal for any orphan
  lane that holds todos/messages/memory/signals.
- **Empty/low-state diagnostics:** if the resolved lane is empty but another
  lane holds a much larger history, show "data is in another account lane (key
  prefix X)" instead of presenting the small lane as normal.
- **Receipts carry tenant proof:** auth path, key-row id when available, and a
  short hash prefix, so CI/workers can prove which lane they acted on.
