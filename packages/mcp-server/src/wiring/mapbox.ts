// wiring/mapbox.ts
// Per-app MCP wiring for the mapbox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { mapboxGeocodeForward, mapboxGeocodeReverse, mapboxGetDirections, mapboxGetStaticMap, mapboxListTilesets } from "../mapbox-tool.js";

export const mapboxTools = [
  // ── mapbox-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "mapbox_geocode_forward",
    description: "Convert an address or place name to coordinates using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token from account.mapbox.com" },
        query: { type: "string", description: "Address or place name to geocode" },
        country: { type: "string", description: "Limit results to a country (ISO 3166 alpha-2, e.g. US)" },
        language: { type: "string", description: "Language for results (e.g. en, fr)" },
        limit: { type: "number", description: "Max results (1-10, default: 5)" },
        proximity: { type: "string", description: "Bias results near coordinates (lng,lat)" },
        types: { type: "string", description: "Filter by feature types (e.g. address,place,poi)" },
      },
      required: ["access_token", "query"],
    },
  },
  {
    name: "mapbox_geocode_reverse",
    description: "Convert coordinates to a place name or address using Mapbox reverse geocoding.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        longitude: { type: "number", description: "Longitude" },
        latitude: { type: "number", description: "Latitude" },
        language: { type: "string", description: "Language for results" },
        types: { type: "string", description: "Filter by feature types" },
      },
      required: ["access_token", "longitude", "latitude"],
    },
  },
  {
    name: "mapbox_get_directions",
    description: "Get turn-by-turn directions between two or more locations using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        coordinates: { type: "string", description: "Semicolon-separated lng,lat pairs (e.g. -122.4194,37.7749;-118.2437,34.0522)" },
        profile: { type: "string", enum: ["mapbox/driving", "mapbox/walking", "mapbox/cycling", "mapbox/driving-traffic"], description: "Routing profile (default: mapbox/driving)" },
        alternatives: { type: "boolean", description: "Return alternative routes" },
        steps: { type: "boolean", description: "Include turn-by-turn steps" },
        overview: { type: "string", enum: ["full", "simplified", "false"], description: "Route overview geometry detail" },
        language: { type: "string", description: "Language for instructions" },
      },
      required: ["access_token", "coordinates"],
    },
  },
  {
    name: "mapbox_get_static_map",
    description: "Generate a static map image URL for a given location using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        longitude: { type: "number", description: "Center longitude" },
        latitude: { type: "number", description: "Center latitude" },
        zoom: { type: "number", description: "Zoom level (0-22, default: 12)" },
        width: { type: "number", description: "Image width in px (max: 1280, default: 600)" },
        height: { type: "number", description: "Image height in px (max: 1280, default: 400)" },
        style: { type: "string", description: "Map style (default: mapbox/streets-v11)" },
        retina: { type: "boolean", description: "Return @2x high-DPI image" },
      },
      required: ["access_token", "longitude", "latitude"],
    },
  },
  {
    name: "mapbox_list_tilesets",
    description: "List Mapbox tilesets owned by a user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        username: { type: "string", description: "Mapbox username" },
        limit: { type: "number", description: "Max tilesets to return (max: 500)" },
        type: { type: "string", enum: ["raster", "vector"], description: "Filter by tileset type" },
      },
      required: ["access_token", "username"],
    },
  },
] as const;

export const mapboxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mapbox-tool.ts
  mapbox_geocode_forward:  (args) => mapboxGeocodeForward(args),
  mapbox_geocode_reverse:  (args) => mapboxGeocodeReverse(args),
  mapbox_get_directions:   (args) => mapboxGetDirections(args),
  mapbox_get_static_map:   (args) => mapboxGetStaticMap(args),
  mapbox_list_tilesets:    (args) => mapboxListTilesets(args),
};
