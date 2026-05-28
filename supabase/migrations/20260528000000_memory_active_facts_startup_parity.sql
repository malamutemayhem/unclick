-- Memory active_facts startup parity
--
-- Closes the remaining V1 startup-context gaps:
-- - marked operational/excluded rows do not surface in active_facts
-- - obvious legacy operational narration is denied even before backfill
-- - future-dated facts do not surface before valid_from
-- - startup access metrics are bumped only for the surfaced facts
-- - managed and BYOD startup RPCs use the same selection rules

CREATE OR REPLACE VIEW mc_active_facts_startup_v1
WITH (security_invoker = true) AS
SELECT
  id,
  api_key_hash,
  fact,
  category,
  confidence,
  created_at,
  startup_fact_kind
FROM mc_extracted_facts
WHERE status = 'active'
  AND decay_tier = 'hot'
  AND invalidated_at IS NULL
  AND valid_from <= now()
  AND (valid_to IS NULL OR valid_to > now())
  AND COALESCE(startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')
  AND NOT (
    lower(COALESCE(source_type, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
    OR lower(COALESCE(category, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
    OR lower(COALESCE(fact, '')) LIKE '%heartbeat%'
    OR lower(COALESCE(fact, '')) LIKE '%self-report%'
    OR lower(COALESCE(fact, '')) LIKE '%self report%'
    OR lower(COALESCE(fact, '')) LIKE '%testpass_cron_user_id%'
    OR (lower(COALESCE(fact, '')) LIKE '%cron%' AND lower(COALESCE(fact, '')) LIKE '%resolved%')
    OR (lower(COALESCE(fact, '')) LIKE '%signal%' AND lower(COALESCE(fact, '')) LIKE '%blocked%')
  );

CREATE OR REPLACE VIEW active_facts_startup_v1
WITH (security_invoker = true) AS
SELECT
  id,
  fact,
  category,
  confidence,
  created_at,
  startup_fact_kind
FROM extracted_facts
WHERE status = 'active'
  AND decay_tier = 'hot'
  AND invalidated_at IS NULL
  AND valid_from <= now()
  AND (valid_to IS NULL OR valid_to > now())
  AND COALESCE(startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')
  AND NOT (
    lower(COALESCE(source_type, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
    OR lower(COALESCE(category, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
    OR lower(COALESCE(fact, '')) LIKE '%heartbeat%'
    OR lower(COALESCE(fact, '')) LIKE '%self-report%'
    OR lower(COALESCE(fact, '')) LIKE '%self report%'
    OR lower(COALESCE(fact, '')) LIKE '%testpass_cron_user_id%'
    OR (lower(COALESCE(fact, '')) LIKE '%cron%' AND lower(COALESCE(fact, '')) LIKE '%resolved%')
    OR (lower(COALESCE(fact, '')) LIKE '%signal%' AND lower(COALESCE(fact, '')) LIKE '%blocked%')
  );

REVOKE ALL ON TABLE mc_active_facts_startup_v1 FROM anon, authenticated;
REVOKE ALL ON TABLE active_facts_startup_v1 FROM anon, authenticated;
GRANT SELECT ON TABLE mc_active_facts_startup_v1 TO service_role;
GRANT SELECT ON TABLE active_facts_startup_v1 TO service_role;

CREATE OR REPLACE FUNCTION mc_get_startup_context(
  p_api_key_hash TEXT,
  p_num_sessions INTEGER DEFAULT 5
)
RETURNS JSONB AS $$
DECLARE
  ctx JSONB;
  lib JSONB;
  sessions JSONB;
  facts JSONB;
  fact_ids UUID[] := ARRAY[]::UUID[];
BEGIN
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'category', category,
      'key', key,
      'value', value,
      'priority', priority
    ) ORDER BY priority DESC, category, key
  ), '[]'::jsonb)
  INTO ctx
  FROM mc_business_context
  WHERE api_key_hash = p_api_key_hash
    AND decay_tier IN ('hot', 'warm');

  UPDATE mc_business_context
  SET access_count = access_count + 1,
      last_accessed = now()
  WHERE api_key_hash = p_api_key_hash
    AND decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'slug', slug,
      'title', title,
      'category', category,
      'tags', tags,
      'version', version,
      'updated_at', updated_at
    ) ORDER BY updated_at DESC
  ), '[]'::jsonb)
  INTO lib
  FROM mc_knowledge_library
  WHERE api_key_hash = p_api_key_hash
    AND decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'session_id', session_id,
      'platform', platform,
      'summary', summary,
      'decisions', decisions,
      'open_loops', open_loops,
      'topics', topics,
      'created_at', created_at
    ) ORDER BY created_at DESC
  ), '[]'::jsonb)
  INTO sessions
  FROM (
    SELECT *
    FROM mc_session_summaries
    WHERE api_key_hash = p_api_key_hash
    ORDER BY created_at DESC
    LIMIT p_num_sessions
  ) recent;

  WITH surfaced_facts AS (
    SELECT id, fact, category, confidence, created_at, startup_fact_kind
    FROM mc_active_facts_startup_v1
    WHERE api_key_hash = p_api_key_hash
    ORDER BY
      CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
      confidence DESC,
      created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object(
        'fact', fact,
        'category', category,
        'confidence', confidence,
        'created_at', created_at
      ) ORDER BY
        CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
        confidence DESC,
        created_at DESC
    ), '[]'::jsonb),
    COALESCE(array_agg(id), ARRAY[]::UUID[])
  INTO facts, fact_ids
  FROM surfaced_facts;

  UPDATE mc_extracted_facts
  SET access_count = access_count + 1,
      last_accessed = now()
  WHERE api_key_hash = p_api_key_hash
    AND id = ANY(fact_ids);

  RETURN jsonb_build_object(
    'business_context', ctx,
    'knowledge_library_index', lib,
    'recent_sessions', sessions,
    'active_facts', facts,
    'loaded_at', now()
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_startup_context(num_sessions INTEGER DEFAULT 5)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  ctx JSONB;
  lib JSONB;
  sessions JSONB;
  facts JSONB;
  fact_ids UUID[] := ARRAY[]::UUID[];
BEGIN
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'category', category,
      'key', key,
      'value', value,
      'priority', priority
    ) ORDER BY priority DESC, category, key
  ), '[]'::jsonb)
  INTO ctx
  FROM business_context
  WHERE decay_tier IN ('hot', 'warm');

  UPDATE business_context
  SET access_count = access_count + 1,
      last_accessed = now()
  WHERE decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'slug', slug,
      'title', title,
      'category', category,
      'tags', tags,
      'version', version,
      'updated_at', updated_at
    ) ORDER BY updated_at DESC
  ), '[]'::jsonb)
  INTO lib
  FROM knowledge_library
  WHERE decay_tier IN ('hot', 'warm');

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'session_id', session_id,
      'platform', platform,
      'summary', summary,
      'decisions', decisions,
      'open_loops', open_loops,
      'topics', topics,
      'created_at', created_at
    ) ORDER BY created_at DESC
  ), '[]'::jsonb)
  INTO sessions
  FROM (
    SELECT *
    FROM session_summaries
    ORDER BY created_at DESC
    LIMIT num_sessions
  ) recent;

  WITH surfaced_facts AS (
    SELECT id, fact, category, confidence, created_at, startup_fact_kind
    FROM active_facts_startup_v1
    ORDER BY
      CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
      confidence DESC,
      created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object(
        'fact', fact,
        'category', category,
        'confidence', confidence,
        'created_at', created_at
      ) ORDER BY
        CASE WHEN startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
        confidence DESC,
        created_at DESC
    ), '[]'::jsonb),
    COALESCE(array_agg(id), ARRAY[]::UUID[])
  INTO facts, fact_ids
  FROM surfaced_facts;

  UPDATE extracted_facts
  SET access_count = access_count + 1,
      last_accessed = now()
  WHERE id = ANY(fact_ids);

  result := jsonb_build_object(
    'business_context', ctx,
    'knowledge_library_index', lib,
    'recent_sessions', sessions,
    'active_facts', facts,
    'loaded_at', now()
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mc_search_facts(
  p_api_key_hash TEXT,
  p_search_query TEXT,
  p_max_results  INTEGER DEFAULT 20
)
RETURNS TABLE(
  id           UUID,
  fact         TEXT,
  category     TEXT,
  confidence   REAL,
  status       TEXT,
  created_at   TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT ef.id, ef.fact, ef.category, ef.confidence, ef.status, ef.created_at
  FROM mc_extracted_facts ef
  WHERE ef.api_key_hash = p_api_key_hash
    AND ef.fact ILIKE '%' || p_search_query || '%'
    AND ef.status = 'active'
    AND ef.invalidated_at IS NULL
    AND ef.valid_from <= now()
    AND (ef.valid_to IS NULL OR ef.valid_to > now())
    AND COALESCE(ef.startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')
    AND NOT (
      lower(COALESCE(ef.source_type, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(ef.category, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(ef.fact, '')) LIKE '%heartbeat%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%self-report%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%self report%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%testpass_cron_user_id%'
      OR (lower(COALESCE(ef.fact, '')) LIKE '%cron%' AND lower(COALESCE(ef.fact, '')) LIKE '%resolved%')
      OR (lower(COALESCE(ef.fact, '')) LIKE '%signal%' AND lower(COALESCE(ef.fact, '')) LIKE '%blocked%')
    )
  ORDER BY ef.confidence DESC, ef.created_at DESC
  LIMIT p_max_results;
END;
$$;

CREATE OR REPLACE FUNCTION search_facts(
  search_query TEXT,
  max_results  INTEGER DEFAULT 20
)
RETURNS TABLE(
  id           UUID,
  fact         TEXT,
  category     TEXT,
  confidence   REAL,
  status       TEXT,
  created_at   TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT ef.id, ef.fact, ef.category, ef.confidence, ef.status, ef.created_at
  FROM extracted_facts ef
  WHERE ef.fact ILIKE '%' || search_query || '%'
    AND ef.status = 'active'
    AND ef.invalidated_at IS NULL
    AND ef.valid_from <= now()
    AND (ef.valid_to IS NULL OR ef.valid_to > now())
    AND COALESCE(ef.startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')
    AND NOT (
      lower(COALESCE(ef.source_type, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(ef.category, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(ef.fact, '')) LIKE '%heartbeat%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%self-report%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%self report%'
      OR lower(COALESCE(ef.fact, '')) LIKE '%testpass_cron_user_id%'
      OR (lower(COALESCE(ef.fact, '')) LIKE '%cron%' AND lower(COALESCE(ef.fact, '')) LIKE '%resolved%')
      OR (lower(COALESCE(ef.fact, '')) LIKE '%signal%' AND lower(COALESCE(ef.fact, '')) LIKE '%blocked%')
    )
  ORDER BY ef.confidence DESC, ef.created_at DESC
  LIMIT max_results;
END;
$$;
