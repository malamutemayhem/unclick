// wiring/piglatin.ts
// Per-app MCP wiring for the piglatin connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pigLatinConvert } from "../piglatin-tool.js";

export const piglatinTools = [
  // ── piglatin-tool.ts ───────────────────────────────────────────────────────
  {
    name: "pig_latin_convert",
    description: "Convert text to Pig Latin or decode Pig Latin back to English.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to convert." },
        decode: { type: "boolean" as const, description: "Decode Pig Latin to English (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const piglatinHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // piglatin-tool.ts
  pig_latin_convert:         (args) => pigLatinConvert(args),
};
