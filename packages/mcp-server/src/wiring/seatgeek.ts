// wiring/seatgeek.ts
// Per-app MCP wiring for the seatgeek connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { seatgeekSearchEvents, seatgeekGetEvent, seatgeekSearchPerformers, seatgeekGetPerformer, seatgeekSearchVenues, seatgeekGetVenue } from "../seatgeek-tool.js";

export const seatgeekTools = [
  // ── seatgeek-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "seatgeek_search_events",
    description: "Search for events on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        type: { type: "string" },
        datetime_utc_gte: { type: "string" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "seatgeek_get_event",
    description: "Get a SeatGeek event by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "seatgeek_search_performers",
    description: "Search for performers on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "seatgeek_get_performer",
    description: "Get a SeatGeek performer by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "seatgeek_search_venues",
    description: "Search for venues on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "seatgeek_get_venue",
    description: "Get a SeatGeek venue by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
] as const;

export const seatgeekHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // seatgeek-tool.ts
  seatgeek_search_events:  (args) => seatgeekSearchEvents(args),
  seatgeek_get_event:      (args) => seatgeekGetEvent(args),
  seatgeek_search_performers:(args) => seatgeekSearchPerformers(args),
  seatgeek_get_performer:  (args) => seatgeekGetPerformer(args),
  seatgeek_search_venues:  (args) => seatgeekSearchVenues(args),
  seatgeek_get_venue:      (args) => seatgeekGetVenue(args),
};
