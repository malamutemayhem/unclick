// wiring/slopeintercept.ts
// Per-app MCP wiring for the slopeintercept connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { slopeIntercept } from "../slopeintercept-tool.js";

export const slopeinterceptTools = [
  // ── slopeintercept-tool.ts ────────────────────────────────────────────────────
  {
    name: "slope_intercept",
    description: "Find the line equation (slope-intercept and standard form) from two points.",
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

export const slopeinterceptHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // slopeintercept-tool.ts
  slope_intercept:           (args) => slopeIntercept(args),
};
