// wiring/wordcount.ts
// Per-app MCP wiring for the wordcount connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wordCount } from "../wordcount-tool.js";

export const wordcountTools = [
  // ── wordcount-tool.ts ──────────────────────────────────────────────────────
  {
    name: "word_count",
    description: "Count words, characters, sentences, and estimate reading time.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyze." },
      }, required: ["text"],
    },
  },
] as const;

export const wordcountHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wordcount-tool.ts
  word_count:                (args) => wordCount(args),
};
