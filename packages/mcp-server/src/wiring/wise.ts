// wiring/wise.ts
// Per-app MCP wiring for the wise connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wiseExchangeRates, wiseProfile, wiseAccounts, wiseCreateQuote } from "../wise-tool.js";

export const wiseTools = [
  // ── wise-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "wise_exchange_rates",
    description: "Get exchange rates from Wise.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        source: { type: "string" },
        target: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "wise_profile",
    description: "Get the authenticated Wise user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "wise_accounts",
    description: "Get Wise accounts for a profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        profile_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["profile_id"],
    },
  },
  {
    name: "wise_create_quote",
    description: "Create a Wise money transfer quote.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sourceCurrency: { type: "string" },
        targetCurrency: { type: "string" },
        sourceAmount: { type: "number" },
        targetAmount: { type: "number" },
        profile_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["sourceCurrency", "targetCurrency"],
    },
  },
] as const;

export const wiseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wise-tool.ts
  wise_exchange_rates:     (args) => wiseExchangeRates(args),
  wise_profile:            (args) => wiseProfile(args),
  wise_accounts:           (args) => wiseAccounts(args),
  wise_create_quote:       (args) => wiseCreateQuote(args),
};
