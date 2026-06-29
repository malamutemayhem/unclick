// wiring/jira.ts
// Per-app MCP wiring for the jira connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { jiraSearchIssues, jiraGetIssue, jiraListProjects, jiraCreateIssue, jiraAddComment } from "../jira-tool.js";

export const jiraTools = [
  // ── jira-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "jira_search_issues",
    description: "Search Jira issues with JQL (defaults to most recently updated).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany or mycompany.atlassian.net)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        jql: { type: "string", description: "JQL query (e.g. 'project = ENG AND status = \"In Progress\"')" },
        max_results: { type: "number", description: "Issues to return (max 100, default 25)" },
        fields: { type: "string", description: "Comma-separated fields to return" },
      },
      required: ["site", "email", "api_token"],
    },
  },
  {
    name: "jira_get_issue",
    description: "Get a single Jira issue by key, including description and comments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        issue_key: { type: "string", description: "Issue key (e.g. ENG-123)" },
      },
      required: ["site", "email", "api_token", "issue_key"],
    },
  },
  {
    name: "jira_list_projects",
    description: "List Jira projects, with an optional name query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        query: { type: "string", description: "Filter projects by name or key" },
        max_results: { type: "number", description: "Projects to return (max 100, default 50)" },
      },
      required: ["site", "email", "api_token"],
    },
  },
  {
    name: "jira_create_issue",
    description: "Create a Jira issue. project_key can be filled from a saved memory default.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        project_key: { type: "string", description: "Project key (e.g. ENG). Can be a saved default." },
        summary: { type: "string", description: "Issue summary / title" },
        issue_type: { type: "string", description: "Issue type name (default Task)" },
        description: { type: "string", description: "Plain-text description" },
      },
      required: ["site", "email", "api_token", "summary"],
    },
  },
  {
    name: "jira_add_comment",
    description: "Add a comment to a Jira issue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        issue_key: { type: "string", description: "Issue key (e.g. ENG-123)" },
        body: { type: "string", description: "Comment text" },
      },
      required: ["site", "email", "api_token", "issue_key", "body"],
    },
  },
] as const;

export const jiraHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jira-tool.ts
  jira_search_issues:      (args) => jiraSearchIssues(args),
  jira_get_issue:          (args) => jiraGetIssue(args),
  jira_list_projects:      (args) => jiraListProjects(args),
  jira_create_issue:       (args) => jiraCreateIssue(args),
  jira_add_comment:        (args) => jiraAddComment(args),
};
