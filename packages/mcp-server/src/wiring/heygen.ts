// wiring/heygen.ts
// Per-app MCP wiring for the heygen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Video

import { heygen_create_avatar_video, heygen_list_avatars, heygen_get_video_status, heygen_list_voices } from "../heygen-tool.js";

export const heygenTools = [
  // ── heygen-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "heygen_create_avatar_video",
    description: "Create an AI avatar video with HeyGen. The avatar speaks a script using a selected voice. Returns a video_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
        avatar_id: { type: "string", description: "Avatar ID (use heygen_list_avatars to find available avatars)" },
        script: { type: "string", description: "The text the avatar will speak" },
        voice_id: { type: "string", description: "Voice ID (use heygen_list_voices to find available voices)" },
        background_url: { type: "string", description: "URL of background image" },
        avatar_style: { type: "string", description: "Avatar style: normal, circle, closeUp (default: normal)" },
        width: { type: "number", description: "Video width in pixels (default: 1280)" },
        height: { type: "number", description: "Video height in pixels (default: 720)" },
        title: { type: "string", description: "Video title for reference" },
        test: { type: "boolean", description: "Set true to generate a watermarked test video (does not use quota)" },
      },
      required: ["api_key", "avatar_id", "script"],
    },
  },
  {
    name: "heygen_list_avatars",
    description: "List all available AI avatars in your HeyGen account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "heygen_get_video_status",
    description: "Check the generation status of a HeyGen video by video ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
        video_id: { type: "string", description: "Video ID returned by heygen_create_avatar_video" },
      },
      required: ["api_key", "video_id"],
    },
  },
  {
    name: "heygen_list_voices",
    description: "List all available voices for HeyGen avatar videos.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const heygenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // heygen-tool.ts
  heygen_create_avatar_video:  (args) => heygen_create_avatar_video(args),
  heygen_list_avatars:         (args) => heygen_list_avatars(args),
  heygen_get_video_status:     (args) => heygen_get_video_status(args),
  heygen_list_voices:          (args) => heygen_list_voices(args),
};
