// wiring/youtube.ts
// Per-app MCP wiring for the youtube connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Media / Data

import { youtubeSearch, youtubeGetVideo, youtubeGetChannel, youtubeListPlaylists, youtubeListPlaylistItems, youtubeGetCaptions } from "../youtube-tool.js";

export const youtubeTools = [
  // ── youtube-tool.ts ───────────────────────────────────────────────────────────
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
  },
] as const;

export const youtubeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // youtube-tool.ts
  youtube_search:              (args) => youtubeSearch(args),
  youtube_get_video:           (args) => youtubeGetVideo(args),
  youtube_get_channel:         (args) => youtubeGetChannel(args),
  youtube_list_playlists:      (args) => youtubeListPlaylists(args),
  youtube_list_playlist_items: (args) => youtubeListPlaylistItems(args),
  youtube_get_captions:        (args) => youtubeGetCaptions(args),
};
