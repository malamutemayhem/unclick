// wiring/funtranslations.ts
// Per-app MCP wiring for the funtranslations connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { funTranslate } from "../funtranslations-tool.js";

export const funtranslationsTools = [
  // ── funtranslations-tool.ts ─────────────────────────────────────────────────
  {
    name: "fun_translate",
    description: "Translate text into fun dialects like Yoda, Pirate, Shakespeare, Minion, Dothraki, etc.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        text: { type: "string", description: "Text to translate" },
        dialect: { type: "string", description: "Dialect: yoda, pirate, shakespeare, minion, dothraki, valyrian, pig-latin, morse (default yoda)" },
      },
      required: ["text"],
    },
  },
] as const;

export const funtranslationsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // funtranslations-tool.ts
  fun_translate:           (args) => funTranslate(args),
};
