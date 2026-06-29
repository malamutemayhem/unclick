// wiring/uptimerobot.ts
// Per-app MCP wiring for the uptimerobot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { uptimerobotGetMonitors, uptimerobotGetAccount } from "../uptimerobot-tool.js";

export const uptimerobotHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // uptimerobot-tool.ts
  uptimerobot_get_monitors: (args) => uptimerobotGetMonitors(args),
  uptimerobot_get_account:  (args) => uptimerobotGetAccount(args),
};
