// wiring/usgs.ts
// Per-app MCP wiring for the usgs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Environment / Science

import { getRecentEarthquakes, getEarthquakeDetail, getEarthquakesByRegion } from "../usgs-tool.js";

export const usgsTools = [
  // ── usgs-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "usgs_recent_earthquakes",
    description: "Get recent earthquakes from USGS.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        minmagnitude: { type: "number" },
        limit: { type: "number" },
        period: { type: "string", description: "hour, day, week, month" },
      },
    },
  },
  {
    name: "usgs_earthquake_detail",
    description: "Get details for a specific USGS earthquake event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "usgs_earthquakes_by_region",
    description: "Get recent USGS earthquakes within a radius of a point (latitude/longitude).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number", description: "Centre latitude" },
        lon: { type: "number", description: "Centre longitude" },
        radius: { type: "number", description: "Search radius in km (default 500)" },
        min_magnitude: { type: "number", description: "Minimum magnitude" },
        limit: { type: "number", description: "Max results (default 20, max 500)" },
      },
      required: ["lat", "lon"],
    },
  },
] as const;

export const usgsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // usgs-tool.ts
  usgs_recent_earthquakes:   (args) => getRecentEarthquakes(args),
  usgs_earthquake_detail:    (args) => getEarthquakeDetail(args),
  usgs_earthquakes_by_region:(args) => getEarthquakesByRegion(args),
};
