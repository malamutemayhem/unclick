// wiring/intervalmerge.ts
// Per-app MCP wiring for the intervalmerge connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const intervalmergeTools = [
  // ── intervalmerge-tool.ts ───────────────────────────────────────────────────
  {
    name: "interval_merge",
    description: "Merge overlapping intervals and report gaps, coverage, and the consolidated set.",
    inputSchema: {
      type: "object" as const,
      properties: {
        intervals: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Intervals as [start, end] pairs" },
      }, required: ["intervals"],
    },
  },
] as const;
