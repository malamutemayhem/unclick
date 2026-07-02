// wiring/tmdb.ts
// Per-app MCP wiring for the tmdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tmdbSearchMovies, tmdbSearchTv, tmdbMovie, tmdbTv, tmdbTrending, tmdbNowPlaying, tmdbUpcoming, tmdbPopularTv } from "../tmdb-tool.js";

export const tmdbTools = [
  // ── tmdb-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "tmdb_search_movies",
    description: "Search for movies on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        year: { type: "number" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_search_tv",
    description: "Search for TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_movie",
    description: "Get details for a TMDB movie by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_tv",
    description: "Get details for a TMDB TV show by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_trending",
    description: "Get trending movies or TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        media_type: { type: "string", enum: ["movie", "tv", "all"], description: "movie, tv, or all" },
        time_window: { type: "string", enum: ["day", "week"], description: "day or week" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_now_playing",
    description: "Get movies currently in theaters from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_upcoming",
    description: "Get upcoming movies from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_popular_tv",
    description: "Get popular TV shows from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const tmdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tmdb-tool.ts
  tmdb_search_movies:      (args) => tmdbSearchMovies(args),
  tmdb_search_tv:          (args) => tmdbSearchTv(args),
  tmdb_movie:              (args) => tmdbMovie(args),
  tmdb_tv:                 (args) => tmdbTv(args),
  tmdb_trending:           (args) => tmdbTrending(args),
  tmdb_now_playing:        (args) => tmdbNowPlaying(args),
  tmdb_upcoming:           (args) => tmdbUpcoming(args),
  tmdb_popular_tv:         (args) => tmdbPopularTv(args),
};
