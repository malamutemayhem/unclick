// wiring/bellmanford.ts
// Per-app MCP wiring for the bellmanford connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const bellmanfordTools = [
  // ── bellmanford-tool.ts ────────────────────────────────────────────────────────
  {
    name: "bellman_ford",
    description: "Find shortest paths from a source node using Bellman-Ford (handles negative edge weights).",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" }, weight: { type: "number" } }, required: ["from", "to", "weight"] }, description: "Array of weighted directed edges" },
        start: { type: "string", description: "Start node" },
        target: { type: "string", description: "Optional target node for path reconstruction" },
      }, required: ["edges", "start"],
    },
  },
] as const;
