#!/usr/bin/env node
// ABN Lookup MCP. Standalone MCP server by UnClick.
// By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  abnLookup,
  abnSearch,
} from "./abn-tool.js";

const TOOLS = [
  {
    name: "abn_lookup",
    description: "Look up an Australian Business Number (ABN).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        abn: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["abn"],
    },
  },
  {
    name: "abn_search",
    description: "Search for Australian businesses by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["name"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  abn_lookup: (args) => abnLookup(args as unknown as Parameters<typeof abnLookup>[0]),
  abn_search: (args) => abnSearch(args as unknown as Parameters<typeof abnSearch>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/abn", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[abn-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
