// wiring/newton.ts
// Per-app MCP wiring for the newton connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { newtonMath } from "../newton-tool.js";

export const newtonTools = [
  // ── newton-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "newton_math",
    description: "Perform math operations (simplify, derive, integrate, factor, etc.) via Newton API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        operation: { type: "string" as const, description: "Math operation: simplify, factor, derive, integrate, zeroes, tangent, area, cos, sin, tan, arccos, arcsin, arctan, abs, log." },
        expression: { type: "string" as const, description: "Math expression (e.g. x^2+2x, 2^2+2(2))." },
      },
      required: ["expression"],
    },
  },
] as const;

export const newtonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // newton-tool.ts
  newton_math:               (args) => newtonMath(args),};
