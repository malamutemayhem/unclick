// wiring/officialjoke.ts
// Per-app MCP wiring for the officialjoke connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { officialJokeRandom, officialJokeByType, officialJokeTen } from "../officialjoke-tool.js";

export const officialjokeTools = [
  // ── officialjoke-tool.ts ─────────────────────────────────────────────────────
  {
    name: "official_joke_random",
    description: "Get a random joke from Official Joke API (setup + punchline format).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "official_joke_by_type",
    description: "Get a random joke by type from Official Joke API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        type: { type: "string" as const, description: "Joke type: general, programming, or knock-knock." },
      },
    },
  },
  {
    name: "official_joke_ten",
    description: "Get 10 random jokes from Official Joke API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const officialjokeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // officialjoke-tool.ts
  official_joke_random:      (args) => officialJokeRandom(args),
  official_joke_by_type:     (args) => officialJokeByType(args),
  official_joke_ten:         (args) => officialJokeTen(args),};
