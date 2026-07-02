// wiring/minvertexcover.ts
// Per-app MCP wiring for the minvertexcover connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const minvertexcoverTools = [
  // ── minvertexcover-tool.ts ──────────────────────────────────────────────────
  {
    name: "min_vertex_cover",
    description: "Find the minimum vertex cover of a graph using exact bitmask enumeration (up to 20 vertices).",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 20)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v] pairs" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
