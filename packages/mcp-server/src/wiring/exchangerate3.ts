// wiring/exchangerate3.ts
// Per-app MCP wiring for the exchangerate3 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { currencyApiRates, currencyApiList } from "../exchangerate3-tool.js";

export const exchangerate3Tools = [
  // ── exchangerate3-tool.ts ────────────────────────────────────────────────────
  {
    name: "currency_api_rates",
    description: "Get latest currency exchange rates from fawazahmed0 currency API (free, no key).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        base: { type: "string" as const, description: "Base currency code (default: usd)." },
      },
    },
  },
  {
    name: "currency_api_list",
    description: "List all supported currency codes from fawazahmed0 currency API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const exchangerate3Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // exchangerate3-tool.ts
  currency_api_rates:        (args) => currencyApiRates(args),
  currency_api_list:         (args) => currencyApiList(args),};
