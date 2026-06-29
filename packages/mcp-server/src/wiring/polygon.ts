// wiring/polygon.ts
// Per-app MCP wiring for the polygon connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { polygonCalculate } from "../polygon-tool.js";

export const polygonTools = [
  // ── polygon-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "polygon_calculate",
    description: "Calculate properties of a regular polygon: area, perimeter, angles, apothem, circumradius, diagonals.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        sides: { type: "number" as const, description: "Number of sides (>= 3)." },
        side_length: { type: "number" as const, description: "Length of each side." },
      }, required: ["sides", "side_length"],
    },
  },
] as const;

export const polygonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // polygon-tool.ts
  polygon_calculate:         (args) => polygonCalculate(args),
};
