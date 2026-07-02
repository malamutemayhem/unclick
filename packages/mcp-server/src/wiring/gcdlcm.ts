// wiring/gcdlcm.ts
// Per-app MCP wiring for the gcdlcm connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gcdLcmCalc } from "../gcdlcm-tool.js";

export const gcdlcmTools = [
  // ── gcdlcm-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "gcd_lcm_calc",
    description: "Calculate GCD and LCM of two or more integers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        numbers: { type: "string" as const, description: "Comma-separated integers (or use a and b)." },
        a: { type: "number" as const, description: "First integer." },
        b: { type: "number" as const, description: "Second integer." },
      },
    },
  },
] as const;

export const gcdlcmHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gcdlcm-tool.ts
  gcd_lcm_calc:              (args) => gcdLcmCalc(args),
};
