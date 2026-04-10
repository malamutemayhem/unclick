CREATE TABLE IF NOT EXISTS connection_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key_hash TEXT NOT NULL,
  platform TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  status_code INTEGER,
  error_message TEXT,
  response_ms INTEGER,
  auth_method TEXT,
  tool_version TEXT,
  auto_bug_filed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_connection_tests_platform ON connection_tests(platform, created_at DESC);
CREATE INDEX idx_connection_tests_success ON connection_tests(success, created_at DESC);

ALTER TABLE connection_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON connection_tests FOR ALL TO service_role USING (true) WITH CHECK (true);

-- View for quality dashboard (success rate per platform)
CREATE OR REPLACE VIEW platform_quality AS
SELECT
  platform,
  COUNT(*) as total_tests,
  COUNT(*) FILTER (WHERE success = true) as successes,
  COUNT(*) FILTER (WHERE success = false) as failures,
  ROUND(100.0 * COUNT(*) FILTER (WHERE success = true) / NULLIF(COUNT(*), 0), 1) as success_rate,
  AVG(response_ms) FILTER (WHERE success = true) as avg_response_ms,
  MAX(created_at) FILTER (WHERE success = true) as last_success,
  MAX(created_at) FILTER (WHERE success = false) as last_failure
FROM connection_tests
GROUP BY platform
ORDER BY success_rate ASC;
