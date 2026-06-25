-- ============================================================
-- Deep fix: consolidate every account's keys onto ONE memory lane
-- ============================================================
-- The quick fix (20260624120000_account_lane_hash) gave each api_keys row a
-- stable lane_hash and made an IN-PLACE key rotation safe. But an account can
-- have more than one row (a second key, BYOD, a per-device key, or the
-- historical rotation rows from the 2026-06 lane-split). After the quick-fix
-- backfill each of those rows points at its OWN hash, so two keys for the same
-- account still resolve to two different drawers.
--
-- This migration makes ALL of an account's keys share the SAME lane: the
-- account's canonical lane. Multiple keys then resolve to one drawer.
--
-- SAFE BY CONSTRUCTION - no memory data moves, and NO account's current drawer
-- changes:
--   * The canonical lane is taken from the EXACT key the resolvers already
--     pick: is_active = true, ordered by last_used_at DESC NULLS LAST. So the
--     lane every surface reads today is unchanged.
--   * We only rewrite the account's OTHER keys to agree with that canonical
--     lane. Because every key ends up pointing at the same value, it no longer
--     matters which key a request arrives on - they all land in one drawer.
--   * Single-key accounts are a no-op (their one key already is the canonical).

WITH canonical AS (
  SELECT DISTINCT ON (user_id)
         user_id,
         lane_hash AS canon_lane
    FROM api_keys
   WHERE user_id  IS NOT NULL
     AND is_active = TRUE
     AND lane_hash IS NOT NULL
   ORDER BY user_id,
            last_used_at DESC NULLS LAST,
            created_at   DESC NULLS LAST
)
UPDATE api_keys k
   SET lane_hash = c.canon_lane
  FROM canonical c
 WHERE k.user_id   = c.user_id
   AND k.lane_hash IS DISTINCT FROM c.canon_lane;
