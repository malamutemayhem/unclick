// wiring/charcount.ts
// Per-app MCP wiring for the charcount connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { charFrequency } from "../charcount-tool.js";

export const charcountTools = [
  // ── charcount-tool.ts ──────────────────────────────────────────────────────
  {
    name: "char_frequency",
    description: "Analyze character frequency and breakdown of a text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyze." },
        case_sensitive: { type: "boolean" as const, description: "Distinguish upper/lower case (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const charcountHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // charcount-tool.ts
  char_frequency:            (args) => charFrequency(args),
};
