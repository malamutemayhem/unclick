// wiring/openmeteo-historical.ts
// Per-app MCP wiring for the openmeteo-historical connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { historicalWeather } from "../openmeteo-historical-tool.js";

export const openmeteoHistoricalTools = [
  // ── openmeteo-historical-tool.ts ─────────────────────────────────────────────
  {
    name: "historical_weather",
    description: "Get historical daily weather data for a location from Open-Meteo archive (1940 to 5 days ago).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude of the location." },
        longitude: { type: "number" as const, description: "Longitude of the location." },
        start_date: { type: "string" as const, description: "Start date in YYYY-MM-DD format." },
        end_date: { type: "string" as const, description: "End date in YYYY-MM-DD format." },
      }, required: ["latitude", "longitude", "start_date", "end_date"],
    },
  },
] as const;

export const openmeteoHistoricalHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openmeteo-historical-tool.ts
  historical_weather:        (args) => historicalWeather(args),};
