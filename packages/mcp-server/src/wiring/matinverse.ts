// wiring/matinverse.ts
// Per-app MCP wiring for the matinverse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const matinverseTools = [
  // ── matinverse-tool.ts ──────────────────────────────────────────────────────
  {
    name: "matrix_inverse",
    description: "Compute the inverse and determinant of a square matrix using Gauss-Jordan elimination.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        matrix: { type: "array" as const, description: "Square 2D array of numbers.", items: { type: "array" as const, items: { type: "number" as const } } },
      }, required: ["matrix"],
    },
  },
] as const;
