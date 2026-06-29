// wiring/dfs.ts
// Per-app MCP wiring for the dfs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const dfsTools = [
  // ── dfs-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "dfs_search",
    description: "Depth-first search on a graph. Finds a path, visit order, reachable count, and detects cycles.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"] }, description: "Array of edges" },
        start: { type: "string", description: "Start node" },
        target: { type: "string", description: "Optional target node" },
        directed: { type: "boolean", description: "Whether the graph is directed (default true)" },
      }, required: ["edges", "start"],
    },
  },
] as const;
