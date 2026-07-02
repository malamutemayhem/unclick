// wiring/cocktail.ts
// Per-app MCP wiring for the cocktail connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { searchCocktails, getRandomCocktail, getCocktailById, listCocktailCategories, filterCocktailsByCategory, filterCocktailsByIngredient } from "../cocktail-tool.js";

export const cocktailTools = [
  // ── cocktail-tool.ts ────────────────────────────────────────────────────────
  {
    name: "cocktail_search",
    description: "Search for cocktails/drinks by name.",
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
    name: "cocktail_random",
    description: "Get a random cocktail/drink recipe.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cocktail_get_by_id",
    description: "Get a cocktail/drink by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "TheCocktailDB drink ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "cocktail_categories",
    description: "List all cocktail categories from TheCocktailDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cocktail_filter_by_category",
    description: "Filter cocktails by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "e.g. Cocktail, Shot, Punch, Shake" },
      },
      required: ["category"],
    },
  },
  {
    name: "cocktail_filter_by_ingredient",
    description: "Filter cocktails by ingredient.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ingredient: { type: "string", description: "e.g. Vodka, Rum, Gin, Whiskey" },
      },
      required: ["ingredient"],
    },
  },
] as const;

export const cocktailHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cocktail-tool.ts
  cocktail_search:              (args) => searchCocktails(args),
  cocktail_random:              (args) => getRandomCocktail(args),
  cocktail_get_by_id:           (args) => getCocktailById(args),
  cocktail_categories:          (args) => listCocktailCategories(args),
  cocktail_filter_by_category:  (args) => filterCocktailsByCategory(args),
  cocktail_filter_by_ingredient:(args) => filterCocktailsByIngredient(args),
};
