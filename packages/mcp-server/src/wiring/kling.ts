// wiring/kling.ts
// Per-app MCP wiring for the kling connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Video

import { kling_generate_video, kling_get_task } from "../kling-tool.js";

export const klingTools = [
  // ── kling-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "kling_generate_video",
    description: "Generate a high-quality video from text using Kling AI (Kuaishou). Supports standard and professional modes. Returns a task_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Kling AI API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        model: { type: "string", description: "Model name: kling-v1 or kling-v1-5 (default: kling-v1)" },
        mode: { type: "string", description: "Generation mode: std (standard) or pro (professional, slower). Default: std" },
        duration: { type: "string", description: "Video duration: 5 or 10 (seconds). Default: 5" },
        image_url: { type: "string", description: "Optional reference image URL for image-to-video" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1. Default: 16:9" },
        cfg_scale: { type: "number", description: "Guidance scale 0-1 (default: 0.5)" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "kling_get_task",
    description: "Check the status of a Kling AI video generation task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Kling AI API key" },
        task_id: { type: "string", description: "Task ID returned by kling_generate_video" },
      },
      required: ["api_key", "task_id"],
    },
  },
] as const;

export const klingHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // kling-tool.ts
  kling_generate_video:        (args) => kling_generate_video(args),
  kling_get_task:              (args) => kling_get_task(args),
};
