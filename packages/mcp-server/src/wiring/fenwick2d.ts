// wiring/fenwick2d.ts
// Per-app MCP wiring for the fenwick2d connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const fenwick2dTools = [
  // ── fenwick2d-tool.ts ─────────────────────────────────────────────────────
  {
    name: "fenwick_2d",
    description: "2D Fenwick tree for point updates and rectangle sum queries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        rows: { type: "number", description: "Number of rows" },
        cols: { type: "number", description: "Number of columns" },
        operations: { type: "array", items: { type: "object" }, description: "Array of {type, row, col, row2?, col2?, value?} operations" },
      }, required: ["rows", "cols", "operations"],
    },
  },
] as const;
