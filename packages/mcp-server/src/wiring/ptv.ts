// wiring/ptv.ts
// Per-app MCP wiring for the ptv connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { ptvSearch, ptvDepartures, ptvDisruptions, ptvStopsOnRoute, ptvRouteDirections } from "../ptv-tool.js";

export const ptvTools = [
  // ── ptv-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "ptv_search",
    description: "Search PTV stops, routes, or outlets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search_term: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["search_term"],
    },
  },
  {
    name: "ptv_departures",
    description: "Get PTV departures for a stop. In full UnClick, stop_id can be filled from saved Memory defaults.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_type: { type: "number", description: "0=train, 1=tram, 2=bus, 3=vline, 4=night. Defaults to train." },
        stop_id: { type: "number", description: "PTV stop ID. Optional when a saved UnClick Memory default exists." },
        route_id: { type: "number" },
        direction_id: { type: "number" },
        max_results: { type: "number", description: "Defaults to 5, maximum 20." },
        look_backwards: { type: "boolean" },
        include_cancelled: { type: "boolean" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "ptv_disruptions",
    description: "Get current PTV service disruptions.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_types: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "ptv_stops_on_route",
    description: "Get stops on a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        route_type: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id", "route_type"],
    },
  },
  {
    name: "ptv_route_directions",
    description: "Get directions for a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id"],
    },
  },
] as const;

export const ptvHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ptv-tool.ts
  ptv_search:           (args) => ptvSearch(args),
  ptv_departures:       (args) => ptvDepartures(args),
  ptv_disruptions:      (args) => ptvDisruptions(args),
  ptv_stops_on_route:   (args) => ptvStopsOnRoute(args),
  ptv_route_directions: (args) => ptvRouteDirections(args),
};
