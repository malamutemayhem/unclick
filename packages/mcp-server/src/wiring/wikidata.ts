// wiring/wikidata.ts
// Per-app MCP wiring for the wikidata connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wikidataSearch, wikidataGetEntity } from "../wikidata-tool.js";

export const wikidataTools = [
  // ── wikidata-tool.ts ──────────────────────────────────────────────────────
  {
    name: "wikidata_search",
    description: "Search Wikidata for entities (people, places, concepts) by label.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search term." },
        limit: { type: "number" as const, description: "Max results (default 5, max 20)." },
        language: { type: "string" as const, description: "Language code (default: en)." },
      }, required: ["query"],
    },
  },
  {
    name: "wikidata_get_entity",
    description: "Get structured data for a Wikidata entity by Q-id (e.g. Q42).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Wikidata entity ID (e.g. Q42)." },
        language: { type: "string" as const, description: "Language code (default: en)." },
      }, required: ["id"],
    },
  },
] as const;

export const wikidataHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wikidata-tool.ts
  wikidata_search:           (args) => wikidataSearch(args),
  wikidata_get_entity:       (args) => wikidataGetEntity(args),};
