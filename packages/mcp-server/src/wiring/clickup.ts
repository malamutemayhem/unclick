// wiring/clickup.ts
// Per-app MCP wiring for the clickup connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { clickupAction } from "../clickup-tool.js";

export const clickupTools = [
  // ── clickup-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "clickup_action",
    description: "Interact with the ClickUp API v2: list workspaces and spaces, get lists and tasks, create tasks, and update task properties.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:      { type: "string", enum: ["get_workspaces", "get_spaces", "get_lists", "get_tasks", "create_task", "update_task"], description: "Action: get_workspaces, get_spaces, get_lists, get_tasks, create_task, update_task." },
        api_key:     { type: "string", description: "ClickUp API key." },
        team_id:     { type: "string", description: "Workspace (team) ID (for get_spaces)." },
        space_id:    { type: "string", description: "Space ID (for get_lists without a folder)." },
        folder_id:   { type: "string", description: "Folder ID (for get_lists)." },
        list_id:     { type: "string", description: "List ID (for get_tasks and create_task)." },
        task_id:     { type: "string", description: "Task ID (for update_task)." },
        name:        { type: "string", description: "Task name (for create_task and update_task)." },
        description: { type: "string", description: "Task description." },
        status:      { type: "string", description: "Task status name." },
        priority:    { type: "number", description: "Priority: 1 (urgent), 2 (high), 3 (normal), 4 (low)." },
        due_date:    { type: "number", description: "Due date as Unix timestamp in milliseconds." },
        page:        { type: "number", description: "Page number for task pagination." },
      },
      required: ["action", "api_key"],
    },
  },
] as const;

export const clickupHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // clickup-tool.ts
  clickup_action:          (args) => clickupAction(String(args.action ?? ""), args),
};
