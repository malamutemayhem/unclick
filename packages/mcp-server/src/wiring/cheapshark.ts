// wiring/cheapshark.ts
// Per-app MCP wiring for the cheapshark connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cheapsharkDeals, cheapsharkStores } from "../cheapshark-tool.js";

export const cheapsharkTools = [
  // ── cheapshark-tool.ts ──────────────────────────────────────────────────────
  {
    name: "cheapshark_deals",
    description: "Search for game deals across multiple stores (Steam, GOG, etc.).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        title: { type: "string", description: "Game title to search for" },
        upper_price: { type: "number", description: "Max price filter" },
        lower_price: { type: "number", description: "Min price filter" },
        store_id: { type: "string", description: "Store ID to filter (use cheapshark_stores to find IDs)" },
        sort_by: { type: "string", description: "Sort: Deal Rating, Title, Savings, Price, Store, recent" },
        limit: { type: "number", description: "Number of results (default 10)" },
      },
    },
  },
  {
    name: "cheapshark_stores",
    description: "List all game stores tracked by CheapShark.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const cheapsharkHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cheapshark-tool.ts
  cheapshark_deals:        (args) => cheapsharkDeals(args),
  cheapshark_stores:       (args) => cheapsharkStores(args),
};
