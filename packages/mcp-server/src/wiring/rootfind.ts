// wiring/rootfind.ts
// Per-app MCP wiring for the rootfind connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const rootfindTools = [
  // ── rootfind-tool.ts ────────────────────────────────────────────────────────
  {
    name: "root_find",
    description: "Find roots of a math expression using Newton's method or bisection.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        expression: { type: "string" as const, description: "Math expression in x (e.g. 'x^2 - 4')." },
        method: { type: "string" as const, description: "Method: newton (default) or bisection." },
        x0: { type: "number" as const, description: "Initial guess (Newton, default 1)." },
        a: { type: "number" as const, description: "Left bound (bisection)." },
        b: { type: "number" as const, description: "Right bound (bisection)." },
        tolerance: { type: "number" as const, description: "Convergence tolerance (default 1e-10)." },
        max_iterations: { type: "number" as const, description: "Max iterations (default 100)." },
      }, required: ["expression"],
    },
  },] as const;
