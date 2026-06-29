// wiring/exchangerate.ts
// Per-app MCP wiring for the exchangerate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { exchangerateLatest, exchangerateConvert, exchangerateHistorical, exchangerateCodes } from "../exchangerate-tool.js";

export const exchangerateTools = [
  // ── exchangerate-tool.ts ─────────────────────────────────────────────────────
  {
    name: "exchangerate_latest",
    description: "Get latest currency exchange rates for a base currency. Works without API key using the free tier.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        api_key: { type: "string", description: "ExchangeRate-API key (or set EXCHANGERATE_API_KEY). Optional for latest rates." },
      },
    },
  },
  {
    name: "exchangerate_convert",
    description: "Convert an amount from one currency to another.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string", description: "Source currency code (e.g. USD)" },
        to: { type: "string", description: "Target currency code (e.g. EUR)" },
        amount: { type: "number", description: "Amount to convert (default 1)" },
        api_key: { type: "string", description: "Optional for conversion (uses latest rates if omitted)" },
      },
      required: ["from", "to"],
    },
  },
  {
    name: "exchangerate_historical",
    description: "Get historical exchange rates for a specific date. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        year: { type: "string", description: "4-digit year" },
        month: { type: "string", description: "Month number (1-12)" },
        day: { type: "string", description: "Day number (1-31)" },
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
      required: ["year", "month", "day"],
    },
  },
  {
    name: "exchangerate_codes",
    description: "List all supported currency codes and their names. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
    },
  },
] as const;

export const exchangerateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // exchangerate-tool.ts
  exchangerate_latest:     (args) => exchangerateLatest(args),
  exchangerate_convert:    (args) => exchangerateConvert(args),
  exchangerate_historical: (args) => exchangerateHistorical(args),
  exchangerate_codes:      (args) => exchangerateCodes(args),
};
