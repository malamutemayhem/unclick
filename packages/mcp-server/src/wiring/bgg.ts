// wiring/bgg.ts
// Per-app MCP wiring for the bgg connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { bggSearch, bggGameDetails, bggUserCollection, bggTopGames, bggGameReviews } from "../bgg-tool.js";

export const bggTools = [
  // ── bgg-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "bgg_search",
    description: "Search BoardGameGeek for board games by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        type: { type: "string", enum: ["boardgame", "boardgameexpansion"], description: "Type of item to search for (default: boardgame)" },
      },
      required: ["query"],
    },
  },
  {
    name: "bgg_game_details",
    description: "Get full details for a board game by its BGG ID - name, year, rating, players, playtime, description, categories, and mechanics.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
      },
      required: ["gameId"],
    },
  },
  {
    name: "bgg_user_collection",
    description: "Get a BGG user's game collection filtered by status (owned, wishlist, or played).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string", description: "BGG username" },
        status: { type: "string", enum: ["owned", "wishlist", "played"], description: "Collection filter (default: owned)" },
      },
      required: ["username"],
    },
  },
  {
    name: "bgg_top_games",
    description: "Get the BGG Hotness list - the most discussed and active board games right now.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of games to return (max 50, default 20)" },
      },
    },
  },
  {
    name: "bgg_game_reviews",
    description: "Get user comments and ratings for a board game on BGG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
        page: { type: "number", description: "Page number (default 1, 25 comments per page)" },
      },
      required: ["gameId"],
    },
  },
] as const;

export const bggHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bgg-tool.ts
  bgg_search:           (args) => bggSearch(args),
  bgg_game_details:     (args) => bggGameDetails(args),
  bgg_user_collection:  (args) => bggUserCollection(args),
  bgg_top_games:        (args) => bggTopGames(args),
  bgg_game_reviews:     (args) => bggGameReviews(args),
};
