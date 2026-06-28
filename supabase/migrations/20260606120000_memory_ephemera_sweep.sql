-- ─── Operational-ephemera sweep for managed-cloud memory ────────────────────
--
-- The worker fleet writes large volumes of transient operational facts into
-- mc_extracted_facts: per-cycle `heartbeat_last_state: {json}` snapshots and
-- dated build/PR/Boardroom-Job log lines ("On 2026-05-28, Boardroom Job X for
-- PR #Y merged as commit Z"). These are logbook noise, not durable knowledge,
-- and they crowd active recall (one account had 2,153 heartbeat dumps alone).
--
-- This function archives that ephemera for a single tenant. It is RECOVERABLE:
-- it only flips status to 'archived' (rows are retained and can be restored by
-- setting status back to 'active'), tagged with decay_reason='ephemera-sweep'.
-- It is conservative: it only touches non-durable categories, never
-- preference / decision / troubleshooting / contact / workflow, and only rows
-- older than p_min_age_days so very recent context stays visible.
--
-- Called per non-free tenant by the nightly_decay cron in api/memory-admin.ts,
-- gated behind MEMORY_EPHEMERA_SWEEP_ENABLED (default off).

create or replace function public.mc_archive_ephemera(
  p_api_key_hash text,
  p_min_age_days integer default 3
)
returns integer
language sql
security definer
set search_path = public
as $$
  with upd as (
    update mc_extracted_facts
    set status      = 'archived',
        archived_at = now(),
        decay_reason = 'ephemera-sweep',
        updated_at  = now()
    where api_key_hash = p_api_key_hash
      and coalesce(status, 'active') = 'active'
      and created_at < now() - make_interval(days => greatest(p_min_age_days, 0))
      and category in ('technical', 'project', 'general', 'session', 'feedback')
      and (
            fact ilike 'heartbeat_last_state%'
        or  fact ~* '^on 20[0-9][0-9]-[0-9]{2}-[0-9]{2}'
        or  fact ~* '^20[0-9][0-9]-[0-9]{2}-[0-9]{2}'
        or  fact ilike '%Boardroom Job%'
        or  (category = 'project' and fact ilike '%PR #%')
      )
    returning 1
  )
  select count(*)::int from upd;
$$;

comment on function public.mc_archive_ephemera(text, integer) is
  'Recoverable archive of operational-ephemera facts (heartbeat_last_state dumps, dated build/PR/Boardroom-Job logs) for one tenant. Sets status=archived, decay_reason=ephemera-sweep. Skips durable categories. Called by the nightly_decay cron behind MEMORY_EPHEMERA_SWEEP_ENABLED.';

revoke all on function public.mc_archive_ephemera(text, integer) from public, anon, authenticated;
grant execute on function public.mc_archive_ephemera(text, integer) to service_role;
