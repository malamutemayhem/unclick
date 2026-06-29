// wiring/woocommerce.ts
// Per-app MCP wiring for the woocommerce connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { wooProducts, wooOrders, wooCustomers } from "../woocommerce-tool.js";

export const woocommerceTools = [
  // ── woocommerce-tool.ts ───────────────────────────────────────────────────────
  {
    name: "woo_products",
    description: "List or get WooCommerce products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string", description: "WooCommerce store URL (e.g. https://mystore.com)" },
        consumer_key:    { type: "string", description: "WooCommerce consumer key (ck_...)" },
        consumer_secret: { type: "string", description: "WooCommerce consumer secret (cs_...)" },
        action:          { type: "string", enum: ["list", "get"], description: "list or get (default: list)" },
        id:              { type: "string", description: "Product ID for action='get'" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        status:          { type: "string", enum: ["publish", "draft", "pending", "private"], description: "publish, draft, pending, private" },
        category:        { type: "string" },
        search:          { type: "string" },
        orderby:         { type: "string" },
        order:           { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },
  {
    name: "woo_orders",
    description: "List, get, or create WooCommerce orders.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string" },
        consumer_key:    { type: "string" },
        consumer_secret: { type: "string" },
        action:          { type: "string", enum: ["list", "get", "create"], description: "list, get, or create (default: list)" },
        id:              { type: "string", description: "Order ID for action='get'" },
        order:           { type: "object", additionalProperties: true, description: "Order object for action='create'" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        status:          { type: "string", description: "pending, processing, completed, refunded, etc." },
        customer:        { type: "number", description: "Filter by customer ID" },
        after:           { type: "string", description: "ISO 8601 date for orders after this date" },
        before:          { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },
  {
    name: "woo_customers",
    description: "List WooCommerce customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string" },
        consumer_key:    { type: "string" },
        consumer_secret: { type: "string" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        search:          { type: "string" },
        email:           { type: "string" },
        role:            { type: "string" },
        orderby:         { type: "string" },
        order:           { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },
] as const;

export const woocommerceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // woocommerce-tool.ts
  woo_products:              (args) => wooProducts(args),
  woo_orders:                (args) => wooOrders(args),
  woo_customers:             (args) => wooCustomers(args),
};
