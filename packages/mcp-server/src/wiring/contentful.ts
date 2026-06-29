// wiring/contentful.ts
// Per-app MCP wiring for the contentful connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { contentfulListEntries, contentfulGetEntry, contentfulListContentTypes, contentfulListAssets } from "../contentful-tool.js";

export const contentfulTools = [
  // ── contentful-tool.ts ────────────────────────────────────────────────────────
  {
    name: "contentful_list_entries",
    description: "List Contentful entries, optionally filtered by content_type or full-text query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        content_type: { type: "string", description: "Filter to one content type id" },
        query: { type: "string", description: "Full-text search query" },
        limit: { type: "number", description: "Entries to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "contentful_get_entry",
    description: "Get a single Contentful entry by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        entry_id: { type: "string", description: "Entry id" },
      },
      required: ["access_token", "entry_id"],
    },
  },
  {
    name: "contentful_list_content_types",
    description: "List Contentful content types (the content model).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "contentful_list_assets",
    description: "List Contentful media assets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        limit: { type: "number", description: "Assets to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },
] as const;

export const contentfulHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // contentful-tool.ts
  contentful_list_entries:       (args) => contentfulListEntries(args),
  contentful_get_entry:          (args) => contentfulGetEntry(args),
  contentful_list_content_types: (args) => contentfulListContentTypes(args),
  contentful_list_assets:        (args) => contentfulListAssets(args),
};
