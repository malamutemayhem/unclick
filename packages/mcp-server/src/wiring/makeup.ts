// wiring/makeup.ts
// Per-app MCP wiring for the makeup connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { makeupSearch } from "../makeup-tool.js";

export const makeupTools = [
  // ── makeup-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "makeup_search",
    description: "Search makeup products by brand, type, category, or tags.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        brand: { type: "string", description: "Brand name (e.g. maybelline, covergirl, nyx)" },
        product_type: { type: "string", description: "Product type (e.g. lipstick, foundation, mascara)" },
        product_category: { type: "string", description: "Category (e.g. powder, cream, liquid)" },
        product_tags: { type: "string", description: "Tags (e.g. vegan, organic, gluten_free)" },
      },
    },
  },
] as const;

export const makeupHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // makeup-tool.ts
  makeup_search:           (args) => makeupSearch(args),
};
