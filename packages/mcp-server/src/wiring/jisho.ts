// wiring/jisho.ts
// Per-app MCP wiring for the jisho connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jishoSearch } from "../jisho-tool.js";

export const jishoTools = [
  // ── jisho-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "jisho_search",
    description: "Search Jisho.org Japanese dictionary for words, kanji, or English translations.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        keyword: { type: "string" as const, description: "Search keyword (English, Japanese, romaji)." },
      },
      required: ["keyword"],
    },
  },
] as const;

export const jishoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jisho-tool.ts
  jisho_search:              (args) => jishoSearch(args),};
