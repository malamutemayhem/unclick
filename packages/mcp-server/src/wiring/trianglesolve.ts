// wiring/trianglesolve.ts
// Per-app MCP wiring for the trianglesolve connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { triangleSolve } from "../trianglesolve-tool.js";

export const trianglesolveTools = [
  // ── trianglesolve-tool.ts ─────────────────────────────────────────────────────
  {
    name: "triangle_solve",
    description: "Solve a triangle given three side lengths. Returns angles, area, perimeter, inradius, circumradius, and type.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "Side a length." },
        b: { type: "number" as const, description: "Side b length." },
        c: { type: "number" as const, description: "Side c length." },
      }, required: ["a", "b", "c"],
    },
  },
] as const;

export const trianglesolveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // trianglesolve-tool.ts
  triangle_solve:            (args) => triangleSolve(args),
};
