// wiring/stripe.ts
// Per-app MCP wiring for the stripe connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { stripeCustomers, stripeCharges, stripeSubscriptions, stripeInvoices, stripeProducts, stripePrices } from "../stripe-tool.js";

export const stripeTools = [
  // ── stripe-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "stripe_customers",
    description: "List or create Stripe customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string", description: "Stripe secret key (sk_live_* or sk_test_*)" },
        action:         { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        limit:          { type: "number" },
        starting_after: { type: "string", description: "Pagination cursor (customer ID)" },
        email:          { type: "string" },
        name:           { type: "string" },
        phone:          { type: "string" },
        description:    { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_charges",
    description: "List or create Stripe charges.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        action:         { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        amount:         { type: "number", description: "Amount in smallest currency unit (e.g. cents)" },
        currency:       { type: "string", description: "ISO currency code (e.g. usd)" },
        source:         { type: "string", description: "Payment source or token" },
        description:    { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_subscriptions",
    description: "List Stripe subscriptions.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        status:         { type: "string", description: "active, past_due, canceled, etc." },
        price:          { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_invoices",
    description: "List Stripe invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        status:         { type: "string", enum: ["draft", "open", "paid", "uncollectible", "void"], description: "draft, open, paid, uncollectible, void" },
        subscription:   { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_products",
    description: "List Stripe products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        active:         { type: "boolean" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_prices",
    description: "List Stripe prices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        product:        { type: "string" },
        active:         { type: "boolean" },
        type:           { type: "string", enum: ["one_time", "recurring"], description: "one_time or recurring" },
      },
      required: ["secret_key"],
    },
  },
] as const;

export const stripeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // stripe-tool.ts
  stripe_customers:          (args) => stripeCustomers(args),
  stripe_charges:            (args) => stripeCharges(args),
  stripe_subscriptions:      (args) => stripeSubscriptions(args),
  stripe_invoices:           (args) => stripeInvoices(args),
  stripe_products:           (args) => stripeProducts(args),
  stripe_prices:             (args) => stripePrices(args),
};
