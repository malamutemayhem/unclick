// wiring/hungarian.ts
// Per-app MCP wiring for the hungarian connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const hungarianTools = [
  // ── hungarian-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "hungarian_assign",
    description: "Solve the assignment problem (optimally assign N workers to N tasks) using the Hungarian algorithm.",
    inputSchema: {
      type: "object" as const,
      properties: {
        cost_matrix: { type: "array", items: { type: "array", items: { type: "number" } }, description: "NxN cost matrix" },
        maximize: { type: "boolean", description: "Maximize instead of minimize (default false)" },
      }, required: ["cost_matrix"],
    },
  },
] as const;
