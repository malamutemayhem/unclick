// wiring/shopify.ts
// Per-app MCP wiring for the shopify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { shopifyProducts, shopifyOrders, shopifyCustomers, shopifyInventory, shopifyCollections, shopifyShop, shopifyFulfillments } from "../shopify-tool.js";

export const shopifyTools = [
  // ── shopify-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shopify_products",
    description: "Get products from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        collection_id: { type: "number" },
        product_type: { type: "string" },
        vendor: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_orders",
    description: "Get orders from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        status: { type: "string" },
        financial_status: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_customers",
    description: "Get customers from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_inventory",
    description: "Get inventory for Shopify products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        product_id: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_collections",
    description: "Get collections from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_shop",
    description: "Get Shopify store information.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_fulfillments",
    description: "Get fulfillments for a Shopify order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        order_id: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain", "order_id"],
    },
  },
] as const;

export const shopifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // shopify-tool.ts
  shopify_products:        (args) => shopifyProducts(args),
  shopify_orders:          (args) => shopifyOrders(args),
  shopify_customers:       (args) => shopifyCustomers(args),
  shopify_inventory:       (args) => shopifyInventory(args),
  shopify_collections:     (args) => shopifyCollections(args),
  shopify_shop:            (args) => shopifyShop(args),
  shopify_fulfillments:    (args) => shopifyFulfillments(args),
};
