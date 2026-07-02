// wiring/lca.ts
// Per-app MCP wiring for the lca connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const lcaTools = [
  // ── lca-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "lowest_common_ancestor",
    description: "Find lowest common ancestors and distances in a tree using binary lifting.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 50,000)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Tree edges as [u, v] pairs" },
        queries: { type: "array", items: { type: "array", items: { type: "number" } }, description: "LCA queries as [u, v] pairs" },
        root: { type: "number", description: "Root vertex (default 0)" },
      }, required: ["vertex_count", "edges", "queries"],
    },
  },
] as const;
