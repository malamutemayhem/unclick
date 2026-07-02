// wiring/timeapi.ts
// Per-app MCP wiring for the timeapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { timeApiCurrentByZone, timeApiTimezones } from "../timeapi-tool.js";

export const timeapiTools = [
  // ── timeapi-tool.ts ────────────────────────────────────────────────────────
  {
    name: "time_api_current_by_zone",
    description: "Get the current date and time for an IANA timezone via timeapi.io.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        timezone: { type: "string" as const, description: "IANA timezone name (default: UTC). E.g. America/New_York." },
      },
    },
  },
  {
    name: "time_api_timezones",
    description: "List all available IANA timezone names from timeapi.io.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const timeapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // timeapi-tool.ts
  time_api_current_by_zone:  (args) => timeApiCurrentByZone(args),
  time_api_timezones:        (args) => timeApiTimezones(args),};
