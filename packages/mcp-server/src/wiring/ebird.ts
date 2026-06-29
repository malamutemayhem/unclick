// wiring/ebird.ts
// Per-app MCP wiring for the ebird connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Environment / Science

import { getRecentObservations, getNotableObservations, getSpeciesInfo } from "../ebird-tool.js";

export const ebirdTools = [
  // ── ebird-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "ebird_recent_observations",
    description: "Get recent bird observations from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        regionCode: { type: "string", description: "e.g. AU-VIC" },
        back: { type: "number", description: "Days back (max 30)" },
        maxResults: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["regionCode"],
    },
  },
  {
    name: "ebird_notable_observations",
    description: "Get notable/rare bird observations from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        regionCode: { type: "string" },
        back: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["regionCode"],
    },
  },
  {
    name: "ebird_species_info",
    description: "Get information about a bird species from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        speciesCode: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["speciesCode"],
    },
  },
] as const;

export const ebirdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ebird-tool.ts
  ebird_recent_observations:  (args) => getRecentObservations(args),
  ebird_notable_observations: (args) => getNotableObservations(args),
  ebird_species_info:         (args) => getSpeciesInfo(args),
};
