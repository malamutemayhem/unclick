# /api/memory-admin sustained every-minute 401s

Job: `80b5c54a` (Worker 12, Security and rollback lane)
Constraint: investigate with redacted proof, no secret values in logs or output.

## Summary

The sustained, roughly every-minute `401` on `/api/memory-admin` coming from
`unclick.world` is **not** a cron or a leaked secret. It is a browser-side
presence poll that fires every 60 seconds and, for a signed-in admin whose
account has no linked api_key yet, gets a `401` on every single poll.

Root cause is structural and reproducible from code alone (no production logs
or secrets required):

- `AIChatPanel` polls `action=admin_channel_status` every
  `CHANNEL_STATUS_POLL_MS = 60_000` ms
  (`src/components/admin/aiChatConfig.ts:20`,
  `src/components/admin/AIChatPanel.tsx:107`).
- The poll is gated only on having a Supabase session token
  (`if (!effectiveAuthToken) return;`), NOT on the account having a linked
  api_key.
- `admin_channel_status` resolved the caller to an `api_key_hash` and returned
  `401 "Authorization header required"` whenever that hash was null
  (`api/memory-admin.ts`, previously line 6936). A valid Supabase JWT whose
  account has no `api_keys` row resolves to a null hash.
- The poller never backs off on a `401` (`if (!res.ok) return;`), so it
  re-fires every 60s for as long as the tab stays open.

Result: one admin tab open on an account with no linked key produces a clean
once-per-minute `401` from `unclick.world`, exactly matching the report.

## What it is NOT (ruled out with proof)

- **Vercel crons.** `vercel.json` has only one every-minute cron,
  `/api/signals-dispatch` (`*/1 * * * *`), which authenticates with
  `CRON_SECRET` and is a different endpoint. The only memory-admin cron is
  `nightly_decay`, scheduled `0 4 * * *` (daily, not minutely).
- **A leaked or rotated secret.** No secret value is involved in the 401
  path; the 401 is a missing-linked-key condition, not a wrong secret.
- **`admin_check_connection`.** This action already returns a soft `200`
  (`connected:false`) when no key is present (`api/memory-admin.ts:3492`), so
  the other 60s poller (`MemoryHealthPill`, `REFRESH_MS = 60_000`) does not
  emit 401s. `MemoryHealthPill` is also guarded with
  `if (!apiKey && !token) return;`.

## 401 surface inventory (for redacted log triage)

`/api/memory-admin` returns `401` from these distinct messages (counts are
source-site counts, not request counts):

| message | sites | meaning |
|---|---:|---|
| `Authorization header required` | 94 | no resolved api_key_hash |
| `Unauthorized` | 7 | bearer/secret mismatch (incl. `nightly_decay` cron) |
| `api_key required` | 4 | action needs a raw api_key |
| `Not signed in` | 2 | no Supabase session |
| `uc_* / agt_* api_key required on this action` | 1 | wrong token type |
| `Not signed in or no linked API key` | 1 | JWT but no linked key |

To confirm the live caller without exposing secrets, filter Vercel/Sentry by
`path = /api/memory-admin` and `status = 401`, then group by the `action`
query param and the `referer`. Expect the dominant group to be
`action=admin_channel_status` (and possibly `action=status`) with a
`unclick.world/admin/...` referer. Do not log `Authorization` headers.

## Fix shipped here

`admin_channel_status` now distinguishes a genuinely unauthenticated caller
from a signed-in admin who simply has no linked key:

- Genuinely unauthenticated (no valid session, no key): still `401`.
- Authenticated but unlinked: soft `200 { channel_active:false,
  configured:false }`, mirroring the existing `admin_check_connection`
  pattern. The 60s poll no longer emits a 401 for this common case.

The decision is a pure, exported helper `resolveChannelStatusAuthOutcome`
(in `api/memory-admin.ts`) so it is unit-tested without mocking the handler.

- Test: `npx vitest run api/memory-admin-channel-status-auth.test.ts`
  (4 passing). Full memory-admin suite still green (19 tests).

## Recommended follow-ups (not done here)

1. Client hardening (owner: admin-UI lane): have the 60s pollers stop or
   exponentially back off after a `401`, so no future api_key-bound action
   can regress into per-minute auth noise. Candidates:
   `src/components/admin/AIChatPanel.tsx:107`,
   `src/pages/admin/AdminOrchestrator.tsx` (`status` + `admin_channel_status`).
2. Verify the live drop after deploy via the redacted Vercel/Sentry filter
   above (human-gated; needs prod log access).
