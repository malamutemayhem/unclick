// wiring/mincostflow.ts
// Per-app MCP wiring for the mincostflow connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const mincostflowTools = [
  // ── mincostflow-tool.ts ──────────────────────────────────────────────────────
  {
    name: "min_cost_max_flow",
    description: "Compute minimum cost maximum flow using successive shortest paths (SPFA).",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [from, to, capacity, cost]" },
        source: { type: "number", description: "Source vertex" },
        sink: { type: "number", description: "Sink vertex" },
      }, required: ["vertex_count", "edges", "source", "sink"],
    },
  },
] as const;
