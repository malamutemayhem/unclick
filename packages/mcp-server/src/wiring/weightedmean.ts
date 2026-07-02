// wiring/weightedmean.ts
// Per-app MCP wiring for the weightedmean connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { weightedMean } from "../weightedmean-tool.js";

export const weightedmeanTools = [
  // ── weightedmean-tool.ts ──────────────────────────────────────────────────────
  {
    name: "weighted_mean",
    description: "Compute weighted, arithmetic, geometric, and harmonic means of a set of values.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        values: { type: "array" as const, items: { type: "number" as const }, description: "Array of numeric values." },
        weights: { type: "array" as const, items: { type: "number" as const }, description: "Optional weights (same length as values)." },
      }, required: ["values"],
    },
  },
] as const;

export const weightedmeanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // weightedmean-tool.ts
  weighted_mean:             (args) => weightedMean(args),
};
