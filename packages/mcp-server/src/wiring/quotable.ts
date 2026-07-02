// wiring/quotable.ts
// Per-app MCP wiring for the quotable connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { quoteRandom, quoteSearch, quoteByAuthor, quoteListTags, quoteListAuthors } from "../quotable-tool.js";

export const quotableTools = [
  // ── quotable-tool.ts ────────────────────────────────────────────────────────
  {
    name: "quote_random",
    description: "Get a random inspirational quote.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tags: { type: "string", description: "Comma-separated tags to filter by (e.g. 'wisdom,life')" },
      },
    },
  },
  {
    name: "quote_search",
    description: "Search quotes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "quote_by_author",
    description: "Get quotes by a specific author.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author: { type: "string", description: "Author name or slug" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["author"],
    },
  },
  {
    name: "quote_list_tags",
    description: "List all available quote tags/categories.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "quote_list_authors",
    description: "List quote authors sorted by number of quotes.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 20)" },
      },
    },
  },
] as const;

export const quotableHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // quotable-tool.ts
  quote_random:            (args) => quoteRandom(args),
  quote_search:            (args) => quoteSearch(args),
  quote_by_author:         (args) => quoteByAuthor(args),
  quote_list_tags:         (args) => quoteListTags(args),
  quote_list_authors:      (args) => quoteListAuthors(args),
};
