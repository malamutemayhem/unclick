// wiring/turso.ts
// Per-app MCP wiring for the turso connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Cloud

import { tursoListDatabases, tursoCreateDatabase, tursoListGroups, tursoGetDatabase, tursoExecuteSql } from "../turso-tool.js";

export const tursoTools = [
  // ── turso-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "turso_list_databases",
    description: "List all databases in a Turso organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Turso API token" },
        org: { type: "string", description: "Organization name or slug" },
      },
      required: ["api_key", "org"],
    },
  },
  {
    name: "turso_create_database",
    description: "Create a new Turso SQLite edge database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        name: { type: "string", description: "Database name" },
        group: { type: "string", description: "Group to attach to (e.g. default)" },
      },
      required: ["api_key", "org", "name", "group"],
    },
  },
  {
    name: "turso_list_groups",
    description: "List all groups in a Turso organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
      },
      required: ["api_key", "org"],
    },
  },
  {
    name: "turso_get_database",
    description: "Get details for a specific Turso database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        name: { type: "string", description: "Database name" },
      },
      required: ["api_key", "org", "name"],
    },
  },
  {
    name: "turso_execute_sql",
    description: "Execute a SQL query against a Turso edge database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        db_name: { type: "string", description: "Database name" },
        sql: { type: "string", description: "SQL statement to execute" },
      },
      required: ["api_key", "org", "db_name", "sql"],
    },
  },
] as const;

export const tursoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // turso-tool.ts
  turso_list_databases:    (args) => tursoListDatabases(args),
  turso_create_database:   (args) => tursoCreateDatabase(args),
  turso_list_groups:       (args) => tursoListGroups(args),
  turso_get_database:      (args) => tursoGetDatabase(args),
  turso_execute_sql:       (args) => tursoExecuteSql(args),
};
