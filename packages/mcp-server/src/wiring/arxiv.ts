// wiring/arxiv.ts
// Per-app MCP wiring for the arxiv connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { arxivSearch } from "../arxiv-tool.js";

export const arxivTools = [
  // ── arxiv-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "arxiv_search",
    description: "Search arXiv for scientific preprints by keyword, title, or author.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search term or arXiv query." },
        max_results: { type: "number" as const, description: "Max papers to return (default 5, max 20)." },
      }, required: ["query"],
    },
  },
] as const;

export const arxivHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // arxiv-tool.ts
  arxiv_search:              (args) => arxivSearch(args),};
