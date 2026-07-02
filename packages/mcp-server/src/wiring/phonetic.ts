// wiring/phonetic.ts
// Per-app MCP wiring for the phonetic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { phoneticSpell } from "../phonetic-tool.js";

export const phoneticTools = [
  // ── phonetic-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "phonetic_spell",
    description: "Spell out text using NATO or IPA phonetic alphabet.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to spell out." },
        format: { type: "string" as const, description: "'nato' (default) or 'ipa'." },
      }, required: ["text"],
    },
  },
] as const;

export const phoneticHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // phonetic-tool.ts
  phonetic_spell:            (args) => phoneticSpell(args),
};
