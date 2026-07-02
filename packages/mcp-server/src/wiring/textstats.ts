// wiring/textstats.ts
// Per-app MCP wiring for the textstats connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { textReadability } from "../textstats-tool.js";

export const textstatsTools = [
  // ── textstats-tool.ts ──────────────────────────────────────────────────────
  {
    name: "text_readability",
    description: "Analyze text readability with Flesch-Kincaid grade and reading ease scores.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyze for readability." },
      }, required: ["text"],
    },
  },
] as const;

export const textstatsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // textstats-tool.ts
  text_readability:          (args) => textReadability(args),
};
