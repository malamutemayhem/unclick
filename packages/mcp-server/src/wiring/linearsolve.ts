// wiring/linearsolve.ts
// Per-app MCP wiring for the linearsolve connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const linearsolveTools = [
  // ── linearsolve-tool.ts ─────────────────────────────────────────────────────
  {
    name: "linear_solve",
    description: "Solve a system of linear equations Ax = b using Gaussian elimination with partial pivoting.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        matrix: { type: "array" as const, description: "Coefficient matrix A (square, 2D array).", items: { type: "array" as const, items: { type: "number" as const } } },
        vector: { type: "array" as const, description: "Right-hand side vector b.", items: { type: "number" as const } },
      }, required: ["matrix", "vector"],
    },
  },] as const;
