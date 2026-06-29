// wiring/simplex.ts
// Per-app MCP wiring for the simplex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const simplexTools = [
  // ── simplex-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "simplex_solve",
    description: "Solve a linear programming problem (maximize objective subject to <= constraints) using the simplex method.",
    inputSchema: {
      type: "object" as const,
      properties: {
        objective: { type: "array", items: { type: "number" }, description: "Coefficients to maximize (e.g. [5, 4] for 5x + 4y)" },
        constraints: { type: "array", items: { type: "object", properties: { coeffs: { type: "array", items: { type: "number" } }, bound: { type: "number" } }, required: ["coeffs", "bound"] }, description: "Array of {coeffs, bound} for <= constraints" },
      }, required: ["objective", "constraints"],
    },
  },
] as const;
