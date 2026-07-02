// wiring/areacalc.ts
// Per-app MCP wiring for the areacalc connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { areaCalculate } from "../areacalc-tool.js";

export const areacalcTools = [
  // ── areacalc-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "area_calculate",
    description: "Calculate area (and perimeter where possible) of common shapes: circle, rectangle, triangle, trapezoid, ellipse, parallelogram, sector.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        shape: { type: "string" as const, description: "Shape: circle, rectangle, triangle, trapezoid, ellipse, parallelogram, or sector." },
        radius: { type: "number" as const, description: "Radius (circle, sector)." },
        width: { type: "number" as const, description: "Width (rectangle)." },
        height: { type: "number" as const, description: "Height (rectangle, triangle, trapezoid, parallelogram)." },
        base: { type: "number" as const, description: "Base (triangle, parallelogram)." },
        base1: { type: "number" as const, description: "First base (trapezoid)." },
        base2: { type: "number" as const, description: "Second base (trapezoid)." },
        semi_major: { type: "number" as const, description: "Semi-major axis (ellipse)." },
        semi_minor: { type: "number" as const, description: "Semi-minor axis (ellipse)." },
        angle_degrees: { type: "number" as const, description: "Angle in degrees (sector)." },
      }, required: ["shape"],
    },
  },
] as const;

export const areacalcHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // areacalc-tool.ts
  area_calculate:            (args) => areaCalculate(args),
};
