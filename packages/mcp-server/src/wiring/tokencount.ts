// wiring/tokencount.ts
// Per-app MCP wiring for the tokencount connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tokencountEstimate } from "../tokencount-tool.js";

export const tokencountTools = [
  // ── tokencount-tool.ts ───────────────────────────────────────────────────────
  {
    name: "tokencount_estimate",
    description: "Estimate token counts for text across different LLM tokenizers (GPT-4, Claude, WordPiece).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to estimate tokens for." },
      }, required: ["text"],
    },
  },
] as const;

export const tokencountHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tokencount-tool.ts
  tokencount_estimate:       (args) => tokencountEstimate(args),
};
