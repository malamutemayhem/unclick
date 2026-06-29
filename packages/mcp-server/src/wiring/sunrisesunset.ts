// wiring/sunrisesunset.ts
// Per-app MCP wiring for the sunrisesunset connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { sunriseSunsetTimes } from "../sunrisesunset-tool.js";

export const sunrisesunsetTools = [
  // ── sunrisesunset-tool.ts ──────────────────────────────────────────────────
  {
    name: "sunrise_sunset_times",
    description: "Get sunrise and sunset times for GPS coordinates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number", description: "Latitude" },
        lng: { type: "number", description: "Longitude" },
        date: { type: "string", description: "Date (YYYY-MM-DD) or 'today' (default)" },
      },
      required: ["lat", "lng"],
    },
  },
] as const;

export const sunrisesunsetHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sunrisesunset-tool.ts
  sunrise_sunset_times:    (args) => sunriseSunsetTimes(args),
};
