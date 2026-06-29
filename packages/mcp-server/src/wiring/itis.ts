// wiring/itis.ts
// Per-app MCP wiring for the itis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { itisSearchByName, itisGetFullRecord } from "../itis-tool.js";

export const itisTools = [
  // ── itis-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "itis_search_by_name",
    description: "Search USDA ITIS for species by common name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Common name to search (e.g. lion, oak, salmon)." },
      }, required: ["name"],
    },
  },
  {
    name: "itis_get_full_record",
    description: "Get full taxonomic record from USDA ITIS by TSN (Taxonomic Serial Number).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        tsn: { type: "string" as const, description: "Taxonomic Serial Number." },
      }, required: ["tsn"],
    },
  },
] as const;

export const itisHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // itis-tool.ts
  itis_search_by_name:       (args) => itisSearchByName(args),
  itis_get_full_record:      (args) => itisGetFullRecord(args),};
