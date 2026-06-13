-- lane-10: eval scorecard storage and memory passport audit

create table if not exists memory_eval_scorecards (
  id uuid primary key default gen_random_uuid(),
  suite_id text not null,
  scorecard jsonb not null,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists memory_eval_scorecards_suite_created_idx
  on memory_eval_scorecards (suite_id, created_at desc);

create table if not exists memory_passport_audit (
  id uuid primary key default gen_random_uuid(),
  operation text not null check (operation in ('export', 'import')),
  bundle_version text not null,
  signature_digest text not null,
  exported_records integer not null default 0,
  imported_records integer not null default 0,
  redacted_records integer not null default 0,
  credential_leakage integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists memory_passport_audit_created_idx
  on memory_passport_audit (created_at desc);

create table if not exists mc_memory_eval_scorecards (
  id uuid primary key default gen_random_uuid(),
  api_key_hash text not null,
  suite_id text not null,
  scorecard jsonb not null,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists mc_memory_eval_scorecards_tenant_suite_created_idx
  on mc_memory_eval_scorecards (api_key_hash, suite_id, created_at desc);

create table if not exists mc_memory_passport_audit (
  id uuid primary key default gen_random_uuid(),
  api_key_hash text not null,
  operation text not null check (operation in ('export', 'import')),
  bundle_version text not null,
  signature_digest text not null,
  exported_records integer not null default 0,
  imported_records integer not null default 0,
  redacted_records integer not null default 0,
  credential_leakage integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists mc_memory_passport_audit_tenant_created_idx
  on mc_memory_passport_audit (api_key_hash, created_at desc);
