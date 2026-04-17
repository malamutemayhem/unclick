# Phase 5 - Chunk 3: Build Desk Schema and API Actions

## Context for this session
You are working on `malamutemayhem/unclick-agent-native-endpoints`, branch `claude/phase-5-build-desk-foundation`. The deploy branch is `claude/setup-malamute-mayhem-zkquO`.

Before anything else: call `get_startup_context` from the UnClick MCP server.

## What you are doing in THIS chunk
Adding the database tables and API actions that power the Build Desk. Three new Supabase tables plus three new action routes inside api/memory-admin.ts. Do NOT create new serverless functions.

## Step 1: Read first

READ `api/memory-admin.ts` start to finish. Understand:
- The action routing pattern (switch on `action` query param)
- How Bearer token auth works (bearerFrom + sha256hex)
- How tenant isolation works (api_key_hash filtering on mc_* tables)
- The existing action naming convention

## Step 2: Supabase migrations

Create migration(s) in `supabase/migrations/` for three tables:

**build_tasks**
```sql
CREATE TABLE IF NOT EXISTS build_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  api_key_hash text NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','planned','dispatched','in_progress','review','done','failed')),
  plan_json jsonb DEFAULT '{}',
  acceptance_criteria_json jsonb DEFAULT '[]',
  assigned_worker_id uuid,
  parent_task_id uuid REFERENCES build_tasks(id)
);

CREATE INDEX idx_build_tasks_hash ON build_tasks (api_key_hash, created_at DESC);
```

**build_workers**
```sql
CREATE TABLE IF NOT EXISTS build_workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  api_key_hash text NOT NULL,
  name text NOT NULL,
  worker_type text NOT NULL DEFAULT 'claude_code'
    CHECK (worker_type IN ('claude_code','codex','cursor_cli','gemini_cli','custom_mcp')),
  connection_config_json jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'offline'
    CHECK (status IN ('available','busy','offline')),
  last_health_check_at timestamptz
);

CREATE INDEX idx_build_workers_hash ON build_workers (api_key_hash);
```

**build_dispatch_events**
```sql
CREATE TABLE IF NOT EXISTS build_dispatch_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  api_key_hash text NOT NULL,
  task_id uuid NOT NULL REFERENCES build_tasks(id),
  worker_id uuid NOT NULL REFERENCES build_workers(id),
  event_type text NOT NULL DEFAULT 'dispatched'
    CHECK (event_type IN ('dispatched','accepted','progress','completed','failed')),
  payload_json jsonb DEFAULT '{}'
);

CREATE INDEX idx_build_dispatch_hash ON build_dispatch_events (api_key_hash, created_at DESC);
```

## Step 3: API actions in api/memory-admin.ts

Add three new actions inside the existing switch statement. Follow the exact same auth + tenant isolation pattern as existing admin actions.

**admin_build_tasks** -- methods: list, get, create, update_status, soft_delete
- list: returns all tasks for tenant, ordered by created_at desc
- get: returns single task by id (require task_id param)
- create: inserts with api_key_hash, title, description, acceptance_criteria_json
- update_status: updates status field by id
- soft_delete: sets status to 'failed' (not a real delete)

**admin_build_workers** -- methods: list, register, update, delete, health_check
- list: returns all workers for tenant
- register: inserts with api_key_hash, name, worker_type, connection_config_json
- update: updates name, worker_type, connection_config_json, status by id
- delete: hard deletes worker by id + api_key_hash
- health_check: stub -- updates last_health_check_at to now(), returns {ok: true}

**admin_build_dispatch** -- accepts task_id and worker_id
- Validates both belong to the tenant
- Inserts a dispatch event with event_type 'dispatched'
- Updates the task's assigned_worker_id and status to 'dispatched'
- Returns the dispatch event
- NOTE: This is a stub. Actual worker invocation is a future session.

## Acceptance criteria
- [ ] Three migration files exist in supabase/migrations/
- [ ] All tables have api_key_hash column for tenant isolation
- [ ] admin_build_tasks action works with list/get/create/update_status/soft_delete methods
- [ ] admin_build_workers action works with list/register/update/delete/health_check methods
- [ ] admin_build_dispatch action validates tenant ownership and logs dispatch event
- [ ] No new api/*.ts files created -- everything folded into memory-admin.ts
- [ ] No em dashes in code or comments
- [ ] Bearer token auth with sha256hex for tenant isolation on all new actions

## Known scars -- do NOT repeat
- Vercel function cap is 12, we are at 11/12. Do NOT add new api/*.ts files.
- JSONB columns (plan_json, acceptance_criteria_json, connection_config_json, payload_json) must use displayValue() if rendered in React.
- Use mc_* table naming convention for managed-cloud tables. Wait -- these are NEW tables for the Build Desk, not memory tables. Use the names as specified above (build_tasks, build_workers, build_dispatch_events) without mc_ prefix since they are tenant-isolated by api_key_hash directly.

## Out of scope
- Do NOT build the UI CRUD (just the API)
- Do NOT wire up actual worker invocation
- Do NOT touch existing admin surfaces or actions
- Commit with message: "feat: Build Desk schema and API actions -- tasks, workers, dispatch"
