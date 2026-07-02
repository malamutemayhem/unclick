// wiring/jikan.ts
// Per-app MCP wiring for the jikan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jikanSearchAnime, jikanGetAnime, jikanTopAnime, jikanSearchManga, jikanGetCharacter } from "../jikan-tool.js";

export const jikanTools = [
  // ── jikan-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "jikan_search_anime",
    description: "Search anime on MyAnimeList via Jikan API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number", description: "Max results (up to 25)" },
        page: { type: "number" },
        type: { type: "string", description: "tv, movie, ova, special, ona, music" },
        status: { type: "string", description: "airing, complete, upcoming" },
        order_by: { type: "string", description: "score, popularity, rank" },
      },
      required: ["query"],
    },
  },
  {
    name: "jikan_get_anime",
    description: "Get anime details by MyAnimeList ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "MyAnimeList anime ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "jikan_top_anime",
    description: "Get top-ranked anime from MyAnimeList.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        page: { type: "number" },
        type: { type: "string", description: "tv, movie, ova, special, ona, music" },
        filter: { type: "string", description: "airing, upcoming, bypopularity, favorite" },
      },
    },
  },
  {
    name: "jikan_search_manga",
    description: "Search manga on MyAnimeList via Jikan API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
        page: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "jikan_get_character",
    description: "Get an anime/manga character by MyAnimeList ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "MyAnimeList character ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const jikanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jikan-tool.ts
  jikan_search_anime:      (args) => jikanSearchAnime(args),
  jikan_get_anime:         (args) => jikanGetAnime(args),
  jikan_top_anime:         (args) => jikanTopAnime(args),
  jikan_search_manga:      (args) => jikanSearchManga(args),
  jikan_get_character:     (args) => jikanGetCharacter(args),
};
