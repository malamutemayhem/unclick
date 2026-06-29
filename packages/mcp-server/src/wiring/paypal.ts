// wiring/paypal.ts
// Per-app MCP wiring for the paypal connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { paypalOrders, paypalInvoices } from "../paypal-tool.js";

export const paypalTools = [
  // ── paypal-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "paypal_orders",
    description: "Create or retrieve a PayPal order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:      { type: "string", description: "PayPal application Client ID" },
        client_secret:  { type: "string", description: "PayPal application Client Secret" },
        action:         { type: "string", enum: ["create", "get"], description: "create or get (default: get)" },
        order_id:       { type: "string", description: "Required for action='get'" },
        intent:         { type: "string", enum: ["CAPTURE", "AUTHORIZE"], description: "CAPTURE or AUTHORIZE (default: CAPTURE)" },
        purchase_units: { type: "array", items: {}, description: "Required for action='create'" },
        sandbox:        { type: "boolean", description: "Use PayPal sandbox (default: false)" },
      },
      required: ["client_id", "client_secret"],
    },
  },
  {
    name: "paypal_invoices",
    description: "List, create, or send PayPal invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:      { type: "string" },
        client_secret:  { type: "string" },
        action:         { type: "string", enum: ["list", "create", "send"], description: "list, create, or send (default: list)" },
        invoice_id:     { type: "string", description: "Required for action='send'" },
        invoice:        { type: "object", additionalProperties: true, description: "Invoice object for action='create'" },
        page:           { type: "number" },
        page_size:      { type: "number" },
        sandbox:        { type: "boolean" },
      },
      required: ["client_id", "client_secret"],
    },
  },
] as const;

export const paypalHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // paypal-tool.ts
  paypal_orders:             (args) => paypalOrders(args),
  paypal_invoices:           (args) => paypalInvoices(args),
};
