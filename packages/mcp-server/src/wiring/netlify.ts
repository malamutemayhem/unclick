// wiring/netlify.ts
// Per-app MCP wiring for the netlify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { netlifyListSites, netlifyGetSite, netlifyListDeploys, netlifyGetDeploy } from "../netlify-tool.js";

export const netlifyTools = [
  // ── netlify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "netlify_list_sites",
    description: "List Netlify sites for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        name: { type: "string", description: "Filter sites by name" },
        limit: { type: "number", description: "Sites to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_get_site",
    description: "Get a single Netlify site by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        site_id: { type: "string", description: "Netlify site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_list_deploys",
    description: "List recent deploys for a Netlify site (signals when the latest deploy failed).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        site_id: { type: "string", description: "Netlify site id (can be a saved default)" },
        limit: { type: "number", description: "Deploys to return (max 100, default 10)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_get_deploy",
    description: "Get a single Netlify deploy by id (including build logs metadata).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        deploy_id: { type: "string", description: "Netlify deploy id" },
      },
      required: ["access_token", "deploy_id"],
    },
  },
] as const;

export const netlifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // netlify-tool.ts
  netlify_list_sites:      (args) => netlifyListSites(args),
  netlify_get_site:        (args) => netlifyGetSite(args),
  netlify_list_deploys:    (args) => netlifyListDeploys(args),
  netlify_get_deploy:      (args) => netlifyGetDeploy(args),
};
