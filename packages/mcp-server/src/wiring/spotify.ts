// wiring/spotify.ts
// Per-app MCP wiring for the spotify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Media / Data

import { spotifySearch, spotifyGetTrack, spotifyGetAlbum, spotifyGetArtist, spotifyGetPlaylist, spotifyGetRecommendations, spotifyGetAudioFeatures } from "../spotify-tool.js";

export const spotifyTools = [
  // ── spotify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "spotify_search",
    description: "Search Spotify for tracks, albums, artists, or playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        query: { type: "string" },
        type: { type: "string", description: "Comma-separated: track, album, artist, playlist (default: track)" },
        limit: { type: "number" },
        offset: { type: "number" },
        market: { type: "string" },
      },
      required: ["bearer_token", "query"],
    },
  },
  {
    name: "spotify_get_track",
    description: "Get metadata for a Spotify track by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        track_id: { type: "string" },
        market: { type: "string" },
      },
      required: ["bearer_token", "track_id"],
    },
  },
  {
    name: "spotify_get_album",
    description: "Get metadata and track listing for a Spotify album.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        album_id: { type: "string" },
      },
      required: ["bearer_token", "album_id"],
    },
  },
  {
    name: "spotify_get_artist",
    description: "Get metadata and follower count for a Spotify artist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        artist_id: { type: "string" },
      },
      required: ["bearer_token", "artist_id"],
    },
  },
  {
    name: "spotify_get_playlist",
    description: "Get metadata and tracks for a Spotify playlist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        playlist_id: { type: "string" },
        market: { type: "string" },
      },
      required: ["bearer_token", "playlist_id"],
    },
  },
  {
    name: "spotify_get_recommendations",
    description: "Get Spotify track recommendations based on seed tracks, artists, or genres.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        seed_tracks: { type: "string", description: "Comma-separated Spotify track IDs (max 5 seeds total)" },
        seed_artists: { type: "string", description: "Comma-separated Spotify artist IDs" },
        seed_genres: { type: "string", description: "Comma-separated genre names" },
        limit: { type: "number" },
        market: { type: "string" },
        min_energy: { type: "number" },
        max_energy: { type: "number" },
        target_valence: { type: "number" },
        target_danceability: { type: "number" },
      },
      required: ["bearer_token"],
    },
  },
  {
    name: "spotify_get_audio_features",
    description: "Get audio analysis features (danceability, energy, tempo, etc.) for a Spotify track.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        track_id: { type: "string" },
      },
      required: ["bearer_token", "track_id"],
    },
  },
] as const;

export const spotifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // spotify-tool.ts
  spotify_search:              (args) => spotifySearch(args),
  spotify_get_track:           (args) => spotifyGetTrack(args),
  spotify_get_album:           (args) => spotifyGetAlbum(args),
  spotify_get_artist:          (args) => spotifyGetArtist(args),
  spotify_get_playlist:        (args) => spotifyGetPlaylist(args),
  spotify_get_recommendations: (args) => spotifyGetRecommendations(args),
  spotify_get_audio_features:  (args) => spotifyGetAudioFeatures(args),
};
