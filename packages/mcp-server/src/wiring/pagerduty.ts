// wiring/pagerduty.ts
// Per-app MCP wiring for the pagerduty connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { pagerduty_list_incidents, pagerduty_get_incident, pagerduty_create_incident, pagerduty_acknowledge_incident, pagerduty_resolve_incident, pagerduty_list_services, pagerduty_list_oncalls } from "../pagerduty-tool.js";

export const pagerdutyTools = [
  // ── pagerduty-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "pagerduty_list_incidents",
    description: "List PagerDuty incidents. Filter by status (triggered, acknowledged, resolved), service, or date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        status: { type: "string", description: "Filter by status: triggered, acknowledged, or resolved" },
        limit: { type: "number", description: "Max results (default 25, max 100)" },
        offset: { type: "number", description: "Pagination offset" },
        service_ids: { type: "string", description: "Filter by service ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pagerduty_get_incident",
    description: "Get details for a single PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_create_incident",
    description: "Create a new PagerDuty incident on a service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        title: { type: "string", description: "Incident title/summary" },
        service_id: { type: "string", description: "ID of the service to create the incident on" },
        urgency: { type: "string", description: "Urgency: high or low" },
        body_details: { type: "string", description: "Detailed description of the incident" },
        from: { type: "string", description: "Email address of the user creating the incident (required by some accounts)" },
      },
      required: ["api_key", "title", "service_id"],
    },
  },
  {
    name: "pagerduty_acknowledge_incident",
    description: "Acknowledge a PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID to acknowledge" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_resolve_incident",
    description: "Resolve a PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID to resolve" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_list_services",
    description: "List all services in a PagerDuty account. Optionally filter by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        query: { type: "string", description: "Filter services by name" },
        limit: { type: "number", description: "Max results" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pagerduty_list_oncalls",
    description: "List who is currently on-call in PagerDuty, optionally filtered by schedule or user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        schedule_ids: { type: "string", description: "Filter by schedule ID" },
        user_ids: { type: "string", description: "Filter by user ID" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const pagerdutyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pagerduty-tool.ts
  pagerduty_list_incidents:       (args) => pagerduty_list_incidents(args),
  pagerduty_get_incident:         (args) => pagerduty_get_incident(args),
  pagerduty_create_incident:      (args) => pagerduty_create_incident(args),
  pagerduty_acknowledge_incident: (args) => pagerduty_acknowledge_incident(args),
  pagerduty_resolve_incident:     (args) => pagerduty_resolve_incident(args),
  pagerduty_list_services:        (args) => pagerduty_list_services(args),
  pagerduty_list_oncalls:         (args) => pagerduty_list_oncalls(args),
};
