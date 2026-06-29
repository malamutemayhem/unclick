// wiring/segtree.ts
// Per-app MCP wiring for the segtree connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const segtreeTools = [
  // ── segtree-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "segment_tree",
    description: "Build a segment tree for range queries (sum/min/max) with point updates on a mutable array.",
    inputSchema: {
      type: "object" as const,
      properties: {
        values: { type: "array", items: { type: "number" }, description: "Initial array of numbers" },
        operation: { type: "string", enum: ["sum", "min", "max"], description: "Aggregate operation (default sum)" },
        operations: {
          type: "array",
          description: "Operations: {type:'update',index,value} or {type:'query',left,right}",
          items: { type: "object" },
        },
      }, required: ["values"],
    },
  },
] as const;
