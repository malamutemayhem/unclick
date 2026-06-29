// wiring/mst.ts
// Per-app MCP wiring for the mst connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const mstTools = [
  // ── mst-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "mst_find",
    description: "Find the minimum spanning tree of a weighted graph using Kruskal's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" }, weight: { type: "number" } }, required: ["from", "to", "weight"] }, description: "Array of weighted edges" },
      }, required: ["edges"],
    },
  },
] as const;
