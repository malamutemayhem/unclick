-- ─── Stop startup-context loads from inflating access_count / last_accessed ──
--
-- ROOT CAUSE of the runaway "5663x" access counts on the Recall Check page:
-- mc_get_startup_context (called by load_memory on EVERY session start and
-- EVERY heartbeat, across every device) ran two unconditional bumps:
--
--     UPDATE mc_business_context SET access_count = access_count + 1, last_accessed = now() ...
--     UPDATE mc_extracted_facts  SET access_count = access_count + 1, last_accessed = now() ... (the 50 startup facts)
--
-- So the durable "top of mind" facts/rules were incremented once per load.
-- With automated heartbeats reading every few minutes for weeks, their
-- access_count climbed without bound (one tenant hit 5663 on ~390 facts) and
-- the heat/usefulness signal became pure background-read noise, not real use.
-- This recurred because the bump lived inside the startup function and was
-- copied into every rewrite of it (4+ prior migrations); resets just
-- re-inflated on the next heartbeat, and the UI "Background-heavy / Startup or
-- heartbeat reads" labels were display-only.
--
-- FIX: a bulk startup load is not a per-fact usefulness signal, so it must not
-- touch access_count / last_accessed. This recreates mc_get_startup_context
-- with both bump blocks removed. The returned payload is byte-for-byte
-- identical; only the side-effect writes are gone. Genuine, targeted access
-- (e.g. mc_get_library_doc fetching one doc by slug) still counts.
--
-- A one-time reset of the already-polluted counters is applied operationally
-- per affected tenant (not in this migration, to avoid a blanket write across
-- every tenant's rows).

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

  -- Startup loads intentionally do NOT bump access_count/last_accessed.

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
    SELECT * FROM mc_session_summaries
    WHERE api_key_hash = p_api_key_hash
    ORDER BY created_at DESC LIMIT p_num_sessions
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

  -- Startup loads intentionally do NOT bump access_count/last_accessed.

  RETURN jsonb_build_object(
    'business_context', ctx,
    'knowledge_library_index', lib,
    'recent_sessions', sessions,
    'active_facts', facts,
    'loaded_at', now()
  );
END;
$function$;
