// wiring/binomprob.ts
// Per-app MCP wiring for the binomprob connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { binomialProbability } from "../binomprob-tool.js";

export const binomprobTools = [
  // ── binomprob-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "binomial_probability",
    description: "Calculate binomial distribution probability P(X=k) and cumulative probabilities for n trials with probability p.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        n: { type: "number" as const, description: "Number of trials (0-1000)." },
        k: { type: "number" as const, description: "Number of successes (0 to n)." },
        p: { type: "number" as const, description: "Probability of success per trial (0 to 1)." },
      }, required: ["n", "k", "p"],
    },
  },
] as const;

export const binomprobHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // binomprob-tool.ts
  binomial_probability:      (args) => binomialProbability(args),
};
