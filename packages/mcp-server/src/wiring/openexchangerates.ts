// wiring/openexchangerates.ts
// Per-app MCP wiring for the openexchangerates connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { forexLatest, forexHistorical, forexCurrencies, forexConvert } from "../openexchangerates-tool.js";

export const openexchangeratesTools = [
  // ── openexchangerates-tool.ts ────────────────────────────────────────────────
  {
    name: "forex_latest",
    description: "Get latest forex exchange rates from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string" },
        symbols: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "forex_historical",
    description: "Get historical forex rates from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        base: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["date"],
    },
  },
  {
    name: "forex_currencies",
    description: "List all currencies from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "forex_convert",
    description: "Convert a currency amount using Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        amount: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["from", "to", "amount"],
    },
  },
] as const;

export const openexchangeratesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openexchangerates-tool.ts
  forex_latest:            (args) => forexLatest(args),
  forex_historical:        (args) => forexHistorical(args),
  forex_currencies:        (args) => forexCurrencies(args),
  forex_convert:           (args) => forexConvert(args),
};
