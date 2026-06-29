// wiring/lemonsqueezy.ts
// Per-app MCP wiring for the lemonsqueezy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Commerce / Creator

import { lsListStores, lsListProducts, lsListOrders, lsListSubscriptions, lsGetOrder, lsListCustomers } from "../lemonsqueezy-tool.js";

export const lemonsqueezyTools = [
  // ── lemonsqueezy-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ls_list_stores",
    description: "List all Lemon Squeezy stores on your account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Lemon Squeezy API key" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_products",
    description: "List products in a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_orders",
    description: "List orders in a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        user_email: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_subscriptions",
    description: "List subscriptions for a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        order_id: { type: "string" },
        status: { type: "string", description: "Filter by status: active, cancelled, expired, past_due, unpaid, trial, paused" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_get_order",
    description: "Get a specific Lemon Squeezy order by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        order_id: { type: "string" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "ls_list_customers",
    description: "List customers for a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        email: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
] as const;

export const lemonsqueezyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lemonsqueezy-tool.ts
  ls_list_stores:          (args) => lsListStores(args),
  ls_list_products:        (args) => lsListProducts(args),
  ls_list_orders:          (args) => lsListOrders(args),
  ls_list_subscriptions:   (args) => lsListSubscriptions(args),
  ls_get_order:            (args) => lsGetOrder(args),
  ls_list_customers:       (args) => lsListCustomers(args),
};
