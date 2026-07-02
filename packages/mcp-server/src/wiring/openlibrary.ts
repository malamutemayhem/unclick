// wiring/openlibrary.ts
// Per-app MCP wiring for the openlibrary connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openlibrarySearch, openlibraryGetBook, openlibraryGetEdition, openlibraryGetAuthor, openlibraryAuthorWorks, openlibraryTrending } from "../openlibrary-tool.js";

export const openlibraryTools = [
  // ── openlibrary-tool.ts ──────────────────────────────────────────────────────
  {
    name: "openlibrary_search",
    description: "Search books on Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        limit: { type: "number" },
        page: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "openlibrary_get_book",
    description: "Get a book from Open Library by work ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        work_id: { type: "string", description: "e.g. OL45804W" },
      },
      required: ["work_id"],
    },
  },
  {
    name: "openlibrary_get_edition",
    description: "Get a book edition from Open Library by ISBN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        isbn: { type: "string" },
      },
      required: ["isbn"],
    },
  },
  {
    name: "openlibrary_get_author",
    description: "Get an author from Open Library by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string", description: "e.g. OL23919A" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_author_works",
    description: "Get works by an author from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_trending",
    description: "Get trending books from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const openlibraryHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openlibrary-tool.ts
  openlibrary_search:      (args) => openlibrarySearch(args),
  openlibrary_get_book:    (args) => openlibraryGetBook(args),
  openlibrary_get_edition: (args) => openlibraryGetEdition(args),
  openlibrary_get_author:  (args) => openlibraryGetAuthor(args),
  openlibrary_author_works:(args) => openlibraryAuthorWorks(args),
  openlibrary_trending:    (args) => openlibraryTrending(args),
};
