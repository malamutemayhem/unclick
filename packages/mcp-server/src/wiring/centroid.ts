// wiring/centroid.ts
// Per-app MCP wiring for the centroid connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const centroidTools = [
  // ── centroid-tool.ts ────────────────────────────────────────────────────────
  {
    name: "centroid_decomposition",
    description: "Compute the centroid decomposition of a tree, returning centroid parents and depths.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 50,000)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Tree edges as [u, v] pairs (must be N-1 edges)" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
