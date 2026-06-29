// wiring/montecarlo.ts
// Per-app MCP wiring for the montecarlo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const montecarloTools = [
  // ── montecarlo-tool.ts ──────────────────────────────────────────────────────
  {
    name: "monte_carlo_estimate",
    description: "Monte Carlo estimation: estimate pi or compute a definite integral via random sampling.",
    inputSchema: {
      type: "object" as const,
      properties: {
        method: { type: "string", enum: ["pi", "integral"], description: "Estimation method (default pi)" },
        samples: { type: "integer", description: "Number of random samples (default 10000, max 10000000)" },
        expression: { type: "string", description: "JS expression in x for integral method" },
        a: { type: "number", description: "Lower bound for integral" },
        b: { type: "number", description: "Upper bound for integral" },
        seed: { type: "integer", description: "Random seed for reproducibility" },
      }, required: [],
    },
  },
] as const;
