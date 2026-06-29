// wiring/gitlab.ts
// Per-app MCP wiring for the gitlab connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { gitlabAction } from "../gitlab-tool.js";

export const gitlabTools = [
  // ── gitlab-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "gitlab_action",
    description: "Interact with the GitLab REST API: search projects, get project details, list issues and merge requests, and look up users. Supports self-hosted GitLab instances.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["search_projects", "get_project", "list_issues", "list_mrs", "get_user"], description: "Action: search_projects, get_project, list_issues, list_mrs, get_user." },
        access_token: { type: "string", description: "GitLab personal access token (PAT)." },
        base_url:     { type: "string", description: "GitLab base URL (default: https://gitlab.com/api/v4). Set for self-hosted instances." },
        query:        { type: "string", description: "Search query string (for search_projects)." },
        project_id:   { type: "string", description: "Project ID or URL-encoded namespace/project path." },
        state:        { type: "string", description: "Filter by state: opened, closed, merged." },
        labels:       { type: "string", description: "Comma-separated label names to filter by." },
        username:     { type: "string", description: "GitLab username (for get_user)." },
        per_page:     { type: "number", description: "Results per page." },
        page:         { type: "number", description: "Page number." },
      },
      required: ["action"],
    },
  },
] as const;

export const gitlabHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gitlab-tool.ts
  gitlab_action:           (args) => gitlabAction(String(args.action ?? ""), args),
};
