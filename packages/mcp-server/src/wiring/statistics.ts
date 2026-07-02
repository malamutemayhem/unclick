// wiring/statistics.ts
// Per-app MCP wiring for the statistics connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { statisticsCalc } from "../statistics-tool.js";

export const statisticsTools = [
  // ── statistics-tool.ts ─────────────────────────────────────────────────────
  {
    name: "statistics_calc",
    description: "Calculate mean, median, mode, standard deviation, and more for a set of numbers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        numbers: { type: "string" as const, description: "Comma-separated numbers or array." },
      }, required: ["numbers"],
    },
  },
] as const;

export const statisticsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // statistics-tool.ts
  statistics_calc:           (args) => statisticsCalc(args),
};
