// wiring/quickbooks.ts
// Per-app MCP wiring for the quickbooks connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { quickbooksCustomers, quickbooksInvoices, quickbooksItems, quickbooksPayments } from "../quickbooks-tool.js";

export const quickbooksTools = [
  // ── quickbooks-tool.ts ────────────────────────────────────────────────────────
  {
    name: "quickbooks_customers",
    description: "Query QuickBooks Online customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "QuickBooks OAuth2 access token" },
        realm_id:     { type: "string", description: "QuickBooks company realm ID" },
        where:        { type: "string", description: "SQL-style WHERE clause (e.g. Active = true)" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_invoices",
    description: "List, get, or create QuickBooks Online invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        action:       { type: "string", enum: ["list", "get", "create"], description: "list, get, or create (default: list)" },
        invoice_id:   { type: "string", description: "Required for action='get'" },
        invoice:      { type: "object", additionalProperties: true, description: "Invoice object for action='create'" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_items",
    description: "Query QuickBooks Online items (products and services).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_payments",
    description: "Query QuickBooks Online payments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
] as const;

export const quickbooksHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // quickbooks-tool.ts
  quickbooks_customers:      (args) => quickbooksCustomers(args),
  quickbooks_invoices:       (args) => quickbooksInvoices(args),
  quickbooks_items:          (args) => quickbooksItems(args),
  quickbooks_payments:       (args) => quickbooksPayments(args),
};
