-- Benchmarks: measure whether UnClick makes an agent better.
--
-- The story this schema tells, in plain English:
--   suite   = a named, versioned set of categories and weights (the exam).
--   run     = one sitting of that exam on a given date (the contest).
--   result  = one contestant's scores within a run. Four contestants per
--             run: codex_raw, claude_raw, codex_unclick, claude_unclick.
--
-- "UnClick lift" (how many points UnClick adds) is computed at read time
-- from the raw vs unclick results of the same engine; it is not stored.
--
-- These tables are server-controlled: the /api/benchmarks endpoint reads
-- and writes with the service role and gates on ADMIN_EMAILS. Browser
-- clients never touch them directly, so anon/authenticated are denied at
-- the grant layer (matches the data-api service-only convention).

create table if not exists benchmark_suites (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  description  text not null default '',
  version      text not null default '1.0.0',
  -- categories: [{ key, label, weight, description, unclick_strength }]
  -- weights are expected to sum to 100 so a run's overall score is 0-100.
  categories   jsonb not null default '[]',
  max_score    integer not null default 100,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists benchmark_runs (
  id           uuid primary key default gen_random_uuid(),
  suite_id     uuid not null references benchmark_suites(id) on delete cascade,
  run_label    text not null default '',
  run_date     date not null default current_date,
  status       text not null default 'complete' check (status in ('draft','complete')),
  -- source tells the UI how to badge the row:
  --   manual      = a human recorded it
  --   script      = the benchmark-record helper posted it
  --   auto        = a future automated harness produced it
  --   seed_sample = illustrative seed data, safe to delete
  source       text not null default 'manual'
                 check (source in ('manual','script','auto','seed_sample')),
  notes        text not null default '',
  created_at   timestamptz not null default now()
);

create table if not exists benchmark_results (
  id              uuid primary key default gen_random_uuid(),
  run_id          uuid not null references benchmark_runs(id) on delete cascade,
  contestant      text not null
                    check (contestant in ('codex_raw','claude_raw','codex_unclick','claude_unclick')),
  engine          text not null check (engine in ('codex','claude')),
  uses_unclick    boolean not null default false,
  overall_score   numeric(5,2) not null default 0,
  tasks_total     integer not null default 0,
  tasks_passed    integer not null default 0,
  -- category_scores: { <category_key>: { score, max } }
  category_scores jsonb not null default '{}',
  -- evidence: free-form { notes, transcript_url, model, harness_version, ... }
  evidence        jsonb not null default '{}',
  created_at      timestamptz not null default now(),
  unique (run_id, contestant)
);

-- Indexes for the common read paths (latest run, history, run detail).
create index if not exists benchmark_runs_suite_idx    on benchmark_runs(suite_id);
create index if not exists benchmark_runs_date_idx      on benchmark_runs(run_date desc);
create index if not exists benchmark_results_run_idx     on benchmark_results(run_id);

-- Auto-update updated_at on suites.
create or replace function benchmark_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists benchmark_suites_updated_at on benchmark_suites;
create trigger benchmark_suites_updated_at
  before update on benchmark_suites
  for each row execute function benchmark_set_updated_at();

-- RLS: enabled, but no anon/authenticated policies. Access is service-only.
alter table benchmark_suites  enable row level security;
alter table benchmark_runs    enable row level security;
alter table benchmark_results enable row level security;

revoke all on table benchmark_suites  from anon, authenticated;
revoke all on table benchmark_runs    from anon, authenticated;
revoke all on table benchmark_results from anon, authenticated;

grant all on table benchmark_suites  to service_role;
grant all on table benchmark_runs    to service_role;
grant all on table benchmark_results to service_role;

-- ── Seed: the starter suite (real, needed by the API) ──────────────────────
-- Broad coverage across five categories, with tool_use and memory weighted
-- highest because that is where UnClick is expected to lift the score.
insert into benchmark_suites (slug, title, description, version, categories, max_score, is_active)
values (
  'unclick-capability-v1',
  'UnClick Capability Benchmark v1',
  'Measures an agent across coding, reasoning, knowledge, tool use, and cross-session memory. Tool use and memory are weighted highest because they are what UnClick uniquely provides.',
  '1.0.0',
  '[
    {"key":"coding","label":"Coding","weight":20,"unclick_strength":false,"origin":"famous","basis":"HumanEval / SWE-bench style","description":"Write and fix real code; an answer only counts if it passes hidden tests."},
    {"key":"reasoning","label":"Reasoning","weight":15,"unclick_strength":false,"origin":"famous","basis":"GSM8K / BIG-Bench style","description":"Multi-step logic and word problems where you must show the right steps, not just guess."},
    {"key":"knowledge","label":"Knowledge","weight":15,"unclick_strength":false,"origin":"famous","basis":"MMLU style","description":"Broad factual questions across many subjects, like a general knowledge exam."},
    {"key":"tool_use","label":"Tool use","weight":25,"unclick_strength":true,"origin":"mixed","basis":"GAIA / tau-bench style, UnClick tasks","description":"Actually get something done by calling real tools (send an email, look up data, hit an API), not just describe it."},
    {"key":"memory","label":"Memory","weight":25,"unclick_strength":true,"origin":"custom","basis":"Custom UnClick cross-session test","description":"Tell the agent something in one session, then ask for it in a later, fresh session. A plain model forgets; UnClick should remember."}
  ]'::jsonb,
  100,
  true
)
on conflict (slug) do nothing;

-- ── Seed: one clearly-labelled sample run so the page renders something ─────
-- These numbers are illustrative only. Delete this run from the Benchmarks
-- page once a real run is recorded. Its source is 'seed_sample' so the UI
-- shows a "Sample data" badge.
do $$
declare
  v_suite uuid;
  v_run   uuid;
begin
  select id into v_suite from benchmark_suites where slug = 'unclick-capability-v1';
  if v_suite is null then return; end if;

  -- Only seed the sample once.
  if exists (select 1 from benchmark_runs where suite_id = v_suite and source = 'seed_sample') then
    return;
  end if;

  insert into benchmark_runs (suite_id, run_label, run_date, status, source, notes)
  values (v_suite, 'Sample run (illustrative only)', current_date, 'complete', 'seed_sample',
          'Seed data so the page is not empty. Safe to delete once a real run exists.')
  returning id into v_run;

  insert into benchmark_results
    (run_id, contestant, engine, uses_unclick, overall_score, tasks_total, tasks_passed, category_scores) values
    (v_run, 'claude_raw',     'claude', false, 46.95, 100, 47,
       '{"coding":{"score":80,"max":100},"reasoning":{"score":78,"max":100},"knowledge":{"score":70,"max":100},"tool_use":{"score":20,"max":100},"memory":{"score":15,"max":100}}'::jsonb),
    (v_run, 'claude_unclick', 'claude', true,  83.15, 100, 83,
       '{"coding":{"score":80,"max":100},"reasoning":{"score":78,"max":100},"knowledge":{"score":78,"max":100},"tool_use":{"score":85,"max":100},"memory":{"score":90,"max":100}}'::jsonb),
    (v_run, 'codex_raw',      'codex',  false, 44.60, 100, 45,
       '{"coding":{"score":82,"max":100},"reasoning":{"score":72,"max":100},"knowledge":{"score":66,"max":100},"tool_use":{"score":18,"max":100},"memory":{"score":12,"max":100}}'::jsonb),
    (v_run, 'codex_unclick',  'codex',  true,  80.25, 100, 80,
       '{"coding":{"score":82,"max":100},"reasoning":{"score":74,"max":100},"knowledge":{"score":75,"max":100},"tool_use":{"score":80,"max":100},"memory":{"score":86,"max":100}}'::jsonb);
end $$;
