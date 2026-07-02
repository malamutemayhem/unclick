// wiring/open-elevation.ts
// Per-app MCP wiring for the open-elevation connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openElevationLookup } from "../open-elevation-tool.js";

export const openElevationTools = [
  // ── open-elevation-tool.ts ────────────────────────────────────────────────
  {
    name: "open_elevation_lookup",
    description: "Get elevation in meters for given coordinates from Open Elevation API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude." },
        longitude: { type: "number" as const, description: "Longitude." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const openElevationHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // open-elevation-tool.ts
  open_elevation_lookup:     (args) => openElevationLookup(args),};
