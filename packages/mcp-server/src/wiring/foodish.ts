// wiring/foodish.ts
// Per-app MCP wiring for the foodish connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { foodishRandom, foodishByCategory } from "../foodish-tool.js";

export const foodishTools = [
  // ── foodish-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "foodish_random",
    description: "Get a random food image from Foodish API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "foodish_by_category",
    description: "Get a random food image by category from Foodish API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        category: { type: "string" as const, description: "Food category (e.g. pizza, burger, biryani, pasta, rice)." },
      },
      required: ["category"],
    },
  },
] as const;

export const foodishHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // foodish-tool.ts
  foodish_random:            (args) => foodishRandom(args),
  foodish_by_category:       (args) => foodishByCategory(args),};
