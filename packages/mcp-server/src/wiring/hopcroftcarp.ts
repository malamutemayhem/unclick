// wiring/hopcroftcarp.ts
// Per-app MCP wiring for the hopcroftcarp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const hopcroftcarpTools = [
  // ── hopcroftcarp-tool.ts ────────────────────────────────────────────────────
  {
    name: "hopcroft_karp",
    description: "Find maximum matching in a bipartite graph using the Hopcroft-Karp algorithm in O(E * sqrt(V)).",
    inputSchema: {
      type: "object" as const,
      properties: {
        left_size: { type: "number", description: "Number of vertices on the left side" },
        right_size: { type: "number", description: "Number of vertices on the right side" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [left_vertex, right_vertex] pairs" },
      }, required: ["left_size", "right_size", "edges"],
    },
  },
] as const;
