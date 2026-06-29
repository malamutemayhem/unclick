// wiring/untappd.ts
// Per-app MCP wiring for the untappd connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { untappdSearchBeer, untappdGetBeer, untappdGetBrewery, untappdSearchBrewery, untappdBeerActivities } from "../untappd-tool.js";

export const untappdTools = [
  // ── untappd-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "untappd_search_beer",
    description: "Search for beers on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "untappd_get_beer",
    description: "Get details for a specific beer on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bid: { type: "number", description: "Beer ID" },
        api_key: { type: "string" },
      },
      required: ["bid"],
    },
  },
  {
    name: "untappd_get_brewery",
    description: "Get details for a brewery on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        brewery_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["brewery_id"],
    },
  },
  {
    name: "untappd_search_brewery",
    description: "Search for breweries on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "untappd_beer_activities",
    description: "Get recent activity/check-ins for a beer on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bid: { type: "number" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["bid"],
    },
  },
] as const;

export const untappdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // untappd-tool.ts
  untappd_search_beer:  (args) => untappdSearchBeer(args),
  untappd_get_beer:     (args) => untappdGetBeer(args),
  untappd_get_brewery:  (args) => untappdGetBrewery(args),
  untappd_search_brewery:(args) => untappdSearchBrewery(args),
  untappd_beer_activities:(args) => untappdBeerActivities(args),
};
