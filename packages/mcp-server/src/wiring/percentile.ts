// wiring/percentile.ts
// Per-app MCP wiring for the percentile connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const percentileTools = [
  // ── percentile-tool.ts ──────────────────────────────────────────────────────
  {
    name: "percentile_calc",
    description: "Compute percentiles of a dataset (default p5-p99) and optionally find the percentile rank of a given value.",
    inputSchema: {
      type: "object" as const,
      properties: {
        data: { type: "array", items: { type: "number" }, description: "Numeric data array" },
        percentiles: { type: "array", items: { type: "number" }, description: "Percentiles to compute (default [5,10,25,50,75,90,95,99])" },
        value: { type: "number", description: "Optional value to find its percentile rank" },
      }, required: ["data"],
    },
  },
] as const;
