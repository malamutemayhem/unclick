// wiring/riot.ts
// Per-app MCP wiring for the riot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { riotSummoner, riotRanked, riotMatchHistory, riotGetMatch, riotValorantAccount } from "../riot-tool.js";

export const riotTools = [
  // ── riot-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "riot_summoner",
    description: "Get a League of Legends summoner by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        summonerName: { type: "string" },
        region: { type: "string", description: "e.g. euw1, na1, kr" },
        api_key: { type: "string" },
      },
      required: ["summonerName"],
    },
  },
  {
    name: "riot_ranked",
    description: "Get ranked stats for a League of Legends summoner.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        summonerId: { type: "string" },
        region: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["summonerId"],
    },
  },
  {
    name: "riot_match_history",
    description: "Get match history for a LoL/Riot account by PUUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        puuid: { type: "string" },
        region: { type: "string" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["puuid"],
    },
  },
  {
    name: "riot_get_match",
    description: "Get details for a specific Riot match by match ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        matchId: { type: "string" },
        region: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["matchId"],
    },
  },
  {
    name: "riot_valorant_account",
    description: "Get a Valorant account by game name and tag line.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameName: { type: "string" },
        tagLine: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["gameName", "tagLine"],
    },
  },
] as const;

export const riotHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // riot-tool.ts
  riot_summoner:        (args) => riotSummoner(args),
  riot_ranked:          (args) => riotRanked(args),
  riot_match_history:   (args) => riotMatchHistory(args),
  riot_get_match:       (args) => riotGetMatch(args),
  riot_valorant_account:(args) => riotValorantAccount(args),
};
