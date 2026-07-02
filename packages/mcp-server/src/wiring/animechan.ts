// wiring/animechan.ts
// Per-app MCP wiring for the animechan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { animechanRandom, animechanSearch } from "../animechan-tool.js";

export const animechanTools = [
  // ── animechan-tool.ts ───────────────────────────────────────────────────────
  {
    name: "animechan_random",
    description: "Get a random anime quote.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "animechan_search",
    description: "Search for anime quotes from a specific anime.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        anime: { type: "string", description: "Anime title to search quotes from" },
      },
      required: ["anime"],
    },
  },

  // ── lotr-tool.ts (Lord of the Rings) ───────────────────────────────────────
  {
    name: "lotr_books",
    description: "List Lord of the Rings books.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "lotr_characters",
    description: "Search Lord of the Rings characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
  {
    name: "lotr_quotes",
    description: "Get Lord of the Rings movie quotes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of quotes (default 10)" },
      },
    },
  },
] as const;

export const animechanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // animechan-tool.ts
  animechan_random:        (args) => animechanRandom(args),
  animechan_search:        (args) => animechanSearch(args),
};
