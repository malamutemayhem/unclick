// wiring/setlistfm.ts
// Per-app MCP wiring for the setlistfm connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { setlistfmSearchArtist, setlistfmArtistSetlists, setlistfmSearchSetlists, setlistfmGetSetlist } from "../setlistfm-tool.js";

export const setlistfmTools = [
  // ── setlistfm-tool.ts ────────────────────────────────────────────────────────
  {
    name: "setlistfm_search_artist",
    description: "Search for an artist on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artistName: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artistName"],
    },
  },
  {
    name: "setlistfm_artist_setlists",
    description: "Get setlists for an artist on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["mbid"],
    },
  },
  {
    name: "setlistfm_search_setlists",
    description: "Search setlists on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artistName: { type: "string" },
        cityName: { type: "string" },
        year: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "setlistfm_get_setlist",
    description: "Get a specific setlist from Setlist.fm by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        setlistId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["setlistId"],
    },
  },
] as const;

export const setlistfmHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // setlistfm-tool.ts
  setlistfm_search_artist: (args) => setlistfmSearchArtist(args),
  setlistfm_artist_setlists:(args) => setlistfmArtistSetlists(args),
  setlistfm_search_setlists:(args) => setlistfmSearchSetlists(args),
  setlistfm_get_setlist:   (args) => setlistfmGetSetlist(args),
};
