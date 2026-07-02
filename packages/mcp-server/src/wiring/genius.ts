// wiring/genius.ts
// Per-app MCP wiring for the genius connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { geniusSearch, geniusGetSong, geniusGetArtist, geniusArtistSongs } from "../genius-tool.js";

export const geniusTools = [
  // ── genius-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "genius_search",
    description: "Search Genius for songs and lyrics.",
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
    name: "genius_get_song",
    description: "Get a Genius song by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "genius_get_artist",
    description: "Get a Genius artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "genius_artist_songs",
    description: "Get songs by an artist on Genius.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
] as const;

export const geniusHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // genius-tool.ts
  genius_search:           (args) => geniusSearch(args),
  genius_get_song:         (args) => geniusGetSong(args),
  genius_get_artist:       (args) => geniusGetArtist(args),
  genius_artist_songs:     (args) => geniusArtistSongs(args),
};
