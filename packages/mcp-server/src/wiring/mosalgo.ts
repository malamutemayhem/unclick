// wiring/mosalgo.ts
// Per-app MCP wiring for the mosalgo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const mosalgoTools = [
  // ── mosalgo-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "mos_algorithm",
    description: "Offline range query processing using Mo's algorithm with sqrt decomposition (range sum and distinct count).",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Input array of numbers" },
        queries: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Range queries as [l, r] pairs (0-indexed, inclusive)" },
      }, required: ["array", "queries"],
    },
  },
] as const;
