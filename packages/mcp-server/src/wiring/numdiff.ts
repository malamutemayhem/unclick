// wiring/numdiff.ts
// Per-app MCP wiring for the numdiff connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const numdiffTools = [
  // ── numdiff-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "numerical_diff",
    description: "Numerical differentiation of a math expression using five-point stencil (1st-4th order).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        expression: { type: "string" as const, description: "Math expression in x (e.g. 'x^2 + 3*x')." },
        x: { type: "number" as const, description: "Point to evaluate at." },
        h: { type: "number" as const, description: "Step size (default 1e-7)." },
        order: { type: "number" as const, description: "Derivative order: 1, 2, 3, or 4 (default 1)." },
      }, required: ["expression", "x"],
    },
  },] as const;
