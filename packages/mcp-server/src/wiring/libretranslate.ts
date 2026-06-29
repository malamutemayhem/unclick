// wiring/libretranslate.ts
// Per-app MCP wiring for the libretranslate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { libretranslateTranslate, libretranslateLanguages, libretranslateDetect } from "../libretranslate-tool.js";

export const libretranslateTools = [
  // ── libretranslate-tool.ts ───────────────────────────────────────────────────
  {
    name: "libretranslate_translate",
    description: "Translate text between languages using LibreTranslate (open source).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to translate." },
        source: { type: "string" as const, description: "Source language code (default: auto-detect)." },
        target: { type: "string" as const, description: "Target language code (default: en)." },
      }, required: ["text"],
    },
  },
  {
    name: "libretranslate_languages",
    description: "List supported languages in LibreTranslate.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "libretranslate_detect",
    description: "Detect the language of a text using LibreTranslate.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to detect language of." },
      }, required: ["text"],
    },
  },
] as const;

export const libretranslateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // libretranslate-tool.ts
  libretranslate_translate:  (args) => libretranslateTranslate(args),
  libretranslate_languages:  (args) => libretranslateLanguages(args),
  libretranslate_detect:     (args) => libretranslateDetect(args),
};
