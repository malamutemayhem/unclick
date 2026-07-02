// wiring/exchangerate2.ts
// Per-app MCP wiring for the exchangerate2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { erLatestRates } from "../exchangerate2-tool.js";

export const exchangerate2Tools = [
  // ── exchangerate2-tool.ts ──────────────────────────────────────────────────
  {
    name: "er_latest_rates",
    description: "Get latest exchange rates from ExchangeRate-API (open endpoint).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { base: { type: "string", description: "Base currency code (default: USD)" } },
    },
  },
] as const;

export const exchangerate2Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // exchangerate2-tool.ts
  er_latest_rates:         (args) => erLatestRates(args),
};
