// wiring/mixpanel.ts
// Per-app MCP wiring for the mixpanel connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { mixpanelTrackEvent, mixpanelGetEvents, mixpanelGetFunnels, mixpanelGetRetention, mixpanelExportData } from "../mixpanel-tool.js";

export const mixpanelTools = [
  // ── mixpanel-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "mixpanel_track_event",
    description: "Track a custom event in Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        token: { type: "string", description: "Mixpanel project token (for ingestion)" },
        event: { type: "string", description: "Event name" },
        distinct_id: { type: "string", description: "User distinct ID (default: anonymous)" },
        properties: { type: "object", description: "Additional event properties" },
      },
      required: ["service_account_username", "service_account_secret", "project_id", "token", "event"],
    },
  },
  {
    name: "mixpanel_get_events",
    description: "Get Mixpanel event analytics data for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 7 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD, default: today)" },
        event: { type: "array", items: { type: "string" }, description: "Event names to filter by" },
        unit: { type: "string", enum: ["minute", "hour", "day", "week", "month"], description: "Time unit (default: day)" },
        type: { type: "string", enum: ["general", "unique", "average"], description: "Aggregation type (default: general)" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },
  {
    name: "mixpanel_get_funnels",
    description: "Get funnel conversion data from Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        funnel_id: { type: "string", description: "Funnel ID (find in Mixpanel UI)" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 30 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        unit: { type: "string", enum: ["day", "week", "month"], description: "Time unit" },
      },
      required: ["service_account_username", "service_account_secret", "project_id", "funnel_id"],
    },
  },
  {
    name: "mixpanel_get_retention",
    description: "Get user retention analytics from Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 30 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        born_event: { type: "string", description: "Event that defines user acquisition" },
        event: { type: "string", description: "Retention event to measure" },
        retention_type: { type: "string", enum: ["birth", "compactness"], description: "Retention type (default: birth)" },
        unit: { type: "string", enum: ["day", "week", "month"], description: "Time unit (default: day)" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },
  {
    name: "mixpanel_export_data",
    description: "Export raw Mixpanel event data for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: yesterday)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD, default: today)" },
        event: { type: "array", items: { type: "string" }, description: "Filter by event names" },
        where: { type: "string", description: "Filter expression" },
        limit: { type: "number", description: "Max events to return" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },
] as const;

export const mixpanelHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mixpanel-tool.ts
  mixpanel_track_event:    (args) => mixpanelTrackEvent(args),
  mixpanel_get_events:     (args) => mixpanelGetEvents(args),
  mixpanel_get_funnels:    (args) => mixpanelGetFunnels(args),
  mixpanel_get_retention:  (args) => mixpanelGetRetention(args),
  mixpanel_export_data:    (args) => mixpanelExportData(args),
};
