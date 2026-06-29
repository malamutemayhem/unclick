// wiring/reversetext.ts
// Per-app MCP wiring for the reversetext connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { reverseText } from "../reversetext-tool.js";

export const reversetextTools = [
  // ── reversetext-tool.ts ────────────────────────────────────────────────────
  {
    name: "reverse_text",
    description: "Reverse text by characters, words, lines, or sentences.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to reverse." },
        mode: { type: "string" as const, description: "Mode: characters, words, lines, sentences (default characters)." },
      }, required: ["text"],
    },
  },
] as const;

export const reversetextHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // reversetext-tool.ts
  reverse_text:              (args) => reverseText(args),
};
