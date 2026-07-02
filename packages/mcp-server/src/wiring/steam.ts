// wiring/steam.ts
// Per-app MCP wiring for the steam connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { getSteamPlayerSummaries, getSteamOwnedGames, getSteamAchievements, getSteamAppDetails, searchSteamStore } from "../steam-tool.js";

export const steamTools = [
  // ── steam-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "get_steam_player_summaries",
    description: "Get Steam player profile summaries for one or more Steam IDs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamids: { type: "string", description: "Comma-separated Steam64 IDs (up to 100)" },
        api_key: { type: "string", description: "Steam Web API key (or set STEAM_API_KEY)" },
      },
      required: ["steamids"],
    },
  },
  {
    name: "get_steam_owned_games",
    description: "Get games owned by a Steam user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamid: { type: "string", description: "Steam64 ID" },
        include_appinfo: { type: "boolean", description: "Include game names (default true)" },
        include_played_free_games: { type: "boolean" },
        api_key: { type: "string" },
      },
      required: ["steamid"],
    },
  },
  {
    name: "get_steam_achievements",
    description: "Get achievements for a Steam user in a specific game.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamid: { type: "string", description: "Steam64 ID" },
        appid: { type: "string", description: "Steam App ID of the game" },
        api_key: { type: "string" },
      },
      required: ["steamid", "appid"],
    },
  },
  {
    name: "get_steam_app_details",
    description: "Get store details for a Steam app (game info, price, platforms, Metacritic score).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        appid: { type: "string", description: "Steam App ID" },
        cc: { type: "string", description: "Country code for pricing (e.g. us, au)" },
        l: { type: "string", description: "Language code (e.g. english)" },
      },
      required: ["appid"],
    },
  },
  {
    name: "search_steam_store",
    description: "Search the Steam store for games by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string", description: "Search term" },
        cc: { type: "string", description: "Country code for pricing" },
        l: { type: "string", description: "Language code" },
      },
      required: ["term"],
    },
  },
] as const;

export const steamHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // steam-tool.ts
  get_steam_player_summaries:(args) => getSteamPlayerSummaries(args),
  get_steam_owned_games:   (args) => getSteamOwnedGames(args),
  get_steam_achievements:  (args) => getSteamAchievements(args),
  get_steam_app_details:   (args) => getSteamAppDetails(args),
  search_steam_store:      (args) => searchSteamStore(args),
};
