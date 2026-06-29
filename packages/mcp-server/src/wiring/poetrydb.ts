// wiring/poetrydb.ts
// Per-app MCP wiring for the poetrydb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { poetrySearchByAuthor, poetrySearchByTitle, poetryRandom } from "../poetrydb-tool.js";

export const poetrydbTools = [
  // ── poetrydb-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "poetry_search_by_author",
    description: "Search poems by author name on PoetryDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        author: { type: "string" as const, description: "Author name (e.g. Shakespeare, Emily Dickinson)." },
      },
      required: ["author"],
    },
  },
  {
    name: "poetry_search_by_title",
    description: "Search poems by title on PoetryDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        title: { type: "string" as const, description: "Poem title or partial title." },
      },
      required: ["title"],
    },
  },
  {
    name: "poetry_random",
    description: "Get a random poem from PoetryDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const poetrydbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // poetrydb-tool.ts
  poetry_search_by_author:   (args) => poetrySearchByAuthor(args),
  poetry_search_by_title:    (args) => poetrySearchByTitle(args),
  poetry_random:             (args) => poetryRandom(args),};
