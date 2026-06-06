#!/usr/bin/env node
// Spotify MCP. Standalone MCP server by UnClick.
// By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  spotifySearch,
  spotifyGetTrack,
  spotifyGetAlbum,
  spotifyGetArtist,
  spotifyGetPlaylist,
  spotifyGetRecommendations,
  spotifyGetAudioFeatures,
} from "./spotify-tool.js";

const TOOLS = [
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
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  spotify_search: (args) => spotifySearch(args as unknown as Parameters<typeof spotifySearch>[0]),
  spotify_get_track: (args) => spotifyGetTrack(args as unknown as Parameters<typeof spotifyGetTrack>[0]),
  spotify_get_album: (args) => spotifyGetAlbum(args as unknown as Parameters<typeof spotifyGetAlbum>[0]),
  spotify_get_artist: (args) => spotifyGetArtist(args as unknown as Parameters<typeof spotifyGetArtist>[0]),
  spotify_get_playlist: (args) => spotifyGetPlaylist(args as unknown as Parameters<typeof spotifyGetPlaylist>[0]),
  spotify_get_recommendations: (args) => spotifyGetRecommendations(args as unknown as Parameters<typeof spotifyGetRecommendations>[0]),
  spotify_get_audio_features: (args) => spotifyGetAudioFeatures(args as unknown as Parameters<typeof spotifyGetAudioFeatures>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/spotify", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[spotify-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
