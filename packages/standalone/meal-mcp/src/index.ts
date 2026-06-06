#!/usr/bin/env node
// Recipes MCP. Standalone MCP server by UnClick.
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
  searchMeals,
  getRandomMeal,
  getMealById,
  listMealCategories,
  filterMealsByCategory,
  filterMealsByArea,
  filterMealsByIngredient,
} from "./meal-tool.js";

const TOOLS = [
  {
    name: "meal_search",
    description: "Search for meals/recipes by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "meal_random",
    description: "Get a random meal/recipe.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "meal_get_by_id",
    description: "Get a meal/recipe by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "meal_categories",
    description: "List all meal categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "meal_filter_by_category",
    description: "Filter meals by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string" },
      },
      required: ["category"],
    },
  },
  {
    name: "meal_filter_by_area",
    description: "Filter meals by cuisine/area.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        area: { type: "string" },
      },
      required: ["area"],
    },
  },
  {
    name: "meal_filter_by_ingredient",
    description: "Filter meals by main ingredient.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ingredient: { type: "string" },
      },
      required: ["ingredient"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  meal_search: (args) => searchMeals(args as unknown as Parameters<typeof searchMeals>[0]),
  meal_random: (args) => getRandomMeal(args as unknown as Parameters<typeof getRandomMeal>[0]),
  meal_get_by_id: (args) => getMealById(args as unknown as Parameters<typeof getMealById>[0]),
  meal_categories: (args) => listMealCategories(args as unknown as Parameters<typeof listMealCategories>[0]),
  meal_filter_by_category: (args) => filterMealsByCategory(args as unknown as Parameters<typeof filterMealsByCategory>[0]),
  meal_filter_by_area: (args) => filterMealsByArea(args as unknown as Parameters<typeof filterMealsByArea>[0]),
  meal_filter_by_ingredient: (args) => filterMealsByIngredient(args as unknown as Parameters<typeof filterMealsByIngredient>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/meal", version: "0.1.0" },
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
  process.stderr.write(`[meal-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
