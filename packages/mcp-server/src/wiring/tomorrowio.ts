// wiring/tomorrowio.ts
// Per-app MCP wiring for the tomorrowio connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tomorrowRealtime, tomorrowForecast, tomorrowHistory } from "../tomorrowio-tool.js";

export const tomorrowioTools = [
  // ── tomorrowio-tool.ts ───────────────────────────────────────────────────────
  {
    name: "tomorrow_realtime",
    description: "Get realtime weather from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string", description: "lat,lon or place name" },
        units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location"],
    },
  },
  {
    name: "tomorrow_forecast",
    description: "Get a weather forecast from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        timesteps: { type: "string", enum: ["1h", "1d"], description: "1h or 1d" },
        units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location"],
    },
  },
  {
    name: "tomorrow_history",
    description: "Get historical weather data from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location", "startTime", "endTime"],
    },
  },
] as const;

export const tomorrowioHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tomorrowio-tool.ts
  tomorrow_realtime:       (args) => tomorrowRealtime(args),
  tomorrow_forecast:       (args) => tomorrowForecast(args),
  tomorrow_history:        (args) => tomorrowHistory(args),
};
