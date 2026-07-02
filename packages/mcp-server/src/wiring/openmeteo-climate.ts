// wiring/openmeteo-climate.ts
// Per-app MCP wiring for the openmeteo-climate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { climateNormals } from "../openmeteo-climate-tool.js";

export const openmeteoClimateTools = [
  // ── openmeteo-climate-tool.ts ──────────────────────────────────────────────
  {
    name: "climate_normals",
    description: "Get climate normal projections (mean max/min temp, precipitation) for a location.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude of the location." },
        longitude: { type: "number" as const, description: "Longitude of the location." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const openmeteoClimateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openmeteo-climate-tool.ts
  climate_normals:           (args) => climateNormals(args),};
