# UnClick

AI agent operating system. One npm install gives agents access to 450+ callable endpoints across 60+ integrations AND persistent cross-session memory, all via the MCP protocol.

## Fleet alignment

Read `docs/unclick-context-boot-packet.md` before making product-map claims about UnClick, Autopilot, Launchpad, Rooms, XPass, or old Pass wording. If you only have connector-level context, say so and load the context packet before answering confidently.

Read `FLEET_SYNC.md` first when working as part of the multi-PC worker fleet. It defines source-of-truth order, live worker lanes, Fishbowl coordination, no-stomp rules, and how older courier notes relate to the current process.

If you are unsure which worker should own a handoff, review `docs/fleet-worker-roles.md` for the current emoji role map and routing guide.

**Naming (Boardroom vs Fishbowl):** "Boardroom" is the user-facing name for the coordination room. "Fishbowl" is the legacy internal name still wired into the database tables, API routes, React route, and the room metadata returned by `read_messages` (which reports `name: "Fishbowl"`). Say **Boardroom** when talking to the user; expect to see **Fishbowl** in code and live metadata. Do NOT bulk-rename Fishbowl to Boardroom: per `AUTOPILOT.md` it is kept as the internal delivery address (an alias) until the automation substrate is explicitly migrated.

## Before you touch code

Use this as the short start ritual before any edit, branch, or PR action:

1. Refresh live GitHub, Actions, and Fishbowl state.
2. Check `git status`. If the checkout is dirty or clearly belongs to another active lane, stop and create a fresh worktree from `origin/main` or the approved base.
3. Confirm the files you want are not already owned by another active PR or worker.
4. Claim one small chip, post status in Fishbowl, and default to a draft PR first when risk is unclear.

## Monorepo structure

```
packages/mcp-server/            # THE npm package (@unclick/mcp-server) - published to npm
packages/mcp-server/src/memory/ # Built-in memory module (6-layer architecture)
packages/memory-mcp/            # DEPRECATED standalone package (kept for reference)
src/                            # React website (Vite + TypeScript)
api/                            # Vercel serverless functions (REST API endpoints)
```

## Key files

| File | Purpose |
|------|---------|
| `packages/mcp-server/src/server.ts` | MCP server entrypoint, registers the direct tool surface and hidden internal meta-tools |
| `packages/mcp-server/src/tool-wiring.ts` | Maps tool names to API calls |
| `packages/mcp-server/src/memory/handlers.ts` | Memory operation dispatcher (canonical memory operation surface) |
| `packages/mcp-server/src/memory/db.ts` | Backend factory (local JSON or Supabase) |
| `src/pages/Tools.tsx` | Website tools grid, one tile per integration |

## Local proof commands

When a PR touches `packages/mcp-server/**`, run package-local tests from that workspace or use the workspace script. The root Vitest config only includes `src/**` and `api/**`, so a root command such as `npx vitest run packages/mcp-server/src/__tests__/reliability.test.ts` can report "No test files found" instead of proving the MCP package.

Use this shape for one MCP package test file:

```bash
cd packages/mcp-server
npx vitest run src/__tests__/reliability.test.ts
```

Use this for full MCP package coverage:

```bash
npm run test --workspace=@unclick/mcp-server
```

## Architecture

This is the canonical tool-surface summary for this repo.

**Hidden internal meta-tools** let agents discover and call catalog endpoints without crowding the default MCP tool list:

- `unclick_search` - find tools by keyword
- `unclick_browse` - list tools, optionally by category
- `unclick_tool_info` - get endpoint and parameter details for a specific tool
- `unclick_call` - execute any endpoint with parameters

These tools remain callable by name, but they are hidden from `ListTools` to keep the default surface clean.

**Visible first-party tools** expose the workflows agents should use directly. They include:

- `load_memory` - call FIRST in every session (was `get_startup_context`)
- `save_session` - call BEFORE session ends (was `write_session_summary`)
- `save_fact` - record preferences, decisions, important info (was `add_fact`)
- `search_memory` - recall anything from prior sessions
- `save_identity` - set standing rules, always loaded (was `set_business_context`)
- `check_signals` - check whether the agent should wake up or act
- Fishbowl coordination tools such as `read_messages`, `post_message`, `create_todo`, `list_todos`, `update_todo`, `complete_todo`, `create_idea`, `list_ideas`, `vote_on_idea`, and `promote_idea_to_todo`

The old tool names still work as aliases for backward compatibility. Additional memory operations (manage_decay, store_code, log_conversation, supersede_fact, upsert_library_doc, etc.) are callable via `unclick_call` with `endpoint_id: "memory.<op>"`.

## Adding a new connector (an "App")

**Read `docs/adding-a-connector.md` first** - it is the full playbook (the
connector "ant mound", the L1-L5 ladder, the modular template, the L3/L4
bolt-ons, enforcement, the Apps catalog, the regenerate-in-order rule, and the
verification gates). `docs/connector-standard.md` defines the quality bar.

Short version (each connector is built to L5):
1. `packages/mcp-server/src/<slug>-tool.ts` - the connector (timeout, clean 429,
   two-lane errors, `stampMeta` source/freshness/next_steps). Connectors live
   here, NOT in `api/`.
2. `packages/mcp-server/src/<slug>-tool.test.ts` - colocated test (required for L2).
3. `packages/mcp-server/src/tool-wiring.ts` - import + `ADDITIONAL_TOOLS` defs +
   `ADDITIONAL_HANDLERS` dispatch.
4. `packages/mcp-server/src/connector-setup.ts` - a `CONNECTOR_SETUP` row.
5. `scripts/generate-app-catalog.mjs` - a category bucket (+ optional name/blurb/domain).
6. Regenerate IN ORDER (after the test exists): `generate-tool-index.mjs` ->
   `connector-depth-ladder.mjs` -> `generate-app-catalog.mjs` -> `UnClick-brainmap.mjs`,
   then run the `--check` gates. The Apps pages render from the generated catalog
   (no manual tile edit).

## Style rules

- No em dashes anywhere in code or content (use a regular dash or restructure the sentence)
- Do not add one-off MCP registrations casually. Catalog and integration tools should normally flow through `tool-wiring.ts` and the hidden internal meta-tools. Add visible first-party tools only when agents need a direct workflow surface.
