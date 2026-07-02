// wiring/amazon.ts
// Per-app MCP wiring for the amazon connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { amazonSearch, amazonProduct, amazonBrowse, amazonVariations } from "../amazon-tool.js";

export const amazonTools = [
  // ── amazon-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "amazon_search",
    description: "Search for products on Amazon.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keywords: { type: "string" },
        searchIndex: { type: "string" },
        itemCount: { type: "number" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
        region: { type: "string" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "amazon_product",
    description: "Get Amazon product details by ASIN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        asin: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
        region: { type: "string" },
      },
      required: ["asin"],
    },
  },
  {
    name: "amazon_browse",
    description: "Browse Amazon product categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        browseNodeId: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
      },
      required: ["browseNodeId"],
    },
  },
  {
    name: "amazon_variations",
    description: "Get Amazon product variations for an ASIN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        asin: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
      },
      required: ["asin"],
    },
  },
] as const;

export const amazonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // amazon-tool.ts
  amazon_search:           (args) => amazonSearch(args),
  amazon_product:          (args) => amazonProduct(args),
  amazon_browse:           (args) => amazonBrowse(args),
  amazon_variations:       (args) => amazonVariations(args),
};
