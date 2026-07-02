// wiring/lis.ts
// Per-app MCP wiring for the lis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lisTools = [
  // ── lis-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "longest_increasing_subsequence",
    description: "Find the longest increasing subsequence in O(n log n) time using patience sorting.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Array of numbers" },
      }, required: ["values"],
    },
  },
] as const;
