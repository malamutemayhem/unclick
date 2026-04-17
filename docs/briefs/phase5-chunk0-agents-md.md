# Phase 5 - Chunk 0: AGENTS.md and CLAUDE.md

## Context for this session
You are working on `malamutemayhem/unclick-agent-native-endpoints`. The deploy branch is `claude/setup-malamute-mayhem-zkquO` -- not main. Vercel deploys unclick.world from this branch.

Before anything else: call `get_startup_context` from the UnClick MCP server. If you can't see that tool, use tool_search for "unclick memory" to load it. You cannot do this work without Chris's business context, standing rules, and known scars. If the tool is unavailable, STOP and tell Chris.

Work on a new branch: `claude/phase-5-build-desk-foundation` off the deploy branch. Do NOT push to main.

## What you are doing in THIS chunk
Creating two files at the repo root: `AGENTS.md` and `CLAUDE.md`. These ensure every future Claude Code session on this repo loads UnClick memory automatically and follows standing rules.

## Acceptance criteria
- [ ] AGENTS.md exists at repo root with the exact content below
- [ ] CLAUDE.md exists at repo root with the exact same content (copy, not symlink)
- [ ] No em dashes anywhere in either file
- [ ] Commit with message: "add AGENTS.md and CLAUDE.md for session-start memory loading"

## AGENTS.md content -- use exactly this:

```markdown
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
```

## Out of scope
Do NOT do anything beyond creating these two files and committing. No code changes. No other files. Commit and stop.
