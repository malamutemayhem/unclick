// wiring/languagetool.ts
// Per-app MCP wiring for the languagetool connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { languagetoolCheck, languagetoolLanguages } from "../languagetool-tool.js";

export const languagetoolTools = [
  // ── languagetool-tool.ts ──────────────────────────────────────────────────
  {
    name: "languagetool_check",
    description: "Check text for grammar, spelling, and style issues using LanguageTool.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to check." },
        language: { type: "string" as const, description: "Language code (default: auto). E.g. en-US, de-DE, fr." },
      }, required: ["text"],
    },
  },
  {
    name: "languagetool_languages",
    description: "List all languages supported by LanguageTool.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const languagetoolHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // languagetool-tool.ts
  languagetool_check:        (args) => languagetoolCheck(args),
  languagetool_languages:    (args) => languagetoolLanguages(args),};
