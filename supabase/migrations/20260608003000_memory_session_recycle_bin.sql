-- ─── Memory recycle bin support for chat/session summaries ────────────────
--
-- Facts already have status='archived', so they can be hidden from recall and
-- restored. Session summaries were still hard-deleted from the admin UI. Add a
-- matching soft-delete state so the Memory recycle bin can restore chats too.

ALTER TABLE IF EXISTS public.mc_session_summaries
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archive_reason TEXT;

UPDATE public.mc_session_summaries
SET status = 'active'
WHERE status IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'mc_session_summaries_status_check'
  ) THEN
    ALTER TABLE public.mc_session_summaries
      ADD CONSTRAINT mc_session_summaries_status_check
      CHECK (status IN ('active', 'archived'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_mc_ss_recycle_bin
  ON public.mc_session_summaries(api_key_hash, status, archived_at DESC);

-- BYOD parity for self-hosted memory databases.
ALTER TABLE IF EXISTS public.session_summaries
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archive_reason TEXT;

UPDATE public.session_summaries
SET status = 'active'
WHERE status IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'session_summaries_status_check'
  ) THEN
    ALTER TABLE public.session_summaries
      ADD CONSTRAINT session_summaries_status_check
      CHECK (status IN ('active', 'archived'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_ss_recycle_bin
  ON public.session_summaries(status, archived_at DESC);

-- Keep archived chat summaries out of load_memory startup recall. This mirrors
-- the no-access-inflation managed startup function and extends the same
-- recycle-bin visibility rule to BYOD.

CREATE OR REPLACE FUNCTION public.mc_get_startup_context(p_api_key_hash text, p_num_sessions integer DEFAULT 5)
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
  ctx JSONB;
  lib JSONB;
  sessions JSONB;
  facts JSONB;
  fact_ids UUID[] := ARRAY[]::UUID[];
BEGIN
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('category', category, 'key', key, 'value', value, 'priority', priority)
    ORDER BY priority DESC, category, key
  ), '[]'::jsonb)
  INTO ctx
  FROM mc_business_context
  WHERE api_key_hash = p_api_key_hash AND decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('slug', slug, 'title', title, 'category', category, 'tags', tags, 'version', version, 'updated_at', updated_at)
    ORDER BY updated_at DESC
  ), '[]'::jsonb)
  INTO lib
  FROM mc_knowledge_library
  WHERE api_key_hash = p_api_key_hash AND decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('session_id', session_id, 'platform', platform, 'summary', summary, 'decisions', decisions, 'open_loops', open_loops, 'topics', topics, 'created_at', created_at)
    ORDER BY created_at DESC
  ), '[]'::jsonb)
  INTO sessions
  FROM (
    SELECT *
    FROM mc_session_summaries
    WHERE api_key_hash = p_api_key_hash
      AND COALESCE(status, 'active') = 'active'
    ORDER BY created_at DESC
    LIMIT p_num_sessions
  ) recent;

  WITH surfaced_facts AS (
    SELECT af.id, af.fact, af.category, af.confidence, af.created_at, af.startup_fact_kind,
      NULLIF(to_jsonb(ef) ->> 'source_agent_id', '') AS source_agent_id,
      NULLIF(to_jsonb(ef) ->> 'source_ref', '') AS source_ref,
      NULLIF(to_jsonb(ef) ->> 'receipt_id', '') AS receipt_id
    FROM mc_active_facts_startup_v1 af
    JOIN mc_extracted_facts ef ON ef.id = af.id AND ef.api_key_hash = af.api_key_hash
    WHERE af.api_key_hash = p_api_key_hash
    ORDER BY CASE WHEN af.startup_fact_kind = 'durable' THEN 0 ELSE 1 END, af.confidence DESC, af.created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object('fact', fact, 'category', category, 'confidence', confidence, 'created_at', created_at, 'source_agent_id', source_agent_id, 'source_ref', source_ref, 'receipt_id', receipt_id)
      ORDER BY CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END, confidence DESC, created_at DESC
    ), '[]'::jsonb),
    COALESCE(array_agg(id), ARRAY[]::UUID[])
  INTO facts, fact_ids
  FROM surfaced_facts;

  RETURN jsonb_build_object(
    'business_context', ctx,
    'knowledge_library_index', lib,
    'recent_sessions', sessions,
    'active_facts', facts,
    'loaded_at', now()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_startup_context(num_sessions integer DEFAULT 5)
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
  ctx JSONB;
  lib JSONB;
  sessions JSONB;
  facts JSONB;
  fact_ids UUID[] := ARRAY[]::UUID[];
BEGIN
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('category', category, 'key', key, 'value', value, 'priority', priority)
    ORDER BY priority DESC, category, key
  ), '[]'::jsonb)
  INTO ctx
  FROM business_context
  WHERE decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('slug', slug, 'title', title, 'category', category, 'tags', tags, 'version', version, 'updated_at', updated_at)
    ORDER BY updated_at DESC
  ), '[]'::jsonb)
  INTO lib
  FROM knowledge_library
  WHERE decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object('session_id', session_id, 'platform', platform, 'summary', summary, 'decisions', decisions, 'open_loops', open_loops, 'topics', topics, 'created_at', created_at)
    ORDER BY created_at DESC
  ), '[]'::jsonb)
  INTO sessions
  FROM (
    SELECT *
    FROM session_summaries
    WHERE COALESCE(status, 'active') = 'active'
    ORDER BY created_at DESC
    LIMIT num_sessions
  ) recent;

  WITH surfaced_facts AS (
    SELECT af.id, af.fact, af.category, af.confidence, af.created_at, af.startup_fact_kind,
      NULLIF(to_jsonb(ef) ->> 'source_agent_id', '') AS source_agent_id,
      NULLIF(to_jsonb(ef) ->> 'source_ref', '') AS source_ref,
      NULLIF(to_jsonb(ef) ->> 'receipt_id', '') AS receipt_id
    FROM active_facts_startup_v1 af
    JOIN extracted_facts ef ON ef.id = af.id
    ORDER BY CASE WHEN af.startup_fact_kind = 'durable' THEN 0 ELSE 1 END, af.confidence DESC, af.created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object('fact', fact, 'category', category, 'confidence', confidence, 'created_at', created_at, 'source_agent_id', source_agent_id, 'source_ref', source_ref, 'receipt_id', receipt_id)
      ORDER BY CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END, confidence DESC, created_at DESC
    ), '[]'::jsonb),
    COALESCE(array_agg(id), ARRAY[]::UUID[])
  INTO facts, fact_ids
  FROM surfaced_facts;

  RETURN jsonb_build_object(
    'business_context', ctx,
    'knowledge_library_index', lib,
    'recent_sessions', sessions,
    'active_facts', facts,
    'loaded_at', now()
  );
END;
$function$;
