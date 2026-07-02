// wiring/crossref.ts
// Per-app MCP wiring for the crossref connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { crossrefSearchWorks, crossrefGetWork } from "../crossref-tool.js";

export const crossrefTools = [
  // ── crossref-tool.ts ──────────────────────────────────────────────────────
  {
    name: "crossref_search_works",
    description: "Search academic papers on Crossref by title, author, or keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search query (title, author, or keyword)." },
        rows: { type: "number" as const, description: "Max results (default 5, max 20)." },
      }, required: ["query"],
    },
  },
  {
    name: "crossref_get_work",
    description: "Get full metadata for an academic paper by DOI from Crossref.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        doi: { type: "string" as const, description: "DOI of the paper (e.g. 10.1038/nature12373)." },
      }, required: ["doi"],
    },
  },
] as const;

export const crossrefHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crossref-tool.ts
  crossref_search_works:     (args) => crossrefSearchWorks(args),
  crossref_get_work:         (args) => crossrefGetWork(args),};
