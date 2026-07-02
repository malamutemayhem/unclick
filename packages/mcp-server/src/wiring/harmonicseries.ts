// wiring/harmonicseries.ts
// Per-app MCP wiring for the harmonicseries connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { harmonicSeries } from "../harmonicseries-tool.js";

export const harmonicseriesTools = [
  // ── harmonicseries-tool.ts ────────────────────────────────────────────────────
  {
    name: "harmonic_series",
    description: "Calculate partial sum of the harmonic series H(n) = 1 + 1/2 + 1/3 + ... + 1/n.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "Number of terms (1-100000)." },
      }, required: ["n"],
    },
  },
] as const;

export const harmonicseriesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // harmonicseries-tool.ts
  harmonic_series:           (args) => harmonicSeries(args),
};
