// wiring/polynomial.ts
// Per-app MCP wiring for the polynomial connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const polynomialTools = [
  // ── polynomial-tool.ts ──────────────────────────────────────────────────────
  {
    name: "polynomial_ops",
    description: "Perform polynomial operations: evaluate, derivative, integral, add, or multiply. Coefficients are highest degree first.",
    inputSchema: {
      type: "object" as const,
      properties: {
        operation: { type: "string", enum: ["evaluate", "derivative", "integral", "add", "multiply"], description: "Operation to perform" },
        coefficients: { type: "array", items: { type: "number" }, description: "Polynomial coefficients, highest degree first" },
        coefficients2: { type: "array", items: { type: "number" }, description: "Second polynomial for add/multiply" },
        x: { type: "number", description: "Point to evaluate at (for evaluate operation)" },
      }, required: ["operation", "coefficients"],
    },
  },
] as const;
