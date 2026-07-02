// wiring/bungie.ts
// Per-app MCP wiring for the bungie connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { bungieSearchPlayer, bungieGetProfile, bungieGetManifest, bungieSearchEntities } from "../bungie-tool.js";

export const bungieTools = [
  // ── bungie-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bungie_search_player",
    description: "Search for a Destiny 2 player by display name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        displayName: { type: "string" },
        membershipType: { type: "number", description: "-1 for all" },
        api_key: { type: "string" },
      },
      required: ["displayName"],
    },
  },
  {
    name: "bungie_get_profile",
    description: "Get a Destiny 2 player profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        membershipType: { type: "number" },
        membershipId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["membershipType", "membershipId"],
    },
  },
  {
    name: "bungie_get_manifest",
    description: "Get the Destiny 2 manifest definition.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "bungie_search_entities",
    description: "Search Destiny 2 manifest entities.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        entityType: { type: "string" },
        searchTerm: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["entityType", "searchTerm"],
    },
  },
] as const;

export const bungieHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bungie-tool.ts
  bungie_search_player: (args) => bungieSearchPlayer(args),
  bungie_get_profile:   (args) => bungieGetProfile(args),
  bungie_get_manifest:  (args) => bungieGetManifest(args),
  bungie_search_entities:(args) => bungieSearchEntities(args),
};
