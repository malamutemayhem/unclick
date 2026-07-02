// wiring/nominatim.ts
// Per-app MCP wiring for the nominatim connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nominatimSearch, nominatimReverse } from "../nominatim-tool.js";

export const nominatimTools = [
  // ── nominatim-tool.ts ─────────────────────────────────────────────────────
  {
    name: "nominatim_search",
    description: "Geocode a place name or address to coordinates using OpenStreetMap Nominatim.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Place name or address to search." },
        limit: { type: "number" as const, description: "Max results (default 5, max 20)." },
      }, required: ["query"],
    },
  },
  {
    name: "nominatim_reverse",
    description: "Reverse geocode coordinates to an address using OpenStreetMap Nominatim.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude." },
        longitude: { type: "number" as const, description: "Longitude." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const nominatimHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nominatim-tool.ts
  nominatim_search:          (args) => nominatimSearch(args),
  nominatim_reverse:         (args) => nominatimReverse(args),};
