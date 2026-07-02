// wiring/wikipedia.ts
// Per-app MCP wiring for the wikipedia connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { wikipediaSearch, wikipediaSummary, wikipediaPage } from "../wikipedia-tool.js";

export const wikipediaTools = [
  // ── wikipedia-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "wikipedia_search",
    description: "Search Wikipedia article titles. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      query: { type: "string", description: "What to search for" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
      limit: { type: "number", description: "Results to return (max 50, default 10)" },
    }, required: ["query"] },
  },
  {
    name: "wikipedia_summary",
    description: "Get a short Wikipedia summary for a page title. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      title: { type: "string", description: "Exact page title" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
    }, required: ["title"] },
  },
  {
    name: "wikipedia_page",
    description: "Get the full plain-text Wikipedia article for a title. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      title: { type: "string", description: "Exact page title" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
    }, required: ["title"] },
  },
] as const;

export const wikipediaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wikipedia-tool.ts
  wikipedia_search:        (args) => wikipediaSearch(args),
  wikipedia_summary:       (args) => wikipediaSummary(args),
  wikipedia_page:          (args) => wikipediaPage(args),
};
