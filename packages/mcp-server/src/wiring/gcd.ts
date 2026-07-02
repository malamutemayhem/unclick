// wiring/gcd.ts
// Per-app MCP wiring for the gcd connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gcdCalculate } from "../gcd-tool.js";

export const gcdTools = [
  // ── gcd-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "gcd_calculate",
    description: "Compute the greatest common divisor (GCD) and least common multiple (LCM) of integers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        numbers: { type: "array" as const, description: "Array of integers (at least 2)." },
      }, required: ["numbers"],
    },
  },
] as const;

export const gcdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gcd-tool.ts
  gcd_calculate:             (args) => gcdCalculate(args),
};
