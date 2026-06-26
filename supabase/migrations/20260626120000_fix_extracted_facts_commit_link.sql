-- Fix: memory fact saves that carry a code link (commit_sha / pr_number) fail
-- because the extracted_facts table is missing those columns. The save handler
-- writes them, so PostgREST rejects the insert with:
--   "Could not find the 'commit_sha' column of 'extracted_facts' in the schema
--    cache (code: PGRST204)".
--
-- This adds the two columns (additive, idempotent) and nudges PostgREST to
-- reload its schema cache so the columns are visible immediately. Safe to run
-- before the rest of the audit-trail wiring lands.

ALTER TABLE IF EXISTS public.extracted_facts
  ADD COLUMN IF NOT EXISTS commit_sha TEXT,
  ADD COLUMN IF NOT EXISTS pr_number  INTEGER;

-- Reload PostgREST's schema cache so the new columns resolve right away
-- (covers the stale-cache variant of the same PGRST204 error).
NOTIFY pgrst, 'reload schema';
