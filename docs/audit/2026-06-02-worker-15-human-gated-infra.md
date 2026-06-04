# 2026-06-02 Worker 15 decision packet - Human-gated infra

**Lane:** Worker 15, Human-gated infra. Research and proof only.
**Seat:** 🚦 Claude Worker 15 (`claude-worker-15-human-gated-infra`)
**Generated:** 2026-06-02 (Australia/Sydney)
**Source pointers:** Boardroom job IDs below. Orchestrator is context, not proof.

## Why this is a packet, not a set of changes

Every job in this lane lands on a safety surface that the handover (`20260527 UnClick
Detailed Handover Notes` section 81, re-stated in the cowork audit
`docs/audit/2026-05-28-missing-jobs-cowork-lane.md`) says must never be touched without
explicit Chris approval: secrets, API keys, billing, DNS, production deploy settings, and
the workflow broad-execute switch. So the deliverable is a verdict per job, backed by
read-only proof, plus a ready-to-apply artifact where one is safe. No DNS, secret, billing,
network-policy, or workflow-execute change was made.

All live proof was gathered read-only: Supabase `execute_sql` SELECTs (no writes), Vercel
domain-availability check, Sentry issue search, and the repo. The UnClick Vercel connector
is intentionally not used for env reads because a standing memory fact records its schema is
broken; the agreed substitute is GitHub checks plus direct production behaviour, which is
what the cron-health proof below relies on.

---

## 1. `1f76c665` - TESTPASS_CRON_USER_ID set in Vercel Prod + Preview

**Verdict: VERIFIED SET in production. NO_CODE_NEEDED.**

Read-only proof (Supabase `testpass_runs`, project `xmooqsylqlknuksiddca`, at 05:27Z):

| Metric (last 24h) | Value |
|---|---|
| Scheduled smoke runs | 326 |
| Runs with `actor_user_id` set (attributed) | 326 / 326 |
| Runs failed | 0 |
| Latest run | 2026-06-02 05:27:16Z |

- Consumer: `api/testpass-run.ts:433-437`. On the cron path, a system pack
  (`owner_user_id` NULL) returns HTTP 500 unless `process.env.TESTPASS_CRON_USER_ID` is set.
- Cron: `vercel.json` runs `/api/testpass-run?pack_id=testpass-core&profile=smoke...&source=scheduled`
  every 5 minutes. 326 runs in 24h is that cadence, every run attributed and green.
- Inventory: `src/pages/admin/systemCredentialInventory.ts:274` (Vercel project env,
  `risk: normal`, identifier only, no secret value).

Conclusion: if the var were missing in production, the every-5-minute cron would 500 and
attribution would be NULL. It is neither. The var is present and working in **Production**.

**Human note (optional, not blocking):** Preview deployments do not run the production cron,
so a Preview value is non-blocking. If Prod+Preview parity is wanted for manual Preview runs,
Chris can confirm the Preview-scoped value in the Vercel dashboard. No secret value is needed
to confirm presence.

---

## 2. `ac61a52b` - Set Vercel env vars for PR #126 Signals Phase 2

**Verdict: DO NOT SET YET. Premature - no consumer in production. NO_CODE_NEEDED now.**

Read-only proof:

- PR #126 (`feat/signals-phase-2`) is **closed, unmerged, `mergeable_state: dirty`**
  (closed 2026-05-01). It was never merged.
- Live `api/signals-dispatch.ts` on `main` is Phase 1 only. Its entire env surface is
  `CRON_SECRET`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`.
  Line 181 still reads `console.log("[signals-dispatch] telegram pending Phase 2")`.
- The 4 env vars PR #126 asked for have **no consumer on main**:

| Var | Kind | Notes |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | secret | Chris-only |
| `VAPID_PRIVATE_KEY` | secret | Chris-only |
| `VAPID_PUBLIC_KEY` (+ `VITE_VAPID_PUBLIC_KEY`) | public | only useful once code consumes it |
| `VAPID_SUBJECT` | config | defaults to `mailto:signals@unclick.world` |

- Signals are live on the Phase 1 (email/Resend) path: `mc_signals` last 24h = 222 signals,
  0 critical, 101 action_needed. The dispatcher is healthy without these vars.

Conclusion: setting these now adds 2 standing secrets with nothing reading them. The correct
order is to re-land Phase 2 in a fresh, non-dirty PR first, then set the 4 env vars at deploy
time (the 2 secrets are a Chris action). Until then this job is blocked on a product decision,
not on env work.

---

## 3. `684887e1` - unclickai.com domain decision (redirect + DNS/SSL + auto-renew)

**Verdict: decision packet ready. Domain already registered. Human owns DNS/registrar.**

Read-only proof:

- Vercel domain-availability check: `unclickai.com` is **not available for purchase** -> it is
  already registered. So this is a "point it" decision, not a "buy it" decision.
- Registrant, expiry, and auto-renew state cannot be read from this seat (registrar access is
  human). Not asserting ownership.
- `vercel.json` already ships the precedent redirect:
  `www.unclick.world` -> `https://unclick.world/:path*` (permanent). SSL is auto-managed by
  Vercel for attached domains.

Recommended path (all human-gated, none performed here):

1. Confirm registrar control of `unclickai.com` and that auto-renew is ON (registrar dashboard).
2. Add `unclickai.com` and `www.unclickai.com` to the Vercel project (Vercel issues the cert).
3. Point DNS at Vercel (A/ALIAS or nameservers) per the registrar.
4. Add the redirect rule below to `vercel.json` `redirects` (safe no-op until DNS resolves):

```jsonc
{
  "source": "/:path*",
  "has": [{ "type": "host", "value": "(www\\.)?unclickai\\.com" }],
  "destination": "https://unclick.world/:path*",
  "permanent": true
}
```

Step 4 is a one-line PR a normal lane can ship once steps 1-3 are done. Steps 1-3 are DNS and
registrar writes and stay with Chris.

---

## 4. `9a4eb279` - Open egress allowlist for unclick.world from cron sandbox

**Verdict: network-policy decision. Human/platform owns it. No policy change made.**

Research:

- This is about an agent scheduled-task sandbox (the "cron sandbox") being able to reach the
  UnClick API. It is a sandbox/runtime network-policy setting, not a repository change. The
  remote-execution network policy is chosen per environment
  (see https://code.claude.com/docs/en/claude-code-on-the-web).
- Minimal egress actually needed by a worker sandbox:

| Destination | Port | Why |
|---|---|---|
| `unclick.world` (apex) | 443 | `/api/mcp` (MCP tool surface), `/api/memory-admin` (memory + `check_signals`) |

- Scope to that host + 443 if the platform supports per-host allowlists. No wildcard egress is
  required for the UnClick MCP path.

Conclusion: this is a real network decision for Chris/platform owner. The packet documents the
exact, minimal allowlist so the change is a narrow one-host rule rather than open egress. No
network policy was changed.

---

## 5. `8dbbb4de` - Smart Timer external waker via repository_dispatch (RISKY, human-gated)

**Verdict: do not enable. Real human switch. Precondition not met.**

Research proof:

- `autonomous-runner.yml` triggers today: `schedule`, `workflow_run` (completed), and
  `workflow_dispatch`. The manual path already has an OpenHands execute gate
  (`execute_confirm` must equal `ENABLE_OPENHANDS_EXECUTE`) and a `wake_source`
  including `trusted_unclick_fallback`.
- There is **no `repository_dispatch` trigger** in any workflow (grep of `.github/workflows/`
  returns none). That trigger is the precondition for an external waker.
- `build_dispatch_events` table = **0 rows in the last 14 days** -> the external dispatch/waker
  lane is dormant. Nothing is firing this path now.
- Sibling job `62ac75aa` (Worker 6) is the precondition: switch the builder workflow to accept
  `repository_dispatch`. The Smart Timer (`8dbbb4de`) sits on top of that.

Adding a `repository_dispatch` trigger that can reach the OpenHands execute bridge is the
"workflow broad-execute switch" the handover reserves for Chris. Recommended gated rollout when
Chris approves:

1. Land `62ac75aa` first (accept `repository_dispatch`, default mode `dry-run`).
2. Keep the `ENABLE_OPENHANDS_EXECUTE` confirmation gate on the execute path.
3. Require a shared secret / HMAC on the dispatch payload so only the trusted waker can fire it.
4. Keep the kill switch (`kill_switch`) honoured before any claim cycle.

No workflow trigger was changed.

---

## 6. `f8ccad72` - Vercel notification backlog triage for missed crash signals

**Verdict: no crash backlog visible in readable surfaces. Vercel bell needs Chris or a token.**

Read-only proof:

- Sentry org `malamute-mayhem`: **0 projects, 0 issues**. No Sentry-side crash backlog exists
  (Sentry is effectively not capturing for this project).
- UnClick `mc_signals` last 24h: 222 signals, **0 critical**, 101 action_needed, 212 unread.
  No critical crash signals in the in-product signal store.
- The Vercel alert-bell / email backlog itself cannot be read from this seat: Vercel shows no
  team for the available token, and the UnClick Vercel connector is the known-broken one.

Conclusion: the two surfaces that are readable show no critical crash backlog. The Vercel bell
remains unverified and needs either (a) a one-time human sweep by Chris, or (b) a fixed,
read-only Vercel token so this triage can be automated next round. The 212 unread `mc_signals`
are read-state noise, not crashes; that belongs to the Boardroom noise lane (Worker 7), flagged
here as FYI only.

---

## Human decisions surfaced (for Chris)

| Job | Decision needed | Owner | Blocking? |
|---|---|---|---|
| `1f76c665` | None for Prod. Optional: confirm Preview parity in Vercel | Chris | No |
| `ac61a52b` | Re-land Signals Phase 2 PR first; then set 4 env vars (2 secret) | Chris | Yes, product decision |
| `684887e1` | Confirm registrar control + auto-renew; add domain + DNS to Vercel | Chris | Yes, DNS write |
| `9a4eb279` | Approve a one-host egress allowlist (`unclick.world:443`) | Chris/platform | Yes, network policy |
| `8dbbb4de` | Approve `repository_dispatch` execute switch (after `62ac75aa`) | Chris | Yes, risky switch |
| `f8ccad72` | One-time Vercel bell sweep, or provision read-only Vercel token | Chris | Partial |

No secrets, DNS, billing, network-policy, or workflow-execute changes were made by this seat.
