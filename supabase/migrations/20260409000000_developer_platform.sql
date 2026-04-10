-- Developer profiles (one per developer account)
create table developer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  github_username text,
  stripe_account_id text, -- Stripe Connect Express account ID
  stripe_onboarded boolean default false,
  stripe_onboarding_deferred boolean default true, -- deferred until first payout request or $5 balance
  payout_threshold numeric(10,2) default 0, -- 0 = no minimum for first 6 months
  status text default 'active' check (status in ('active', 'suspended', 'pending')),
  total_earned numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- Tool submissions from developers (developer_id is nullable for anonymous submissions)
create table tool_submissions (
  id uuid primary key default gen_random_uuid(),
  developer_id uuid references developer_profiles(id) on delete set null,
  tool_name text not null,
  category text not null,
  description text not null,
  api_name text not null,
  github_url text,
  tool_file_content text,
  contact_email text not null,
  status text default 'pending' check (status in ('pending', 'in_review', 'approved', 'rejected')),
  review_notes text,
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

-- Approved marketplace tools
create table marketplace_tools (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references tool_submissions(id),
  developer_id uuid references developer_profiles(id),
  tool_name text not null,
  category text not null,
  description text not null,
  total_calls bigint default 0,
  total_revenue numeric(10,2) default 0,
  developer_revenue numeric(10,2) default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Usage events for revenue calculation
create table tool_usage_events (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid references marketplace_tools(id),
  user_id uuid,
  call_count integer default 1,
  revenue_generated numeric(8,4) default 0,
  recorded_at timestamptz default now()
);

-- Payout records
create table developer_payouts (
  id uuid primary key default gen_random_uuid(),
  developer_id uuid references developer_profiles(id),
  amount numeric(10,2) not null,
  stripe_transfer_id text,
  period_start date not null,
  period_end date not null,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz default now()
);

-- Demo rate limits (tracks per-IP daily call counts for the /api/tools/demo endpoint)
create table demo_rate_limits (
  ip_hash text not null,
  call_date date not null,
  call_count integer not null default 0,
  primary key (ip_hash, call_date)
);

-- RLS policies
alter table developer_profiles enable row level security;
alter table tool_submissions enable row level security;
alter table marketplace_tools enable row level security;
alter table developer_payouts enable row level security;

-- developer_profiles: authenticated developers see/manage their own profile
create policy "developers_own_profile" on developer_profiles for all using (auth.uid() = user_id);

-- tool_submissions: anonymous INSERT allowed (no account required to submit a tool)
create policy "tool_submissions_anon_insert" on tool_submissions
  for insert with check (true);

-- tool_submissions: anyone can read (needed for unauthenticated status checks)
create policy "tool_submissions_public_read" on tool_submissions
  for select using (true);

-- tool_submissions: only the owning developer can update their submission
create policy "tool_submissions_developer_update" on tool_submissions
  for update using (
    developer_id in (select id from developer_profiles where user_id = auth.uid())
  );

-- marketplace_tools: public read for active tools
create policy "marketplace_tools_public_read" on marketplace_tools for select using (is_active = true);

-- developer_payouts: developers see only their own payout history
create policy "developers_own_payouts" on developer_payouts for select using (
  developer_id in (select id from developer_profiles where user_id = auth.uid())
);
