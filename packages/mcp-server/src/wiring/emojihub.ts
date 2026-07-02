// wiring/emojihub.ts
// Per-app MCP wiring for the emojihub connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { emojihubRandom, emojihubByCategory } from "../emojihub-tool.js";

export const emojihubTools = [
  // ── emojihub-tool.ts ───────────────────────────────────────────────────────
  {
    name: "emojihub_random",
    description: "Get a random emoji with name, category, and HTML/Unicode codes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "emojihub_by_category",
    description: "Browse emojis by category (smileys, animals, food, etc.).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        category: { type: "string", description: "Category slug (e.g. smileys-and-people, animals-and-nature)" },
      },
      required: ["category"],
    },
  },
] as const;

export const emojihubHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // emojihub-tool.ts
  emojihub_random:         (args) => emojihubRandom(args),
  emojihub_by_category:    (args) => emojihubByCategory(args),
};
