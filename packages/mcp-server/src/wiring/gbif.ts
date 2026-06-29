// wiring/gbif.ts
// Per-app MCP wiring for the gbif connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { gbifSearchSpecies, gbifSpeciesDetail, gbifOccurrences } from "../gbif-tool.js";

export const gbifTools = [
  // ── gbif-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "gbif_search_species",
    description: "Search GBIF for biodiversity species by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Species name to search for." },
        limit: { type: "number" as const, description: "Max results (default 10, max 50)." },
      }, required: ["query"],
    },
  },
  {
    name: "gbif_species_detail",
    description: "Get full taxonomy details for a GBIF species by key.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        species_key: { type: "string" as const, description: "GBIF taxon key (numeric)." },
      }, required: ["species_key"],
    },
  },
  {
    name: "gbif_occurrences",
    description: "Search GBIF biodiversity occurrence records by species and/or country.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        species_key: { type: "string" as const, description: "GBIF taxon key to filter by." },
        country: { type: "string" as const, description: "ISO 2-letter country code." },
        limit: { type: "number" as const, description: "Max results (default 10, max 50)." },
      },
    },
  },
] as const;

export const gbifHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gbif-tool.ts
  gbif_search_species:       (args) => gbifSearchSpecies(args),
  gbif_species_detail:       (args) => gbifSpeciesDetail(args),
  gbif_occurrences:          (args) => gbifOccurrences(args),};
