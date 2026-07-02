// wiring/dadjoke.ts
// Per-app MCP wiring for the dadjoke connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dadJokeRandom, dadJokeSearch, dadJokeById } from "../dadjoke-tool.js";

export const dadjokeTools = [
  // ── dadjoke-tool.ts ────────────────────────────────────────────────────────
  {
    name: "dadjoke_random",
    description: "Get a random dad joke from icanhazdadjoke.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dadjoke_search",
    description: "Search for dad jokes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string", description: "Search keyword" },
        page: { type: "number", description: "Page number (default 1)" },
        limit: { type: "number", description: "Results per page (max 30, default 20)" },
      },
      required: ["term"],
    },
  },
  {
    name: "dadjoke_by_id",
    description: "Get a specific dad joke by its ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Joke ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const dadjokeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dadjoke-tool.ts
  dadjoke_random:          (args) => dadJokeRandom(args),
  dadjoke_search:          (args) => dadJokeSearch(args),
  dadjoke_by_id:           (args) => dadJokeById(args),
};
