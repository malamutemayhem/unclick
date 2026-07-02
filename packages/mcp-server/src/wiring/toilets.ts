// wiring/toilets.ts
// Per-app MCP wiring for the toilets connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Environment / Science

import { findNearestToilets, getToiletDetails } from "../toilets-tool.js";

export const toiletsTools = [
  // ── toilets-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "find_nearest_toilets",
    description: "Find the nearest public toilets to a location (Australia).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        radius: { type: "number", description: "Search radius in metres" },
        limit: { type: "number" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "get_toilet_details",
    description: "Get details for a specific public toilet by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        toilet_id: { type: "string" },
      },
      required: ["toilet_id"],
    },
  },
] as const;

export const toiletsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // toilets-tool.ts
  find_nearest_toilets: (args) => findNearestToilets(args),
  get_toilet_details:   (args) => getToiletDetails(args),
};
