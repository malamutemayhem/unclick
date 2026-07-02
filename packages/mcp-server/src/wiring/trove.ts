// wiring/trove.ts
// Per-app MCP wiring for the trove connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { searchTrove, getTroveWork, getTroveNewspaperArticle } from "../trove-tool.js";

export const troveTools = [
  // ── trove-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "trove_search",
    description: "Search the National Library of Australia's Trove.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        zone: { type: "string", description: "e.g. newspaper, book" },
        n: { type: "number", description: "Number of results" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "trove_get_work",
    description: "Get a specific Trove work by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "trove_newspaper_article",
    description: "Get a specific Trove newspaper article by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
] as const;

export const troveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // trove-tool.ts
  trove_search:         (args) => searchTrove(args),
  trove_get_work:       (args) => getTroveWork(args),
  trove_newspaper_article:(args) => getTroveNewspaperArticle(args),
};
