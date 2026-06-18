-- Capability balance event spine.
--
-- This append-only table is for explicit product-health instrumentation. The
-- admin capability balance scoreboard also reads existing ledgers such as
-- metering_events, connection_tests, mc_autopilot_events, pass runs, and Jobs
-- rows. This table fills the gaps for behind-the-scenes capability decisions:
-- actual use, expected use, missed use, failures, and cost-only signals.

CREATE TABLE IF NOT EXISTS public.capability_usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  api_key_hash text,
  capability_key text NOT NULL CHECK (capability_key ~ '^[a-z0-9][a-z0-9:_-]{0,79}$'),
  source text NOT NULL DEFAULT 'manual' CHECK (length(trim(source)) > 0 AND length(source) <= 80),
  event_kind text NOT NULL DEFAULT 'actual'
    CHECK (event_kind IN ('actual', 'expected', 'missed', 'failure', 'cost', 'source_gap')),
  event_count integer NOT NULL DEFAULT 1 CHECK (event_count >= 1),
  success boolean,
  cost_usd numeric(14,6) NOT NULL DEFAULT 0 CHECK (cost_usd >= 0),
  response_ms integer CHECK (response_ms IS NULL OR response_ms >= 0),
  ref_kind text,
  ref_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS capability_usage_events_created_idx
  ON public.capability_usage_events (created_at DESC);

CREATE INDEX IF NOT EXISTS capability_usage_events_capability_created_idx
  ON public.capability_usage_events (capability_key, created_at DESC);

CREATE INDEX IF NOT EXISTS capability_usage_events_user_created_idx
  ON public.capability_usage_events (user_id, created_at DESC)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS capability_usage_events_key_created_idx
  ON public.capability_usage_events (api_key_hash, created_at DESC)
  WHERE api_key_hash IS NOT NULL;

REVOKE ALL ON public.capability_usage_events FROM anon;
GRANT SELECT, INSERT ON public.capability_usage_events TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.capability_usage_events TO service_role;

ALTER TABLE public.capability_usage_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'capability_usage_events'
      AND policyname = 'capability_usage_events_service_role_all'
  ) THEN
    CREATE POLICY "capability_usage_events_service_role_all"
      ON public.capability_usage_events
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'capability_usage_events'
      AND policyname = 'capability_usage_events_select_own'
  ) THEN
    CREATE POLICY "capability_usage_events_select_own"
      ON public.capability_usage_events
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'capability_usage_events'
      AND policyname = 'capability_usage_events_insert_own'
  ) THEN
    CREATE POLICY "capability_usage_events_insert_own"
      ON public.capability_usage_events
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
