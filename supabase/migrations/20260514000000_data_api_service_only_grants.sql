-- Supabase Data API explicit service-only grants before the May 30 rollout.
--
-- These tables are used by server-controlled endpoints or MCP server internals.
-- Keep anon/authenticated denied at the table-grant layer; browser-safe access
-- should be added later with table-specific RLS policies and a separate review.

DO $$
DECLARE
  service_only_table text;
BEGIN
  FOREACH service_only_table IN ARRAY ARRAY[
    'build_tasks',
    'build_workers',
    'build_dispatch_events',
    'memory_load_events',
    'conflict_detections',
    'tool_detections',
    'tenant_settings',
    'demo_rate_limits'
  ] LOOP
    IF to_regclass(format('public.%I', service_only_table)) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', service_only_table);
      EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', service_only_table);
      EXECUTE format('GRANT ALL ON TABLE public.%I TO service_role', service_only_table);
    END IF;
  END LOOP;
END $$;
