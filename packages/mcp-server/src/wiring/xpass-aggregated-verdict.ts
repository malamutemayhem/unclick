// wiring/xpass-aggregated-verdict.ts
// Per-app MCP wiring for the xpass-aggregated-verdict connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: XPass (conductor receipt across product checks)

import { xpassAggregatedVerdict } from "../xpass-aggregated-verdict-tool.js";

export const xpassAggregatedVerdictHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // xpass-aggregated-verdict-tool.ts
  xpass_aggregated_verdict: (args) => xpassAggregatedVerdict(args),
};
