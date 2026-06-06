#!/usr/bin/env node
// Genius Lyrics MCP. Standalone MCP server by UnClick.
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
  geniusSearch,
  geniusGetSong,
  geniusGetArtist,
  geniusArtistSongs,
} from "./genius-tool.js";

const TOOLS = [
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
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  genius_search: (args) => geniusSearch(args as unknown as Parameters<typeof geniusSearch>[0]),
  genius_get_song: (args) => geniusGetSong(args as unknown as Parameters<typeof geniusGetSong>[0]),
  genius_get_artist: (args) => geniusGetArtist(args as unknown as Parameters<typeof geniusGetArtist>[0]),
  genius_artist_songs: (args) => geniusArtistSongs(args as unknown as Parameters<typeof geniusArtistSongs>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/genius", version: "0.1.0" },
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
  process.stderr.write(`[genius-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
