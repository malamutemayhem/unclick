// wiring/primefactor.ts
// Per-app MCP wiring for the primefactor connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { primeFactor } from "../primefactor-tool.js";

export const primefactorTools = [
  // ── primefactor-tool.ts ───────────────────────────────────────────────────────
  {
    name: "prime_factor",
    description: "Find the prime factorization of an integer.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "Integer to factorize (>= 2, max 1 trillion)." },
      }, required: ["n"],
    },
  },
] as const;

export const primefactorHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // primefactor-tool.ts
  prime_factor:              (args) => primeFactor(args),
};
