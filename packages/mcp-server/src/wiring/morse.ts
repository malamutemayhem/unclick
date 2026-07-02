// wiring/morse.ts
// Per-app MCP wiring for the morse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { morseConvert } from "../morse-tool.js";

export const morseTools = [
  // ── morse-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "morse_convert",
    description: "Encode text to Morse code or decode Morse code to text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text or Morse code to convert." },
      }, required: ["text"],
    },
  },
] as const;

export const morseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // morse-tool.ts
  morse_convert:             (args) => morseConvert(args),
};
