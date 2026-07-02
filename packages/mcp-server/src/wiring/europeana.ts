// wiring/europeana.ts
// Per-app MCP wiring for the europeana connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { europeanaSearch, europeanaRecord } from "../europeana-tool.js";

export const europeanaTools = [
  // ── europeana-tool.ts ────────────────────────────────────────────────────────
  {
    name: "europeana_search",
    description: "Search Europeana for European cultural heritage objects (art, books, music, film).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search query." },
        rows: { type: "number" as const, description: "Results per page (max 100, default 10)." },
        start: { type: "number" as const, description: "Result offset (default 1)." },
      }, required: ["query"],
    },
  },
  {
    name: "europeana_record",
    description: "Get details of a Europeana cultural heritage record by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Europeana record ID (e.g. /123/abc)." },
      }, required: ["id"],
    },
  },
] as const;

export const europeanaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // europeana-tool.ts
  europeana_search:          (args) => europeanaSearch(args),
  europeana_record:          (args) => europeanaRecord(args),
};
