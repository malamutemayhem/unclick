// wiring/fpl.ts
// Per-app MCP wiring for the fpl connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fplBootstrap, fplPlayer, fplGameweek, fplFixtures, fplMyTeam, fplManager, fplLeaguesClassic } from "../fpl-tool.js";

export const fplTools = [
  // ── fpl-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "fpl_bootstrap",
    description: "Get Fantasy Premier League bootstrap data (players, teams, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "fpl_player",
    description: "Get FPL player details and history.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        player_id: { type: "number" },
      },
      required: ["player_id"],
    },
  },
  {
    name: "fpl_gameweek",
    description: "Get FPL gameweek details.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
      required: ["gameweek"],
    },
  },
  {
    name: "fpl_fixtures",
    description: "Get FPL fixtures, optionally for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
    },
  },
  {
    name: "fpl_my_team",
    description: "Get an FPL manager's team for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
        gameweek: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["manager_id", "gameweek"],
    },
  },
  {
    name: "fpl_manager",
    description: "Get an FPL manager profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
      },
      required: ["manager_id"],
    },
  },
  {
    name: "fpl_leagues_classic",
    description: "Get FPL classic league standings.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "number" },
        page: { type: "number" },
      },
      required: ["league_id"],
    },
  },
] as const;

export const fplHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fpl-tool.ts
  fpl_bootstrap:           (args) => fplBootstrap(args),
  fpl_player:              (args) => fplPlayer(args),
  fpl_gameweek:            (args) => fplGameweek(args),
  fpl_fixtures:            (args) => fplFixtures(args),
  fpl_my_team:             (args) => fplMyTeam(args),
  fpl_manager:             (args) => fplManager(args),
  fpl_leagues_classic:     (args) => fplLeaguesClassic(args),
};
