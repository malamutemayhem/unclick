// wiring/primecheck.ts
// Per-app MCP wiring for the primecheck connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { primeCheck } from "../primecheck-tool.js";

export const primecheckTools = [
  // ── primecheck-tool.ts ─────────────────────────────────────────────────────
  {
    name: "prime_check",
    description: "Check if a number is prime, get its factorization, and find adjacent primes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        number: { type: "number" as const, description: "Non-negative integer to check (max 1 trillion)." },
      }, required: ["number"],
    },
  },
] as const;

export const primecheckHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // primecheck-tool.ts
  prime_check:               (args) => primeCheck(args),
};
