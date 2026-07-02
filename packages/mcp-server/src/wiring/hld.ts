// wiring/hld.ts
// Per-app MCP wiring for the hld connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const hldTools = [
  // ── hld-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "heavy_light_decomposition",
    description: "Perform heavy-light decomposition of a tree for efficient path queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Edges as [u, v] pairs (0-indexed)" },
        root: { type: "number", description: "Root vertex (default 0)" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
