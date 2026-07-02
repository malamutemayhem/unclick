// wiring/matrixdecomp.ts
// Per-app MCP wiring for the matrixdecomp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const matrixdecompTools = [
  // ── matrixdecomp-tool.ts ────────────────────────────────────────────────────
  {
    name: "matrix_decomp",
    description: "Matrix decomposition and analysis: LU factorization, transpose, trace, or rank.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        matrix: { type: "array" as const, description: "2D array of numbers (the matrix).", items: { type: "array" as const, items: { type: "number" as const } } },
        operation: { type: "string" as const, description: "Operation: lu, transpose, trace, or rank (default lu)." },
      }, required: ["matrix"],
    },
  },] as const;
