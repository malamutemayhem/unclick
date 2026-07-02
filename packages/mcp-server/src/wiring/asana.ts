// wiring/asana.ts
// Per-app MCP wiring for the asana connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { listAsanaWorkspaces, listAsanaProjects, listAsanaTasks, createAsanaTask, updateAsanaTask, getAsanaTask, searchAsanaTasks } from "../asana-tool.js";

export const asanaTools = [
  // ── asana-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "list_asana_workspaces",
    description: "List all Asana workspaces accessible by the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Asana Personal Access Token (or set ASANA_API_KEY)" },
      },
    },
  },
  {
    name: "list_asana_projects",
    description: "List projects in an Asana workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_gid: { type: "string", description: "Workspace GID" },
        archived: { type: "boolean", description: "Include archived projects (default false)" },
        limit: { type: "number", description: "Max results (default 100)" },
        api_key: { type: "string" },
      },
      required: ["workspace_gid"],
    },
  },
  {
    name: "list_asana_tasks",
    description: "List tasks in an Asana project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_gid: { type: "string", description: "Project GID" },
        completed: { type: "boolean", description: "Filter to completed tasks only" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["project_gid"],
    },
  },
  {
    name: "create_asana_task",
    description: "Create a new task in Asana.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Task name" },
        workspace_gid: { type: "string", description: "Workspace GID" },
        notes: { type: "string", description: "Task description" },
        due_on: { type: "string", description: "Due date (YYYY-MM-DD)" },
        assignee: { type: "string", description: "Assignee GID or 'me'" },
        projects: { type: "array", items: { type: "string" }, description: "Project GIDs to add the task to" },
        api_key: { type: "string" },
      },
      required: ["name", "workspace_gid"],
    },
  },
  {
    name: "update_asana_task",
    description: "Update an existing Asana task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        task_gid: { type: "string", description: "Task GID" },
        name: { type: "string" },
        notes: { type: "string" },
        completed: { type: "boolean" },
        due_on: { type: "string", description: "YYYY-MM-DD or null to clear" },
        assignee: { type: "string", description: "Assignee GID or null to unassign" },
        api_key: { type: "string" },
      },
      required: ["task_gid"],
    },
  },
  {
    name: "get_asana_task",
    description: "Get full details of a single Asana task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        task_gid: { type: "string", description: "Task GID" },
        api_key: { type: "string" },
      },
      required: ["task_gid"],
    },
  },
  {
    name: "search_asana_tasks",
    description: "Search tasks by text within an Asana workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_gid: { type: "string", description: "Workspace GID" },
        text: { type: "string", description: "Search query" },
        completed: { type: "boolean" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_gid", "text"],
    },
  },
] as const;

export const asanaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // asana-tool.ts
  list_asana_workspaces:   (args) => listAsanaWorkspaces(args),
  list_asana_projects:     (args) => listAsanaProjects(args),
  list_asana_tasks:        (args) => listAsanaTasks(args),
  create_asana_task:       (args) => createAsanaTask(args),
  update_asana_task:       (args) => updateAsanaTask(args),
  get_asana_task:          (args) => getAsanaTask(args),
  search_asana_tasks:      (args) => searchAsanaTasks(args),
};
