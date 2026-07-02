// wiring/square.ts
// Per-app MCP wiring for the square connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { squarePayments, squareCustomers, squareCatalogList, squareCatalogSearch } from "../square-tool.js";

export const squareTools = [
  // ── square-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "square_payments",
    description: "List or create Square payments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token:  { type: "string", description: "Square access token" },
        action:        { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        begin_time:    { type: "string", description: "RFC 3339 timestamp" },
        end_time:      { type: "string" },
        cursor:        { type: "string" },
        limit:         { type: "number" },
        source_id:     { type: "string", description: "Required for action='create'" },
        amount_money:  { type: "object", additionalProperties: true, description: "{amount: number, currency: string}" },
        idempotency_key: { type: "string" },
        customer_id:   { type: "string" },
        note:          { type: "string" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_customers",
    description: "List Square customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        cursor:       { type: "string" },
        limit:        { type: "number" },
        sort_field:   { type: "string" },
        sort_order:   { type: "string" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_catalog_list",
    description: "List Square catalog objects (items, categories, taxes, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        cursor:       { type: "string" },
        types:        { type: "string", description: "Comma-separated types (ITEM, CATEGORY, etc.)" },
        limit:        { type: "number" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_catalog_search",
    description: "Search Square catalog objects by text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        text_filter:  { type: "string", description: "Text to search for" },
        object_types: { type: "array", items: {}, description: "Types to search (default: ['ITEM'])" },
        limit:        { type: "number" },
        cursor:       { type: "string" },
      },
      required: ["access_token", "text_filter"],
    },
  },
] as const;

export const squareHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // square-tool.ts
  square_payments:           (args) => squarePayments(args),
  square_customers:          (args) => squareCustomers(args),
  square_catalog_list:       (args) => squareCatalogList(args),
  square_catalog_search:     (args) => squareCatalogSearch(args),
};
