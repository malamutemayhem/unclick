-- ============================================================
-- Account-stable memory lane (fixes key-rotation stranding)
-- ============================================================
-- Memory + tenant rows are scoped by `api_key_hash`. Historically that hash
-- WAS the current api key's hash, so rotating a key (reset_api_key swaps
-- key_hash in place) moved the tenant onto a brand-new, empty lane and the
-- operator's whole history appeared to vanish (see the 2026-06 tenant
-- lane-split incident).
--
-- Fix: give every api_keys row a stable `lane_hash` that is set once and is
-- NOT touched when the key rotates. Resolvers return coalesce(lane_hash,
-- key_hash), so the tenant stays on the same lane no matter how many times
-- the key is regenerated. Because reset_api_key updates the row in place
-- (same id, same lane_hash), rotation becomes safe with no data movement.
--
-- This migration is behaviour-neutral on day one: lane_hash is backfilled to
-- equal key_hash, so resolvers return exactly what they returned before. The
-- divergence only appears on the NEXT rotation, which is precisely the case
-- we are fixing.

ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS lane_hash TEXT;

-- Freeze each existing key's lane to where its data currently resolves.
UPDATE api_keys
   SET lane_hash = key_hash
 WHERE lane_hash IS NULL
   AND key_hash IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_api_keys_lane_hash ON api_keys(lane_hash);

-- lane_hash is deliberately NOT unique. The initial value is copied from
-- key_hash (which IS unique), so there is no collision today. The planned
-- account-scoping follow-up will let several keys of the SAME account share
-- one lane_hash, so a UNIQUE constraint here would block that design and is
-- intentionally omitted.

COMMENT ON COLUMN api_keys.lane_hash IS
  'Stable per-account memory lane. Set at key creation, backfilled to equal '
  'key_hash, and intentionally NOT changed when a key is rotated, so memory '
  'tables (scoped by api_key_hash = lane_hash) survive rotation. Resolvers '
  'must return coalesce(lane_hash, key_hash).';
