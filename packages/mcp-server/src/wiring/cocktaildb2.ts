// wiring/cocktaildb2.ts
// Per-app MCP wiring for the cocktaildb2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cocktailByIngredient, cocktailIngredientInfo } from "../cocktaildb2-tool.js";

export const cocktaildb2Tools = [
  // ── cocktaildb2-tool.ts ──────────────────────────────────────────────────────
  {
    name: "cocktail_by_ingredient",
    description: "Filter cocktails by ingredient (e.g. Vodka, Gin, Tequila).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ingredient: { type: "string" as const, description: "Ingredient name." },
      }, required: ["ingredient"],
    },
  },
  {
    name: "cocktail_ingredient_info",
    description: "Get details about a cocktail ingredient (description, type, ABV).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ingredient: { type: "string" as const, description: "Ingredient name." },
      }, required: ["ingredient"],
    },
  },
] as const;

export const cocktaildb2Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cocktaildb2-tool.ts
  cocktail_by_ingredient:    (args) => cocktailByIngredient(args),
  cocktail_ingredient_info:  (args) => cocktailIngredientInfo(args),
};
