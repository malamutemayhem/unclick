// wiring/soundex.ts
// Per-app MCP wiring for the soundex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { soundexEncode } from "../soundex-tool.js";

export const soundexTools = [
  // ── soundex-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "soundex_encode",
    description: "Encode words using the Soundex phonetic algorithm, optionally comparing two names.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Word(s) to encode." },
        compare: { type: "string" as const, description: "Second name to compare with the first." },
      }, required: ["text"],
    },
  },
] as const;

export const soundexHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // soundex-tool.ts
  soundex_encode:            (args) => soundexEncode(args),
};
