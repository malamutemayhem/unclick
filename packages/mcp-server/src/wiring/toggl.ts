// wiring/toggl.ts
// Per-app MCP wiring for the toggl connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Infra

import { getTogglTimeEntries, createTimeEntryToggl, getTogglProjects, getTogglSummary } from "../toggl-tool.js";

export const togglTools = [
  // ── toggl-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "toggl_time_entries",
    description: "Get Toggl time entries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start_date: { type: "string" },
        end_date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "toggl_create_time_entry",
    description: "Create a new Toggl time entry.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        description: { type: "string" },
        start: { type: "string" },
        stop: { type: "string" },
        project_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_id", "start"],
    },
  },
  {
    name: "toggl_projects",
    description: "Get Toggl projects for a workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_id"],
    },
  },
  {
    name: "toggl_summary",
    description: "Get a Toggl time summary report.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        since: { type: "string" },
        until: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["workspace_id"],
    },
  },
] as const;

export const togglHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // toggl-tool.ts
  toggl_time_entries:   (args) => getTogglTimeEntries(args),
  toggl_create_time_entry:(args) => createTimeEntryToggl(args),
  toggl_projects:       (args) => getTogglProjects(args),
  toggl_summary:        (args) => getTogglSummary(args),
};
