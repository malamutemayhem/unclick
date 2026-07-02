// wiring/sentry.ts
// Per-app MCP wiring for the sentry connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Developer / Productivity

import { sentryAction } from "../sentry-tool.js";

export const sentryTools = [
  // ── sentry-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "sentry_action",
    description: "Interact with the Sentry REST API: list projects and issues, get issue details and events, and resolve issues.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:            { type: "string", enum: ["list_projects", "list_issues", "get_issue", "list_events", "resolve_issue"], description: "Action: list_projects, list_issues, get_issue, list_events, resolve_issue." },
        auth_token:        { type: "string", description: "Sentry auth token." },
        organization_slug: { type: "string", description: "Sentry organization slug." },
        project_slug:      { type: "string", description: "Sentry project slug." },
        issue_id:          { type: "string", description: "Issue ID (for get_issue, list_events, resolve_issue)." },
        query:             { type: "string", description: "Search query to filter issues." },
        stats_period:      { type: "string", description: "Time window for issue stats: 24h, 14d, etc." },
        limit:             { type: "number", description: "Max number of results." },
        cursor:            { type: "string", description: "Pagination cursor." },
      },
      required: ["action", "auth_token"],
    },
  },
] as const;

export const sentryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sentry-tool.ts
  sentry_action:           (args) => sentryAction(String(args.action ?? ""), args),
};
