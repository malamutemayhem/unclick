// wiring/numbers.ts
// Per-app MCP wiring for the numbers connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { numberFact, numberRandom } from "../numbers-tool.js";

export const numbersTools = [
  // ── numbers-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "number_fact",
    description: "Get an interesting fact about a number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        number: { type: "number" },
        type: { type: "string", enum: ["trivia", "math", "date", "year"], description: "trivia, math, date, year" },
      },
      required: ["number"],
    },
  },
  {
    name: "number_random",
    description: "Get a random number fact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string" },
        min: { type: "number" },
        max: { type: "number" },
      },
    },
  },
] as const;

export const numbersHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // numbers-tool.ts
  number_fact:             (args) => numberFact(args),
  number_random:           (args) => numberRandom(args),
};
