// wiring/graph.ts
// Per-app MCP wiring for the graph connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const graphTools = [
  // ── graph-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "graph_analyze",
    description: "Analyze a graph: count nodes, edges, connected components, density, degrees, and detect self-loops.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" }, weight: { type: "number" } }, required: ["from", "to"] }, description: "Array of edges" },
        directed: { type: "boolean", description: "Whether the graph is directed (default true)" },
      }, required: ["edges"],
    },
  },
] as const;
