// wiring/openalex.ts
// Per-app MCP wiring for the openalex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openalexSearchWorks, openalexGetWork, openalexSearchAuthors } from "../openalex-tool.js";

export const openalexTools = [
  // ── openalex-tool.ts ──────────────────────────────────────────────────────
  {
    name: "openalex_search_works",
    description: "Search OpenAlex for scholarly works by keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search term." },
        per_page: { type: "number" as const, description: "Results per page (default 5, max 25)." },
      }, required: ["query"],
    },
  },
  {
    name: "openalex_get_work",
    description: "Get full metadata for a scholarly work by OpenAlex ID or DOI.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "OpenAlex ID (e.g. W2741809807) or DOI URL." },
      }, required: ["id"],
    },
  },
  {
    name: "openalex_search_authors",
    description: "Search OpenAlex for academic authors by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Author name to search." },
        per_page: { type: "number" as const, description: "Results per page (default 5, max 25)." },
      }, required: ["query"],
    },
  },
] as const;

export const openalexHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openalex-tool.ts
  openalex_search_works:     (args) => openalexSearchWorks(args),
  openalex_get_work:         (args) => openalexGetWork(args),
  openalex_search_authors:   (args) => openalexSearchAuthors(args),};
