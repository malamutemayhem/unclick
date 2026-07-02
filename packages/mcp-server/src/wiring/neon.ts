// wiring/neon.ts
// Per-app MCP wiring for the neon connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Cloud

import { neonListProjects, neonGetProject, neonListBranches, neonCreateBranch, neonListDatabases, neonExecuteSql } from "../neon-tool.js";

export const neonTools = [
  // ── neon-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "neon_list_projects",
    description: "List all Neon Serverless Postgres projects in your account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Neon API key" },
        limit: { type: "number", description: "Max projects to return (default 10)" },
        cursor: { type: "string", description: "Pagination cursor" },
      },
    },
  },
  {
    name: "neon_get_project",
    description: "Get details for a specific Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string", description: "Neon project ID" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_list_branches",
    description: "List all branches in a Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_create_branch",
    description: "Create a new branch in a Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_name: { type: "string", description: "Name for the new branch" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_list_databases",
    description: "List all databases on a Neon branch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_id: { type: "string" },
      },
      required: ["project_id", "branch_id"],
    },
  },
  {
    name: "neon_execute_sql",
    description: "Execute a SQL query against a Neon database endpoint.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_id: { type: "string" },
        endpoint_id: { type: "string" },
        query: { type: "string", description: "SQL query to execute" },
        database_name: { type: "string", description: "Target database name" },
      },
      required: ["project_id", "branch_id", "endpoint_id", "query", "database_name"],
    },
  },
] as const;

export const neonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // neon-tool.ts
  neon_list_projects:      (args) => neonListProjects(args),
  neon_get_project:        (args) => neonGetProject(args),
  neon_list_branches:      (args) => neonListBranches(args),
  neon_create_branch:      (args) => neonCreateBranch(args),
  neon_list_databases:     (args) => neonListDatabases(args),
  neon_execute_sql:        (args) => neonExecuteSql(args),
};
