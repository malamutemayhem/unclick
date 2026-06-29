// wiring/flyio.ts
// Per-app MCP wiring for the flyio connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Cloud

import { flyListApps, flyGetApp, flyListMachines, flyCreateMachine, flyListVolumes } from "../flyio-tool.js";

export const flyioTools = [
  // ── flyio-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "fly_list_apps",
    description: "List all Fly.io apps in your organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Fly.io API token" },
        org_slug: { type: "string", description: "Organization slug (optional)" },
      },
    },
  },
  {
    name: "fly_get_app",
    description: "Get details for a specific Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string", description: "Fly.io app name" },
      },
      required: ["app_name"],
    },
  },
  {
    name: "fly_list_machines",
    description: "List all machines in a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
        include_deleted: { type: "boolean" },
      },
      required: ["app_name"],
    },
  },
  {
    name: "fly_create_machine",
    description: "Create a new machine in a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
        image: { type: "string", description: "Docker image to run (e.g. nginx:latest)" },
        machine_name: { type: "string", description: "Optional machine name" },
        env: { type: "string", description: "JSON object of environment variables" },
      },
      required: ["app_name", "image"],
    },
  },
  {
    name: "fly_list_volumes",
    description: "List all volumes attached to a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
      },
      required: ["app_name"],
    },
  },
] as const;

export const flyioHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // flyio-tool.ts
  fly_list_apps:           (args) => flyListApps(args),
  fly_get_app:             (args) => flyGetApp(args),
  fly_list_machines:       (args) => flyListMachines(args),
  fly_create_machine:      (args) => flyCreateMachine(args),
  fly_list_volumes:        (args) => flyListVolumes(args),
};
