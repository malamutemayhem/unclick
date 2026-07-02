// wiring/openmeteo-marine.ts
// Per-app MCP wiring for the openmeteo-marine connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { marineForecast } from "../openmeteo-marine-tool.js";

export const openmeteoMarineTools = [
  // ── openmeteo-marine-tool.ts ─────────────────────────────────────────────────
  {
    name: "marine_forecast",
    description: "Get ocean wave, swell, and marine weather forecast for a location.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude of the ocean point." },
        longitude: { type: "number" as const, description: "Longitude of the ocean point." },
        forecast_days: { type: "number" as const, description: "Number of forecast days (default 7, max 16)." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const openmeteoMarineHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openmeteo-marine-tool.ts
  marine_forecast:           (args) => marineForecast(args),};
