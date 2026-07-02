// wiring/pagerank.ts
// Per-app MCP wiring for the pagerank connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const pagerankTools = [
  // ── pagerank-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "page_rank",
    description: "Compute PageRank scores for nodes in a directed graph.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"] }, description: "Array of directed edges {from, to}" },
        damping: { type: "number", description: "Damping factor (default 0.85)" },
        iterations: { type: "number", description: "Max iterations (default 100)" },
        tolerance: { type: "number", description: "Convergence tolerance (default 1e-6)" },
      }, required: ["edges"],
    },
  },
] as const;
