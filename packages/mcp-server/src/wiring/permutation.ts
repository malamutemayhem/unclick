// wiring/permutation.ts
// Per-app MCP wiring for the permutation connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { permutationCalc } from "../permutation-tool.js";

export const permutationTools = [
  // ── permutation-tool.ts ─────────────────────────────────────────────────────
  {
    name: "permutation_calc",
    description: "Calculate the number of permutations P(n,r) - ordered arrangements.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "Total number of items." },
        r: { type: "number" as const, description: "Number of items to arrange (defaults to n)." },
      }, required: ["n"],
    },
  },
] as const;

export const permutationHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // permutation-tool.ts
  permutation_calc:          (args) => permutationCalc(args),
};
