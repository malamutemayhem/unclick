// wiring/foursquare.ts
// Per-app MCP wiring for the foursquare connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { foursquareSearchPlaces, foursquareGetPlace, foursquareGetPhotos, foursquareGetTips, foursquareAutocomplete } from "../foursquare-tool.js";

export const foursquareTools = [
  // ── foursquare-tool.ts ───────────────────────────────────────────────────────
  {
    name: "foursquare_search_places",
    description: "Search for places on Foursquare.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        ll: { type: "string", description: "lat,lng" },
        near: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "foursquare_get_place",
    description: "Get details for a Foursquare place by FSQ ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_get_photos",
    description: "Get photos for a Foursquare place.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_get_tips",
    description: "Get tips/reviews for a Foursquare place.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_autocomplete",
    description: "Autocomplete a Foursquare place search.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        ll: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
] as const;

export const foursquareHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // foursquare-tool.ts
  foursquare_search_places:(args) => foursquareSearchPlaces(args),
  foursquare_get_place:    (args) => foursquareGetPlace(args),
  foursquare_get_photos:   (args) => foursquareGetPhotos(args),
  foursquare_get_tips:     (args) => foursquareGetTips(args),
  foursquare_autocomplete: (args) => foursquareAutocomplete(args),
};
