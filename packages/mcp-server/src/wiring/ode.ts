// wiring/ode.ts
// Per-app MCP wiring for the ode connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const odeTools = [
  // ── ode-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "ode_solve",
    description: "Solve an ordinary differential equation numerically using Euler or RK4 method. Provide the ODE as a JS expression in terms of t and y.",
    inputSchema: {
      type: "object" as const,
      properties: {
        expression: { type: "string", description: "JS expression for dy/dt in terms of t and y, e.g. 't + y'" },
        t0: { type: "number", description: "Initial time (default 0)" },
        y0: { type: "number", description: "Initial value y(t0) (default 1)" },
        t_end: { type: "number", description: "End time (default 1)" },
        steps: { type: "integer", description: "Number of steps (default 100, max 10000)" },
        method: { type: "string", enum: ["euler", "rk4"], description: "Integration method (default rk4)" },
      }, required: ["expression"],
    },
  },
] as const;
