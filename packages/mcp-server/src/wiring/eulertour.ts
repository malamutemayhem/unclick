// wiring/eulertour.ts
// Per-app MCP wiring for the eulertour connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const eulertourTools = [
  // ── eulertour-tool.ts ────────────────────────────────────────────────────────
  {
    name: "euler_tour",
    description: "Compute Euler tour of a tree with tin/tout timestamps, depths, and subtree sizes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertex_count: { type: "number", description: "Number of vertices" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Tree edges as [u, v] pairs (0-indexed)" },
        root: { type: "number", description: "Root vertex (default 0)" },
      }, required: ["vertex_count", "edges"],
    },
  },
] as const;
