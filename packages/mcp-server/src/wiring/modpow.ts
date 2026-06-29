// wiring/modpow.ts
// Per-app MCP wiring for the modpow connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { modularArithmetic } from "../modpow-tool.js";

export const modpowTools = [
  // ── modpow-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "modular_arithmetic",
    description: "Modular arithmetic operations: modpow (a^b mod m), modinverse (a^-1 mod m), or mod (a mod m).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        operation: { type: "string" as const, description: "Operation: modpow, modinverse, or mod." },
        a: { type: "number" as const, description: "Base value." },
        b: { type: "number" as const, description: "Exponent (required for modpow)." },
        m: { type: "number" as const, description: "Modulus (positive integer)." },
      }, required: ["operation", "a", "m"],
    },
  },
] as const;

export const modpowHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // modpow-tool.ts
  modular_arithmetic:        (args) => modularArithmetic(args),
};
