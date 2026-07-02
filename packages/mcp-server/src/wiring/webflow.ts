// wiring/webflow.ts
// Per-app MCP wiring for the webflow connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { webflowListSites, webflowGetSite, webflowListCollections, webflowListItems } from "../webflow-tool.js";

export const webflowTools = [
  // ── webflow-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "webflow_list_sites",
    description: "List Webflow sites for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_get_site",
    description: "Get a single Webflow site by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        site_id: { type: "string", description: "Webflow site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_list_collections",
    description: "List CMS collections for a Webflow site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        site_id: { type: "string", description: "Webflow site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_list_items",
    description: "List items in a Webflow CMS collection.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        collection_id: { type: "string", description: "Webflow collection id" },
        limit: { type: "number", description: "Items to return (max 100, default 25)" },
        offset: { type: "number", description: "Pagination offset" },
      },
      required: ["access_token", "collection_id"],
    },
  },
] as const;

export const webflowHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // webflow-tool.ts
  webflow_list_sites:       (args) => webflowListSites(args),
  webflow_get_site:         (args) => webflowGetSite(args),
  webflow_list_collections: (args) => webflowListCollections(args),
  webflow_list_items:       (args) => webflowListItems(args),
};
