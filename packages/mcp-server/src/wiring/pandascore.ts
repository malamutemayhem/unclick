// wiring/pandascore.ts
// Per-app MCP wiring for the pandascore connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { esportsMatches, esportsTournaments, esportsTeams, esportsPlayers, esportsGetMatch } from "../pandascore-tool.js";

export const pandascoreTools = [
  // ── pandascore-tool.ts ───────────────────────────────────────────────────────
  {
    name: "esports_matches",
    description: "Get esports matches from PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "e.g. lol, csgo, dota2" },
        status: { type: "string", description: "running, upcoming, past" },
        page: { type: "number" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_tournaments",
    description: "Get esports tournaments from PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string" },
        status: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_teams",
    description: "Search esports teams on PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string" },
        search: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_players",
    description: "Search esports players on PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_get_match",
    description: "Get details for a specific esports match by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        match_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["match_id"],
    },
  },
] as const;

export const pandascoreHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pandascore-tool.ts
  esports_matches:      (args) => esportsMatches(args),
  esports_tournaments:  (args) => esportsTournaments(args),
  esports_teams:        (args) => esportsTeams(args),
  esports_players:      (args) => esportsPlayers(args),
  esports_get_match:    (args) => esportsGetMatch(args),
};
