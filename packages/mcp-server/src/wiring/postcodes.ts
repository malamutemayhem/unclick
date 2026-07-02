// wiring/postcodes.ts
// Per-app MCP wiring for the postcodes connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { postcodeLookup, postcodeRandom } from "../postcodes-tool.js";

export const postcodesTools = [
  // ── postcodes-tool.ts ──────────────────────────────────────────────────────
  {
    name: "postcode_lookup",
    description: "Look up a UK postcode for lat/lon, region, district, ward, and constituency.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        postcode: { type: "string" as const, description: "UK postcode (e.g. SW1A 1AA)." },
      }, required: ["postcode"],
    },
  },
  {
    name: "postcode_random",
    description: "Get a random UK postcode with full location details.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const postcodesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // postcodes-tool.ts
  postcode_lookup:           (args) => postcodeLookup(args),
  postcode_random:           (args) => postcodeRandom(args),};
