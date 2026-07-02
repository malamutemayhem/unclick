// wiring/todoist.ts
// Per-app MCP wiring for the todoist connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { todoistListProjects, todoistListTasks, todoistCreateTask, todoistCompleteTask } from "../todoist-tool.js";

export const todoistTools = [
  // ── todoist-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "todoist_list_projects",
    description: "List your Todoist projects.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
    }, required: ["api_token"] },
  },
  {
    name: "todoist_list_tasks",
    description: "List active Todoist tasks, optionally by project or filter.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      project_id: { type: "string", description: "Limit to one project id" },
      filter: { type: "string", description: "Todoist filter query (e.g. 'today', 'overdue')" },
    }, required: ["api_token"] },
  },
  {
    name: "todoist_create_task",
    description: "Create a Todoist task.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      content: { type: "string", description: "The task text" },
      project_id: { type: "string", description: "Project id to add the task to" },
      due_string: { type: "string", description: "Natural-language due date (e.g. 'tomorrow 5pm')" },
      priority: { type: "number", minimum: 1, maximum: 4, description: "Priority 1 (normal) to 4 (urgent)" },
    }, required: ["api_token", "content"] },
  },
  {
    name: "todoist_complete_task",
    description: "Complete (close) a Todoist task by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      task_id: { type: "string", description: "Task id to close" },
    }, required: ["api_token", "task_id"] },
  },
] as const;

export const todoistHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // todoist-tool.ts
  todoist_list_projects:   (args) => todoistListProjects(args),
  todoist_list_tasks:      (args) => todoistListTasks(args),
  todoist_create_task:     (args) => todoistCreateTask(args),
  todoist_complete_task:   (args) => todoistCompleteTask(args),
};
