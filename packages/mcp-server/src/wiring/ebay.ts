// wiring/ebay.ts
// Per-app MCP wiring for the ebay connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { ebaySearch, ebayGetItem, ebayGetItemByLegacyId, ebayGetCategories } from "../ebay-tool.js";

export const ebayTools = [
  // ── ebay-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "ebay_search",
    description: "Search eBay listings via the Browse API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:     { type: "string", description: "eBay application Client ID" },
        client_secret: { type: "string", description: "eBay application Client Secret" },
        q:             { type: "string", description: "Search query" },
        limit:         { type: "number", description: "Results per page (max 200, default 20)" },
        offset:        { type: "number" },
        filter:        { type: "string", description: "eBay filter string (e.g. price:[10..50])" },
        sort:          { type: "string", description: "Sort order (e.g. price, -price, newlyListed)" },
        category_ids:  { type: "string", description: "Comma-separated category IDs" },
        marketplace:   { type: "string", description: "Marketplace ID (default: EBAY_US)" },
      },
      required: ["client_id", "client_secret", "q"],
    },
  },
  {
    name: "ebay_get_item",
    description: "Get full details for an eBay item by item ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:     { type: "string" },
        client_secret: { type: "string" },
        item_id:       { type: "string", description: "eBay item ID (e.g. v1|123456789|0)" },
        fieldgroups:   { type: "string" },
        marketplace:   { type: "string" },
      },
      required: ["client_id", "client_secret", "item_id"],
    },
  },
  {
    name: "ebay_get_item_by_legacy_id",
    description: "Get an eBay item by its legacy item ID (classic numeric ID).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:            { type: "string" },
        client_secret:        { type: "string" },
        legacy_item_id:       { type: "string", description: "Legacy eBay item ID (numeric)" },
        legacy_variation_id:  { type: "string" },
        legacy_variation_sku: { type: "string" },
        marketplace:          { type: "string" },
      },
      required: ["client_id", "client_secret", "legacy_item_id"],
    },
  },
  {
    name: "ebay_get_categories",
    description: "Get the eBay category tree for a marketplace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:        { type: "string" },
        client_secret:    { type: "string" },
        category_tree_id: { type: "string", description: "Category tree ID (0 = US default)" },
        marketplace:      { type: "string" },
      },
      required: ["client_id", "client_secret"],
    },
  },
] as const;

export const ebayHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ebay-tool.ts
  ebay_search:               (args) => ebaySearch(args),
  ebay_get_item:             (args) => ebayGetItem(args),
  ebay_get_item_by_legacy_id: (args) => ebayGetItemByLegacyId(args),
  ebay_get_categories:       (args) => ebayGetCategories(args),
};
