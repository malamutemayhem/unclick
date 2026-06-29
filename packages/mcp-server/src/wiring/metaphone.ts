// wiring/metaphone.ts
// Per-app MCP wiring for the metaphone connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { metaphoneEncode } from "../metaphone-tool.js";

export const metaphoneTools = [
  // ── metaphone-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "metaphone_encode",
    description: "Encode words using the Metaphone phonetic algorithm, optionally comparing two words.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Word(s) to encode." },
        compare: { type: "string" as const, description: "Second word to compare phonetically." },
      }, required: ["text"],
    },
  },
] as const;

export const metaphoneHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // metaphone-tool.ts
  metaphone_encode:          (args) => metaphoneEncode(args),
};
