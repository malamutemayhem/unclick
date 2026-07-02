// wiring/sloppass.ts
// Per-app MCP wiring for the sloppass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: SlopPass (AI-code quality and slop-signal QC)

import { sloppassRun } from "../sloppass-tool.js";

export const sloppassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sloppass-tool.ts
  sloppass_run:            (args) => sloppassRun(args),
};
