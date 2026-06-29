// wiring/igdb.ts
// Per-app MCP wiring for the igdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { igdbSearchGames, igdbGetGame, igdbListPlatforms, igdbListGenres, igdbGetCompany } from "../igdb-tool.js";

export const igdbTools = [
  // ── igdb-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "igdb_search_games",
    description: "Search the IGDB games database by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        limit: { type: "number", description: "Max results (default 10, max 50)" },
        client_id: { type: "string", description: "Twitch/IGDB Client ID (or set IGDB_CLIENT_ID)" },
        client_secret: { type: "string", description: "Twitch/IGDB Client Secret (or set IGDB_CLIENT_SECRET)" },
      },
      required: ["query"],
    },
  },
  {
    name: "igdb_get_game",
    description: "Get full details of a game from IGDB by game ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "IGDB game ID" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "igdb_list_platforms",
    description: "List gaming platforms from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 30)" },
        offset: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_list_genres",
    description: "List all game genres from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_get_company",
    description: "Get a game company from IGDB by name or ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Company name to search for" },
        company_id: { type: "string", description: "IGDB company ID (takes precedence over name)" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
] as const;

export const igdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // igdb-tool.ts
  igdb_search_games:       (args) => igdbSearchGames(args),
  igdb_get_game:           (args) => igdbGetGame(args),
  igdb_list_platforms:     (args) => igdbListPlatforms(args),
  igdb_list_genres:        (args) => igdbListGenres(args),
  igdb_get_company:        (args) => igdbGetCompany(args),
};
