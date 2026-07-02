// wiring/bipartite.ts
// Per-app MCP wiring for the bipartite connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bipartiteTools = [
  // ── bipartite-tool.ts ───────────────────────────────────────────────────────
  {
    name: "bipartite_check",
    description: "Check whether an undirected graph is bipartite (2-colorable). Returns the two vertex sets if bipartite, or an odd cycle if not.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertices: { type: "number", description: "Number of vertices (0-indexed)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Undirected edges as [u, v] pairs" },
      }, required: ["vertices", "edges"],
    },
  },
] as const;
