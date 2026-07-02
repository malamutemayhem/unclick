// wiring/midpoint.ts
// Per-app MCP wiring for the midpoint connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { midpointCalc } from "../midpoint-tool.js";

export const midpointTools = [
  // ── midpoint-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "midpoint_calc",
    description: "Calculate the midpoint, distance, slope, and angle between two 2D points.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        x1: { type: "number" as const, description: "X of first point." },
        y1: { type: "number" as const, description: "Y of first point." },
        x2: { type: "number" as const, description: "X of second point." },
        y2: { type: "number" as const, description: "Y of second point." },
      }, required: ["x1", "y1", "x2", "y2"],
    },
  },
] as const;

export const midpointHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // midpoint-tool.ts
  midpoint_calc:             (args) => midpointCalc(args),
};
