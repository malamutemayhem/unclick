# Memory Circle Sharing - PRD

Status: **Increment 1 shipped** (enforcement core + data model + flag, deny-by-default, off by default). Not yet live for users - increment 2 wires it into the read path. See "Roadmap" below.

## Why

Circle lets one UnClick user share their persistent memory with another user, gated by mutual consent. The user-facing promise is simple: "turn on Shared Memory for someone, and once you BOTH agree, they can read your memory; turn it off and they cannot."

Every prior attempt at this feature was built inside an ephemeral session container and lost before it reached GitHub (the container is wiped on idle/end, and unpushed work dies with it). This PRD and the code that lands with it are rebuilt from the memory blueprint of those attempts and are pushed immediately so they finally persist.

## Hard architecture constraint: managed-cloud only

Memory has two storage modes (see `packages/mcp-server/src/memory/db.ts`):

- **Managed cloud**: all users share UnClick's central Supabase. Every row carries an `api_key_hash` that scopes it to one user. A read CAN, with consent, query another user's `api_key_hash` rows.
- **BYOD**: each user's memory lives in *their own* Supabase, encrypted with their own key. Another user has no credentials for that database.

Cross-user sharing is therefore **only possible in managed cloud**. In BYOD it is impossible by construction - there is no path for user B to reach user A's private database. The gate denies any cross-user read whose backend mode is not `managed`. This is not a limitation to fix later; it is a safety property.

## Data model

`circle_link_permissions` (central Supabase, migration `20260624120000_memory_circle_sharing.sql`):

| column | meaning |
|--------|---------|
| `owner_api_key_hash`   | the memory owner (grantor) |
| `grantee_api_key_hash` | the reader who may receive access |
| `owner_enabled`        | owner has opted in |
| `grantee_enabled`      | grantee has opted in |
| `revoked_at`           | set when either side withdraws; deactivates the share |

A share is **active** only when `owner_enabled AND grantee_enabled AND revoked_at IS NULL`. Direction matters: one row authorizes grantee to read owner, not the reverse. Mutual sharing is two rows. The table is service_role-only (RLS enabled, no policy).

## Enforcement core

`packages/mcp-server/src/memory/circle.ts` is the single source of truth, mirroring the lane-04 scopes pattern (pure, dependency-free, deny-by-default, flag-gated):

- `canReadCircleMemory({ readerApiKeyHash, ownerApiKeyHash, mode, grants })` - the one gate predicate. Deny-by-default at every branch:
  - missing reader/owner identity -> deny
  - reader reading their OWN memory -> allow (not a cross-user share)
  - cross-user read in non-managed mode -> deny
  - cross-user read with no active grant -> deny
  - cross-user read with an active, mutual, non-revoked grant -> allow
- `isCircleGrantActive`, `selectActiveGrant`, `circleSharingEnabled` (flag `MEMORY_CIRCLE_ENABLED`, default off).

Covered by `packages/mcp-server/src/memory/__tests__/circle.test.ts`.

## Flag

`MEMORY_CIRCLE_ENABLED` (default off). While off, the read path never takes the cross-user branch, behaviour is byte-identical to today, and there is no schema dependency. The migration is additive and safe to run before the flag flips.

## Roadmap

- **Increment 1 (done):** consent table, enforcement core, tests, flag. Lands and persists the foundation. Changes nothing for users yet.
- **Increment 2 (next, needs review before merge):** the part that actually serves shared data, and the higher-risk one because it widens cross-tenant access:
  1. a way for a read to name a target owner (a `?owner=` / param on `load_memory` / `search_memory`),
  2. wiring `canReadCircleMemory` into the read chokepoint so every read funnels through the gate and an unconsented target is denied,
  3. an audit log of cross-user reads,
  4. the consent UI (request, accept, revoke) and the `circle_link_permissions` write path.
- **Increment 3:** surface in the website (the admin Circle pages from the earlier demo, rebuilt against the real table instead of localStorage).

## Loss-prevention note

To stop this work evaporating again: it is pushed to GitHub the moment it is testable (not saved for session end), and also mirrored to a timestamped backup branch. GitHub retains branches indefinitely, so once pushed the work cannot be lost to a container wipe.
