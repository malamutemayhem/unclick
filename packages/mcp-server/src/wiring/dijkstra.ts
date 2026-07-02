// wiring/dijkstra.ts
// Per-app MCP wiring for the dijkstra connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const dijkstraTools = [
  // ── dijkstra-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "dijkstra_path",
    description: "Find the shortest path between two nodes in a weighted graph (Dijkstra's algorithm).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        source: { type: "string" as const, description: "Source node name." },
        target: { type: "string" as const, description: "Target node name." },
        edges: { type: "array" as const, description: "Array of [from, to, weight] triples.", items: { type: "array" as const } },
        directed: { type: "boolean" as const, description: "Treat graph as directed (default false)." },
      }, required: ["source", "target", "edges"],
    },
  },] as const;
