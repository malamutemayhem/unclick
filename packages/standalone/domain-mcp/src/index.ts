#!/usr/bin/env node
// Domain MCP. Standalone MCP server by UnClick.
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
  searchDomainListings,
  getDomainProperty,
  getDomainSuburbStats,
} from "./domain-tool.js";

const TOOLS = [
  {
    name: "domain_search_listings",
    description: "Search Australian property listings on Domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        suburb: { type: "string" },
        state: { type: "string" },
        postcode: { type: "string" },
        listingType: { type: "string", description: "Sale or Rent" },
        minBedrooms: { type: "number" },
        maxBedrooms: { type: "number" },
        minPrice: { type: "number" },
        maxPrice: { type: "number" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "domain_get_property",
    description: "Get details for a specific Domain property listing.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        listing_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["listing_id"],
    },
  },
  {
    name: "domain_suburb_stats",
    description: "Get property market statistics for an Australian suburb.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        suburb: { type: "string" },
        state: { type: "string" },
        postcode: { type: "string" },
        propertyCategory: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["suburb", "state"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  domain_search_listings: (args) => searchDomainListings(args),
  domain_get_property: (args) => getDomainProperty(args),
  domain_suburb_stats: (args) => getDomainSuburbStats(args),
};

const server = new Server(
  { name: "io.github.malamutemayhem/domain", version: "0.1.0" },
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
  process.stderr.write(`[domain-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
