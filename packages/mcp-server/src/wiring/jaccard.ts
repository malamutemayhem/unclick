// wiring/jaccard.ts
// Per-app MCP wiring for the jaccard connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jaccardSimilarity } from "../jaccard-tool.js";

export const jaccardTools = [
  // ── jaccard-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "jaccard_similarity",
    description: "Calculate Jaccard similarity index between two texts (word or character level).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text_a: { type: "string" as const, description: "First text." },
        text_b: { type: "string" as const, description: "Second text." },
        mode: { type: "string" as const, description: "'word' (default) or 'character'." },
      }, required: ["text_a", "text_b"],
    },
  },
] as const;

export const jaccardHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jaccard-tool.ts
  jaccard_similarity:        (args) => jaccardSimilarity(args),
};
