// wiring/gabow.ts
// Per-app MCP wiring for the gabow connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const gabowTools = [
  // ── gabow-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "gabow_scc",
    description: "Find strongly connected components of a directed graph using Gabow's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 50,000)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Directed edges as [u, v] pairs" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
