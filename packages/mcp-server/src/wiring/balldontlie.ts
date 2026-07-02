// wiring/balldontlie.ts
// Per-app MCP wiring for the balldontlie connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nbaPlayers, nbaTeams, nbaGames } from "../balldontlie-tool.js";

export const balldontlieHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // balldontlie-tool.ts
  nba_players:               (args) => nbaPlayers(args),
  nba_teams:                 (args) => nbaTeams(args),
  nba_games:                 (args) => nbaGames(args),};
