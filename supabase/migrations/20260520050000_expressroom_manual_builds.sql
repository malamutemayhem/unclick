-- ExpressRoom Manual ExpressBuild drafts.
--
-- This is a draft-only lane. Rows here are not official Jobs Board work until
-- they are promoted into mc_fishbowl_todos by the admin API.

CREATE TABLE IF NOT EXISTS mc_expressroom_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_hash text NOT NULL,
  job_name_mirror text NOT NULL,
  official_todo_id uuid,
  short_description text NOT NULL,
  brief_markdown text NOT NULL,
  supplied_code text NOT NULL DEFAULT '',
  supplied_code_status text NOT NULL DEFAULT 'not_supplied'
    CHECK (supplied_code_status IN ('not_supplied', 'partial', 'complete', 'unknown')),
  express_status text NOT NULL DEFAULT 'draft'
    CHECK (express_status IN ('draft', 'inserted', 'archived')),
  created_by_agent_id text NOT NULL,
  source_chat_session_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mc_expressroom_drafts_tenant_status
  ON mc_expressroom_drafts(api_key_hash, express_status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_mc_expressroom_drafts_official_todo
  ON mc_expressroom_drafts(api_key_hash, official_todo_id)
  WHERE official_todo_id IS NOT NULL;

ALTER TABLE mc_expressroom_drafts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mc_expressroom_drafts'
      AND policyname = 'mc_expressroom_drafts_service_role_all'
  ) THEN
    CREATE POLICY "mc_expressroom_drafts_service_role_all"
      ON mc_expressroom_drafts FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
