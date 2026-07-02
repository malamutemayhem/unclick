// wiring/linkcut.ts
// Per-app MCP wiring for the linkcut connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const linkcutTools = [
  // ── linkcut-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "link_cut_tree",
    description: "Dynamic forest connectivity with link, cut, connected, and path sum queries using link-cut trees.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices (1-indexed)" },
        operations: { type: "array", items: { type: "object" }, description: "Operations: link, cut, connected, set_value, path_sum with u, v, value fields" },
      }, required: ["vertex_count", "operations"],
    },
  },
] as const;
