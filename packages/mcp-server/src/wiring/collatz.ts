// wiring/collatz.ts
// Per-app MCP wiring for the collatz connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { collatzSequence } from "../collatz-tool.js";

export const collatzTools = [
  // ── collatz-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "collatz_sequence",
    description: "Compute the Collatz (3n+1) sequence for a positive integer.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        number: { type: "number" as const, description: "Positive integer to start the sequence." },
      }, required: ["number"],
    },
  },
] as const;

export const collatzHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // collatz-tool.ts
  collatz_sequence:          (args) => collatzSequence(args),
};
