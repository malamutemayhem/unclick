-- ─── Circle sharing: cross-user memory access (mutual-consent grants) ───────
--
-- Adds the consent table that Circle uses to let one user (the owner) share
-- their memory with another user (the grantee). A share is ACTIVE only when
-- both sides opt in (owner_enabled AND grantee_enabled) and it has not been
-- revoked (revoked_at IS NULL). Either side can withdraw at any time, which
-- immediately deactivates the share.
--
-- Direction matters: a row authorizes the grantee to read the owner's memory,
-- not the reverse. Mutual sharing is two rows.
--
-- Managed-cloud only by design. In BYOD mode each user's memory lives in their
-- OWN Supabase, which a grantee has no credentials for, so this table lives in
-- the central Supabase alongside the api_keys + mc_* tables and is keyed by
-- api_key_hash, exactly like the managed memory tables.
--
-- NOTE (key-rotation, see incident 2026-06-25): this table keys on api_key_hash,
-- which is rotation-FRAGILE - if a user rotates their key, these grants would
-- strand (the same bug the account lane_hash work fixes for memory: branch
-- claude/amazing-meitner-65jet9, migration 20260624120000_account_lane_hash).
-- FOLLOW-UP: once that lane_hash work lands, re-key these columns to lane_hash
-- (owner_lane_hash / grantee_lane_hash) so Circle shares survive key rotation.
-- Kept on api_key_hash here only so this is mergeable independently; it is
-- flag-gated off (MEMORY_CIRCLE_ENABLED) so nothing depends on it yet.
--
-- App-layer enforcement is the source of truth (see memory/circle.ts
-- canReadCircleMemory). This migration provides the storage plus an IMMUTABLE
-- predicate so a read RPC can push the same "is this share active" rule down
-- into SQL without re-deriving it. Nothing reads this table until the
-- MEMORY_CIRCLE_ENABLED flag is turned on, so existing behaviour is unchanged.
--
-- RLS: the table is service_role-only. RLS is enabled with no policy, so the
-- anon and authenticated roles get no access at all and only the server's
-- service_role key (which bypasses RLS) can touch it. This matches how the
-- mc_* managed memory tables are locked down.

-- ─── 1. Consent table ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS circle_link_permissions (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_api_key_hash   TEXT NOT NULL,
  grantee_api_key_hash TEXT NOT NULL,
  owner_enabled        BOOLEAN NOT NULL DEFAULT FALSE,
  grantee_enabled      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at           TIMESTAMPTZ,
  CONSTRAINT uq_circle_link UNIQUE (owner_api_key_hash, grantee_api_key_hash),
  CONSTRAINT chk_circle_no_self CHECK (owner_api_key_hash <> grantee_api_key_hash)
);

-- ─── 2. Index: only the active shares, looked up by grantee then owner ───────
--
-- The hot read is "for this reader (grantee), which owners may I read?", so the
-- partial index leads with grantee and covers only active rows.

CREATE INDEX IF NOT EXISTS idx_circle_link_active
  ON circle_link_permissions (grantee_api_key_hash, owner_api_key_hash)
  WHERE owner_enabled AND grantee_enabled AND revoked_at IS NULL;

-- ─── 3. Active-share predicate (mirrors memory/circle.ts isCircleGrantActive) ─

CREATE OR REPLACE FUNCTION circle_share_active_v1(
  p_owner_enabled   BOOLEAN,
  p_grantee_enabled BOOLEAN,
  p_revoked_at      TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT coalesce(p_owner_enabled, FALSE)
     AND coalesce(p_grantee_enabled, FALSE)
     AND p_revoked_at IS NULL;
$$;

-- ─── 4. Lock the table down to service_role only ────────────────────────────

ALTER TABLE circle_link_permissions ENABLE ROW LEVEL SECURITY;
