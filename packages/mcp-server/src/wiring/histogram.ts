// wiring/histogram.ts
// Per-app MCP wiring for the histogram connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { histogramCreate } from "../histogram-tool.js";

export const histogramTools = [
  // ── histogram-tool.ts ───────────────────────────────────────────────────────
  {
    name: "histogram_create",
    description: "Create a histogram from numeric data with configurable bins and ASCII visualization.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        values: { type: "array" as const, description: "Array of numbers to histogram." },
        bins: { type: "number" as const, description: "Number of bins (default 10)." },
      }, required: ["values"],
    },
  },
] as const;

export const histogramHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // histogram-tool.ts
  histogram_create:          (args) => histogramCreate(args),
};
