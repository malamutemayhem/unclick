// wiring/emojilookup.ts
// Per-app MCP wiring for the emojilookup connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { emojiLookup } from "../emojilookup-tool.js";

export const emojilookupTools = [
  // ── emojilookup-tool.ts ────────────────────────────────────────────────────
  {
    name: "emoji_lookup",
    description: "Search emojis by name or keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search term (e.g. heart, fire, smile)." },
      }, required: ["query"],
    },
  },
] as const;

export const emojilookupHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // emojilookup-tool.ts
  emoji_lookup:              (args) => emojiLookup(args),
};
