// wiring/deepl.ts
// Per-app MCP wiring for the deepl connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { deeplTranslateText, deeplGetUsage, deeplListLanguages, deeplTranslateDocument } from "../deepl-tool.js";

export const deeplTools = [
  // ── deepl-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "deepl_translate_text",
    description: "Translate text into another language using DeepL's neural translation engine.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key from deepl.com. Free tier keys end with :fx." },
        text: { description: "Text or array of texts to translate (max 50 texts per call)", oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
        target_lang: { type: "string", description: "Target language code (e.g. EN-US, EN-GB, DE, FR, JA, ZH, ES)" },
        source_lang: { type: "string", description: "Source language code (auto-detected if omitted)" },
        formality: { type: "string", enum: ["default", "more", "less", "prefer_more", "prefer_less"], description: "Formality level (supported in some languages)" },
        preserve_formatting: { type: "boolean", description: "Preserve original formatting" },
        tag_handling: { type: "string", enum: ["xml", "html"], description: "Enable tag handling" },
      },
      required: ["auth_key", "text", "target_lang"],
    },
  },
  {
    name: "deepl_get_usage",
    description: "Get DeepL API usage and quota information for the current billing period.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
      },
      required: ["auth_key"],
    },
  },
  {
    name: "deepl_list_languages",
    description: "List all languages supported by DeepL for translation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
        type: { type: "string", enum: ["source", "target"], description: "Language direction (default: target)" },
      },
      required: ["auth_key"],
    },
  },
  {
    name: "deepl_translate_document",
    description: "Submit a document (PDF, Word, PowerPoint) for translation via DeepL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
        document_url: { type: "string", description: "Publicly accessible URL of the document to translate" },
        target_lang: { type: "string", description: "Target language code (e.g. DE, FR, JA)" },
        source_lang: { type: "string", description: "Source language code (auto-detected if omitted)" },
        filename: { type: "string", description: "Filename with extension (e.g. report.pdf)" },
        formality: { type: "string", enum: ["default", "more", "less"], description: "Formality level" },
      },
      required: ["auth_key", "document_url", "target_lang"],
    },
  },
] as const;

export const deeplHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // deepl-tool.ts
  deepl_translate_text:      (args) => deeplTranslateText(args),
  deepl_get_usage:           (args) => deeplGetUsage(args),
  deepl_list_languages:      (args) => deeplListLanguages(args),
  deepl_translate_document:  (args) => deeplTranslateDocument(args),
};
