// wiring/dictionary.ts
// Per-app MCP wiring for the dictionary connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dictionaryLookup, dictionaryLookupLanguage } from "../dictionary-tool.js";

export const dictionaryTools = [
  // ── dictionary-tool.ts ──────────────────────────────────────────────────────
  {
    name: "dictionary_lookup",
    description: "Look up a word's definition, phonetics, and examples.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        word: { type: "string" },
      },
      required: ["word"],
    },
  },
  {
    name: "dictionary_lookup_language",
    description: "Look up a word in a specific language (es, fr, de, it, ja, etc).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        word: { type: "string" },
        language: { type: "string", description: "Language code (e.g. es, fr, de, it, ja)" },
      },
      required: ["word", "language"],
    },
  },
] as const;

export const dictionaryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dictionary-tool.ts
  dictionary_lookup:          (args) => dictionaryLookup(args),
  dictionary_lookup_language: (args) => dictionaryLookupLanguage(args),
};
