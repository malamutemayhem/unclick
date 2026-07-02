// wiring/toposort.ts
// Per-app MCP wiring for the toposort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const toposortTools = [
  // ── toposort-tool.ts ────────────────────────────────────────────────────────
  {
    name: "topo_sort",
    description: "Topological sort of a directed graph with cycle detection.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        edges: { type: "array" as const, description: "Array of [from, to] directed edge pairs.", items: { type: "array" as const, items: { type: "string" as const } } },
      }, required: ["edges"],
    },
  },] as const;
