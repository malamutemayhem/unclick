// wiring/cosinesim.ts
// Per-app MCP wiring for the cosinesim connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cosinesimCompare } from "../cosinesim-tool.js";

export const cosinesimTools = [
  // ── cosinesim-tool.ts ────────────────────────────────────────────────────────
  {
    name: "cosinesim_compare",
    description: "Calculate cosine similarity between two texts using word frequency vectors.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text_a: { type: "string" as const, description: "First text." },
        text_b: { type: "string" as const, description: "Second text." },
      }, required: ["text_a", "text_b"],
    },
  },
] as const;

export const cosinesimHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cosinesim-tool.ts
  cosinesim_compare:         (args) => cosinesimCompare(args),
};
