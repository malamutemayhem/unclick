// wiring/brewery.ts
// Per-app MCP wiring for the brewery connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { brewerySearch, breweryGet, breweryList, breweryRandom } from "../brewery-tool.js";

export const breweryTools = [
  // ── brewery-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "brewery_search",
    description: "Search breweries by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        per_page: { type: "number", description: "Results per page (max 50)" },
      },
      required: ["query"],
    },
  },
  {
    name: "brewery_get",
    description: "Get a brewery by ID.",
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
    name: "brewery_list",
    description: "List breweries, optionally filtered by city, state, or type.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        city: { type: "string" },
        state: { type: "string" },
        type: { type: "string", description: "micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed" },
        per_page: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "brewery_random",
    description: "Get random breweries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        size: { type: "number", description: "Number of breweries (1-50, default 1)" },
      },
    },
  },
] as const;

export const breweryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // brewery-tool.ts
  brewery_search:          (args) => brewerySearch(args),
  brewery_get:             (args) => breweryGet(args),
  brewery_list:            (args) => breweryList(args),
  brewery_random:          (args) => breweryRandom(args),
};
