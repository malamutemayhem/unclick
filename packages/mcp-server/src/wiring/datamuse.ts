// wiring/datamuse.ts
// Per-app MCP wiring for the datamuse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { datamuseWords, datamuseSuggestions } from "../datamuse-tool.js";

export const datamuseTools = [
  // ── datamuse-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "datamuse_words",
    description: "Find words by meaning, sound, spelling, rhyme, or adjective/noun relationship.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        means_like: { type: "string", description: "Words with similar meaning" },
        sounds_like: { type: "string", description: "Words that sound similar" },
        spelled_like: { type: "string", description: "Wildcard pattern (? = one char, * = any)" },
        rhymes_with: { type: "string", description: "Words that rhyme" },
        adjectives_for: { type: "string", description: "Adjectives commonly used with this noun" },
        nouns_for: { type: "string", description: "Nouns commonly described by this adjective" },
        limit: { type: "number", description: "Max results (default 20)" },
      },
    },
  },
  {
    name: "datamuse_suggestions",
    description: "Get autocomplete suggestions for a word prefix.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        prefix: { type: "string", description: "Word prefix to autocomplete" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["prefix"],
    },
  },

  // ── balldontlie-tool.ts (NBA) ───────────────────────────────────────────────
  {
    name: "nba_players",
    description: "Search NBA players by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        search: { type: "string", description: "Player name to search for" },
        limit: { type: "number", description: "Results per page (default 25)" },
      },
    },
  },
  {
    name: "nba_teams",
    description: "List all NBA teams.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "nba_games",
    description: "Browse NBA game scores and results.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        season: { type: "number", description: "Season year (e.g. 2023)" },
        team_id: { type: "number", description: "Filter by team ID (use nba_teams for IDs)" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
] as const;

export const datamuseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // datamuse-tool.ts
  datamuse_words:            (args) => datamuseWords(args),
  datamuse_suggestions:      (args) => datamuseSuggestions(args),};
