// wiring/mediawiki.ts
// Per-app MCP wiring for the mediawiki connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wiktionaryLookup } from "../mediawiki-tool.js";

export const mediawikiTools = [
  // ── mediawiki-tool.ts ──────────────────────────────────────────────────────
  {
    name: "wiktionary_lookup",
    description: "Look up a word definition in Wiktionary (multi-language).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        word: { type: "string", description: "Word to look up" },
        language: { type: "string", description: "Language code (default en)" },
      },
      required: ["word"],
    },
  },

  // ── bibleverse-tool.ts (quran) ─────────────────────────────────────────────
  {
    name: "quran_verse",
    description: "Get a specific verse (ayah) from the Quran with English translation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        surah: { type: "number", description: "Surah number (1-114, default 1)" },
        ayah: { type: "number", description: "Ayah (verse) number within the surah" },
      },
    },
  },
  {
    name: "quran_surah",
    description: "Get a full surah (chapter) from the Quran.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        number: { type: "number", description: "Surah number (1-114, default 1)" },
      },
    },
  },
] as const;

export const mediawikiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mediawiki-tool.ts
  wiktionary_lookup:       (args) => wiktionaryLookup(args),
};
