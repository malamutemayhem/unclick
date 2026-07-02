// wiring/pipedrive.ts
// Per-app MCP wiring for the pipedrive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { pipedriveListDeals, pipedriveListPersons, pipedriveListOrganizations, pipedriveSearchDeals } from "../pipedrive-tool.js";

export const pipedriveTools = [
  // ── pipedrive-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "pipedrive_list_deals",
    description: "List Pipedrive deals.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      status: { type: "string", description: "Filter by status (open, won, lost, deleted, all_not_deleted)" },
      limit: { type: "number", description: "Deals to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_list_persons",
    description: "List Pipedrive persons (contacts).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      limit: { type: "number", description: "Persons to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_list_organizations",
    description: "List Pipedrive organizations (companies).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      limit: { type: "number", description: "Organizations to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_search_deals",
    description: "Search Pipedrive deals by term.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      term: { type: "string", description: "Search term (deal title or keyword)" },
      limit: { type: "number", description: "Results to return (max 100, default 25)" },
    }, required: ["api_token", "term"] },
  },
] as const;

export const pipedriveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pipedrive-tool.ts
  pipedrive_list_deals:         (args) => pipedriveListDeals(args),
  pipedrive_list_persons:       (args) => pipedriveListPersons(args),
  pipedrive_list_organizations: (args) => pipedriveListOrganizations(args),
  pipedrive_search_deals:       (args) => pipedriveSearchDeals(args),
};
