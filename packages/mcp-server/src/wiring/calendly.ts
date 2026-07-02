// wiring/calendly.ts
// Per-app MCP wiring for the calendly connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { getCalendlyUser, listCalendlyEventTypes, listCalendlyEvents, getCalendlyEvent, listCalendlyInvitees } from "../calendly-tool.js";

export const calendlyTools = [
  // ── calendly-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "get_calendly_user",
    description: "Get the authenticated Calendly user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Calendly Personal Access Token (or set CALENDLY_API_KEY)" },
      },
    },
  },
  {
    name: "list_calendly_event_types",
    description: "List event types for the authenticated Calendly user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_uri: { type: "string", description: "User URI (auto-resolved if omitted)" },
        active: { type: "boolean", description: "Filter to active event types only" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "list_calendly_events",
    description: "List scheduled events for the authenticated Calendly user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_uri: { type: "string", description: "User URI (auto-resolved if omitted)" },
        status: { type: "string", description: "active or canceled" },
        min_start_time: { type: "string", description: "ISO 8601 datetime" },
        max_start_time: { type: "string", description: "ISO 8601 datetime" },
        count: { type: "number" },
        sort: { type: "string", description: "e.g. start_time:asc" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "get_calendly_event",
    description: "Get details of a single Calendly scheduled event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_uuid: { type: "string", description: "Event UUID" },
        api_key: { type: "string" },
      },
      required: ["event_uuid"],
    },
  },
  {
    name: "list_calendly_invitees",
    description: "List invitees for a Calendly scheduled event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_uuid: { type: "string", description: "Event UUID" },
        status: { type: "string", description: "active or canceled" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["event_uuid"],
    },
  },
] as const;

export const calendlyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // calendly-tool.ts
  get_calendly_user:       (args) => getCalendlyUser(args),
  list_calendly_event_types:(args) => listCalendlyEventTypes(args),
  list_calendly_events:    (args) => listCalendlyEvents(args),
  get_calendly_event:      (args) => getCalendlyEvent(args),
  list_calendly_invitees:  (args) => listCalendlyInvitees(args),
};
