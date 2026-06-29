// wiring/kmeans.ts
// Per-app MCP wiring for the kmeans connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const kmeansTools = [
  // ── kmeans-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "kmeans_cluster",
    description: "Partition points into k clusters using the k-means algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        points: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Array of numeric vectors (all same dimension)" },
        k: { type: "number", description: "Number of clusters (default 3)" },
        max_iterations: { type: "number", description: "Max iterations (default 100)" },
      }, required: ["points"],
    },
  },
] as const;
