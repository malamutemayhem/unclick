// wiring/fenwick.ts
// Per-app MCP wiring for the fenwick connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const fenwickTools = [
  // ── fenwick-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "fenwick_tree",
    description: "Build a Fenwick tree (Binary Indexed Tree) from values and run point updates and range sum queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Initial array of numbers" },
        operations: {
          type: "array",
          description: "Operations: {type:'update',index,delta}, {type:'query',left,right}, {type:'point_query',index}",
          items: { type: "object" },
        },
      }, required: ["values"],
    },
  },
] as const;
