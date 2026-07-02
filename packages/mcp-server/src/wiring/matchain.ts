// wiring/matchain.ts
// Per-app MCP wiring for the matchain connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const matchainTools = [
  // ── matchain-tool.ts ────────────────────────────────────────────────────────
  {
    name: "matrix_chain_order",
    description: "Find the optimal parenthesization for matrix chain multiplication to minimize scalar multiplications.",
    inputSchema: {
      type: "object" as const,
      properties: {
        dimensions: {
          type: "array", items: { type: "number" },
          description: "Array of matrix dimensions. For N matrices, provide N+1 values: [r1, c1/r2, c2/r3, ..., cN]",
        },
      }, required: ["dimensions"],
    },
  },
] as const;
