// wiring/tiktok.ts
// Per-app MCP wiring for the tiktok connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { getTiktokUser, listTiktokVideos, getTiktokVideo } from "../tiktok-tool.js";

export const tiktokTools = [
  // ── tiktok-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "get_tiktok_user",
    description: "Get the authenticated TikTok user profile (follower count, video count, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "TikTok OAuth access token (or set TIKTOK_ACCESS_TOKEN)" },
      },
    },
  },
  {
    name: "list_tiktok_videos",
    description: "List videos for the authenticated TikTok user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max_count: { type: "number", description: "Max videos to return (default 20, max 20)" },
        cursor: { type: "number", description: "Pagination cursor" },
        access_token: { type: "string" },
      },
    },
  },
  {
    name: "get_tiktok_video",
    description: "Get details of a specific TikTok video by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        video_id: { type: "string", description: "TikTok video ID" },
        access_token: { type: "string" },
      },
      required: ["video_id"],
    },
  },
] as const;

export const tiktokHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tiktok-tool.ts
  get_tiktok_user:         (args) => getTiktokUser(args),
  list_tiktok_videos:      (args) => listTiktokVideos(args),
  get_tiktok_video:        (args) => getTiktokVideo(args),
};
