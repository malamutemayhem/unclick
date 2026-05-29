-- TestPass: allow agent verdict evidence rows.
--
-- The TypeScript runner has emitted evidence kind "agent_verdict" since the
-- agent-check path was added. The original table constraint did not include it,
-- which meant agent evidence writes could fail and then be swallowed as
-- non-fatal. Keep this idempotent so older and newer databases converge.

do $$
declare
  constraint_name text;
begin
  select conname
    into constraint_name
  from pg_constraint
  where conrelid = 'public.testpass_evidence'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%kind%'
    and pg_get_constraintdef(oid) like '%tool_list%'
  limit 1;

  if constraint_name is not null then
    execute format('alter table public.testpass_evidence drop constraint %I', constraint_name);
  end if;
end $$;

alter table public.testpass_evidence
  add constraint testpass_evidence_kind_check
  check (kind in ('tool_list','snapshot','screenshot','http_trace','log','agent_verdict'));
