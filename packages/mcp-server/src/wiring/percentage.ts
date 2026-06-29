// wiring/percentage.ts
// Per-app MCP wiring for the percentage connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { percentageCalc } from "../percentage-tool.js";

export const percentageTools = [
  // ── percentage-tool.ts ─────────────────────────────────────────────────────
  {
    name: "percentage_calc",
    description: "Perform percentage calculations (of, change, increase, decrease, is_what_percent).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        operation: { type: "string" as const, description: "Operation: of, is_what_percent, change, increase, decrease (default of)." },
        a: { type: "number" as const, description: "First number." },
        b: { type: "number" as const, description: "Second number." },
      }, required: ["a", "b"],
    },
  },
] as const;

export const percentageHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // percentage-tool.ts
  percentage_calc:           (args) => percentageCalc(args),
};
