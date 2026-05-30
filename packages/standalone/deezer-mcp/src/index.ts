#!/usr/bin/env node
// Deezer MCP. Standalone MCP server by UnClick.
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
  searchDeezer,
  getDeezerArtist,
  getDeezerAlbum,
  getDeezerTrack,
  getDeezerChart,
  searchDeezerPlaylist,
} from "./deezer-tool.js";

const TOOLS = [
  {
    name: "deezer_search",
    description: "Search Deezer for tracks, artists, or albums.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        type: { type: "string", description: "track, artist, album, playlist" },
        limit: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "deezer_get_artist",
    description: "Get a Deezer artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_get_album",
    description: "Get a Deezer album by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_get_track",
    description: "Get a Deezer track by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_chart",
    description: "Get Deezer chart (top tracks/albums/artists).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "tracks, albums, artists, playlists" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "deezer_search_playlist",
    description: "Search for Deezer playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        limit: { type: "number" },
      },
      required: ["q"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  deezer_search: (args) => searchDeezer(args as unknown as Parameters<typeof searchDeezer>[0]),
  deezer_get_artist: (args) => getDeezerArtist(args as unknown as Parameters<typeof getDeezerArtist>[0]),
  deezer_get_album: (args) => getDeezerAlbum(args as unknown as Parameters<typeof getDeezerAlbum>[0]),
  deezer_get_track: (args) => getDeezerTrack(args as unknown as Parameters<typeof getDeezerTrack>[0]),
  deezer_chart: (args) => getDeezerChart(args as unknown as Parameters<typeof getDeezerChart>[0]),
  deezer_search_playlist: (args) => searchDeezerPlaylist(args as unknown as Parameters<typeof searchDeezerPlaylist>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/deezer", version: "0.1.0" },
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
  process.stderr.write(`[deezer-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
