// wiring/levenshtein.ts
// Per-app MCP wiring for the levenshtein connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { stringDistance } from "../levenshtein-tool.js";

export const levenshteinTools = [
  // ── levenshtein-tool.ts ────────────────────────────────────────────────────
  {
    name: "string_distance",
    description: "Calculate Levenshtein edit distance and similarity between two strings.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "string" as const, description: "First string." },
        b: { type: "string" as const, description: "Second string." },
        case_sensitive: { type: "boolean" as const, description: "Case sensitive comparison (default true)." },
      }, required: ["a", "b"],
    },
  },
] as const;

export const levenshteinHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // levenshtein-tool.ts
  string_distance:           (args) => stringDistance(args),
};
