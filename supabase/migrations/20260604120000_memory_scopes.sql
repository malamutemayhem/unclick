-- ─── lane-04: Memory scopes, credential-aware memory, Boardroom visibility ───
--
-- Adds row-level scope columns to extracted_facts (managed mc_* and BYOD) plus
-- an immutable scope predicate function. Enforcement is primarily app-layer
-- (see memory/scopes.ts), composed on top of the existing api_key_hash tenant
-- scoping. This predicate is provided so the read RPCs can push the same rule
-- down in SQL without re-deriving it. All columns are nullable; NULL/blank
-- visibility means user-global (the legacy default), so existing rows stay
-- visible and nothing changes until MEMORY_SCOPES_ENABLED is turned on.
--
-- Scope model:
--   visibility       : 'private' | 'shared' | 'user-global' (NULL = user-global)
--   source_agent_id  : source/owning agent for a 'private' fact. This is the
--                      canonical agent-identity column DECLARED by lane-03
--                      (Worker 3, band 01xx) and only CONSUMED here. This band
--                      does not declare it, per the coordinator ruling.
--   boardroom_id     : the Boardroom a 'shared' fact belongs to
--   credential_scope : the connector credential a fact was derived from
--   quarantined_at   : set when the backing credential is revoked (fact hidden)
--
-- RLS is unchanged: mc_* tables remain service_role-only and BYOD tables keep
-- their per-user auth.uid() policies. No new tables are introduced, so no new
-- policies are required; row-level visibility is enforced above tenant RLS.

-- ─── 1. Managed cloud: add scope columns to mc_extracted_facts ───────────────

ALTER TABLE mc_extracted_facts
  ADD COLUMN IF NOT EXISTS visibility       TEXT,
  ADD COLUMN IF NOT EXISTS boardroom_id     TEXT,
  ADD COLUMN IF NOT EXISTS credential_scope TEXT,
  ADD COLUMN IF NOT EXISTS quarantined_at   TIMESTAMPTZ;

-- ─── 2. BYOD: add scope columns to extracted_facts ──────────────────────────

ALTER TABLE extracted_facts
  ADD COLUMN IF NOT EXISTS visibility       TEXT,
  ADD COLUMN IF NOT EXISTS boardroom_id     TEXT,
  ADD COLUMN IF NOT EXISTS credential_scope TEXT,
  ADD COLUMN IF NOT EXISTS quarantined_at   TIMESTAMPTZ;

-- ─── 3. Visibility value guard (idempotent: CHECK has no IF NOT EXISTS) ──────

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_mc_ef_visibility'
  ) THEN
    ALTER TABLE mc_extracted_facts
      ADD CONSTRAINT chk_mc_ef_visibility
      CHECK (visibility IS NULL OR visibility IN ('private', 'shared', 'user-global'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_ef_visibility'
  ) THEN
    ALTER TABLE extracted_facts
      ADD CONSTRAINT chk_ef_visibility
      CHECK (visibility IS NULL OR visibility IN ('private', 'shared', 'user-global'));
  END IF;
END $$;

-- ─── 4. Indexes: only index the rows that are not user-global ───────────────

CREATE INDEX IF NOT EXISTS idx_mc_ef_scope
  ON mc_extracted_facts (api_key_hash, visibility, boardroom_id)
  WHERE visibility IS NOT NULL AND visibility <> 'user-global';

CREATE INDEX IF NOT EXISTS idx_mc_ef_credential
  ON mc_extracted_facts (api_key_hash, credential_scope)
  WHERE credential_scope IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ef_scope
  ON extracted_facts (visibility, boardroom_id)
  WHERE visibility IS NOT NULL AND visibility <> 'user-global';

CREATE INDEX IF NOT EXISTS idx_ef_credential
  ON extracted_facts (credential_scope)
  WHERE credential_scope IS NOT NULL;

-- ─── 5. Scope predicate (the hook Worker 1 / Worker 6 compose into reads) ────
--
-- Mirrors memory/scopes.ts isFactInScope exactly. IMMUTABLE so it can sit in a
-- WHERE clause / index expression. Default-denies restrictive tiers when the
-- reader identity is NULL, and denies any unrecognized visibility token.

CREATE OR REPLACE FUNCTION memory_fact_in_scope_v1(
  p_visibility          TEXT,
  p_source_agent_id     TEXT,
  p_boardroom_id        TEXT,
  p_credential_scope    TEXT,
  p_quarantined_at      TIMESTAMPTZ,
  p_reader_agent_id     TEXT,
  p_reader_boardroom_id TEXT,
  p_authorized_scopes   TEXT[]
)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT
    p_quarantined_at IS NULL
    AND (
      nullif(trim(coalesce(p_credential_scope, '')), '') IS NULL
      OR (
        p_authorized_scopes IS NOT NULL
        AND trim(p_credential_scope) = ANY (p_authorized_scopes)
      )
    )
    AND (
      CASE lower(coalesce(nullif(trim(coalesce(p_visibility, '')), ''), 'user-global'))
        WHEN 'user-global' THEN TRUE
        WHEN 'private' THEN (
          p_reader_agent_id IS NOT NULL
          AND nullif(trim(coalesce(p_source_agent_id, '')), '') IS NOT NULL
          AND trim(p_source_agent_id) = p_reader_agent_id
        )
        WHEN 'shared' THEN (
          p_reader_boardroom_id IS NOT NULL
          AND nullif(trim(coalesce(p_boardroom_id, '')), '') IS NOT NULL
          AND trim(p_boardroom_id) = p_reader_boardroom_id
        )
        ELSE FALSE
      END
    );
$$;
