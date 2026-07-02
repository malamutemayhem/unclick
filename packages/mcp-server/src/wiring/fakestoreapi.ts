// wiring/fakestoreapi.ts
// Per-app MCP wiring for the fakestoreapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fakestoreProducts, fakestoreProduct, fakestoreCategories } from "../fakestoreapi-tool.js";

export const fakestoreapiTools = [
  // ── fakestoreapi-tool.ts ─────────────────────────────────────────────────────
  {
    name: "fakestore_products",
    description: "List fake e-commerce products (for testing and prototyping).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        limit: { type: "number" as const, description: "Max products (default 10)." },
      },
    },
  },
  {
    name: "fakestore_product",
    description: "Get a single fake product by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "number" as const, description: "Product ID (1-20)." },
      }, required: ["id"],
    },
  },
  {
    name: "fakestore_categories",
    description: "List all fake store product categories.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const fakestoreapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fakestoreapi-tool.ts
  fakestore_products:        (args) => fakestoreProducts(args),
  fakestore_product:         (args) => fakestoreProduct(args),
  fakestore_categories:      (args) => fakestoreCategories(args),};
