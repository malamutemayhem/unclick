// wiring/zscore.ts
// Per-app MCP wiring for the zscore connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { zscoreCalculate } from "../zscore-tool.js";

export const zscoreTools = [
  // ── zscore-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "zscore_calculate",
    description: "Calculate z-score, cumulative probability, and percentile for a value given mean and standard deviation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "The observed value." },
        mean: { type: "number" as const, description: "Population mean." },
        stddev: { type: "number" as const, description: "Population standard deviation (positive)." },
      }, required: ["value", "mean", "stddev"],
    },
  },
] as const;

export const zscoreHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // zscore-tool.ts
  zscore_calculate:          (args) => zscoreCalculate(args),
};
