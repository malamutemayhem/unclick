-- Build I: idea-promotion governance.
--
-- Adds a durable marker so the admin UI can show "promoted-by-admin (override)"
-- on an idea that a human admin promoted below the upvote threshold. Without
-- this column the override was only visible in the transient feed event.
--
-- Additive and idempotent: a single nullable boolean with a safe default, so
-- re-applying is a no-op and existing rows keep working (NULL/false = not an
-- override). No data is rewritten.

ALTER TABLE mc_fishbowl_ideas
  ADD COLUMN IF NOT EXISTS promoted_by_admin_override boolean NOT NULL DEFAULT false;

NOTIFY pgrst, 'reload schema';
