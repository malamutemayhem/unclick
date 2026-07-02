// wiring/eventbrite.ts
// Per-app MCP wiring for the eventbrite connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { eventbriteSearchEvents, eventbriteGetEvent, eventbriteGetEventAttendees, eventbriteCreateEvent, eventbriteListCategories, eventbriteGetVenue } from "../eventbrite-tool.js";

export const eventbriteTools = [
  // ── eventbrite-tool.ts ───────────────────────────────────────────────────────
  {
    name: "eventbrite_search_events",
    description: "Search for events on Eventbrite.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        location_address: { type: "string" },
        start_date_range_start: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "eventbrite_get_event",
    description: "Get details for an Eventbrite event by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "eventbrite_get_attendees",
    description: "Get attendees for an Eventbrite event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "eventbrite_create_event",
    description: "Create an event on Eventbrite under an organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Event name/title" },
        organization_id: { type: "string", description: "Eventbrite organization id that will own the event" },
        start_utc: { type: "string", description: "Start time in UTC, e.g. 2026-07-01T19:00:00Z" },
        end_utc: { type: "string", description: "End time in UTC, e.g. 2026-07-01T21:00:00Z" },
        timezone: { type: "string", description: "IANA timezone, e.g. America/New_York" },
        currency: { type: "string", description: "ISO currency code, e.g. USD" },
        venue_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["name", "organization_id", "start_utc", "end_utc", "timezone", "currency"],
    },
  },
  {
    name: "eventbrite_list_categories",
    description: "List Eventbrite event categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "eventbrite_get_venue",
    description: "Get details for an Eventbrite venue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        venue_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["venue_id"],
    },
  },
] as const;

export const eventbriteHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // eventbrite-tool.ts
  eventbrite_search_events:(args) => eventbriteSearchEvents(args),
  eventbrite_get_event:    (args) => eventbriteGetEvent(args),
  eventbrite_get_attendees:(args) => eventbriteGetEventAttendees(args),
  eventbrite_create_event: (args) => eventbriteCreateEvent(args),
  eventbrite_list_categories:(args) => eventbriteListCategories(args),
  eventbrite_get_venue:    (args) => eventbriteGetVenue(args),
};
