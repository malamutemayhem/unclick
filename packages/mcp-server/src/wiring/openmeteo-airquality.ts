// wiring/openmeteo-airquality.ts
// Per-app MCP wiring for the openmeteo-airquality connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { airQualityCurrent, airQualityForecast } from "../openmeteo-airquality-tool.js";

export const openmeteoAirqualityTools = [
  // ── openmeteo-airquality-tool.ts ─────────────────────────────────────────────
  {
    name: "air_quality_current",
    description: "Get current air quality index and pollutant levels from Open-Meteo.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Location latitude." },
        longitude: { type: "number" as const, description: "Location longitude." },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "air_quality_forecast",
    description: "Get hourly air quality forecast from Open-Meteo.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Location latitude." },
        longitude: { type: "number" as const, description: "Location longitude." },
        days: { type: "number" as const, description: "Forecast days (default 3, max 5)." },
      },
      required: ["latitude", "longitude"],
    },
  },
] as const;

export const openmeteoAirqualityHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openmeteo-airquality-tool.ts
  air_quality_current:       (args) => airQualityCurrent(args),
  air_quality_forecast:      (args) => airQualityForecast(args),};
