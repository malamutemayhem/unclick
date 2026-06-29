// wiring/vercel.ts
// Per-app MCP wiring for the vercel connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Infra

import { listVercelDeployments, getVercelDeployment, listVercelProjects, getVercelDomain, getVercelEnv, createVercelEnv, deleteVercelEnv, createVercelDeployment } from "../vercel-tool.js";

export const vercelTools = [
  // ── vercel-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "vercel_list_deployments",
    description: "List Vercel deployments for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        projectId: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "vercel_get_deployment",
    description: "Get details for a specific Vercel deployment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deploymentId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["deploymentId"],
    },
  },
  {
    name: "vercel_list_projects",
    description: "List all Vercel projects.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const vercelHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // vercel-tool.ts
  vercel_list_deployments:(args) => listVercelDeployments(args),
  vercel_get_deployment:(args) => getVercelDeployment(args),
  vercel_list_projects: (args) => listVercelProjects(args),
  vercel_get_domain:    (args) => getVercelDomain(args),
  vercel_get_env:       (args) => getVercelEnv(args),
  vercel_create_env:    (args) => createVercelEnv(args),
  vercel_delete_env:    (args) => deleteVercelEnv(args),
  vercel_create_deployment:(args) => createVercelDeployment(args),
};
