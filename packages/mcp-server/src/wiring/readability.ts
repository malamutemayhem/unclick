// wiring/readability.ts
// Per-app MCP wiring for the readability connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { readabilityScore } from "../readability-tool.js";

export const readabilityTools = [
  // ── readability-tool.ts ──────────────────────────────────────────────────────
  {
    name: "readability_score",
    description: "Calculate Flesch-Kincaid readability scores and reading level for text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to score." },
      }, required: ["text"],
    },
  },
] as const;

export const readabilityHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // readability-tool.ts
  readability_score:         (args) => readabilityScore(args),
};
