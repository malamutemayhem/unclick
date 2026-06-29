// wiring/condensation.ts
// Per-app MCP wiring for the condensation connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const condensationTools = [
  // ── condensation-tool.ts ─────────────────────────────────────────────────────
  {
    name: "graph_condensation",
    description: "Compute SCC condensation of a directed graph into a DAG using Kosaraju's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Directed edges as [u, v] pairs (0-indexed)" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
