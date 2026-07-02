// wiring/bfs.ts
// Per-app MCP wiring for the bfs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bfsTools = [
  // ── bfs-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "bfs_search",
    description: "Breadth-first search on a graph. Finds shortest unweighted path, visit order, and reachable node count.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"] }, description: "Array of edges" },
        start: { type: "string", description: "Start node" },
        target: { type: "string", description: "Optional target node to find path to" },
        directed: { type: "boolean", description: "Whether the graph is directed (default true)" },
      }, required: ["edges", "start"],
    },
  },
] as const;
