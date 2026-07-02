// wiring/upcitemdb.ts
// Per-app MCP wiring for the upcitemdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { upcLookup, upcSearch } from "../upcitemdb-tool.js";

export const upcitemdbTools = [
  // ── upcitemdb-tool.ts ────────────────────────────────────────────────────────
  {
    name: "upc_lookup",
    description: "Look up a product by UPC/EAN barcode number.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        upc: { type: "string" as const, description: "UPC or EAN barcode number." },
      }, required: ["upc"],
    },
  },
  {
    name: "upc_search",
    description: "Search products by name in the UPC item database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Product search query." },
      }, required: ["query"],
    },
  },
] as const;

export const upcitemdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // upcitemdb-tool.ts
  upc_lookup:                (args) => upcLookup(args),
  upc_search:                (args) => upcSearch(args),
};
