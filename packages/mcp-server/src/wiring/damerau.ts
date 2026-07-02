// wiring/damerau.ts
// Per-app MCP wiring for the damerau connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { damerauDistance } from "../damerau-tool.js";

export const damerauTools = [
  // ── damerau-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "damerau_distance",
    description: "Calculate Damerau-Levenshtein distance (edits + transpositions) between two strings.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text_a: { type: "string" as const, description: "First string." },
        text_b: { type: "string" as const, description: "Second string." },
      }, required: ["text_a", "text_b"],
    },
  },
] as const;

export const damerauHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // damerau-tool.ts
  damerau_distance:          (args) => damerauDistance(args),
};
