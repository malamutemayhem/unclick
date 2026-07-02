# Library Snapshot Automation - implementation spec

## Problem (verified against current main)

- **Code/Library auto-capture from chats is already automatic** per user-turn. The
  wiring is on main for both paths: the MCP `log_conversation` handler
  (`packages/mcp-server/src/memory/handlers.ts`) and the hosted web-chat path
  `admin_conversation_turn_ingest` in `api/memory-admin.ts` (PR #1295, merged
  2026-06-04, not reverted). It is gated by `MEMORY_CODE_AUTOCAPTURE_ENABLED` /
  `MEMORY_LIBRARY_AUTOCAPTURE_ENABLED`. If the live counts are 0, confirm the
  flag VALUE is literally `1` at runtime and that the var is not newer than the
  last production deploy (env vars only bind on a new deployment).

- **Library taxonomy snapshots are NOT automatic.** `refreshTaxonomySnapshots` /
  `writeMemoryTaxonomySnapshotsToLibrary` only run from: the admin "Write
  Snapshots" button (`src/pages/admin/memory/LibraryTab.tsx`), a manual
  `refresh_taxonomy_snapshots` MCP call, or forget-cleanup (`forget.ts`).
  `vercel.json` crons on main contain `nightly_decay` but nothing for snapshots.
  So a human must click the button. This spec removes that.

## Goal

Snapshots refresh on their own so the Library/Files-and-Notes tab fills without
anyone clicking. Per-tenant, best-effort, never blocks or fails a memory write.

## Option A - post-save hook (recommended)

Refresh the acting tenant's snapshots right after a `save_session`, reusing the
existing authenticated, tenant-scoped write path. No cron secret, no cross-tenant
fan-out, naturally scoped to whoever is active.

Touch points:

1. MCP path - `packages/mcp-server/src/memory/handlers.ts`, `save_session`
   handler. After the session summary is written, best-effort:

   ```ts
   // Best-effort: keep the Library shelves fresh without a manual refresh.
   // Throttled so it runs at most once per tenant per REFRESH_MIN_INTERVAL.
   if (shouldRefreshSnapshots(db)) {
     await db.refreshTaxonomySnapshots({ dry_run: false }).catch(() => undefined);
   }
   ```

2. Hosted web-chat path - `api/memory-admin.ts`, the session-summary write action
   (the `save_session` / session-summary equivalent used by the web app). Mirror
   the #1295 capture hook exactly: **managed tenants only** (skip BYOD via the
   `memory_configs` row check), wrapped in `try/catch`, using a managed
   `SupabaseBackend({ url, serviceRoleKey, tenancy: { mode: "managed", apiKeyHash } })`
   then `await backend.refreshTaxonomySnapshots({ dry_run: false })`.

Throttle (required - do NOT refresh on every turn):

- `save_session` is already infrequent (end of session), so hooking it there is
  the natural rate limit. Add a guard so it runs at most once per tenant per
  ~6h: store `last_taxonomy_refresh_at` (reuse a lightweight marker row, e.g. a
  `business_context` key, or a column) and skip if within the window.

## Option B - nightly cron (alternative / complement)

New standalone serverless function so the 11k-line `api/memory-admin.ts` is not
touched:

- `api/memory-snapshots-nightly.ts`: copy the `nightly_decay` auth pattern
  (`CRON_SECRET` via `bearerFrom(req)`, fail closed), query active `api_keys`,
  loop, and per tenant `new SupabaseBackend({ url, serviceRoleKey, tenancy: {
  mode: "managed", apiKeyHash: key_hash } }).refreshTaxonomySnapshots({ dry_run:
  false })`. Skip BYOD tenants (those with a `memory_configs` row).
- `vercel.json` crons: add `{ "path": "/api/memory-snapshots-nightly", "schedule":
  "23 4 * * *" }` (off-peak, after `nightly_decay`).

Option B gives a backstop even for idle tenants; Option A keeps active tenants
fresh in near-real-time. They compose well: ship A first, add B if idle-tenant
freshness matters.

## Verification gates (must pass before merge)

- `cd packages/mcp-server && npx vitest run src/memory/__tests__` (snapshot +
  auto-capture suites). Add a unit test that the `save_session` hook calls
  `refreshTaxonomySnapshots` once and is best-effort (a throw does not propagate).
- `tsc` clean for the edited files.
- Manual: in a dev tenant, run `save_session`, confirm a new row appears under
  the Library tab without clicking Write Snapshots.

## Also confirm (capture, not snapshots)

`MEMORY_CODE_AUTOCAPTURE_ENABLED` and `MEMORY_LIBRARY_AUTOCAPTURE_ENABLED` are
`1` in the runtime the hosted functions read, and the deployment is newer than
the last edit to those vars. If the var was edited after the last deploy,
redeploy once so the functions pick up the value.
