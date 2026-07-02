// wiring/chromatic.ts
// Per-app MCP wiring for the chromatic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const chromaticTools = [
  // ── chromatic-tool.ts ────────────────────────────────────────────────────────
  {
    name: "chromatic_number",
    description: "Compute the exact chromatic number of a graph using inclusion-exclusion (up to 20 vertices).",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (max 20)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v] pairs (0-indexed)" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
