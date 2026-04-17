# Phase 5 - Chunk 1: Memory Reliability Instrumentation

## Context for this session
You are working on `malamutemayhem/unclick-agent-native-endpoints`, branch `claude/phase-5-build-desk-foundation`. The deploy branch is `claude/setup-malamute-mayhem-zkquO`.

Before anything else: call `get_startup_context` from the UnClick MCP server.

## What you are doing in THIS chunk
Three things to fix memory reliability:
1. Update MCP tool descriptions to be maximally directive about calling get_startup_context first
2. The `memory_load_events` Supabase migration is ALREADY pushed -- verify it exists at `supabase/migrations/20260417010000_memory_load_events.sql`
3. Add an `admin_memory_load_metrics` action to api/memory-admin.ts (do NOT create a new serverless function -- Vercel cap is 12, we are at 11/12)
4. Add logging in the MCP server to write to memory_load_events on every tool call

## Step 1: Update tool descriptions

READ the MCP server source first. Find where tool descriptions are defined (likely in `packages/mcp-server/src/`).

Update `get_startup_context` description to include:
> "MUST be called before any other UnClick tool in this session. Returns the user's business context, standing rules, project memory, and known scars. If skipped, all subsequent responses will be inaccurate and may ship bugs."

For EVERY OTHER UnClick MCP tool, append this line to its description:
> "If get_startup_context has not been called this session, call it first."

## Step 2: MCP server logging

READ the MCP server's tool-call handler. Find where incoming tool calls are processed. Add logging: on every tool call, insert a row into `memory_load_events`. Set `was_first_call_in_session = true` if no other call from this api_key_hash exists in the last 30 minutes.

## Step 3: Admin action for metrics

READ `api/memory-admin.ts` before editing. Understand the action routing pattern. Add a new action `admin_memory_load_metrics` that returns:
- Total tool calls in last 7 days for this tenant
- Count where get_startup_context was the first call
- Percentage (load rate)
- Breakdown by client_type if available

Use Bearer token auth with `sha256hex(apiKey)` for tenant isolation, same pattern as other admin actions.

## Acceptance criteria
- [ ] get_startup_context tool description is updated with directive language
- [ ] All other UnClick tool descriptions have the reminder appended
- [ ] MCP server logs to memory_load_events on every tool call
- [ ] admin_memory_load_metrics action exists in api/memory-admin.ts
- [ ] No new api/*.ts files created (fold into memory-admin.ts)
- [ ] No em dashes in any added code or comments
- Commit with message: "feat: memory reliability instrumentation -- tool descriptions, load event logging, metrics action"
