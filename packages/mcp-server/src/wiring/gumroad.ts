// wiring/gumroad.ts
// Per-app MCP wiring for the gumroad connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { gumroad_list_products, gumroad_get_product, gumroad_list_sales, gumroad_get_sale, gumroad_list_subscribers } from "../gumroad-tool.js";

export const gumroadTools = [
  // ── gumroad-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "gumroad_list_products",
    description: "List all products in a Gumroad account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "gumroad_get_product",
    description: "Get details for a single Gumroad product by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Product ID (permalink)" },
      },
      required: ["access_token", "product_id"],
    },
  },
  {
    name: "gumroad_list_sales",
    description: "List sales from a Gumroad account. Filter by product, email, or date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Filter by product ID" },
        email: { type: "string", description: "Filter by buyer email" },
        after: { type: "string", description: "Sales after this date (YYYY-MM-DD)" },
        before: { type: "string", description: "Sales before this date (YYYY-MM-DD)" },
        page: { type: "number", description: "Page number for pagination" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "gumroad_get_sale",
    description: "Get details for a single Gumroad sale by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        sale_id: { type: "string", description: "Sale ID" },
      },
      required: ["access_token", "sale_id"],
    },
  },
  {
    name: "gumroad_list_subscribers",
    description: "List subscribers for a Gumroad membership/subscription product.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Product ID of the subscription product" },
        email: { type: "string", description: "Filter by subscriber email" },
      },
      required: ["access_token", "product_id"],
    },
  },
] as const;

export const gumroadHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gumroad-tool.ts
  gumroad_list_products:    (args) => gumroad_list_products(args),
  gumroad_get_product:      (args) => gumroad_get_product(args),
  gumroad_list_sales:       (args) => gumroad_list_sales(args),
  gumroad_get_sale:         (args) => gumroad_get_sale(args),
  gumroad_list_subscribers: (args) => gumroad_list_subscribers(args),
};
