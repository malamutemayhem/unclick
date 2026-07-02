// wiring/speedrun.ts
// Per-app MCP wiring for the speedrun connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { speedrunSearchGames, speedrunGetGame, speedrunGetLeaderboard, speedrunListRuns, speedrunGetUser } from "../speedrun-tool.js";

export const speedrunTools = [
  // ── speedrun-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "speedrun_search_games",
    description: "Search for games on Speedrun.com by name. No API key required.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Game name to search" },
        max: { type: "number", description: "Max results" },
      },
      required: ["name"],
    },
  },
  {
    name: "speedrun_get_game",
    description: "Get details of a game on Speedrun.com including categories and levels.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Speedrun.com game ID or abbreviation" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "speedrun_get_leaderboard",
    description: "Get the leaderboard for a Speedrun.com game category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Game ID" },
        category_id: { type: "string", description: "Category ID" },
        top: { type: "number", description: "Only return top N places" },
        platform: { type: "string" },
        emulators: { type: "boolean" },
        video_only: { type: "boolean" },
      },
      required: ["game_id", "category_id"],
    },
  },
  {
    name: "speedrun_list_runs",
    description: "List speedruns with optional filters for game, category, user, or status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "Game ID" },
        category: { type: "string" },
        user: { type: "string", description: "User ID" },
        status: { type: "string", enum: ["new", "verified", "rejected"], description: "new, verified, or rejected" },
        orderby: { type: "string", enum: ["date", "submitted", "status", "game", "category", "level", "platform", "region", "emulated", "weblink"], description: "date, submitted, status, game, category, level, platform, region, emulated, or weblink" },
        direction: { type: "string", enum: ["asc", "desc"], description: "asc or desc" },
        max: { type: "number" },
      },
    },
  },
  {
    name: "speedrun_get_user",
    description: "Get a Speedrun.com user profile by ID or username.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_id: { type: "string", description: "User ID or username" },
      },
      required: ["user_id"],
    },
  },
] as const;

export const speedrunHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // speedrun-tool.ts
  speedrun_search_games:   (args) => speedrunSearchGames(args),
  speedrun_get_game:       (args) => speedrunGetGame(args),
  speedrun_get_leaderboard:(args) => speedrunGetLeaderboard(args),
  speedrun_list_runs:      (args) => speedrunListRuns(args),
  speedrun_get_user:       (args) => speedrunGetUser(args),
};
