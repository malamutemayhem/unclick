// wiring/discogs.ts
// Per-app MCP wiring for the discogs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { discogsSearchReleases, discogsGetRelease, discogsGetArtist, discogsSearchArtists, discogsGetMarketplaceStats, discogsGetLabel } from "../discogs-tool.js";

export const discogsTools = [
  // ── discogs-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "discogs_search_releases",
    description: "Search for music releases on Discogs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        artist: { type: "string" },
        type: { type: "string" },
        format: { type: "string" },
        genre: { type: "string" },
        year: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "discogs_get_release",
    description: "Get a Discogs release by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        release_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["release_id"],
    },
  },
  {
    name: "discogs_get_artist",
    description: "Get a Discogs artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist_id"],
    },
  },
  {
    name: "discogs_search_artists",
    description: "Search for artists on Discogs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "discogs_marketplace_stats",
    description: "Get Discogs marketplace stats for a release.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        release_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["release_id"],
    },
  },
  {
    name: "discogs_get_label",
    description: "Get a Discogs record label by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        label_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["label_id"],
    },
  },
] as const;

export const discogsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // discogs-tool.ts
  discogs_search_releases: (args) => discogsSearchReleases(args),
  discogs_get_release:     (args) => discogsGetRelease(args),
  discogs_get_artist:      (args) => discogsGetArtist(args),
  discogs_search_artists:  (args) => discogsSearchArtists(args),
  discogs_marketplace_stats:(args) => discogsGetMarketplaceStats(args),
  discogs_get_label:       (args) => discogsGetLabel(args),
};
