-- Seats compute API tier usage and budget caps.
-- Tracks per-user token usage events, estimated spend, and monthly provider caps.

create table if not exists public.seats_api_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider_slug text not null check (length(trim(provider_slug)) > 0),
  model text,
  task_type text,
  input_tokens bigint not null default 0 check (input_tokens >= 0),
  output_tokens bigint not null default 0 check (output_tokens >= 0),
  cached_input_tokens bigint not null default 0 check (cached_input_tokens >= 0),
  request_count integer not null default 1 check (request_count >= 1),
  estimated_cost_usd numeric(14,6) not null default 0 check (estimated_cost_usd >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.seats_api_budget_caps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider_slug text not null check (length(trim(provider_slug)) > 0),
  monthly_budget_usd numeric(12,2) check (monthly_budget_usd is null or monthly_budget_usd >= 0),
  warn_at_percent numeric(6,2) not null default 80 check (warn_at_percent > 0 and warn_at_percent <= 1000),
  throttle_at_percent numeric(6,2) not null default 100 check (throttle_at_percent > 0 and throttle_at_percent <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider_slug),
  check (throttle_at_percent >= warn_at_percent)
);

create index if not exists seats_api_usage_events_user_created_idx
  on public.seats_api_usage_events (user_id, created_at desc);

create index if not exists seats_api_usage_events_user_provider_created_idx
  on public.seats_api_usage_events (user_id, provider_slug, created_at desc);

create index if not exists seats_api_budget_caps_user_provider_idx
  on public.seats_api_budget_caps (user_id, provider_slug);

create or replace function public.seats_api_budget_caps_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists seats_api_budget_caps_updated_at on public.seats_api_budget_caps;
create trigger seats_api_budget_caps_updated_at
  before update on public.seats_api_budget_caps
  for each row execute function public.seats_api_budget_caps_set_updated_at();

alter table public.seats_api_usage_events enable row level security;
alter table public.seats_api_budget_caps enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_usage_events'
      and policyname = 'seats_api_usage_events_select_own'
  ) then
    create policy "seats_api_usage_events_select_own"
      on public.seats_api_usage_events
      for select using (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_usage_events'
      and policyname = 'seats_api_usage_events_insert_own'
  ) then
    create policy "seats_api_usage_events_insert_own"
      on public.seats_api_usage_events
      for insert with check (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_usage_events'
      and policyname = 'seats_api_usage_events_delete_own'
  ) then
    create policy "seats_api_usage_events_delete_own"
      on public.seats_api_usage_events
      for delete using (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_budget_caps'
      and policyname = 'seats_api_budget_caps_select_own'
  ) then
    create policy "seats_api_budget_caps_select_own"
      on public.seats_api_budget_caps
      for select using (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_budget_caps'
      and policyname = 'seats_api_budget_caps_insert_own'
  ) then
    create policy "seats_api_budget_caps_insert_own"
      on public.seats_api_budget_caps
      for insert with check (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_budget_caps'
      and policyname = 'seats_api_budget_caps_update_own'
  ) then
    create policy "seats_api_budget_caps_update_own"
      on public.seats_api_budget_caps
      for update using (user_id = auth.uid()) with check (user_id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'seats_api_budget_caps'
      and policyname = 'seats_api_budget_caps_delete_own'
  ) then
    create policy "seats_api_budget_caps_delete_own"
      on public.seats_api_budget_caps
      for delete using (user_id = auth.uid());
  end if;
end $$;
