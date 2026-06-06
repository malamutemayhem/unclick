-- mem-harden lane-05: true-forget (hard-forget tombstones)
--
-- Adds user-intent "forget" as a first-class, content-scrubbing operation that
-- is distinct from the soft invalidate_fact (which only hides a fact from
-- recall). A forget tombstones the fact row, scrubs its content, nulls its
-- embedding, deletes derived typed links, and writes a 'forget' audit row.
-- The application layer gates this behind MEMORY_HARD_FORGET_ENABLED (default
-- off); this migration is additive (new columns, widened CHECKs, new RPCs) and
-- changes no existing behaviour on its own.
--
-- Schema band: lane-05 (08xx in the plan's logical registry). The repo uses
-- timestamp-prefixed migration filenames, so this claims a timestamp after the
-- latest existing migration and is tagged to the lane in the filename.

-- ---- 1. Managed cloud: tombstone columns on mc_extracted_facts ----
ALTER TABLE mc_extracted_facts
  ADD COLUMN IF NOT EXISTS forgotten_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS forgotten_reason TEXT;

-- ---- 2. BYOD: tombstone columns on extracted_facts ----
ALTER TABLE extracted_facts
  ADD COLUMN IF NOT EXISTS forgotten_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS forgotten_reason TEXT;

-- ---- 3. Widen the status CHECK to allow 'forgotten' (both tables) ----
-- The status CHECK is an inline, auto-named constraint, so introspect it by its
-- definition (it is the only check that mentions 'superseded') and swap it. The
-- block is idempotent and a no-op if the table is absent.
DO $$
DECLARE v_name text;
BEGIN
  IF to_regclass('public.mc_extracted_facts') IS NOT NULL THEN
    SELECT conname INTO v_name
    FROM pg_constraint
    WHERE conrelid = 'public.mc_extracted_facts'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%superseded%';
    IF v_name IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.mc_extracted_facts DROP CONSTRAINT %I', v_name);
    END IF;
    ALTER TABLE public.mc_extracted_facts
      ADD CONSTRAINT mc_extracted_facts_status_check
      CHECK (status IN ('active', 'superseded', 'archived', 'disputed', 'forgotten'));
  END IF;

  IF to_regclass('public.extracted_facts') IS NOT NULL THEN
    SELECT conname INTO v_name
    FROM pg_constraint
    WHERE conrelid = 'public.extracted_facts'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%superseded%';
    IF v_name IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.extracted_facts DROP CONSTRAINT %I', v_name);
    END IF;
    ALTER TABLE public.extracted_facts
      ADD CONSTRAINT extracted_facts_status_check
      CHECK (status IN ('active', 'superseded', 'archived', 'disputed', 'forgotten'));
  END IF;
END $$;

-- ---- 4. Widen the facts_audit op CHECK to allow 'forget' (both tables) ----
-- The op CHECK is the only check that mentions 'invalidate'; introspect and swap.
DO $$
DECLARE v_name text;
BEGIN
  IF to_regclass('public.mc_facts_audit') IS NOT NULL THEN
    SELECT conname INTO v_name
    FROM pg_constraint
    WHERE conrelid = 'public.mc_facts_audit'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%invalidate%';
    IF v_name IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.mc_facts_audit DROP CONSTRAINT %I', v_name);
    END IF;
    ALTER TABLE public.mc_facts_audit
      ADD CONSTRAINT mc_facts_audit_op_check
      CHECK (op IN ('insert', 'update', 'invalidate', 'forget'));
  END IF;

  IF to_regclass('public.facts_audit') IS NOT NULL THEN
    SELECT conname INTO v_name
    FROM pg_constraint
    WHERE conrelid = 'public.facts_audit'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%invalidate%';
    IF v_name IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.facts_audit DROP CONSTRAINT %I', v_name);
    END IF;
    ALTER TABLE public.facts_audit
      ADD CONSTRAINT facts_audit_op_check
      CHECK (op IN ('insert', 'update', 'invalidate', 'forget'));
  END IF;
END $$;

-- ---- 5. Managed cloud: mc_forget_fact ----
-- Atomic hard-forget: tombstone the fact, scrub its content, null its embedding,
-- delete derived typed links, and append a 'forget' audit row. Returns the
-- forget timestamp and the number of typed links removed.
CREATE OR REPLACE FUNCTION mc_forget_fact(
  p_api_key_hash TEXT,
  p_fact_id      UUID,
  p_reason       TEXT DEFAULT NULL,
  p_session_id   TEXT DEFAULT NULL
)
RETURNS TABLE (forgotten_at TIMESTAMPTZ, typed_links_deleted INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
  v_now     TIMESTAMPTZ := now();
  v_deleted INTEGER     := 0;
BEGIN
  UPDATE mc_extracted_facts
  SET
    status                    = 'forgotten',
    fact                      = '[forgotten]',
    invalidated_at            = COALESCE(invalidated_at, v_now),
    valid_to                  = COALESCE(valid_to, v_now),
    invalidated_by_session_id = p_session_id,
    forgotten_at              = v_now,
    forgotten_reason          = p_reason,
    embedding                 = NULL,
    embedding_model           = NULL,
    embedding_created_at      = NULL,
    decay_tier                = 'cold',
    updated_at                = v_now
  WHERE id           = p_fact_id
    AND api_key_hash = p_api_key_hash;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'fact % not found for tenant', p_fact_id;
  END IF;

  WITH del AS (
    DELETE FROM mc_memory_typed_links
    WHERE source_id    = p_fact_id::TEXT
      AND source_kind  = 'fact'
      AND api_key_hash = p_api_key_hash
    RETURNING 1
  )
  SELECT count(*)::INTEGER INTO v_deleted FROM del;

  INSERT INTO mc_facts_audit (fact_id, op, payload, actor, at)
  VALUES (
    p_fact_id,
    'forget',
    jsonb_build_object('reason', p_reason, 'session_id', p_session_id, 'typed_links_deleted', v_deleted),
    COALESCE(p_session_id, 'agent'),
    v_now
  );

  RETURN QUERY SELECT v_now, v_deleted;
END;
$$;

-- ---- 6. BYOD: forget_fact ----
CREATE OR REPLACE FUNCTION forget_fact(
  p_fact_id    UUID,
  p_reason     TEXT DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL
)
RETURNS TABLE (forgotten_at TIMESTAMPTZ, typed_links_deleted INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
  v_now     TIMESTAMPTZ := now();
  v_deleted INTEGER     := 0;
BEGIN
  UPDATE extracted_facts
  SET
    status                    = 'forgotten',
    fact                      = '[forgotten]',
    invalidated_at            = COALESCE(invalidated_at, v_now),
    valid_to                  = COALESCE(valid_to, v_now),
    invalidated_by_session_id = p_session_id,
    forgotten_at              = v_now,
    forgotten_reason          = p_reason,
    embedding                 = NULL,
    embedding_model           = NULL,
    embedding_created_at      = NULL,
    decay_tier                = 'cold',
    updated_at                = v_now
  WHERE id = p_fact_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'fact % not found', p_fact_id;
  END IF;

  WITH del AS (
    DELETE FROM memory_typed_links
    WHERE source_id   = p_fact_id::TEXT
      AND source_kind = 'fact'
    RETURNING 1
  )
  SELECT count(*)::INTEGER INTO v_deleted FROM del;

  INSERT INTO facts_audit (fact_id, op, payload, actor, at)
  VALUES (
    p_fact_id,
    'forget',
    jsonb_build_object('reason', p_reason, 'session_id', p_session_id, 'typed_links_deleted', v_deleted),
    COALESCE(p_session_id, 'agent'),
    v_now
  );

  RETURN QUERY SELECT v_now, v_deleted;
END;
$$;
