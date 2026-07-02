// wiring/braille.ts
// Per-app MCP wiring for the braille connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { brailleConvert } from "../braille-tool.js";

export const brailleTools = [
  // ── braille-tool.ts ────────────────────────────────────────────────────────
  {
    name: "braille_convert",
    description: "Convert text to Braille Unicode dots or decode Braille back to text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text or Braille characters to convert." },
      }, required: ["text"],
    },
  },
] as const;

export const brailleHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // braille-tool.ts
  braille_convert:           (args) => brailleConvert(args),
};
