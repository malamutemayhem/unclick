// wiring/datadog.ts
// Per-app MCP wiring for the datadog connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { datadogListMonitors, datadogGetMonitor, datadogCreateMonitor, datadogListDashboards, datadogQueryMetrics, datadogListEvents } from "../datadog-tool.js";

export const datadogTools = [
  // ── datadog-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "datadog_list_monitors",
    description: "List Datadog monitors (alerts) with optional name or tag filters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key (DD-API-KEY)" },
        app_key: { type: "string", description: "Datadog Application key (DD-APPLICATION-KEY)" },
        name: { type: "string", description: "Filter monitors by name" },
        tags: { type: "string", description: "Comma-separated monitor tags to filter by" },
        page: { type: "number", description: "Page number (0-indexed)" },
        page_size: { type: "number", description: "Monitors per page (max: 1000)" },
      },
      required: ["api_key", "app_key"],
    },
  },
  {
    name: "datadog_get_monitor",
    description: "Get details for a specific Datadog monitor.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        monitor_id: { type: "string", description: "Monitor ID" },
      },
      required: ["api_key", "app_key", "monitor_id"],
    },
  },
  {
    name: "datadog_create_monitor",
    description: "Create a new Datadog monitor (alert).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        name: { type: "string", description: "Monitor name" },
        type: { type: "string", description: "Monitor type (e.g. metric alert, service check, event alert)" },
        query: { type: "string", description: "Monitor query expression" },
        message: { type: "string", description: "Notification message" },
        tags: { type: "array", items: { type: "string" }, description: "Tags to attach to the monitor" },
        priority: { type: "number", minimum: 1, maximum: 5, description: "Monitor priority (1-5)" },
      },
      required: ["api_key", "app_key", "name", "query"],
    },
  },
  {
    name: "datadog_list_dashboards",
    description: "List Datadog dashboards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        filter_shared: { type: "boolean", description: "Filter to shared dashboards only" },
      },
      required: ["api_key", "app_key"],
    },
  },
  {
    name: "datadog_query_metrics",
    description: "Query Datadog metrics time-series data.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        query: { type: "string", description: "Datadog metric query (e.g. avg:system.cpu.user{*})" },
        from: { type: "number", description: "Start time as Unix timestamp (default: 1 hour ago)" },
        to: { type: "number", description: "End time as Unix timestamp (default: now)" },
      },
      required: ["api_key", "app_key", "query"],
    },
  },
  {
    name: "datadog_list_events",
    description: "List Datadog events stream for a time range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        start: { type: "number", description: "Start time as Unix timestamp (default: 1 hour ago)" },
        end: { type: "number", description: "End time as Unix timestamp (default: now)" },
        priority: { type: "string", enum: ["normal", "low"], description: "Filter by event priority" },
        sources: { type: "string", description: "Comma-separated event sources" },
        tags: { type: "string", description: "Comma-separated tags to filter events" },
      },
      required: ["api_key", "app_key"],
    },
  },
] as const;

export const datadogHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // datadog-tool.ts
  datadog_list_monitors:   (args) => datadogListMonitors(args),
  datadog_get_monitor:     (args) => datadogGetMonitor(args),
  datadog_create_monitor:  (args) => datadogCreateMonitor(args),
  datadog_list_dashboards: (args) => datadogListDashboards(args),
  datadog_query_metrics:   (args) => datadogQueryMetrics(args),
  datadog_list_events:     (args) => datadogListEvents(args),
};
