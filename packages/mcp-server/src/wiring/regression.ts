// wiring/regression.ts
// Per-app MCP wiring for the regression connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { regressionFit } from "../regression-tool.js";

export const regressionTools = [
  // ── regression-tool.ts ──────────────────────────────────────────────────────
  {
    name: "regression_fit",
    description: "Fit a linear regression (y = mx + b) to x/y data points, returns slope, intercept, R-squared.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        x: { type: "array" as const, description: "Array of x values (numbers)." },
        y: { type: "array" as const, description: "Array of y values (numbers)." },
      }, required: ["x", "y"],
    },
  },
] as const;

export const regressionHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // regression-tool.ts
  regression_fit:            (args) => regressionFit(args),
};
