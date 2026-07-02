// wiring/maxindepset.ts
// Per-app MCP wiring for the maxindepset connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const maxindepsetTools = [
  // ── maxindepset-tool.ts ─────────────────────────────────────────────────────
  {
    name: "max_independent_set",
    description: "Find the maximum independent set of a graph using exact bitmask enumeration (up to 20 vertices).",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 20)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v] pairs" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
