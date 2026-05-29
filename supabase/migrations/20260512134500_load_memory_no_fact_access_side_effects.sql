-- Stop load_memory / get_startup_context from inflating fact access counts.
--
-- Startup loads are background context hydration, not an explicit recall.
-- The old functions incremented every active hot fact on each load, which made
-- Memory > Recall Check show the same identity facts with huge equal counts and
-- also kept hot facts artificially fresh.

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

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'fact', fact,
      'category', category,
      'confidence', confidence,
      'created_at', created_at
    ) ORDER BY confidence DESC, created_at DESC
  ), '[]'::jsonb)
  INTO facts
  FROM (
    SELECT *
    FROM mc_extracted_facts
    WHERE api_key_hash = p_api_key_hash
      AND status = 'active'
      AND decay_tier = 'hot'
      AND invalidated_at IS NULL
      AND (valid_to IS NULL OR valid_to > now())
    ORDER BY confidence DESC, created_at DESC
    LIMIT 50
  ) hot_facts;

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

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'fact', fact,
      'category', category,
      'confidence', confidence,
      'created_at', created_at
    ) ORDER BY confidence DESC, created_at DESC
  ), '[]'::jsonb)
  INTO facts
  FROM (
    SELECT *
    FROM extracted_facts
    WHERE status = 'active'
      AND decay_tier = 'hot'
      AND invalidated_at IS NULL
      AND (valid_to IS NULL OR valid_to > now())
    ORDER BY confidence DESC, created_at DESC
    LIMIT 50
  ) hot_facts;

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
