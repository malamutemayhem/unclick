// wiring/poisson.ts
// Per-app MCP wiring for the poisson connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { poissonProbability } from "../poisson-tool.js";

export const poissonTools = [
  // ── poisson-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "poisson_probability",
    description: "Calculate Poisson distribution PMF and CDF for k events with rate lambda.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        k: { type: "number" as const, description: "Number of events (non-negative integer)." },
        lambda: { type: "number" as const, description: "Expected rate (positive)." },
      }, required: ["k", "lambda"],
    },
  },
] as const;

export const poissonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // poisson-tool.ts
  poisson_probability:       (args) => poissonProbability(args),
};
