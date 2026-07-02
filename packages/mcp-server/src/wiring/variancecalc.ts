// wiring/variancecalc.ts
// Per-app MCP wiring for the variancecalc connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { varianceCalc } from "../variancecalc-tool.js";

export const variancecalcTools = [
  // ── variancecalc-tool.ts ──────────────────────────────────────────────────────
  {
    name: "variance_calc",
    description: "Calculate population/sample variance, standard deviation, median, range, and coefficient of variation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        values: { type: "array" as const, items: { type: "number" as const }, description: "Array of numeric values (at least 2)." },
      }, required: ["values"],
    },
  },
] as const;

export const variancecalcHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // variancecalc-tool.ts
  variance_calc:             (args) => varianceCalc(args),
};
