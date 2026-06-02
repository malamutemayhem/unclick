#!/usr/bin/env node
// Last.fm MCP. Standalone MCP server by UnClick.
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
  lastfmGetArtistInfo,
  lastfmSearchArtists,
  lastfmGetTopTracks,
  lastfmGetSimilarArtists,
  lastfmGetChartTopArtists,
  lastfmGetChartTopTracks,
  lastfmGetAlbumInfo,
} from "./lastfm-tool.js";

const TOOLS = [
  {
    name: "lastfm_artist_info",
    description: "Get Last.fm artist info.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_search_artists",
    description: "Search for artists on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_top_tracks",
    description: "Get top tracks for an artist on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_similar_artists",
    description: "Get similar artists on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_chart_top_artists",
    description: "Get the Last.fm chart of top artists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lastfm_chart_top_tracks",
    description: "Get the Last.fm chart of top tracks.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lastfm_album_info",
    description: "Get album info from Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        album: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artist", "album"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  lastfm_artist_info: (args) => lastfmGetArtistInfo(args as unknown as Parameters<typeof lastfmGetArtistInfo>[0]),
  lastfm_search_artists: (args) => lastfmSearchArtists(args as unknown as Parameters<typeof lastfmSearchArtists>[0]),
  lastfm_top_tracks: (args) => lastfmGetTopTracks(args as unknown as Parameters<typeof lastfmGetTopTracks>[0]),
  lastfm_similar_artists: (args) => lastfmGetSimilarArtists(args as unknown as Parameters<typeof lastfmGetSimilarArtists>[0]),
  lastfm_chart_top_artists: (args) => lastfmGetChartTopArtists(args as unknown as Parameters<typeof lastfmGetChartTopArtists>[0]),
  lastfm_chart_top_tracks: (args) => lastfmGetChartTopTracks(args as unknown as Parameters<typeof lastfmGetChartTopTracks>[0]),
  lastfm_album_info: (args) => lastfmGetAlbumInfo(args as unknown as Parameters<typeof lastfmGetAlbumInfo>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/lastfm", version: "0.1.0" },
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
  process.stderr.write(`[lastfm-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
