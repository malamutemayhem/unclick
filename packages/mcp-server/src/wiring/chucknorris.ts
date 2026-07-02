// wiring/chucknorris.ts
// Per-app MCP wiring for the chucknorris connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { chuckRandom, chuckSearch, chuckCategories } from "../chucknorris-tool.js";

export const chucknorrisTools = [
  // ── chucknorris-tool.ts ─────────────────────────────────────────────────────
  {
    name: "chuck_random",
    description: "Get a random Chuck Norris joke.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Joke category (use chuck_categories to list)" },
      },
    },
  },
  {
    name: "chuck_search",
    description: "Search Chuck Norris jokes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (min 3 chars)" },
      },
      required: ["query"],
    },
  },
  {
    name: "chuck_categories",
    description: "List available Chuck Norris joke categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const chucknorrisHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // chucknorris-tool.ts
  chuck_random:            (args) => chuckRandom(args),
  chuck_search:            (args) => chuckSearch(args),
  chuck_categories:        (args) => chuckCategories(args),
};
