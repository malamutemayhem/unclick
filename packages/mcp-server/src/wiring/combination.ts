// wiring/combination.ts
// Per-app MCP wiring for the combination connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { combinationCalc } from "../combination-tool.js";

export const combinationTools = [
  // ── combination-tool.ts ─────────────────────────────────────────────────────
  {
    name: "combination_calc",
    description: "Calculate the number of combinations C(n,r) - unordered selections.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "Total number of items." },
        r: { type: "number" as const, description: "Number of items to choose." },
      }, required: ["n", "r"],
    },
  },
] as const;

export const combinationHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // combination-tool.ts
  combination_calc:          (args) => combinationCalc(args),
};
