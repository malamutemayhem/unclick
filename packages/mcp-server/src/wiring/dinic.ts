// wiring/dinic.ts
// Per-app MCP wiring for the dinic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const dinicTools = [
  // ── dinic-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "dinic_max_flow",
    description: "Compute maximum flow in a network using Dinic's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 10,000)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v, capacity] triples" },
        source: { type: "number", description: "Source vertex" },
        sink: { type: "number", description: "Sink vertex" },
      }, required: ["vertex_count", "edges", "source", "sink"],
    },
  },
] as const;
