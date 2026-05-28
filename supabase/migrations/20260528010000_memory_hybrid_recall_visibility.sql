-- Memory hybrid recall visibility parity
--
-- Closes the direct RPC bypass for search_memory_hybrid and
-- mc_search_memory_hybrid. The MCP layer also post-filters hybrid results,
-- but the database functions should enforce the same recall-visible rules.

CREATE OR REPLACE FUNCTION memory_fact_is_recall_visible_v1(
  p_status TEXT,
  p_invalidated_at TIMESTAMPTZ,
  p_valid_from TIMESTAMPTZ,
  p_valid_to TIMESTAMPTZ,
  p_startup_fact_kind TEXT,
  p_source_type TEXT,
  p_category TEXT,
  p_fact TEXT,
  p_as_of TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT
    p_status = 'active'
    AND p_invalidated_at IS NULL
    AND p_valid_from <= p_as_of
    AND (p_valid_to IS NULL OR p_valid_to > p_as_of)
    AND COALESCE(p_startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')
    AND NOT (
      lower(COALESCE(p_source_type, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(p_category, '')) ~ '(heartbeat|self[-_ ]?report|cron|system)'
      OR lower(COALESCE(p_fact, '')) LIKE '%heartbeat%'
      OR lower(COALESCE(p_fact, '')) LIKE '%self-report%'
      OR lower(COALESCE(p_fact, '')) LIKE '%self report%'
      OR lower(COALESCE(p_fact, '')) LIKE '%testpass_cron_user_id%'
      OR (lower(COALESCE(p_fact, '')) LIKE '%cron%' AND lower(COALESCE(p_fact, '')) LIKE '%resolved%')
      OR (lower(COALESCE(p_fact, '')) LIKE '%signal%' AND lower(COALESCE(p_fact, '')) LIKE '%blocked%')
    );
$$;

CREATE OR REPLACE FUNCTION mc_search_memory_hybrid(
  p_api_key_hash    TEXT,
  p_search_query    TEXT,
  p_query_embedding VECTOR(1536),
  p_max_results     INTEGER    DEFAULT 10,
  p_as_of           TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE(
  id           UUID,
  source       TEXT,
  content      TEXT,
  category     TEXT,
  confidence   REAL,
  created_at   TIMESTAMPTZ,
  final_score  REAL,
  rrf_score    REAL,
  kw_score     REAL,
  cosine_score REAL
)
LANGUAGE plpgsql
AS $$
DECLARE
  q TSQUERY;
  as_of_ts TIMESTAMPTZ;
BEGIN
  q := plainto_tsquery('english', p_search_query);
  as_of_ts := COALESCE(p_as_of, now());

  RETURN QUERY
  WITH kw_facts AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      ROW_NUMBER() OVER (ORDER BY ts_rank(to_tsvector('english', ef.fact), q) DESC) AS kw_rank,
      ts_rank(to_tsvector('english', ef.fact), q)::REAL AS kw_score
    FROM mc_extracted_facts ef
    WHERE ef.api_key_hash = p_api_key_hash
      AND memory_fact_is_recall_visible_v1(
        ef.status,
        ef.invalidated_at,
        ef.valid_from,
        ef.valid_to,
        ef.startup_fact_kind,
        ef.source_type,
        ef.category,
        ef.fact,
        as_of_ts
      )
      AND to_tsvector('english', ef.fact) @@ q
    LIMIT 50
  ),
  vec_facts AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      ROW_NUMBER() OVER (ORDER BY ef.embedding <=> p_query_embedding) AS vec_rank,
      (1.0 - (ef.embedding <=> p_query_embedding))::REAL AS cosine_score
    FROM mc_extracted_facts ef
    WHERE ef.api_key_hash = p_api_key_hash
      AND memory_fact_is_recall_visible_v1(
        ef.status,
        ef.invalidated_at,
        ef.valid_from,
        ef.valid_to,
        ef.startup_fact_kind,
        ef.source_type,
        ef.category,
        ef.fact,
        as_of_ts
      )
      AND ef.embedding IS NOT NULL
    ORDER BY ef.embedding <=> p_query_embedding
    LIMIT 50
  ),
  kw_sessions AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      ROW_NUMBER() OVER (ORDER BY ts_rank(to_tsvector('english', ss.summary), q) DESC) AS kw_rank,
      ts_rank(to_tsvector('english', ss.summary), q)::REAL AS kw_score
    FROM mc_session_summaries ss
    WHERE ss.api_key_hash = p_api_key_hash
      AND ss.created_at <= as_of_ts
      AND to_tsvector('english', ss.summary) @@ q
    LIMIT 50
  ),
  vec_sessions AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      ROW_NUMBER() OVER (ORDER BY ss.embedding <=> p_query_embedding) AS vec_rank,
      (1.0 - (ss.embedding <=> p_query_embedding))::REAL AS cosine_score
    FROM mc_session_summaries ss
    WHERE ss.api_key_hash = p_api_key_hash
      AND ss.created_at <= as_of_ts
      AND ss.embedding IS NOT NULL
    ORDER BY ss.embedding <=> p_query_embedding
    LIMIT 50
  ),
  rrf_facts AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      (COALESCE(1.0 / (60.0 + k.kw_rank), 0.0)
       + COALESCE(1.0 / (60.0 + v.vec_rank), 0.0))::REAL AS rrf_score,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      COALESCE(v.cosine_score, 0.0)::REAL AS cosine_score
    FROM kw_facts k
    FULL OUTER JOIN vec_facts v ON k.id = v.id
  ),
  rrf_sessions AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      (COALESCE(1.0 / (60.0 + k.kw_rank), 0.0)
       + COALESCE(1.0 / (60.0 + v.vec_rank), 0.0))::REAL AS rrf_score,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      COALESCE(v.cosine_score, 0.0)::REAL AS cosine_score
    FROM kw_sessions k
    FULL OUTER JOIN vec_sessions v ON k.id = v.id
  ),
  combined AS (
    SELECT * FROM rrf_facts
    UNION ALL
    SELECT * FROM rrf_sessions
  ),
  pre_dedup AS (
    SELECT
      c.id,
      c.source,
      c.content,
      c.category,
      c.confidence,
      c.created_at,
      c.rrf_score,
      c.kw_score,
      c.cosine_score,
      (c.rrf_score * c.confidence
        * EXP(-EXTRACT(EPOCH FROM (now() - c.created_at)) / (90.0 * 86400.0))
      )::REAL AS final_score
    FROM combined c
    ORDER BY
      c.rrf_score * c.confidence
      * EXP(-EXTRACT(EPOCH FROM (now() - c.created_at)) / (90.0 * 86400.0))
      DESC
    LIMIT 20
  ),
  fact_embeddings AS (
    SELECT pd.id, pd.final_score, ef.embedding
    FROM pre_dedup pd
    JOIN mc_extracted_facts ef ON ef.id = pd.id
    WHERE pd.source = 'fact'
      AND ef.embedding IS NOT NULL
  ),
  dominated AS (
    SELECT DISTINCT
      CASE
        WHEN a.final_score > b.final_score THEN b.id
        WHEN a.final_score < b.final_score THEN a.id
        ELSE LEAST(a.id::TEXT, b.id::TEXT)::UUID
      END AS dominated_id
    FROM fact_embeddings a
    CROSS JOIN fact_embeddings b
    WHERE a.id != b.id
      AND (1.0 - (a.embedding <=> b.embedding)) >= 0.90
  )
  SELECT
    pd.id,
    pd.source,
    pd.content,
    pd.category,
    pd.confidence,
    pd.created_at,
    pd.final_score,
    pd.rrf_score,
    pd.kw_score,
    pd.cosine_score
  FROM pre_dedup pd
  WHERE pd.id NOT IN (SELECT dominated_id FROM dominated)
  ORDER BY pd.final_score DESC
  LIMIT p_max_results;
END;
$$;

CREATE OR REPLACE FUNCTION search_memory_hybrid(
  search_query    TEXT,
  query_embedding VECTOR(1536),
  max_results     INTEGER    DEFAULT 10,
  as_of           TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE(
  id           UUID,
  source       TEXT,
  content      TEXT,
  category     TEXT,
  confidence   REAL,
  created_at   TIMESTAMPTZ,
  final_score  REAL,
  rrf_score    REAL,
  kw_score     REAL,
  cosine_score REAL
)
LANGUAGE plpgsql
AS $$
DECLARE
  q TSQUERY;
  as_of_ts TIMESTAMPTZ;
BEGIN
  q := plainto_tsquery('english', search_query);
  as_of_ts := COALESCE(as_of, now());

  RETURN QUERY
  WITH kw_facts AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      ROW_NUMBER() OVER (ORDER BY ts_rank(to_tsvector('english', ef.fact), q) DESC) AS kw_rank,
      ts_rank(to_tsvector('english', ef.fact), q)::REAL AS kw_score
    FROM extracted_facts ef
    WHERE memory_fact_is_recall_visible_v1(
        ef.status,
        ef.invalidated_at,
        ef.valid_from,
        ef.valid_to,
        ef.startup_fact_kind,
        ef.source_type,
        ef.category,
        ef.fact,
        as_of_ts
      )
      AND to_tsvector('english', ef.fact) @@ q
    LIMIT 50
  ),
  vec_facts AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      ROW_NUMBER() OVER (ORDER BY ef.embedding <=> query_embedding) AS vec_rank,
      (1.0 - (ef.embedding <=> query_embedding))::REAL AS cosine_score
    FROM extracted_facts ef
    WHERE memory_fact_is_recall_visible_v1(
        ef.status,
        ef.invalidated_at,
        ef.valid_from,
        ef.valid_to,
        ef.startup_fact_kind,
        ef.source_type,
        ef.category,
        ef.fact,
        as_of_ts
      )
      AND ef.embedding IS NOT NULL
    ORDER BY ef.embedding <=> query_embedding
    LIMIT 50
  ),
  kw_sessions AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      ROW_NUMBER() OVER (ORDER BY ts_rank(to_tsvector('english', ss.summary), q) DESC) AS kw_rank,
      ts_rank(to_tsvector('english', ss.summary), q)::REAL AS kw_score
    FROM session_summaries ss
    WHERE ss.created_at <= as_of_ts
      AND to_tsvector('english', ss.summary) @@ q
    LIMIT 50
  ),
  vec_sessions AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      ROW_NUMBER() OVER (ORDER BY ss.embedding <=> query_embedding) AS vec_rank,
      (1.0 - (ss.embedding <=> query_embedding))::REAL AS cosine_score
    FROM session_summaries ss
    WHERE ss.created_at <= as_of_ts
      AND ss.embedding IS NOT NULL
    ORDER BY ss.embedding <=> query_embedding
    LIMIT 50
  ),
  rrf_facts AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      (COALESCE(1.0 / (60.0 + k.kw_rank), 0.0)
       + COALESCE(1.0 / (60.0 + v.vec_rank), 0.0))::REAL AS rrf_score,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      COALESCE(v.cosine_score, 0.0)::REAL AS cosine_score
    FROM kw_facts k
    FULL OUTER JOIN vec_facts v ON k.id = v.id
  ),
  rrf_sessions AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      (COALESCE(1.0 / (60.0 + k.kw_rank), 0.0)
       + COALESCE(1.0 / (60.0 + v.vec_rank), 0.0))::REAL AS rrf_score,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      COALESCE(v.cosine_score, 0.0)::REAL AS cosine_score
    FROM kw_sessions k
    FULL OUTER JOIN vec_sessions v ON k.id = v.id
  ),
  combined AS (
    SELECT * FROM rrf_facts
    UNION ALL
    SELECT * FROM rrf_sessions
  ),
  pre_dedup AS (
    SELECT
      c.id,
      c.source,
      c.content,
      c.category,
      c.confidence,
      c.created_at,
      c.rrf_score,
      c.kw_score,
      c.cosine_score,
      (c.rrf_score * c.confidence
        * EXP(-EXTRACT(EPOCH FROM (now() - c.created_at)) / (90.0 * 86400.0))
      )::REAL AS final_score
    FROM combined c
    ORDER BY
      c.rrf_score * c.confidence
      * EXP(-EXTRACT(EPOCH FROM (now() - c.created_at)) / (90.0 * 86400.0))
      DESC
    LIMIT 20
  ),
  fact_embeddings AS (
    SELECT pd.id, pd.final_score, ef.embedding
    FROM pre_dedup pd
    JOIN extracted_facts ef ON ef.id = pd.id
    WHERE pd.source = 'fact'
      AND ef.embedding IS NOT NULL
  ),
  dominated AS (
    SELECT DISTINCT
      CASE
        WHEN a.final_score > b.final_score THEN b.id
        WHEN a.final_score < b.final_score THEN a.id
        ELSE LEAST(a.id::TEXT, b.id::TEXT)::UUID
      END AS dominated_id
    FROM fact_embeddings a
    CROSS JOIN fact_embeddings b
    WHERE a.id != b.id
      AND (1.0 - (a.embedding <=> b.embedding)) >= 0.90
  )
  SELECT
    pd.id,
    pd.source,
    pd.content,
    pd.category,
    pd.confidence,
    pd.created_at,
    pd.final_score,
    pd.rrf_score,
    pd.kw_score,
    pd.cosine_score
  FROM pre_dedup pd
  WHERE pd.id NOT IN (SELECT dominated_id FROM dominated)
  ORDER BY pd.final_score DESC
  LIMIT max_results;
END;
$$;
