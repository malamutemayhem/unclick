// wiring/countdowncalc.ts
// Per-app MCP wiring for the countdowncalc connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { countdownCalc } from "../countdowncalc-tool.js";

export const countdowncalcTools = [
  // ── countdowncalc-tool.ts ──────────────────────────────────────────────────
  {
    name: "countdown_calc",
    description: "Calculate days, weeks until or since a given date.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        date: { type: "string" as const, description: "Target date (YYYY-MM-DD)." },
      }, required: ["date"],
    },
  },
] as const;

export const countdowncalcHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // countdowncalc-tool.ts
  countdown_calc:            (args) => countdownCalc(args),
};
