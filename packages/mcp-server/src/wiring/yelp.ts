// wiring/yelp.ts
// Per-app MCP wiring for the yelp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { yelpSearchBusinesses, yelpGetBusiness, yelpGetReviews, yelpSearchEvents, yelpGetAutocomplete } from "../yelp-tool.js";

export const yelpTools = [
  // ── yelp-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "yelp_search_businesses",
    description: "Search for businesses on Yelp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string" },
        location: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        categories: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "yelp_get_business",
    description: "Get details for a Yelp business by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        business_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["business_id"],
    },
  },
  {
    name: "yelp_get_reviews",
    description: "Get reviews for a Yelp business.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        business_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["business_id"],
    },
  },
  {
    name: "yelp_search_events",
    description: "Search for events on Yelp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        categories: { type: "string" },
        start_date: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "yelp_autocomplete",
    description: "Autocomplete a Yelp business search.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["text"],
    },
  },
] as const;

export const yelpHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // yelp-tool.ts
  yelp_search_businesses:  (args) => yelpSearchBusinesses(args),
  yelp_get_business:       (args) => yelpGetBusiness(args),
  yelp_get_reviews:        (args) => yelpGetReviews(args),
  yelp_search_events:      (args) => yelpSearchEvents(args),
  yelp_autocomplete:       (args) => yelpGetAutocomplete(args),
};
