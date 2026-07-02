// wiring/setops.ts
// Per-app MCP wiring for the setops connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { setopsCalculate } from "../setops-tool.js";

export const setopsTools = [
  // ── setops-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "setops_calculate",
    description: "Perform set operations: union, intersection, difference, symmetric difference, subset/superset.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        set_a: { type: "array" as const, description: "First set (array of values)." },
        set_b: { type: "array" as const, description: "Second set (array of values)." },
      }, required: ["set_a", "set_b"],
    },
  },
] as const;

export const setopsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // setops-tool.ts
  setops_calculate:          (args) => setopsCalculate(args),
};
