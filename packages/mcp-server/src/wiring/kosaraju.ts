// wiring/kosaraju.ts
// Per-app MCP wiring for the kosaraju connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const kosarajuTools = [
  // ── kosaraju-tool.ts ────────────────────────────────────────────────────────
  {
    name: "kosaraju_scc",
    description: "Find all strongly connected components in a directed graph using Kosaraju's two-pass algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        vertices: { type: "number", description: "Number of vertices (0-indexed)" },
        edges: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Directed edges as [from, to] pairs" },
      }, required: ["vertices", "edges"],
    },
  },
] as const;
