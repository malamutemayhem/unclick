// wiring/topocount.ts
// Per-app MCP wiring for the topocount connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const topocountTools = [
  // ── topocount-tool.ts ─────────────────────────────────────────────────────
  {
    name: "topo_count",
    description: "Count the number of distinct topological orderings of a DAG.",
    inputSchema: {
      type: "object" as const,
      properties: {
        num_nodes: { type: "number", description: "Number of nodes (max 20)" },
        edges: { type: "array", items: { type: "array" }, description: "Directed edges as [from, to] pairs" },
      }, required: ["num_nodes", "edges"],
    },
  },
] as const;
