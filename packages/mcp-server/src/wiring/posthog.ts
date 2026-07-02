// wiring/posthog.ts
// Per-app MCP wiring for the posthog connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { posthogListFeatureFlags, posthogListInsights, posthogListPersons, posthogQuery } from "../posthog-tool.js";

export const posthogTools = [
  // ── posthog-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "posthog_list_feature_flags",
    description: "List PostHog feature flags for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_list_insights",
    description: "List saved PostHog insights (charts) for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        search: { type: "string", description: "Filter insights by name" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_list_persons",
    description: "List PostHog persons (users) for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        search: { type: "string", description: "Filter persons by email or properties" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_query",
    description: "Run an ad-hoc HogQL (SQL) query against a PostHog project's events.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        query: { type: "string", description: "HogQL/SQL query (e.g. select count() from events)" },
      },
      required: ["api_key", "query"],
    },
  },
] as const;

export const posthogHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // posthog-tool.ts
  posthog_list_feature_flags: (args) => posthogListFeatureFlags(args),
  posthog_list_insights:      (args) => posthogListInsights(args),
  posthog_list_persons:       (args) => posthogListPersons(args),
  posthog_query:              (args) => posthogQuery(args),
};
