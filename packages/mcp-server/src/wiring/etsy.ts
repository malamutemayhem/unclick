// wiring/etsy.ts
// Per-app MCP wiring for the etsy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { etsySearchListings, etsyGetListing, etsyGetShop, etsyGetShopListings, etsySearchShops } from "../etsy-tool.js";

export const etsyTools = [
  // ── etsy-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "etsy_search_listings",
    description: "Search active Etsy listings by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:     { type: "string", description: "Etsy API key" },
        keywords:    { type: "string", description: "Search keywords" },
        limit:       { type: "number", description: "Results per page (max 100, default 25)" },
        offset:      { type: "number" },
        sort_on:     { type: "string", enum: ["created", "price", "score", "updated"], description: "Sort field (created, price, score, updated)" },
        sort_order:  { type: "string", enum: ["asc", "desc"], description: "asc or desc" },
        min_price:   { type: "number" },
        max_price:   { type: "number" },
        taxonomy_id: { type: "number" },
        location:    { type: "string" },
      },
      required: ["api_key", "keywords"],
    },
  },
  {
    name: "etsy_get_listing",
    description: "Get details for a single Etsy listing by listing ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:    { type: "string" },
        listing_id: { type: "string" },
        includes:   { type: "string", description: "Comma-separated includes (Images, Shop, etc.)" },
      },
      required: ["api_key", "listing_id"],
    },
  },
  {
    name: "etsy_get_shop",
    description: "Get details for an Etsy shop by shop ID or numeric ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        shop_id: { type: "string", description: "Shop ID or shop name" },
      },
      required: ["api_key", "shop_id"],
    },
  },
  {
    name: "etsy_get_shop_listings",
    description: "Get active listings for an Etsy shop.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:    { type: "string" },
        shop_id:    { type: "string" },
        limit:      { type: "number" },
        offset:     { type: "number" },
        sort_on:    { type: "string" },
        sort_order: { type: "string" },
      },
      required: ["api_key", "shop_id"],
    },
  },
  {
    name: "etsy_search_shops",
    description: "Search for Etsy shops by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:   { type: "string" },
        shop_name: { type: "string", description: "Shop name to search for" },
        limit:     { type: "number" },
        offset:    { type: "number" },
      },
      required: ["api_key", "shop_name"],
    },
  },
] as const;

export const etsyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // etsy-tool.ts
  etsy_search_listings:      (args) => etsySearchListings(args),
  etsy_get_listing:          (args) => etsyGetListing(args),
  etsy_get_shop:             (args) => etsyGetShop(args),
  etsy_get_shop_listings:    (args) => etsyGetShopListings(args),
  etsy_search_shops:         (args) => etsySearchShops(args),
};
