// wiring/tarjan.ts
// Per-app MCP wiring for the tarjan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const tarjanTools = [
  // ── tarjan-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "tarjan_scc",
    description: "Find all strongly connected components of a directed graph using Tarjan's algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"] }, description: "Array of directed edges" },
      }, required: ["edges"],
    },
  },
] as const;
