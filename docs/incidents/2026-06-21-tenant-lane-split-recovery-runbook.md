# Tenant lane-split: whole-site impact + recovery runbook

Companion to `2026-06-21-tenant-lane-split.md`. That note covered the jobs board.
This one covers why **many** surfaces look broken and how to measure and recover
safely. Nothing here is destructive; the AUDIT section is read-only.

## Three distinct mechanisms (do not conflate them)

The "whole site feels broken" symptom is actually three separate failure modes
that all trace to the same key/lane confusion:

1. **Partial data migration (api_key_hash surfaces).** The live repair migrated
   ONLY the Boardroom tables (`mc_fishbowl_*`, `mc_agent_dispatches`)
   from the orphan lane `9940983a...` to the canonical lane `6c6cb0c3...`. Every
   other `api_key_hash`-scoped surface still has its history in the orphan lane:
   memory layers (`mc_business_context`, `mc_knowledge_library`,
   `mc_session_summaries`, `mc_extracted_facts`, `mc_conversation_log`,
   `mc_code_dumps`), `mc_signals`, autopilot events, `user_credentials`, chat,
   bug reports. The web app reads the canonical lane, so these look empty.

2. **Web-session resolver inconsistency (CONFIRMED code bug).** Different
   endpoints picked a *different* `api_keys` row for the *same* logged-in user
   when that user owns more than one key:
   - `api/mcp.ts` (main app): `is_active=true` + `order last_used_at desc` -> correct.
   - `api/memory-admin.ts` (jobs/memory/Boardroom): no filter, no order -> arbitrary.
   - `api/backstagepass.ts` (credentials): no filter, no order -> arbitrary.
   With >1 key, memory/Boardroom/credentials can resolve to a different lane than
   the rest of the site, and an unordered pick can even flip between requests.
   Fixed in the accompanying change (both now mirror `mcp.ts`).

3. **actor_user_id mismatch (Pass runs).** TestPass / UXPass runs are scoped by
   `actor_user_id` (the resolved actor), NOT `api_key_hash`. A run created by an
   agent/service key whose `api_keys.user_id` differs from the human's
   `auth.uid()` is invisible to the web UI -> "Run not found". This is NOT fixed
   by the resolver change; it needs the audit below to confirm ownership and a
   targeted reassignment.

## AUDIT (read-only, safe) - run these first

Run in the Supabase SQL editor (project `xmooqsylqlknuksiddca`) with service role.
None of these write. The goal is to measure scope before touching anything.

```sql
-- A. Does the operator own more than one api_keys row? (precondition for #2)
--    Replace the email if needed.
select k.key_hash, k.is_active, k.last_used_at, k.created_at
from api_keys k
join auth.users u on u.id = k.user_id
where u.email = 'byrneck@gmail.com'
order by k.last_used_at desc nulls last;

-- B. Lane volumes for every api_key_hash-scoped table (#1).
--    Each row = one lane. A big lane whose hash is NOT in api_keys is orphaned.
select 'mc_business_context' t, api_key_hash, count(*) from mc_business_context group by api_key_hash
union all select 'mc_knowledge_library', api_key_hash, count(*) from mc_knowledge_library group by api_key_hash
union all select 'mc_session_summaries', api_key_hash, count(*) from mc_session_summaries group by api_key_hash
union all select 'mc_extracted_facts',  api_key_hash, count(*) from mc_extracted_facts  group by api_key_hash
union all select 'mc_conversation_log', api_key_hash, count(*) from mc_conversation_log group by api_key_hash
union all select 'mc_code_dumps',       api_key_hash, count(*) from mc_code_dumps       group by api_key_hash
union all select 'mc_signals',          api_key_hash, count(*) from mc_signals          group by api_key_hash
union all select 'user_credentials',    api_key_hash, count(*) from user_credentials    group by api_key_hash
order by 1, 3 desc;

-- C. Which lanes are orphaned (hash has no api_keys row)?
--    Any non-trivial count here is stranded data.
with lanes as (
  select distinct api_key_hash from mc_extracted_facts
  union select distinct api_key_hash from mc_signals
  union select distinct api_key_hash from user_credentials
)
select l.api_key_hash,
       (select count(*) from api_keys k where k.key_hash = l.api_key_hash) as registered_rows
from lanes l
order by registered_rows asc;

-- D. Pass runs owned by a non-human / unexpected user (#3).
--    Confirm the exact column name first (actor_user_id vs actor_user_id).
select 'testpass_runs' t, actor_user_id, count(*) from testpass_runs group by actor_user_id order by 3 desc;
-- repeat for uxpass_runs with its owner column once confirmed.

-- E. Map the run owners back to keys/emails so you can see who owns what.
select k.user_id, u.email, count(distinct k.key_hash) keys
from api_keys k left join auth.users u on u.id = k.user_id
group by k.user_id, u.email order by keys desc;
```

Interpretation:
- Query A returns >1 row -> mechanism #2 was biting you live; the code fix resolves it.
- Query C returns an orphan hash with large counts -> mechanism #1; that data needs migration.
- Query D shows runs under a `user_id` that is not your web login -> mechanism #3.

## RECOVERY (only after audit + snapshot, and with confirmation)

Order is least-risky to most-risky. SNAPSHOT the affected tables before any write.

1. **Snapshot.** Export the canonical and orphan lane rows for every table you
   intend to touch. Keep the archive + SHA-256 (do not commit it; it holds
   production data).
2. **Low-risk, additive first:** `mc_knowledge_library` (+ history) and selected
   `mc_business_context`. Review, then re-point `api_key_hash` orphan -> canonical.
3. **Facts with dedupe:** `mc_extracted_facts` - dedupe against canonical before
   import; respect decay/superseded status so stale facts do not resurface.
4. **History:** `mc_session_summaries`, `mc_conversation_log` - high volume,
   review for noise; these are append-only context, lower correctness risk.
5. **Signals / autopilot:** `mc_signals`, autopilot events - do NOT blind-import;
   old signals can re-trigger automation. Prefer forward-only unless history is
   needed.
6. **Credentials LAST, manual:** `user_credentials` - review each row by hand;
   never blind-merge secrets. Re-entry may be safer than migration.
7. **Pass runs (#3):** if audit D shows runs under a service user_id you control,
   reassign `actor_user_id` to your web login (with snapshot), cascading to
   `testpass_items` / `uxpass_findings` as needed. If the runs belong to a
   genuinely separate account, leave them.
8. **Verify:** re-open each surface signed in as the operator; confirm memory
   search finds old items, TestPass/UXPass runs render, signals are sane.

## Prevention shipped alongside this runbook

- `api/memory-admin.ts` and `api/backstagepass.ts` web-session key selection now
  mirror `api/mcp.ts` exactly (`is_active=true`, `order last_used_at desc`), so
  mechanism #2 cannot recur.
- Still open (tracked): one shared tenant resolver used everywhere, and a global
  lane-integrity worker that fails health when an orphan lane holds data for the
  current operator (Boardroom jobs `c4d29673-...`, `80e8f975-...`).
