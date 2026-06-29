// wiring/worldtime.ts
// Per-app MCP wiring for the worldtime connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { worldTimeByTimezone, worldTimeByIp, worldTimeListTimezones } from "../worldtime-tool.js";

export const worldtimeTools = [
  // ── worldtime-tool.ts ──────────────────────────────────────────────────────
  {
    name: "worldtime_by_timezone",
    description: "Get current time for a specific timezone.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        timezone: { type: "string", description: "IANA timezone, e.g. 'America/New_York', 'Europe/London'" },
      },
      required: ["timezone"],
    },
  },
  {
    name: "worldtime_by_ip",
    description: "Get current time based on IP address geolocation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string", description: "IP address (omit for your own IP)" },
      },
    },
  },
  {
    name: "worldtime_list_timezones",
    description: "List all available IANA timezones.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const worldtimeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // worldtime-tool.ts
  worldtime_by_timezone:   (args) => worldTimeByTimezone(args),
  worldtime_by_ip:         (args) => worldTimeByIp(args),
  worldtime_list_timezones: (args) => worldTimeListTimezones(args),
};
