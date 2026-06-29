// wiring/dummyjson.ts
// Per-app MCP wiring for the dummyjson connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dummyjsonProducts, dummyjsonSearchProducts, dummyjsonQuotes, dummyjsonRandomQuote } from "../dummyjson-tool.js";

export const dummyjsonTools = [
  // ── dummyjson-tool.ts ───────────────────────────────────────────────────────
  {
    name: "dummyjson_products",
    description: "Browse fake product data from DummyJSON.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 10, max 30)" },
        skip: { type: "number", description: "Offset for pagination" },
      },
    },
  },
  {
    name: "dummyjson_search_products",
    description: "Search fake products by keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
      },
      required: ["query"],
    },
  },
  {
    name: "dummyjson_quotes",
    description: "Browse a collection of quotes from DummyJSON.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 10, max 30)" },
      },
    },
  },
  {
    name: "dummyjson_random_quote",
    description: "Get a random quote from DummyJSON.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const dummyjsonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dummyjson-tool.ts
  dummyjson_products:      (args) => dummyjsonProducts(args),
  dummyjson_search_products: (args) => dummyjsonSearchProducts(args),
  dummyjson_quotes:        (args) => dummyjsonQuotes(args),
  dummyjson_random_quote:  (args) => dummyjsonRandomQuote(args),
};
