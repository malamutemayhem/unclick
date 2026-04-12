# @unclick/memory-mcp

Persistent cross-session memory for AI agents. An MCP server that gives Claude Code, Cowork, Cursor, and any MCP client a 6-layer memory architecture backed by **your own Supabase database**.

## Quick Start

### 1. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then run the migration:

```sql
-- Run the schema from schema.sql in your Supabase SQL editor
```

### 2. Add to Claude Code

Add to `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "unclick-memory": {
      "command": "npx",
      "args": ["-y", "@unclick/memory-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}
```

### 3. Add the CLAUDE.md

Copy `CLAUDE.md` to your project root or `~/.claude/CLAUDE.md` to enable the session bridge protocol.

## Memory Layers

| Layer | Name | Purpose | Always Loaded? |
|-------|------|---------|----------------|
| 1 | Business Context | Standing rules, preferences, client info | Yes |
| 2 | Knowledge Library | Versioned reference docs (briefs, specs, CVs) | No \u2014 on demand |
| 3 | Session Summaries | One per session \u2014 decisions, open loops | Last 5 at startup |
| 4 | Extracted Facts | Atomic searchable knowledge | Hot facts at startup |
| 5 | Conversation Log | Full verbatim history | No \u2014 search only |
| 6 | Code Dumps | Language-tagged code blocks | No \u2014 on demand |

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_startup_context` | Load business context + recent sessions + hot facts |
| `search_memory` | Full-text search across all layers |
| `search_facts` | Search extracted facts |
| `search_library` | Search knowledge library docs |
| `get_library_doc` | Get a specific library document by slug |
| `list_library` | List all library documents |
| `write_session_summary` | Save end-of-session summary |
| `add_fact` | Add an atomic fact to memory |
| `supersede_fact` | Replace an outdated fact |
| `log_conversation` | Log a message to conversation history |
| `store_code` | Store a code block |
| `get_business_context` | Get all business context entries |
| `set_business_context` | Add/update a business context entry |
| `upsert_library_doc` | Create/update a library document |
| `manage_decay` | Run memory decay management |
| `get_conversation_detail` | Get full conversation for a session |
| `memory_status` | Overview of memory usage and stats |

## How It Works

**Session Start:** Claude calls `get_startup_context` \u2192 loads your standing rules, recent session summaries, and important facts.

**During Session:** Claude uses `add_fact`, `search_memory`, etc. as needed to store and retrieve knowledge.

**Session End:** Claude calls `write_session_summary` \u2192 next session picks up where this one left off.

## BYOD (Bring Your Own Database)

Your data lives in YOUR Supabase instance. UnClick never sees it. If you stop using UnClick, your data stays \u2014 it\u2019s already yours.

## License

MIT
