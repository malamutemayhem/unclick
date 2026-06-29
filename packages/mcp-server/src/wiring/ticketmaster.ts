// wiring/ticketmaster.ts
// Per-app MCP wiring for the ticketmaster connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tmSearchEvents, tmGetEvent, tmSearchVenues, tmGetVenue, tmSearchAttractions } from "../ticketmaster-tool.js";

export const ticketmasterTools = [
  // ── ticketmaster-tool.ts ─────────────────────────────────────────────────────
  {
    name: "tm_search_events",
    description: "Search for events on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        city: { type: "string" },
        countryCode: { type: "string" },
        classificationName: { type: "string" },
        startDateTime: { type: "string" },
        size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tm_get_event",
    description: "Get details for a specific Ticketmaster event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tm_search_venues",
    description: "Search for venues on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        countryCode: { type: "string" },
        stateCode: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tm_get_venue",
    description: "Get details for a specific Ticketmaster venue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tm_search_attractions",
    description: "Search for attractions/artists on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        classificationName: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const ticketmasterHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ticketmaster-tool.ts
  tm_search_events:        (args) => tmSearchEvents(args),
  tm_get_event:            (args) => tmGetEvent(args),
  tm_search_venues:        (args) => tmSearchVenues(args),
  tm_get_venue:            (args) => tmGetVenue(args),
  tm_search_attractions:   (args) => tmSearchAttractions(args),
};
