#!/usr/bin/env node
// IP Geolocation MCP. Standalone MCP server by UnClick.
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
  ipLookup,
  ipBatch,
} from "./ipapi-tool.js";

const TOOLS = [
  {
    name: "ip_lookup",
    description: "Look up geolocation for an IP address.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "ip_batch",
    description: "Batch IP address geolocation lookup.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ips: { type: "array", items: {}, description: "Array of IP address strings" },
        api_key: { type: "string" },
      },
      required: ["ips"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  ip_lookup: (args) => ipLookup(args as unknown as Parameters<typeof ipLookup>[0]),
  ip_batch: (args) => ipBatch(args as unknown as Parameters<typeof ipBatch>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/ipapi", version: "0.1.0" },
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
  process.stderr.write(`[ipapi-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
