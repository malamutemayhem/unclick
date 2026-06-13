---
name: MCP server builder
slug: mcp-server-builder
version: 1.0.0
description: "Builds a clean MCP server that wraps an external API: well-named tools, typed inputs, timeouts, and two-lane errors."
category: developer
tags: [mcp, server, api, integration, tools]
safety_level: cautious
source_kind: original
source_license: UnClick original
reuse: Original UnClick playbook covering the same capability as the popular mcp-builder skill, aligned to the UnClick connector standard.
unclick_usefulness: 4
unclick_native: skill
required_worker_roles: [Builder]
required_mcp_tools: [files.write, shell.run]
required_apps: []
---

# MCP server builder

Use this to wrap an API or service as an MCP server.

## Run

1. List the few high-value actions first; do not mirror every endpoint.
2. Give each tool a plain name, a one-line description, and typed, minimal inputs.
3. Add a timeout, clean handling for rate limits, and two-lane errors: user message plus detail.
4. Keep secrets out of code and logs; read them from the environment only.
5. Stamp results with source and freshness so the caller can trust them.

## Rule

A tool the model cannot call correctly from its name and schema alone is not done.

## Output

Return the tool list, the files created, how to run it, and one example call per tool.
