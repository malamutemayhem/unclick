// wiring/render.ts
// Per-app MCP wiring for the render connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Cloud

import { renderListServices, renderGetService, renderListDeploys, renderTriggerDeploy, renderListEnvVars, renderSetEnvVar } from "../render-tool.js";

export const renderTools = [
  // ── render-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "render_list_services",
    description: "List all Render services (web services, static sites, cron jobs, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Render API key" },
        limit: { type: "number", description: "Max results (default 20)" },
        cursor: { type: "string" },
        type: { type: "string", description: "Filter by type: web_service, static_site, background_worker, cron_job, private_service" },
      },
    },
  },
  {
    name: "render_get_service",
    description: "Get details for a specific Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string", description: "Render service ID (srv-...)" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_list_deploys",
    description: "List deploys for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_trigger_deploy",
    description: "Trigger a new deploy for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        clear_cache: { type: "boolean", description: "Clear build cache before deploying" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_list_env_vars",
    description: "List environment variables for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_set_env_var",
    description: "Set an environment variable on a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        key: { type: "string", description: "Environment variable name" },
        value: { type: "string", description: "Environment variable value" },
      },
      required: ["service_id", "key", "value"],
    },
  },
] as const;

export const renderHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // render-tool.ts
  render_list_services:    (args) => renderListServices(args),
  render_get_service:      (args) => renderGetService(args),
  render_list_deploys:     (args) => renderListDeploys(args),
  render_trigger_deploy:   (args) => renderTriggerDeploy(args),
  render_list_env_vars:    (args) => renderListEnvVars(args),
  render_set_env_var:      (args) => renderSetEnvVar(args),
};
