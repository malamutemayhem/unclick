// wiring/poweriter.ts
// Per-app MCP wiring for the poweriter connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const poweriterTools = [
  // ── poweriter-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "power_iteration",
    description: "Find the dominant eigenvalue and eigenvector of a square matrix via power iteration.",
    inputSchema: {
      type: "object" as const,
      properties: {
        matrix: { type: "array", items: { type: "array", items: { type: "number" } }, description: "Square NxN matrix" },
        max_iterations: { type: "number", description: "Max iterations (default 1000)" },
        tolerance: { type: "number", description: "Convergence tolerance (default 1e-10)" },
      }, required: ["matrix"],
    },
  },
] as const;
