#!/usr/bin/env node
// Amber Electric MCP. Standalone MCP server by UnClick.
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
  getAmberSites,
  getAmberCurrentPrice,
  getAmberForecast,
} from "./amber-tool.js";

const TOOLS = [
  {
    name: "amber_sites",
    description: "Get Amber Electric sites for the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "amber_current_price",
    description: "Get the current electricity price for an Amber site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["site_id"],
    },
  },
  {
    name: "amber_forecast",
    description: "Get electricity price forecast for an Amber site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["site_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  amber_sites: (args) => getAmberSites(args),
  amber_current_price: (args) => getAmberCurrentPrice(args),
  amber_forecast: (args) => getAmberForecast(args),
};

const server = new Server(
  { name: "io.github.malamutemayhem/amber", version: "0.1.0" },
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
  process.stderr.write(`[amber-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
