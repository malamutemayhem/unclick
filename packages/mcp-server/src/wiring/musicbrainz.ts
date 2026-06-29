// wiring/musicbrainz.ts
// Per-app MCP wiring for the musicbrainz connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mbSearchArtists, mbSearchReleases, mbSearchRecordings, mbGetArtist, mbGetRelease } from "../musicbrainz-tool.js";

export const musicbrainzTools = [
  // ── musicbrainz-tool.ts ──────────────────────────────────────────────────────
  {
    name: "mb_search_artists",
    description: "Search for artists on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_search_releases",
    description: "Search for releases/albums on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        artist: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_search_recordings",
    description: "Search for recordings/tracks on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        artist: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_get_artist",
    description: "Get a MusicBrainz artist by MBID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
      },
      required: ["mbid"],
    },
  },
  {
    name: "mb_get_release",
    description: "Get a MusicBrainz release by MBID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
      },
      required: ["mbid"],
    },
  },
] as const;

export const musicbrainzHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // musicbrainz-tool.ts
  mb_search_artists:       (args) => mbSearchArtists(args),
  mb_search_releases:      (args) => mbSearchReleases(args),
  mb_search_recordings:    (args) => mbSearchRecordings(args),
  mb_get_artist:           (args) => mbGetArtist(args),
  mb_get_release:          (args) => mbGetRelease(args),
};
