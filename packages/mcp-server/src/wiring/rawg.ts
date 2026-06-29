// wiring/rawg.ts
// Per-app MCP wiring for the rawg connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { rawgSearchGames, rawgGetGame, rawgGetGameScreenshots, rawgListGenres, rawgListPlatforms, rawgUpcomingGames } from "../rawg-tool.js";

export const rawgTools = [
  // ── rawg-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "rawg_search_games",
    description: "Search for video games on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string", description: "Search query" },
        genres: { type: "string" },
        platforms: { type: "string" },
        ordering: { type: "string" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["search"],
    },
  },
  {
    name: "rawg_get_game",
    description: "Get details for a specific game by RAWG ID or slug.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "RAWG game ID or slug" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_game_screenshots",
    description: "Get screenshots for a RAWG game.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_list_genres",
    description: "List all game genres on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_list_platforms",
    description: "List all gaming platforms on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_upcoming_games",
    description: "Get upcoming game releases from RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const rawgHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // rawg-tool.ts
  rawg_search_games:    (args) => rawgSearchGames(args),
  rawg_get_game:        (args) => rawgGetGame(args),
  rawg_game_screenshots:(args) => rawgGetGameScreenshots(args),
  rawg_list_genres:     (args) => rawgListGenres(args),
  rawg_list_platforms:  (args) => rawgListPlatforms(args),
  rawg_upcoming_games:  (args) => rawgUpcomingGames(args),
};
