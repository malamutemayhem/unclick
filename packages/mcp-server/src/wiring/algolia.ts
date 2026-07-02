// wiring/algolia.ts
// Per-app MCP wiring for the algolia connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { algoliaSearch, algoliaGetObject, algoliaListIndices, algoliaBrowseIndex } from "../algolia-tool.js";

export const algoliaTools = [
  // ── algolia-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "algolia_search",
    description: "Search an Algolia index for records matching a query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia API Key (Search or Admin)" },
        index: { type: "string", description: "Index name to search" },
        query: { type: "string", description: "Search query text" },
        filters: { type: "string", description: "Algolia filter expression (e.g. category:electronics)" },
        hits_per_page: { type: "number", description: "Results per page (default: 20)" },
        page: { type: "number", description: "Page number (0-indexed)" },
        attributes_to_retrieve: { type: "array", items: { type: "string" }, description: "Attributes to include in results" },
      },
      required: ["app_id", "api_key", "index"],
    },
  },
  {
    name: "algolia_get_object",
    description: "Retrieve a single record from an Algolia index by its objectID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia API Key" },
        index: { type: "string", description: "Index name" },
        object_id: { type: "string", description: "Record objectID" },
      },
      required: ["app_id", "api_key", "index", "object_id"],
    },
  },
  {
    name: "algolia_list_indices",
    description: "List all Algolia indices in the application.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia Admin API Key" },
      },
      required: ["app_id", "api_key"],
    },
  },
  {
    name: "algolia_browse_index",
    description: "Browse all records in an Algolia index (paginated cursor-based).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia Admin API Key" },
        index: { type: "string", description: "Index name" },
        filters: { type: "string", description: "Filter expression" },
        hits_per_page: { type: "number", description: "Records per page" },
        cursor: { type: "string", description: "Pagination cursor from previous response" },
        attributes_to_retrieve: { type: "array", items: { type: "string" }, description: "Attributes to include" },
      },
      required: ["app_id", "api_key", "index"],
    },
  },
] as const;

export const algoliaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // algolia-tool.ts
  algolia_search:          (args) => algoliaSearch(args),
  algolia_get_object:      (args) => algoliaGetObject(args),
  algolia_list_indices:    (args) => algoliaListIndices(args),
  algolia_browse_index:    (args) => algoliaBrowseIndex(args),
};
