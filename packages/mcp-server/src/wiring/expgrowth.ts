// wiring/expgrowth.ts
// Per-app MCP wiring for the expgrowth connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { exponentialGrowth } from "../expgrowth-tool.js";

export const expgrowthTools = [
  // ── expgrowth-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "exponential_growth",
    description: "Model exponential growth or decay: final = initial * e^(rate*time). Includes doubling time or half-life.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        initial: { type: "number" as const, description: "Initial value." },
        rate: { type: "number" as const, description: "Growth rate (positive=growth, negative=decay)." },
        time: { type: "number" as const, description: "Time elapsed." },
      }, required: ["initial", "rate", "time"],
    },
  },
] as const;

export const expgrowthHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // expgrowth-tool.ts
  exponential_growth:        (args) => exponentialGrowth(args),
};
