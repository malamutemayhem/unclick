-- Eval / continuous-improvement loop: persistence for learned routing, plus the
-- proof-signal columns the live adapter reads off Boardroom jobs.
--
-- The story in plain English:
--   mc_routing_arm_stats = the scorecard for each routing "arm" (a model, seat,
--     or tool). Every time an arm runs a job, scoreTrace grades the outcome by
--     PROOF and we add it here: pulls, reward_sum, verified. The learned router
--     reads this to prefer whatever actually produces verified completions, and
--     only takes the wheel once an arm has earned it.
--   New mc_fishbowl_todos columns = optional signals that make false-green and
--     stale detection sharper. The adapter already degrades gracefully when they
--     are absent; adding them lets the truth-rate read be precise.
--
-- Server-controlled: the eval endpoints read/write with the service role.
-- Browser clients never touch these directly (service-only convention).

create table if not exists mc_routing_arm_stats (
  api_key_hash text not null,
  arm          text not null,
  -- pulls = times this arm was chosen and scored.
  pulls        integer not null default 0,
  -- reward_sum = sum of proof rewards (+1 verified, 0 neutral, -1 false-green/stale).
  reward_sum   numeric not null default 0,
  -- verified = count of verified completions, for a human-readable success rate.
  verified     integer not null default 0,
  updated_at   timestamptz not null default now(),
  primary key (api_key_hash, arm)
);

create index if not exists mc_routing_arm_stats_tenant_idx
  on mc_routing_arm_stats(api_key_hash, reward_sum desc);

alter table mc_routing_arm_stats enable row level security;
revoke all on table mc_routing_arm_stats from anon, authenticated;
grant all on table mc_routing_arm_stats to service_role;

-- Proof-signal columns on Boardroom jobs. All nullable / defaulted so existing
-- rows and existing writers are unaffected.
alter table mc_fishbowl_todos
  add column if not exists lease_expires_at    timestamptz,
  add column if not exists last_real_action_at timestamptz,
  add column if not exists reopened            boolean not null default false,
  add column if not exists rolled_back         boolean not null default false,
  add column if not exists user_corrected      boolean not null default false;
