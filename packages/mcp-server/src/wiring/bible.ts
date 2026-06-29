// wiring/bible.ts
// Per-app MCP wiring for the bible connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { bibleVerse, bibleRandom } from "../bible-tool.js";

export const bibleTools = [
  // ── bible-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bible_verse",
    description: "Look up a Bible verse or passage by reference (e.g. 'John 3:16', 'Psalm 23').",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        reference: { type: "string", description: "Bible reference, e.g. 'John 3:16', 'Romans 8:28-30'" },
      },
      required: ["reference"],
    },
  },
  {
    name: "bible_random",
    description: "Get a random Bible verse.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const bibleHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bible-tool.ts
  bible_verse:             (args) => bibleVerse(args),
  bible_random:            (args) => bibleRandom(args),
};
