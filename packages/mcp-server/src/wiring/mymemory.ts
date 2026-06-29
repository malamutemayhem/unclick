// wiring/mymemory.ts
// Per-app MCP wiring for the mymemory connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mymemoryTranslate } from "../mymemory-tool.js";

export const mymemoryTools = [
  // ── mymemory-tool.ts ──────────────────────────────────────────────────────
  {
    name: "mymemory_translate",
    description: "Translate text between languages using MyMemory free translation API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to translate." },
        source: { type: "string" as const, description: "Source language code (default: en)." },
        target: { type: "string" as const, description: "Target language code (default: es)." },
      }, required: ["text"],
    },
  },
] as const;

export const mymemoryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mymemory-tool.ts
  mymemory_translate:        (args) => mymemoryTranslate(args),};
