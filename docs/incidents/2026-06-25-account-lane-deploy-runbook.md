# DEPLOY — Account-stable memory lane fix

**Branch:** `claude/amazing-meitner-65jet9`
**Audience:** whoever publishes/merges/deploys (has GitHub write + prod Supabase access)
**Risk:** low, but **ordering is mandatory** (DB migration BEFORE code). Read the
ordering note before merging.

---

## What's in this branch (4 commits)

```
29e99b1  feat(memory): consolidate account keys onto one memory lane (deep fix)
e0ec0be  fix(memory): make memory survive API key rotation (account-stable lane)
14e813d  fix(tenant): align memory-admin + backstagepass key resolution with mcp.ts
ab8d645  fix(memory-admin): reject unregistered raw api keys to stop orphan tenant lanes
```

Code touched: `api/mcp.ts`, `api/memory-admin.ts`, `api/backstagepass.ts` (+ test).
Migrations added: `supabase/migrations/20260624120000_account_lane_hash.sql`,
`supabase/migrations/20260624130000_consolidate_account_lanes.sql`.

---

## ⚠️ Mandatory ordering

The new resolvers `SELECT ... lane_hash` from `api_keys`. If that column does not
exist yet, those selects **error**, the resolver returns null, and tenant
resolution fails (logins / agent memory break).

Therefore: **apply the DB migrations to production FIRST, then deploy the code.**

- Migration-then-code: safe. Old code ignores `lane_hash`; new code finds it.
- Code-then-migration: **breaks auth** during the gap. Do not do this.

Both migrations are **additive and behaviour-neutral**:
- `20260624120000` adds `lane_hash`, backfills it to equal `key_hash` (so
  resolvers return exactly what they returned before), indexes it.
- `20260624130000` points an account's keys at one canonical lane (the lane the
  resolvers already pick) — no memory data moves, no current drawer changes.

---

## Steps

1. **Publish the branch & open the PR** (draft is fine), target `main`.
2. **Apply the two migrations to the production Supabase project**
   (`supabase db push`, or your migration pipeline). Run `20260624120000`
   first, then `20260624130000`.
   - Verify: `select count(*) from api_keys where lane_hash is null;` should be
     0 for rows that have a `key_hash`.
3. **Merge the PR.** This triggers the Vercel deploy of the new API code, which
   now safely uses the `lane_hash` column.
4. **Smoke test (below).**

---

## Smoke test (post-deploy)

1. Sign in on the web app → memory/board loads as before (no change expected).
2. **Rotate a test account's key** (Settings → reset key), then load memory with
   the new key → history is still there (this is the whole fix).
3. Agent path: call `load_memory` with the rotated key → returns the same lane.
4. Credentials: existing connections still test healthy (they're key-bound; a
   rotated key re-enters secrets by design).

---

## Rollback

- **Code:** safe to revert anytime — old code simply ignores `lane_hash`.
- **Migrations:** additive; no need to roll back. If you must, revert the CODE
  first, and only then consider dropping `api_keys.lane_hash` (never drop the
  column while the new code is live).

---

## Notes

- Credentials are NOT part of this migration — they're encrypted with the raw key
  and stay key-bound on purpose (`api/backstagepass.ts`). Nothing to migrate;
  re-entry on rotation is by design.
- `lane_hash` is intentionally NOT unique (a future multi-key-per-account design
  will share one lane). See `docs/incidents/2026-06-24-account-lane-deep-fix-plan.md`.
