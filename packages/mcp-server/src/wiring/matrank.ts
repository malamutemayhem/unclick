// wiring/matrank.ts
// Per-app MCP wiring for the matrank connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const matrankTools = [
  // ── matrank-tool.ts ───────────────────────────────────────────────────────
  {
    name: "matrix_rank",
    description: "Compute the rank of a matrix using Gaussian elimination with partial pivoting.",
    inputSchema: {
      type: "object" as const,
      properties: {
        matrix: { type: "array", items: { type: "array" }, description: "2D number array (max 100x100)" },
      }, required: ["matrix"],
    },
  },
] as const;
