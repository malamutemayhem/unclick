// wiring/espn.ts
// Per-app MCP wiring for the espn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { getNflScores, getNbaScores, getMlbScores, getNhlScores, getSoccerScores, getEspnNews, getTeamInfo } from "../espn-tool.js";

export const espnTools = [
  // ── espn-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "espn_nfl_scores",
    description: "Get current NFL scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_nba_scores",
    description: "Get current NBA scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_mlb_scores",
    description: "Get current MLB scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_nhl_scores",
    description: "Get current NHL scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_soccer_scores",
    description: "Get soccer scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league: { type: "string", description: "e.g. eng.1, usa.1" },
      },
    },
  },
  {
    name: "espn_news",
    description: "Get ESPN sports news.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "espn_team_info",
    description: "Get team information from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        league: { type: "string" },
        team_id: { type: "string" },
      },
      required: ["sport", "league", "team_id"],
    },
  },
] as const;

export const espnHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // espn-tool.ts
  espn_nfl_scores:         (args) => getNflScores(args),
  espn_nba_scores:         (args) => getNbaScores(args),
  espn_mlb_scores:         (args) => getMlbScores(args),
  espn_nhl_scores:         (args) => getNhlScores(args),
  espn_soccer_scores:      (args) => getSoccerScores(args),
  espn_news:               (args) => getEspnNews(args),
  espn_team_info:          (args) => getTeamInfo(args),
};
