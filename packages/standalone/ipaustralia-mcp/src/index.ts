#!/usr/bin/env node
// IP Australia MCP. Standalone MCP server by UnClick.
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
  searchTrademarks,
  getTrademarkDetails,
  searchPatents,
} from "./ipaustralia-tool.js";

const TOOLS = [
  {
    name: "search_trademarks",
    description: "Search Australian trademarks via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        type: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_trademark_details",
    description: "Get details for a specific Australian trademark.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        applicationNumber: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["applicationNumber"],
    },
  },
  {
    name: "search_patents",
    description: "Search Australian patents via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  search_trademarks: (args) => searchTrademarks(args as unknown as Parameters<typeof searchTrademarks>[0]),
  get_trademark_details: (args) => getTrademarkDetails(args as unknown as Parameters<typeof getTrademarkDetails>[0]),
  search_patents: (args) => searchPatents(args as unknown as Parameters<typeof searchPatents>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/ipaustralia", version: "0.1.0" },
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
  process.stderr.write(`[ipaustralia-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
