// wiring/linear.ts
// Per-app MCP wiring for the linear connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { linearAction } from "../linear-tool.js";

export const linearTools = [
  // ── linear-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "linear_action",
    description: "Interact with the Linear GraphQL API: list and search issues, create issues, get project details, and list teams.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:      { type: "string", enum: ["list_issues", "create_issue", "get_project", "list_teams", "search_issues"], description: "Action: list_issues, create_issue, get_project, list_teams, search_issues." },
        api_key:     { type: "string", description: "Linear API key." },
        title:       { type: "string", description: "Issue title (for create_issue)." },
        team_id:     { type: "string", description: "Team ID (required for create_issue, optional filter for list_issues)." },
        project_id:  { type: "string", description: "Project ID (for get_project)." },
        description: { type: "string", description: "Issue description." },
        priority:    { type: "number", description: "Priority: 0 (none), 1 (urgent), 2 (high), 3 (medium), 4 (low)." },
        assignee_id: { type: "string", description: "Assignee user ID." },
        state_id:    { type: "string", description: "Workflow state ID." },
        query:       { type: "string", description: "Search term (for search_issues)." },
        first:       { type: "number", description: "Number of results to return (default 25)." },
      },
      required: ["action", "api_key"],
    },
  },
] as const;

export const linearHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // linear-tool.ts
  linear_action:           (args) => linearAction(String(args.action ?? ""), args),
};
