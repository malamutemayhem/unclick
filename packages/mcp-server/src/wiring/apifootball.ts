// wiring/apifootball.ts
// Per-app MCP wiring for the apifootball connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { sportsdbSearchTeam, sportsdbSearchPlayer, sportsdbTeamEvents, sportsdbLeagues } from "../apifootball-tool.js";

export const apifootballHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // apifootball-tool.ts (TheSportsDB)
  sportsdb_search_team:    (args) => sportsdbSearchTeam(args),
  sportsdb_search_player:  (args) => sportsdbSearchPlayer(args),
  sportsdb_team_events:    (args) => sportsdbTeamEvents(args),
  sportsdb_leagues:        (args) => sportsdbLeagues(args),
};
