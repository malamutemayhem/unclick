// wiring/quadratic.ts
// Per-app MCP wiring for the quadratic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { quadraticSolve } from "../quadratic-tool.js";

export const quadraticTools = [
  // ── quadratic-tool.ts ──────────────────────────────────────────────────────
  {
    name: "quadratic_solve",
    description: "Solve a quadratic equation ax^2 + bx + c = 0. Returns roots, discriminant, and vertex.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "Coefficient a (must not be 0)." },
        b: { type: "number" as const, description: "Coefficient b." },
        c: { type: "number" as const, description: "Coefficient c." },
      }, required: ["a", "b", "c"],
    },
  },
] as const;

export const quadraticHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // quadratic-tool.ts
  quadratic_solve:           (args) => quadraticSolve(args),
};
