#!/usr/bin/env node
// Open Food Facts MCP. Standalone MCP server by UnClick.
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
  searchFoodProducts,
  getFoodProduct,
  getFoodByCategory,
} from "./openfoodfacts-tool.js";

const TOOLS = [
  {
    name: "food_search",
    description: "Search for food products on Open Food Facts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        page_size: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "food_get_product",
    description: "Get a food product from Open Food Facts by barcode.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        barcode: { type: "string" },
      },
      required: ["barcode"],
    },
  },
  {
    name: "food_by_category",
    description: "Get food products by category from Open Food Facts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string" },
        page: { type: "number" },
      },
      required: ["category"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  food_search: (args) => searchFoodProducts(args as unknown as Parameters<typeof searchFoodProducts>[0]),
  food_get_product: (args) => getFoodProduct(args as unknown as Parameters<typeof getFoodProduct>[0]),
  food_by_category: (args) => getFoodByCategory(args as unknown as Parameters<typeof getFoodByCategory>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/openfoodfacts", version: "0.1.0" },
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
  process.stderr.write(`[openfoodfacts-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
