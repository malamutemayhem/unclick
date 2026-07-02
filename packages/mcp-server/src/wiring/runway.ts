// wiring/runway.ts
// Per-app MCP wiring for the runway connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Video

import { runway_generate_video, runway_get_task, runway_list_models } from "../runway-tool.js";

export const runwayTools = [
  // ── runway-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "runway_generate_video",
    description: "Generate a video from text or an image using Runway ML. Supports text-to-video and image-to-video. Returns a task_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        image_url: { type: "string", description: "URL of an image to animate (image-to-video mode)" },
        model: { type: "string", description: "Model name: gen3a_turbo (fast) or gen3a (quality). Default: gen3a_turbo" },
        duration: { type: "number", description: "Video duration in seconds (default: 5)" },
        ratio: { type: "string", description: "Aspect ratio e.g. 1280:768 or 768:1280 (default: 1280:768)" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "runway_get_task",
    description: "Check the status of a Runway ML generation task. Returns status, progress, and video URL when complete.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
        task_id: { type: "string", description: "Task ID returned by runway_generate_video" },
      },
      required: ["api_key", "task_id"],
    },
  },
  {
    name: "runway_list_models",
    description: "List available Runway ML video generation models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const runwayHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // runway-tool.ts
  runway_generate_video:       (args) => runway_generate_video(args),
  runway_get_task:             (args) => runway_get_task(args),
  runway_list_models:          (args) => runway_list_models(args),
};
