// wiring/correlation.ts
// Per-app MCP wiring for the correlation connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const correlationTools = [
  // ── correlation-tool.ts ─────────────────────────────────────────────────────
  {
    name: "correlation_calc",
    description: "Compute Pearson correlation coefficient, r-squared, covariance, and linear regression between two numeric arrays.",
    inputSchema: {
      type: "object" as const,
      properties: {
        x: { type: "array", items: { type: "number" }, description: "First data array" },
        y: { type: "array", items: { type: "number" }, description: "Second data array" },
      }, required: ["x", "y"],
    },
  },
] as const;
