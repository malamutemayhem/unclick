-- Session-inspection streak persistence.
--
-- The session-start inspection only proposes a front-of-line improvement job
-- once the SAME friction has recurred across several inspections. To know
-- "recurred", the streak must survive between sessions. This table holds one
-- streak counter per tenant per friction key.
--
-- In plain English: each time an inspection sees the same problem (e.g. fake
-- green is high), it bumps that key's streak. When the streak crosses the
-- threshold, the inspection proposes a gated improvement job for the Autopilot
-- Improver lane. A clean inspection resets the streak to zero.
--
-- Server-controlled: the inspection endpoint reads/writes with the service role.

create table if not exists mc_eval_inspection_streaks (
  api_key_hash text not null,
  -- friction_key groups the recurring problem, e.g. 'fake_green' or 'stale'.
  friction_key text not null,
  streak       integer not null default 0,
  last_seen_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (api_key_hash, friction_key)
);

create index if not exists mc_eval_inspection_streaks_tenant_idx
  on mc_eval_inspection_streaks(api_key_hash, updated_at desc);

alter table mc_eval_inspection_streaks enable row level security;
revoke all on table mc_eval_inspection_streaks from anon, authenticated;
grant all on table mc_eval_inspection_streaks to service_role;
