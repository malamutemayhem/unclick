// wiring/openmeteo-flood.ts
// Per-app MCP wiring for the openmeteo-flood connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { floodForecast } from "../openmeteo-flood-tool.js";

export const openmeteoFloodTools = [
  // ── openmeteo-flood-tool.ts ──────────────────────────────────────────────────
  {
    name: "flood_forecast",
    description: "Get river discharge flood forecast from Open-Meteo.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Location latitude." },
        longitude: { type: "number" as const, description: "Location longitude." },
        days: { type: "number" as const, description: "Forecast days (default 7, max 92)." },
      },
      required: ["latitude", "longitude"],
    },
  },
] as const;

export const openmeteoFloodHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openmeteo-flood-tool.ts
  flood_forecast:            (args) => floodForecast(args),};
