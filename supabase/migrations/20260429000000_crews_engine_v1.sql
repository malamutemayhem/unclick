-- Crews v1 inline-loop engine: state-machine columns on mc_crew_runs +
-- client_capabilities on mc_fishbowl_profiles.
--
-- Replaces the broken MCP-sampling path (start_crew_run -> SAMPLING_NOT_SUPPORTED)
-- with a tool-loop architecture: the user's chat model walks the run by calling
-- crew_begin, crew_get_next_hat, crew_record_hat_response, crew_get_synthesis_brief,
-- crew_record_synthesis, and crew_status. UnClick owns the orchestration and
-- audit trail; the chat agent owns all cognition.
--
-- Idempotent: every column add uses `add column if not exists` and the check
-- constraint is added inside a do-block guarded by pg_constraint lookup.

-- ── mc_crew_runs: state machine ────────────────────────────────────────────

alter table mc_crew_runs
  add column if not exists current_hat_index int not null default 0;

-- total_hats has a 0 default so existing rows are valid; new rows from
-- crew_begin always set the real hat count.
alter table mc_crew_runs
  add column if not exists total_hats int not null default 0;

alter table mc_crew_runs
  add column if not exists hat_responses jsonb not null default '[]'::jsonb;

alter table mc_crew_runs
  add column if not exists synthesis_recorded boolean not null default false;

alter table mc_crew_runs
  add column if not exists synthesis_verdict jsonb;

alter table mc_crew_runs
  add column if not exists state text not null default 'in_progress';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'mc_crew_runs_state_check'
  ) then
    alter table mc_crew_runs
      add constraint mc_crew_runs_state_check
      check (state in ('in_progress','awaiting_synthesis','complete','incomplete'));
  end if;
end $$;

-- ── mc_fishbowl_profiles: client capability advertisement ────────────────

alter table mc_fishbowl_profiles
  add column if not exists client_capabilities jsonb;
