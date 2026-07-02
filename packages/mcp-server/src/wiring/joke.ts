// wiring/joke.ts
// Per-app MCP wiring for the joke connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jokeRandom, jokeCategories } from "../joke-tool.js";

export const jokeTools = [
  // ── joke-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "joke_random",
    description: "Get a random joke from JokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Programming, Misc, Dark, Pun, Spooky, Christmas" },
        type: { type: "string", enum: ["single", "twopart"], description: "single or twopart" },
        amount: { type: "number", description: "Number of jokes (1-10)" },
      },
    },
  },
  {
    name: "joke_categories",
    description: "List available joke categories from JokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const jokeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // joke-tool.ts
  joke_random:             (args) => jokeRandom(args),
  joke_categories:         (args) => jokeCategories(args),
};
