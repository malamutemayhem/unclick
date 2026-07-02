// wiring/supabase.ts
// Per-app MCP wiring for the supabase connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Infra

import { listSupabaseProjects, getSupabaseProject, listSupabaseOrganizations, executeSupabaseSql, applySupabaseMigration } from "../supabase-tool.js";

export const supabaseTools = [
  // ── supabase-tool.ts ───────────────────────────────────────────────────────
  {
    name: "supabase_list_projects",
    description: "List Supabase projects visible to the connected Supabase account. Read-only Management API call.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        organization_id: { type: "string", description: "Optional Supabase organization id filter." },
        access_token: { type: "string", description: "Optional Supabase access token. Omit it to use the connected Supabase login when available." },
        api_key: { type: "string", description: "Legacy token alias." },
      },
    },
  },
  {
    name: "supabase_get_project",
    description: "Get one Supabase project by project_ref. Read-only Management API call.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_ref: { type: "string", description: "Supabase project ref, for example abcdefghijklmnop." },
        ref: { type: "string", description: "Legacy alias for project_ref." },
        access_token: { type: "string", description: "Optional Supabase access token. Omit it to use the connected Supabase login when available." },
        api_key: { type: "string", description: "Legacy token alias." },
      },
      required: ["project_ref"],
    },
  },
  {
    name: "supabase_list_organizations",
    description: "List Supabase organizations visible to the connected Supabase account. Read-only Management API call.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Supabase access token. Omit it to use the connected Supabase login when available." },
        api_key: { type: "string", description: "Legacy token alias." },
      },
    },
  },
  {
    name: "supabase_execute_sql",
    description: "Run a SQL statement against a Supabase project's database via the Management API. Destructive statements require confirm: true.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_ref: { type: "string", description: "Supabase project ref (the xxxx in xxxx.supabase.co)." },
        sql: { type: "string", description: "The SQL to run." },
        confirm: { type: "boolean", description: "Set true to allow a destructive statement the guard would block." },
        access_token: { type: "string", description: "Optional Supabase access token. Omit to use the connected login." },
        api_key: { type: "string", description: "Legacy token alias." },
      },
      required: ["project_ref", "sql"],
    },
  },
  {
    name: "supabase_apply_migration",
    description: "Apply a named, tracked migration to a Supabase project's database via the Management API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_ref: { type: "string", description: "Supabase project ref." },
        name: { type: "string", description: "Short snake_case migration name." },
        sql: { type: "string", description: "The migration SQL." },
        access_token: { type: "string", description: "Optional Supabase access token. Omit to use the connected login." },
        api_key: { type: "string", description: "Legacy token alias." },
      },
      required: ["project_ref", "name", "sql"],
    },
  },
  {
    name: "vercel_get_domain",
    description: "Get information about a Vercel domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
  {
    name: "vercel_get_env",
    description: "Get environment variables for a Vercel project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        projectId: { type: "string", description: "Legacy alias for project_id." },
        team_id: { type: "string" },
        decrypt: { type: "boolean" },
        api_key: { type: "string" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "vercel_create_env",
    description:
      "Create (or upsert) an environment variable on a Vercel project. Target defaults to production, preview, and development. Use type='plain' for non-secret values, 'encrypted' or 'sensitive' for secrets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        key: { type: "string" },
        value: { type: "string" },
        target: {
          type: "string",
          description: "CSV of environments: 'production,preview,development'. Defaults to all three.",
        },
        type: {
          type: "string",
          description: "plain | encrypted | sensitive | secret | system. Defaults to plain.",
        },
        git_branch: { type: "string" },
        comment: { type: "string" },
        upsert: { type: "boolean", description: "Overwrite existing value for same key/target. Default true." },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["project_id", "key", "value"],
    },
  },
  {
    name: "vercel_delete_env",
    description: "Delete a Vercel environment variable by its env id (get ids from vercel_get_env).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        env_id: { type: "string" },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["project_id", "env_id"],
    },
  },
  {
    name: "vercel_create_deployment",
    description:
      "Create a Vercel deployment. Pass deployment_id to redeploy an existing commit, or project_id + git_ref to deploy fresh from git. Set force_new=true to skip the build cache (needed after env var changes or when serverless function surfaces change).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deployment_id: { type: "string", description: "Redeploy the git source of this existing deployment." },
        project_id: { type: "string", description: "Deploy fresh from the project's linked git repo." },
        git_ref: { type: "string", description: "Branch or SHA to deploy. Defaults to 'main'." },
        target: { type: "string", description: "'production' (default) or 'preview'." },
        force_new: { type: "boolean", description: "Skip build cache. Default false." },
        name: { type: "string" },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const supabaseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // supabase-tool.ts
  supabase_list_projects:      (args) => listSupabaseProjects(args),
  supabase_get_project:        (args) => getSupabaseProject(args),
  supabase_list_organizations: (args) => listSupabaseOrganizations(args),
  supabase_execute_sql:        (args) => executeSupabaseSql(args),
  supabase_apply_migration:    (args) => applySupabaseMigration(args),
};
