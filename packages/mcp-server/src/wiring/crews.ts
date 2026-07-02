// wiring/crews.ts
// Per-app MCP wiring for the crews connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Crews (Orchestrator Wizard)

import { crewsStartRun, crewsGetRun, crewsListRuns } from "../crews-tool.js";

export const crewsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crews-tool.ts
  start_crew_run: (args) => crewsStartRun(args),
  get_run:        (args) => crewsGetRun(args),
  list_runs:      (args) => crewsListRuns(args),};
