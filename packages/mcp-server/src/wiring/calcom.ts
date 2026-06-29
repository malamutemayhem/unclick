// wiring/calcom.ts
// Per-app MCP wiring for the calcom connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { calcomMe, calcomListEventTypes, calcomListBookings } from "../calcom-tool.js";

export const calcomTools = [
  // ── calcom-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "calcom_me",
    description: "Get the authenticated Cal.com user's profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "calcom_list_event_types",
    description: "List your Cal.com bookable event (meeting) types.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "calcom_list_bookings",
    description: "List Cal.com bookings, optionally filtered by status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
        status: { type: "string", description: "Filter by status (upcoming, past, cancelled, ...)" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const calcomHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // calcom-tool.ts
  calcom_me:               (args) => calcomMe(args),
  calcom_list_event_types: (args) => calcomListEventTypes(args),
  calcom_list_bookings:    (args) => calcomListBookings(args),
};
