// wiring/pika.ts
// Per-app MCP wiring for the pika connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Video

import { pika_generate_video, pika_get_generation, pika_list_styles } from "../pika-tool.js";

export const pikaTools = [
  // ── pika-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "pika_generate_video",
    description: "Generate a creative AI video from a text prompt using Pika. Optionally animate an input image. Returns a generation_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        image_url: { type: "string", description: "URL of an image to animate" },
        style: { type: "string", description: "Style name or ID (use pika_list_styles to browse options)" },
        duration: { type: "number", description: "Video duration in seconds" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        motion: { type: "number", description: "Motion intensity 1-4 (default: 2)" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "pika_get_generation",
    description: "Check the status of a Pika video generation by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
        generation_id: { type: "string", description: "Generation ID returned by pika_generate_video" },
      },
      required: ["api_key", "generation_id"],
    },
  },
  {
    name: "pika_list_styles",
    description: "List available visual styles for Pika video generation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const pikaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pika-tool.ts
  pika_generate_video:         (args) => pika_generate_video(args),
  pika_get_generation:         (args) => pika_get_generation(args),
  pika_list_styles:            (args) => pika_list_styles(args),
};
