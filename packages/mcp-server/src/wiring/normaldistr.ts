// wiring/normaldistr.ts
// Per-app MCP wiring for the normaldistr connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { normalDistribution } from "../normaldistr-tool.js";

export const normaldistrTools = [
  // ── normaldistr-tool.ts ────────────────────────────────────────────────────────
  {
    name: "normal_distribution",
    description: "Calculate normal (Gaussian) distribution PDF, CDF, and percentile for a given value.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        x: { type: "number" as const, description: "The value to evaluate." },
        mean: { type: "number" as const, description: "Distribution mean (default 0)." },
        stddev: { type: "number" as const, description: "Standard deviation (default 1, must be positive)." },
      }, required: ["x"],
    },
  },
] as const;

export const normaldistrHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // normaldistr-tool.ts
  normal_distribution:       (args) => normalDistribution(args),
};
