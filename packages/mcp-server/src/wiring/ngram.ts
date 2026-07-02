// wiring/ngram.ts
// Per-app MCP wiring for the ngram connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ngramExtract } from "../ngram-tool.js";

export const ngramTools = [
  // ── ngram-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "ngram_extract",
    description: "Extract and count n-grams (word or character level) from text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyse." },
        n: { type: "number" as const, description: "N-gram size (default 2)." },
        mode: { type: "string" as const, description: "'word' (default) or 'character'." },
        top: { type: "number" as const, description: "Number of top entries to return (default 20)." },
      }, required: ["text"],
    },
  },
] as const;

export const ngramHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ngram-tool.ts
  ngram_extract:             (args) => ngramExtract(args),
};
