// wiring/confluence.ts
// Per-app MCP wiring for the confluence connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { confluenceSearch, confluenceGetPage, confluenceListSpaces } from "../confluence-tool.js";

export const confluenceTools = [
  // ── confluence-tool.ts ────────────────────────────────────────────────────────
  {
    name: "confluence_search",
    description: "Search Confluence pages by text.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      query: { type: "string", description: "Text to search for" },
      limit: { type: "number", description: "Results to return (max 50, default 25)" },
    }, required: ["site", "email", "api_token", "query"] },
  },
  {
    name: "confluence_get_page",
    description: "Get a Confluence page by id, including its body.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      page_id: { type: "string", description: "Confluence content/page id" },
    }, required: ["site", "email", "api_token", "page_id"] },
  },
  {
    name: "confluence_list_spaces",
    description: "List Confluence spaces.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      limit: { type: "number", description: "Spaces to return (max 100, default 50)" },
    }, required: ["site", "email", "api_token"] },
  },
] as const;

export const confluenceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // confluence-tool.ts
  confluence_search:       (args) => confluenceSearch(args),
  confluence_get_page:     (args) => confluenceGetPage(args),
  confluence_list_spaces:  (args) => confluenceListSpaces(args),
};
