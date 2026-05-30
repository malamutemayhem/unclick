#!/usr/bin/env node
// YouTube MCP. Standalone MCP server by UnClick.
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
  youtubeSearch,
  youtubeGetVideo,
  youtubeGetChannel,
  youtubeListPlaylists,
  youtubeListPlaylistItems,
  youtubeGetCaptions,
} from "./youtube-tool.js";

const TOOLS = [
  {
    name: "youtube_search",
    description: "Search YouTube for videos, channels, or playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        query: { type: "string" },
        type: { type: "string", enum: ["video", "channel", "playlist"], description: "video, channel, or playlist (default: video)" },
        max_results: { type: "number" },
        order: { type: "string", description: "relevance, date, rating, viewCount, title" },
        channel_id: { type: "string" },
        published_after: { type: "string", description: "RFC 3339 datetime, e.g. 2024-01-01T00:00:00Z" },
        region_code: { type: "string" },
        page_token: { type: "string" },
      },
      required: ["api_key", "query"],
    },
  },
  {
    name: "youtube_get_video",
    description: "Get metadata, statistics, and content details for a YouTube video.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        video_id: { type: "string" },
      },
      required: ["api_key", "video_id"],
    },
  },
  {
    name: "youtube_get_channel",
    description: "Get metadata and statistics for a YouTube channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        channel_id: { type: "string" },
        handle: { type: "string", description: "Channel handle without @ (alternative to channel_id)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "youtube_list_playlists",
    description: "List playlists belonging to a YouTube channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        channel_id: { type: "string" },
        max_results: { type: "number" },
        page_token: { type: "string" },
      },
      required: ["api_key", "channel_id"],
    },
  },
  {
    name: "youtube_list_playlist_items",
    description: "List videos in a YouTube playlist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        playlist_id: { type: "string" },
        max_results: { type: "number" },
        page_token: { type: "string" },
      },
      required: ["api_key", "playlist_id"],
    },
  },
  {
    name: "youtube_get_captions",
    description: "List available caption tracks for a YouTube video.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        video_id: { type: "string" },
      },
      required: ["api_key", "video_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  youtube_search: (args) => youtubeSearch(args as unknown as Parameters<typeof youtubeSearch>[0]),
  youtube_get_video: (args) => youtubeGetVideo(args as unknown as Parameters<typeof youtubeGetVideo>[0]),
  youtube_get_channel: (args) => youtubeGetChannel(args as unknown as Parameters<typeof youtubeGetChannel>[0]),
  youtube_list_playlists: (args) => youtubeListPlaylists(args as unknown as Parameters<typeof youtubeListPlaylists>[0]),
  youtube_list_playlist_items: (args) => youtubeListPlaylistItems(args as unknown as Parameters<typeof youtubeListPlaylistItems>[0]),
  youtube_get_captions: (args) => youtubeGetCaptions(args as unknown as Parameters<typeof youtubeGetCaptions>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/youtube", version: "0.1.0" },
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
  process.stderr.write(`[youtube-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
