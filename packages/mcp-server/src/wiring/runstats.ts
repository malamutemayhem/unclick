// wiring/runstats.ts
// Per-app MCP wiring for the runstats connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const runstatsTools = [
  // ── runstats-tool.ts ────────────────────────────────────────────────────────
  {
    name: "running_stats",
    description: "Compute running (sliding window) mean, standard deviation, min, and max over a numeric array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        data: { type: "array", items: { type: "number" }, description: "Numeric data array" },
        window: { type: "integer", description: "Window size (default 5)" },
      }, required: ["data"],
    },
  },
] as const;
