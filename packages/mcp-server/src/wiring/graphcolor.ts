// wiring/graphcolor.ts
// Per-app MCP wiring for the graphcolor connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const graphcolorTools = [
  // ── graphcolor-tool.ts ──────────────────────────────────────────────────────
  {
    name: "graph_coloring",
    description: "Color vertices of an undirected graph using a greedy algorithm so no adjacent vertices share a color.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertices: { type: "number", description: "Number of vertices (0-indexed)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Undirected edges as [u, v] pairs" },
      }, required: ["vertices", "edges"],
    },
  },
] as const;
