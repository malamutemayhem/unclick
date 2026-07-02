// wiring/edmondskarp.ts
// Per-app MCP wiring for the edmondskarp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const edmondskarpTools = [
  // ── edmondskarp-tool.ts ─────────────────────────────────────────────────────
  {
    name: "edmonds_karp",
    description: "Compute maximum flow and minimum cut in a flow network using the Edmonds-Karp (BFS-based Ford-Fulkerson) algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertices: { type: "number", description: "Number of vertices" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [from, to, capacity] triples" },
        source: { type: "number", description: "Source vertex (default: 0)" },
        sink: { type: "number", description: "Sink vertex (default: vertices - 1)" },
      }, required: ["vertices", "edges"],
    },
  },
] as const;
