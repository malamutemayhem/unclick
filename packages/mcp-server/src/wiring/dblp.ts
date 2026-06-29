// wiring/dblp.ts
// Per-app MCP wiring for the dblp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dblpSearchPublications, dblpSearchAuthors } from "../dblp-tool.js";

export const dblpTools = [
  // ── dblp-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "dblp_search_publications",
    description: "Search DBLP for computer science publications.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Title, author, or keyword." },
        max_results: { type: "number" as const, description: "Max results (default 10, max 30)." },
      }, required: ["query"],
    },
  },
  {
    name: "dblp_search_authors",
    description: "Search DBLP for computer science researchers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Author name." },
        max_results: { type: "number" as const, description: "Max results (default 10, max 30)." },
      }, required: ["query"],
    },
  },
] as const;

export const dblpHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dblp-tool.ts
  dblp_search_publications:  (args) => dblpSearchPublications(args),
  dblp_search_authors:       (args) => dblpSearchAuthors(args),};
