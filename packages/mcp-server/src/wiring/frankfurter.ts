// wiring/frankfurter.ts
// Per-app MCP wiring for the frankfurter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { frankfurterLatest, frankfurterConvert, frankfurterHistorical, frankfurterCurrencies } from "../frankfurter-tool.js";

export const frankfurterTools = [
  // ── frankfurter-tool.ts ────────────────────────────────────────────────────
  {
    name: "frankfurter_latest",
    description: "Get latest exchange rates from ECB via Frankfurter.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string", description: "Base currency code (default EUR)" },
        to: { type: "string", description: "Target currency code (optional, returns all if omitted)" },
      },
    },
  },
  {
    name: "frankfurter_convert",
    description: "Convert a specific amount between two currencies using ECB rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number", description: "Amount to convert" },
        from: { type: "string", description: "Source currency code" },
        to: { type: "string", description: "Target currency code" },
      },
      required: ["amount", "from", "to"],
    },
  },
  {
    name: "frankfurter_historical",
    description: "Get historical exchange rates for a specific date from ECB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format" },
        from: { type: "string", description: "Base currency code (default EUR)" },
        to: { type: "string", description: "Target currency code (optional)" },
      },
      required: ["date"],
    },
  },
  {
    name: "frankfurter_currencies",
    description: "List all currencies supported by the Frankfurter ECB exchange-rate API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const frankfurterHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // frankfurter-tool.ts
  frankfurter_latest:      (args) => frankfurterLatest(args),
  frankfurter_convert:     (args) => frankfurterConvert(args),
  frankfurter_historical:  (args) => frankfurterHistorical(args),
  frankfurter_currencies:  (args) => frankfurterCurrencies(args),
};
