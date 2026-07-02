// wiring/wordfreq.ts
// Per-app MCP wiring for the wordfreq connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wordfreqAnalyse } from "../wordfreq-tool.js";

export const wordfreqTools = [
  // ── wordfreq-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "wordfreq_analyse",
    description: "Analyse word frequencies in text, returning counts and top words.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyse." },
        top: { type: "number" as const, description: "Return only the top N words (default all)." },
        case_sensitive: { type: "boolean" as const, description: "Case-sensitive counting (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const wordfreqHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wordfreq-tool.ts
  wordfreq_analyse:          (args) => wordfreqAnalyse(args),
};
