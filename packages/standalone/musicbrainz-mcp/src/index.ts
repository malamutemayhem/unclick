#!/usr/bin/env node
// MusicBrainz MCP. Standalone MCP server by UnClick.
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
  mbSearchArtists,
  mbSearchReleases,
  mbSearchRecordings,
  mbGetArtist,
  mbGetRelease,
} from "./musicbrainz-tool.js";

const TOOLS = [
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
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  mb_search_artists: (args) => mbSearchArtists(args as unknown as Parameters<typeof mbSearchArtists>[0]),
  mb_search_releases: (args) => mbSearchReleases(args as unknown as Parameters<typeof mbSearchReleases>[0]),
  mb_search_recordings: (args) => mbSearchRecordings(args as unknown as Parameters<typeof mbSearchRecordings>[0]),
  mb_get_artist: (args) => mbGetArtist(args as unknown as Parameters<typeof mbGetArtist>[0]),
  mb_get_release: (args) => mbGetRelease(args as unknown as Parameters<typeof mbGetRelease>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/musicbrainz", version: "0.1.0" },
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
  process.stderr.write(`[musicbrainz-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
