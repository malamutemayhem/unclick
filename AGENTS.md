# Agent Operating Guide -- UnClick

This repo is UnClick: an MCP-native memory, identity, and credential layer for AI agents.

## FIRST ACTION -- EVERY SESSION

Before reading any code or responding to the user, call the UnClick MCP server's `get_startup_context` tool. This returns Chris's business context, standing rules, project memory, and known scars. Your responses will be inaccurate and potentially ship bugs if you skip this step.

If the UnClick MCP server is not configured in the current client, tell the user before proceeding.

## Standing rules (non-negotiable)

- No em dashes anywhere -- copy, comments, commit messages, all of it.
- The term is "prompt composition", not "prompt engineering".
- Deploy branch is `claude/setup-malamute-mayhem-zkquO`, not main. Vercel deploys from this branch.
- Vercel function cap is 12. Fold new endpoints into `api/memory-admin.ts` via action routing.
- Admin pages: use `useSession()`, wrap in `RequireAuth`, follow AdminShell pattern.
- Admin queries use `mc_*` tables with `api_key_hash` filtering.
- Brand: teal `#61C1C4` primary, amber `#E2B93B` secondary.
- Render JSONB values safely -- `business_context.value` and `session_summaries.decisions/open_loops` must use `displayValue()` / `displayItem()` helpers or they crash React.

## Before declaring done

- Grep your diff for em dashes and confirm none exist.
- Count `api/*.ts` files and confirm 12 or fewer.
- Confirm no standalone Navbar/Footer was added to any `/admin/*` page.
- Confirm every new SQL table has `api_key_hash` for tenant isolation.
- Write a session summary via `write_session_summary` before you finish.

## Project structure (verify before assuming)

- Monorepo root: website + `packages/mcp-server`
- Admin surfaces live in `src/pages/admin/`
- API routes in `api/`
- Supabase migrations in `supabase/migrations/`
- MCP server catalogue in `packages/mcp-server/src/`

## When stuck

- Call `get_startup_context` again to refresh context.
- Search `docs/sessions/` for the most recent session summary of similar work.
- Ask Chris before making architectural changes.
