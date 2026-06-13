-- lane-06: retrieval SQL and ranking internals
-- Publishes the ranking contract used by Workers 1 and 10.

CREATE OR REPLACE FUNCTION memory_keyword_score_v1(
  p_content TEXT,
  p_query TSQUERY
)
RETURNS REAL
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    ts_rank_cd(to_tsvector('english', COALESCE(p_content, '')), p_query, 34),
    0
  )::REAL;
$$;

CREATE OR REPLACE FUNCTION memory_rrf_score_v1(
  p_keyword_rank INTEGER,
  p_vector_rank INTEGER,
  p_k REAL DEFAULT 60.0
)
RETURNS REAL
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT (
    CASE WHEN p_keyword_rank IS NULL OR p_keyword_rank <= 0 THEN 0.0 ELSE 1.0 / (p_k + p_keyword_rank) END +
    CASE WHEN p_vector_rank IS NULL OR p_vector_rank <= 0 THEN 0.0 ELSE 1.0 / (p_k + p_vector_rank) END
  )::REAL;
$$;

DROP FUNCTION IF EXISTS mc_search_memory_hybrid(TEXT, TEXT, VECTOR, INTEGER, TIMESTAMPTZ);

CREATE FUNCTION mc_search_memory_hybrid(
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
  cosine_score REAL,
  keyword_rank INTEGER,
  vector_rank  INTEGER
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
  WITH kw_facts_scored AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      memory_keyword_score_v1(ef.fact, q) AS kw_score
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
  ),
  kw_facts AS (
    SELECT *
    FROM (
      SELECT
        kfs.*,
        CAST(ROW_NUMBER() OVER (ORDER BY kfs.kw_score DESC, kfs.created_at DESC, kfs.id) AS INTEGER) AS keyword_rank
      FROM kw_facts_scored kfs
      WHERE kfs.kw_score > 0
    ) ranked
    WHERE ranked.keyword_rank <= 50
  ),
  vec_facts AS (
    SELECT *
    FROM (
      SELECT
        ef.id,
        'fact'::TEXT AS source,
        ef.fact AS content,
        ef.category,
        ef.confidence,
        ef.created_at,
        CAST(ROW_NUMBER() OVER (ORDER BY ef.embedding <=> p_query_embedding, ef.created_at DESC, ef.id) AS INTEGER) AS vector_rank,
        GREATEST(0.0, LEAST(1.0, 1.0 - (ef.embedding <=> p_query_embedding)))::REAL AS cosine_score
      FROM mc_extracted_facts ef
      WHERE ef.api_key_hash = p_api_key_hash
        AND p_query_embedding IS NOT NULL
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
    ) ranked
    WHERE ranked.vector_rank <= 50
  ),
  kw_sessions_scored AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      memory_keyword_score_v1(ss.summary, q) AS kw_score
    FROM mc_session_summaries ss
    WHERE ss.api_key_hash = p_api_key_hash
      AND ss.created_at <= as_of_ts
      AND to_tsvector('english', ss.summary) @@ q
  ),
  kw_sessions AS (
    SELECT *
    FROM (
      SELECT
        kss.*,
        CAST(ROW_NUMBER() OVER (ORDER BY kss.kw_score DESC, kss.created_at DESC, kss.id) AS INTEGER) AS keyword_rank
      FROM kw_sessions_scored kss
      WHERE kss.kw_score > 0
    ) ranked
    WHERE ranked.keyword_rank <= 50
  ),
  vec_sessions AS (
    SELECT *
    FROM (
      SELECT
        ss.id,
        'session'::TEXT AS source,
        ss.summary AS content,
        'session'::TEXT AS category,
        1.0::REAL AS confidence,
        ss.created_at,
        CAST(ROW_NUMBER() OVER (ORDER BY ss.embedding <=> p_query_embedding, ss.created_at DESC, ss.id) AS INTEGER) AS vector_rank,
        GREATEST(0.0, LEAST(1.0, 1.0 - (ss.embedding <=> p_query_embedding)))::REAL AS cosine_score
      FROM mc_session_summaries ss
      WHERE ss.api_key_hash = p_api_key_hash
        AND p_query_embedding IS NOT NULL
        AND ss.created_at <= as_of_ts
        AND ss.embedding IS NOT NULL
    ) ranked
    WHERE ranked.vector_rank <= 50
  ),
  rrf_facts AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      v.cosine_score::REAL AS cosine_score,
      k.keyword_rank,
      v.vector_rank,
      memory_rrf_score_v1(k.keyword_rank, v.vector_rank) AS rrf_score
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
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      v.cosine_score::REAL AS cosine_score,
      k.keyword_rank,
      v.vector_rank,
      memory_rrf_score_v1(k.keyword_rank, v.vector_rank) AS rrf_score
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
      c.keyword_rank,
      c.vector_rank,
      (
        c.rrf_score
        * c.confidence
        * EXP(-GREATEST(0.0, EXTRACT(EPOCH FROM (as_of_ts - c.created_at))) / (90.0 * 86400.0))
      )::REAL AS final_score
    FROM combined c
    ORDER BY
      c.rrf_score
      * c.confidence
      * EXP(-GREATEST(0.0, EXTRACT(EPOCH FROM (as_of_ts - c.created_at))) / (90.0 * 86400.0)) DESC,
      c.created_at DESC,
      c.id
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
    pd.cosine_score,
    pd.keyword_rank,
    pd.vector_rank
  FROM pre_dedup pd
  WHERE pd.id NOT IN (SELECT dominated_id FROM dominated)
  ORDER BY pd.final_score DESC, pd.created_at DESC, pd.id
  LIMIT p_max_results;
END;
$$;

DROP FUNCTION IF EXISTS search_memory_hybrid(TEXT, VECTOR, INTEGER, TIMESTAMPTZ);

CREATE FUNCTION search_memory_hybrid(
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
  cosine_score REAL,
  keyword_rank INTEGER,
  vector_rank  INTEGER
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
  WITH kw_facts_scored AS (
    SELECT
      ef.id,
      'fact'::TEXT AS source,
      ef.fact AS content,
      ef.category,
      ef.confidence,
      ef.created_at,
      memory_keyword_score_v1(ef.fact, q) AS kw_score
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
  ),
  kw_facts AS (
    SELECT *
    FROM (
      SELECT
        kfs.*,
        CAST(ROW_NUMBER() OVER (ORDER BY kfs.kw_score DESC, kfs.created_at DESC, kfs.id) AS INTEGER) AS keyword_rank
      FROM kw_facts_scored kfs
      WHERE kfs.kw_score > 0
    ) ranked
    WHERE ranked.keyword_rank <= 50
  ),
  vec_facts AS (
    SELECT *
    FROM (
      SELECT
        ef.id,
        'fact'::TEXT AS source,
        ef.fact AS content,
        ef.category,
        ef.confidence,
        ef.created_at,
        CAST(ROW_NUMBER() OVER (ORDER BY ef.embedding <=> query_embedding, ef.created_at DESC, ef.id) AS INTEGER) AS vector_rank,
        GREATEST(0.0, LEAST(1.0, 1.0 - (ef.embedding <=> query_embedding)))::REAL AS cosine_score
      FROM extracted_facts ef
      WHERE query_embedding IS NOT NULL
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
    ) ranked
    WHERE ranked.vector_rank <= 50
  ),
  kw_sessions_scored AS (
    SELECT
      ss.id,
      'session'::TEXT AS source,
      ss.summary AS content,
      'session'::TEXT AS category,
      1.0::REAL AS confidence,
      ss.created_at,
      memory_keyword_score_v1(ss.summary, q) AS kw_score
    FROM session_summaries ss
    WHERE ss.created_at <= as_of_ts
      AND to_tsvector('english', ss.summary) @@ q
  ),
  kw_sessions AS (
    SELECT *
    FROM (
      SELECT
        kss.*,
        CAST(ROW_NUMBER() OVER (ORDER BY kss.kw_score DESC, kss.created_at DESC, kss.id) AS INTEGER) AS keyword_rank
      FROM kw_sessions_scored kss
      WHERE kss.kw_score > 0
    ) ranked
    WHERE ranked.keyword_rank <= 50
  ),
  vec_sessions AS (
    SELECT *
    FROM (
      SELECT
        ss.id,
        'session'::TEXT AS source,
        ss.summary AS content,
        'session'::TEXT AS category,
        1.0::REAL AS confidence,
        ss.created_at,
        CAST(ROW_NUMBER() OVER (ORDER BY ss.embedding <=> query_embedding, ss.created_at DESC, ss.id) AS INTEGER) AS vector_rank,
        GREATEST(0.0, LEAST(1.0, 1.0 - (ss.embedding <=> query_embedding)))::REAL AS cosine_score
      FROM session_summaries ss
      WHERE query_embedding IS NOT NULL
        AND ss.created_at <= as_of_ts
        AND ss.embedding IS NOT NULL
    ) ranked
    WHERE ranked.vector_rank <= 50
  ),
  rrf_facts AS (
    SELECT
      COALESCE(k.id, v.id) AS id,
      COALESCE(k.source, v.source) AS source,
      COALESCE(k.content, v.content) AS content,
      COALESCE(k.category, v.category) AS category,
      COALESCE(k.confidence, v.confidence) AS confidence,
      COALESCE(k.created_at, v.created_at) AS created_at,
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      v.cosine_score::REAL AS cosine_score,
      k.keyword_rank,
      v.vector_rank,
      memory_rrf_score_v1(k.keyword_rank, v.vector_rank) AS rrf_score
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
      COALESCE(k.kw_score, 0.0)::REAL AS kw_score,
      v.cosine_score::REAL AS cosine_score,
      k.keyword_rank,
      v.vector_rank,
      memory_rrf_score_v1(k.keyword_rank, v.vector_rank) AS rrf_score
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
      c.keyword_rank,
      c.vector_rank,
      (
        c.rrf_score
        * c.confidence
        * EXP(-GREATEST(0.0, EXTRACT(EPOCH FROM (as_of_ts - c.created_at))) / (90.0 * 86400.0))
      )::REAL AS final_score
    FROM combined c
    ORDER BY
      c.rrf_score
      * c.confidence
      * EXP(-GREATEST(0.0, EXTRACT(EPOCH FROM (as_of_ts - c.created_at))) / (90.0 * 86400.0)) DESC,
      c.created_at DESC,
      c.id
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
    pd.cosine_score,
    pd.keyword_rank,
    pd.vector_rank
  FROM pre_dedup pd
  WHERE pd.id NOT IN (SELECT dominated_id FROM dominated)
  ORDER BY pd.final_score DESC, pd.created_at DESC, pd.id
  LIMIT max_results;
END;
$$;
