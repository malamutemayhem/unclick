// wiring/gausselim.ts
// Per-app MCP wiring for the gausselim connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const gausselimTools = [
  // ── gausselim-tool.ts ────────────────────────────────────────────────────────
  {
    name: "gaussian_elimination",
    description: "Solve a system of linear equations via Gaussian elimination with partial pivoting.",
    inputSchema: {
      type: "object" as const,
      properties: {
        matrix: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Augmented matrix rows [a1, a2, ..., an, b]" },
      }, required: ["matrix"],
    },
  },
] as const;
