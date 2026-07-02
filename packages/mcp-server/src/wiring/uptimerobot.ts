// wiring/uptimerobot.ts
// Per-app MCP wiring for the uptimerobot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { uptimerobotGetMonitors, uptimerobotGetAccount } from "../uptimerobot-tool.js";

export const uptimerobotTools = [
  // ── uptimerobot-tool.ts ───────────────────────────────────────────────────────
  { name: "uptimerobot_get_monitors", description: "List UptimeRobot monitors (signals when any are DOWN).", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "UptimeRobot API key" },
    search: { type: "string", description: "Filter monitors by name or URL" },
  }, required: ["api_key"] } },
  { name: "uptimerobot_get_account", description: "Get UptimeRobot account details and limits.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "UptimeRobot API key" },
  }, required: ["api_key"] } },
] as const;

export const uptimerobotHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // uptimerobot-tool.ts
  uptimerobot_get_monitors: (args) => uptimerobotGetMonitors(args),
  uptimerobot_get_account:  (args) => uptimerobotGetAccount(args),
};
