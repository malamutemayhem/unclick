// wiring/proportion.ts
// Per-app MCP wiring for the proportion connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { proportionSolve } from "../proportion-tool.js";

export const proportionTools = [
  // ── proportion-tool.ts ──────────────────────────────────────────────────────
  {
    name: "proportion_solve",
    description: "Solve a proportion a/b = c/d given any 3 values.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "Value a." },
        b: { type: "number" as const, description: "Value b." },
        c: { type: "number" as const, description: "Value c." },
        d: { type: "number" as const, description: "Value d." },
      },
    },
  },
] as const;

export const proportionHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // proportion-tool.ts
  proportion_solve:          (args) => proportionSolve(args),
};
