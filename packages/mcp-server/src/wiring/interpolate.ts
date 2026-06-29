// wiring/interpolate.ts
// Per-app MCP wiring for the interpolate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { interpolateCalc } from "../interpolate-tool.js";

export const interpolateTools = [
  // ── interpolate-tool.ts ───────────────────────────────────────────────────────
  {
    name: "interpolate_calc",
    description: "Linear interpolation (or extrapolation) between two points. Returns the y value for a given x.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        x1: { type: "number" as const, description: "X coordinate of first point." },
        y1: { type: "number" as const, description: "Y coordinate of first point." },
        x2: { type: "number" as const, description: "X coordinate of second point." },
        y2: { type: "number" as const, description: "Y coordinate of second point." },
        x: { type: "number" as const, description: "X value to interpolate at." },
      }, required: ["x1", "y1", "x2", "y2", "x"],
    },
  },
] as const;

export const interpolateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // interpolate-tool.ts
  interpolate_calc:          (args) => interpolateCalc(args),
};
