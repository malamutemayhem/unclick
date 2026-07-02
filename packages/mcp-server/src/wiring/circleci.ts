// wiring/circleci.ts
// Per-app MCP wiring for the circleci connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { circleci_list_pipelines, circleci_get_pipeline, circleci_list_workflows, circleci_get_workflow, circleci_list_jobs, circleci_trigger_pipeline } from "../circleci-tool.js";

export const circleciTools = [
  // ── circleci-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "circleci_list_pipelines",
    description: "List CircleCI pipelines for a project or organization. Optionally filter by branch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        project_slug: { type: "string", description: "Project slug e.g. gh/MyOrg/my-repo. Omit to list all org pipelines." },
        branch: { type: "string", description: "Filter by branch name" },
        org_slug: { type: "string", description: "Org slug when listing all pipelines (e.g. gh/MyOrg)" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "circleci_get_pipeline",
    description: "Get details for a single CircleCI pipeline by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        pipeline_id: { type: "string", description: "Pipeline ID" },
      },
      required: ["api_key", "pipeline_id"],
    },
  },
  {
    name: "circleci_list_workflows",
    description: "List workflows for a CircleCI pipeline.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        pipeline_id: { type: "string", description: "Pipeline ID" },
      },
      required: ["api_key", "pipeline_id"],
    },
  },
  {
    name: "circleci_get_workflow",
    description: "Get details for a single CircleCI workflow by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        workflow_id: { type: "string", description: "Workflow ID" },
      },
      required: ["api_key", "workflow_id"],
    },
  },
  {
    name: "circleci_list_jobs",
    description: "List jobs in a CircleCI workflow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        workflow_id: { type: "string", description: "Workflow ID" },
      },
      required: ["api_key", "workflow_id"],
    },
  },
  {
    name: "circleci_trigger_pipeline",
    description: "Trigger a new CircleCI pipeline for a project. Optionally specify branch, tag, or parameters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        project_slug: { type: "string", description: "Project slug e.g. gh/MyOrg/my-repo" },
        branch: { type: "string", description: "Branch to build (default: main/master)" },
        tag: { type: "string", description: "Tag to build" },
        parameters: { type: "object", additionalProperties: true, description: "Pipeline parameters as key-value pairs" },
      },
      required: ["api_key", "project_slug"],
    },
  },
] as const;

export const circleciHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // circleci-tool.ts
  circleci_list_pipelines:  (args) => circleci_list_pipelines(args),
  circleci_get_pipeline:    (args) => circleci_get_pipeline(args),
  circleci_list_workflows:  (args) => circleci_list_workflows(args),
  circleci_get_workflow:    (args) => circleci_get_workflow(args),
  circleci_list_jobs:       (args) => circleci_list_jobs(args),
  circleci_trigger_pipeline:(args) => circleci_trigger_pipeline(args),
};
