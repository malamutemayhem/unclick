// wiring/geojs.ts
// Per-app MCP wiring for the geojs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { geojsLookup } from "../geojs-tool.js";

export const geojsTools = [
  // ── geojs-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "geojs_lookup",
    description: "Get IP geolocation (country, region, city, lat/lon) from GeoJS. Omit IP for self-lookup.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address (optional, defaults to caller IP)." },
      },
    },
  },
] as const;

export const geojsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // geojs-tool.ts
  geojs_lookup:              (args) => geojsLookup(args),
};
