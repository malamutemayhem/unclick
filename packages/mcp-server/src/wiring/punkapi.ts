// wiring/punkapi.ts
// Per-app MCP wiring for the punkapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { punkApiRandomBeer, punkApiSearchBeers, punkApiGetBeer } from "../punkapi-tool.js";

export const punkapiTools = [
  // ── punkapi-tool.ts ────────────────────────────────────────────────────────
  {
    name: "punkapi_random_beer",
    description: "Get a random craft beer recipe from BrewDog's Punk API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "punkapi_search_beers",
    description: "Search craft beer recipes by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Beer name to search for" },
        per_page: { type: "number", description: "Results per page (max 25, default 10)" },
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
  {
    name: "punkapi_get_beer",
    description: "Get a specific craft beer recipe by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Numeric beer ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const punkapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // punkapi-tool.ts
  punkapi_random_beer:     (args) => punkApiRandomBeer(args),
  punkapi_search_beers:    (args) => punkApiSearchBeers(args),
  punkapi_get_beer:        (args) => punkApiGetBeer(args),
};
