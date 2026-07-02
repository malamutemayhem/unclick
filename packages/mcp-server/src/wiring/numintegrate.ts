// wiring/numintegrate.ts
// Per-app MCP wiring for the numintegrate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const numintegrateTools = [
  // ── numintegrate-tool.ts ────────────────────────────────────────────────────
  {
    name: "numerical_integrate",
    description: "Numerical integration of a math expression using Simpson's rule, trapezoid, or midpoint method.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        expression: { type: "string" as const, description: "Math expression in x (e.g. 'x^2 + 1')." },
        a: { type: "number" as const, description: "Lower bound of integration." },
        b: { type: "number" as const, description: "Upper bound of integration." },
        method: { type: "string" as const, description: "Method: simpson (default), trapezoid, or midpoint." },
        intervals: { type: "number" as const, description: "Number of intervals (default 1000, max 1000000)." },
      }, required: ["expression", "a", "b"],
    },
  },
] as const;
