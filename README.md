# UnClick MCP server

**The app store for AI agents.** [unclick.world](https://unclick.world)

Persistent memory, shared coordination and a growing catalogue of tools for MCP-compatible AI clients. See [UnClick](https://unclick.world) for the current catalogue and connection options.

## Repository status

This repository is the public home for UnClick's MCP client, standalone connectors, documentation and examples.

It also contains an older platform source snapshot. The platform baseline is [July 2, 2026](https://github.com/malamutemayhem/unclick/commit/89d8792d452fb4e021c07a7eb8f501faa442417e); it is not a continuously updated copy of the hosted service. Later public client or documentation updates do not imply that the whole platform has been refreshed. See [unclick.world](https://unclick.world) for the current service and connection options.

Public updates focus on reviewed client and connector releases, accurate setup instructions and useful examples. Each release should identify its version, requirements, tested capabilities and known limitations. An older archive or directory listing is not proof of current compatibility.

## Public releases and support

- Use the npm client below to connect to hosted UnClick. Cloning the platform snapshot is a separate development path.
- For standalone connectors, check the individual package README, licence and [release notes](https://github.com/malamutemayhem/unclick/releases). Provider accounts, credentials or usage restrictions may apply.
- Report reproducible public client and connector problems in [GitHub Issues](https://github.com/malamutemayhem/unclick/issues), including the package version and redacted error details. Follow [SECURITY.md](./SECURITY.md) for security reports. Never include keys or private account data.
- Updates are selected and reviewed before publication. The public repository is not an automatic mirror of private platform development. Existing licences and any corresponding-source obligations still apply.

## Install

**From npm:**

Get an API key from [UnClick](https://unclick.world), then replace `your_key_here` in this configuration.
```json
{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "@unclick/mcp-server"],
      "env": {
        "UNCLICK_API_KEY": "your_key_here"
      }
    }
  }
}
```

Add this to your `claude_desktop_config.json` (or equivalent for Cursor, Windsurf, etc).

**Or install globally from npm:**
```bash
npm install -g @unclick/mcp-server
```

## Operational Notes

This repo follows the AGENTS.md fence rules for agent work.

## Run

For local development of the source snapshot:

```bash
npm run dev
```

For the source snapshot's API workspace:

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

UnClick uses a split license. The platform (website, API, and hosted backend
and memory services) is **AGPL-3.0** (see [LICENSE](./LICENSE)). The npm client
package `@unclick/mcp-server` stays **MIT**, and the standalone connector
packages stay **Apache-2.0**. Full breakdown and reasoning in
[LICENSING.md](./LICENSING.md).

## What it does

Gives your agent access to a growing catalog of tools across developer utilities, social media, e-commerce, finance, messaging, media, security, and more. You don't need to install separate packages for each integration. One server provides access to everything in the catalog.

## Tool Surface

The npm client advertises the full tool catalogue by default. For a smaller tool list in your chat client, add `UNCLICK_TOOL_SURFACE` to the same `env` object as your API key:

```json
{
  "UNCLICK_API_KEY": "your_key_here",
  "UNCLICK_TOOL_SURFACE": "lean"
}
```

Lean mode advertises these tools:

- Memory: `load_memory`, `save_fact`, `search_memory`, `save_session`.
- Discovery and execution: `unclick_search`, `unclick_tool_info`, `unclick_call`.

Use discovery to find other operations, then call their endpoint IDs through `unclick_call`. For example, Boardroom jobs are available through `boardroom.list_todos`. Lean mode changes the advertised tool list; account permissions and provider credentials still apply.

### Compatibility and advanced memory operations

- Legacy memory names still work as aliases: `get_startup_context` -> `load_memory`, `write_session_summary` -> `save_session`, `add_fact` -> `save_fact`, `set_business_context` -> `save_identity`.
- Additional memory operations can be called through `unclick_call` with `endpoint_id: "memory.<op>"` (for example `memory.manage_decay`, `memory.store_code`, `memory.log_conversation`, `memory.supersede_fact`, `memory.upsert_library_doc`).

## Requirements

- Node.js 22 or newer. The published 0.3.131 bundle includes dependencies that require Node.js 22; installation and MCP startup were verified with Node.js 24.14.0.
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
      "args": ["-y", "@unclick/mcp-server"],
      "env": {
        "UNCLICK_API_KEY": "your_key_here"
      }
    }
  }
}
```

## More

Full catalog, docs, and API keys at [unclick.world](https://unclick.world).
