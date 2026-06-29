// wiring/dogapi.ts
// Per-app MCP wiring for the dogapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dogApiRandomImage, dogApiBreeds } from "../dogapi-tool.js";

export const dogapiTools = [
  // ── dogapi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "dog_api_random_image",
    description: "Get a random dog image from The Dog API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dog_api_breeds",
    description: "List dog breeds with details from The Dog API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds to return (max 50, default 20)" },
        page: { type: "number", description: "Page number (default 0)" },
      },
    },
  },

  // ── apifootball-tool.ts (TheSportsDB) ──────────────────────────────────────
  {
    name: "sportsdb_search_team",
    description: "Search for a sports team by name on TheSportsDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { team: { type: "string", description: "Team name to search for" } },
      required: ["team"],
    },
  },
  {
    name: "sportsdb_search_player",
    description: "Search for a sports player by name on TheSportsDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { player: { type: "string", description: "Player name to search for" } },
      required: ["player"],
    },
  },
  {
    name: "sportsdb_team_events",
    description: "Get upcoming events for a team by TheSportsDB team ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { id: { type: "string", description: "TheSportsDB team ID" } },
      required: ["id"],
    },
  },
  {
    name: "sportsdb_leagues",
    description: "List all sports leagues on TheSportsDB.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const dogapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dogapi-tool.ts
  dog_api_random_image:    (args) => dogApiRandomImage(args),
  dog_api_breeds:          (args) => dogApiBreeds(args),
};
