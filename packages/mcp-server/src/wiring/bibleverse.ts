// wiring/bibleverse.ts
// Per-app MCP wiring for the bibleverse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { quranVerse, quranSurah } from "../bibleverse-tool.js";

export const bibleverseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bibleverse-tool.ts
  quran_verse:             (args) => quranVerse(args),
  quran_surah:             (args) => quranSurah(args),
};
