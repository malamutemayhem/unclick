// wiring/commonsensepass.ts
// Per-app MCP wiring for the commonsensepass connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: CommonSensePass (worker sanity-gate verdicts)

import { commonsensepassCheckTool, commonsensepassRulesTool } from "../commonsensepass-tool.js";

export const commonsensepassHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // commonsensepass-tool.ts
  commonsensepass_check: (args) => commonsensepassCheckTool(args),
  commonsensepass_rules: (args) => commonsensepassRulesTool(args),
};
