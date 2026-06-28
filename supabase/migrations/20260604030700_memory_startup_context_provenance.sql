-- Lane 06: expose provenance receipts through startup active facts.
-- Worker 3 owns the columns. This RPC layer reads them through to_jsonb so the
-- migration is tolerant of coordinator sequencing while still publishing the
-- real columns once W3 has landed.

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
    SELECT
      af.id,
      af.fact,
      af.category,
      af.confidence,
      af.created_at,
      af.startup_fact_kind,
      NULLIF(to_jsonb(ef) ->> 'source_agent_id', '') AS source_agent_id,
      NULLIF(to_jsonb(ef) ->> 'source_ref', '') AS source_ref,
      NULLIF(to_jsonb(ef) ->> 'receipt_id', '') AS receipt_id
    FROM mc_active_facts_startup_v1 af
    JOIN mc_extracted_facts ef
      ON ef.id = af.id
     AND ef.api_key_hash = af.api_key_hash
    WHERE af.api_key_hash = p_api_key_hash
    ORDER BY
      CASE WHEN af.startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
      af.confidence DESC,
      af.created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object(
        'fact', fact,
        'category', category,
        'confidence', confidence,
        'created_at', created_at,
        'source_agent_id', source_agent_id,
        'source_ref', source_ref,
        'receipt_id', receipt_id
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
    SELECT
      af.id,
      af.fact,
      af.category,
      af.confidence,
      af.created_at,
      af.startup_fact_kind,
      NULLIF(to_jsonb(ef) ->> 'source_agent_id', '') AS source_agent_id,
      NULLIF(to_jsonb(ef) ->> 'source_ref', '') AS source_ref,
      NULLIF(to_jsonb(ef) ->> 'receipt_id', '') AS receipt_id
    FROM active_facts_startup_v1 af
    JOIN extracted_facts ef ON ef.id = af.id
    ORDER BY
      CASE WHEN af.startup_fact_kind = 'durable' THEN 0 ELSE 1 END,
      af.confidence DESC,
      af.created_at DESC
    LIMIT 50
  )
  SELECT
    COALESCE(jsonb_agg(
      jsonb_build_object(
        'fact', fact,
        'category', category,
        'confidence', confidence,
        'created_at', created_at,
        'source_agent_id', source_agent_id,
        'source_ref', source_ref,
        'receipt_id', receipt_id
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
