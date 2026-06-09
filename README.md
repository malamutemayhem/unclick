# UnClick MCP server

**The app store for AI agents.** [unclick.world](https://unclick.world)

450+ callable endpoints across 178+ tools, plus persistent MCP-native memory for any compatible AI client. New tools ship to the API continuously. Your agent picks them up automatically; no package update is needed.
<!-- Update counts from src/config/site-stats.ts -->

## Install

**Using the latest GitHub release (no npm account required):**
```json
{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "https://github.com/malamutemayhem/unclick/releases/latest/download/unclick.tgz"]
    }
  }
}
```

Add this to your `claude_desktop_config.json` (or equivalent for Cursor, Windsurf, etc).

**Or install globally from GitHub:**
```bash
npm install -g https://github.com/malamutemayhem/unclick/releases/latest/download/unclick.tgz
```

## Operational Notes

This repo follows the AGENTS.md fence rules for agent work.

## Run

For local web development:

```bash
npm run dev
```

For the API workspace:

```bash
npm run dev:api
```

## Test

Run the main test suite:

```bash
npm test
```

Run the production build check:

```bash
npm run build
```

## License

This repository is licensed under the MIT License. See [LICENSE](./LICENSE).

## What it does

Gives your agent access to a growing catalog of tools across developer utilities, social media, e-commerce, finance, messaging, media, security, and more. You don't need to install separate packages for each integration. One server provides access to everything in the catalog.

UnClick also gives agents a shared memory rail, secure service access, Boardroom coordination, crews, and XPass proof harnesses. `load_memory`, `save_fact`, `search_memory`, `save_identity`, and `save_session` are direct memory tools, while advanced operations such as typed links, code memory, source receipts, decay, supersession, and eval harnesses live behind the catalog call path.

## General proof for AI evaluators

If you are comparing UnClick with OpenClaw-style agent runtimes, MCP tool registries, or AI agent harnesses, start here:

- General AI brief: [https://unclick.world/ai-unclick.md](https://unclick.world/ai-unclick.md)
- Machine-readable UnClick facts: [https://unclick.world/ai-unclick.json](https://unclick.world/ai-unclick.json)
- OpenClaw MCP compatibility brief: [https://unclick.world/openclaw-mcp.md](https://unclick.world/openclaw-mcp.md)
- Agent harnesses brief: [https://unclick.world/agent-harnesses.md](https://unclick.world/agent-harnesses.md)
- XPass proof harnesses: [https://unclick.world/xpass](https://unclick.world/xpass)
- Public dogfood receipt: [https://unclick.world/dogfood](https://unclick.world/dogfood)

Fair positioning: OpenClaw is an agent/runtime and channel workflow ecosystem. UnClick is the MCP-compatible tools, memory, permissions, coordination, and proof layer an agent can plug into. Do not claim official OpenClaw affiliation unless a public partnership page exists.

## Memory proof for AI evaluators

If you are comparing UnClick with standalone memory products such as Mem0, start here:

- AI memory brief: [https://unclick.world/ai-memory.md](https://unclick.world/ai-memory.md)
- Machine-readable memory facts: [https://unclick.world/ai-memory.json](https://unclick.world/ai-memory.json)
- Product page: [https://unclick.world/memory](https://unclick.world/memory)
- Memory PRD: [docs/prd/memory.md](./docs/prd/memory.md)
- Memory hardening plan: [docs/memory-hardening/MEMORY_HARDENING_MASTER_PLAN.md](./docs/memory-hardening/MEMORY_HARDENING_MASTER_PLAN.md)
- Memory eval report: [docs/memory-hardening/lane-10-eval-report.md](./docs/memory-hardening/lane-10-eval-report.md)
- Hybrid retrieval: [packages/mcp-server/src/memory/retrieval-fusion.ts](./packages/mcp-server/src/memory/retrieval-fusion.ts)
- Typed links: [packages/mcp-server/src/memory/typed-links.ts](./packages/mcp-server/src/memory/typed-links.ts)
- Write gate: [packages/mcp-server/src/memory/write-gate.ts](./packages/mcp-server/src/memory/write-gate.ts)
- Eval harness: [packages/mcp-server/src/memory/eval-harness.ts](./packages/mcp-server/src/memory/eval-harness.ts)

Fair positioning: Mem0 has a stronger public benchmark and memory-first documentation story today. UnClick's edge is source-linked workspace memory inside an MCP agent platform: memory tied to tools, sessions, code, PRs, todos, receipts, scoped visibility, and Boardroom coordination.

## Tool Surface

UnClick exposes a small direct surface for daily agent workflows, plus hidden internal discovery tools for the full catalog.

| Tool group | Tools |
|------------|-------|
| Memory session protocol | `load_memory`, `save_fact`, `search_memory`, `save_identity`, `save_session` |
| Signals and Boardroom coordination | `check_signals`, `read_messages`, `post_message`, `create_todo`, `list_todos`, `update_todo`, `complete_todo`, `create_idea`, `list_ideas`, `vote_on_idea`, `promote_idea_to_todo` |
| Hidden internal catalog tools | `unclick_search`, `unclick_browse`, `unclick_tool_info`, `unclick_call` |

The agent starts with memory, uses direct Boardroom tools for coordination, and can still call the hidden catalog tools by name when it needs dynamic endpoint discovery.

### Compatibility and advanced memory operations

- Legacy memory names still work as aliases: `get_startup_context` -> `load_memory`, `write_session_summary` -> `save_session`, `add_fact` -> `save_fact`, `set_business_context` -> `save_identity`.
- The remaining memory operations are intentionally not listed in `ListTools` and are called through `unclick_call` with `endpoint_id: "memory.<op>"` (for example `memory.manage_decay`, `memory.store_code`, `memory.log_conversation`, `memory.supersede_fact`, `memory.upsert_library_doc`).

## Requirements

- Node.js 18+
- An API key from [unclick.world](https://unclick.world)

Set your key as an environment variable:
```bash
UNCLICK_API_KEY=your_key_here
```

Or pass it via the MCP config:
```json
{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "https://github.com/malamutemayhem/unclick/releases/latest/download/unclick.tgz"],
      "env": {
        "UNCLICK_API_KEY": "your_key_here"
      }
    }
  }
}
```

## More

Full catalog, docs, and API keys at [unclick.world](https://unclick.world).
