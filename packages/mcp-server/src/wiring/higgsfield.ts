// wiring/higgsfield.ts
// Per-app MCP wiring for the higgsfield connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI Video

import { higgsfield_generate_video, higgsfield_generate_image, higgsfield_get_styles, higgsfield_get_status } from "../higgsfield-tool.js";

export const higgsfieldTools = [
  // ── higgsfield-tool.ts ────────────────────────────────────────────────────────
  {
    name: "higgsfield_generate_video",
    description: "Generate a Higgsfield video from a prompt. Prefers the customer's connected Higgsfield MCP account login and subscription credits; api_key is only the Cloud API fallback.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Optional Higgsfield Cloud API key for this call. Omit it to use the connected Higgsfield MCP account login when available." },
        prompt: { type: "string", description: "Text description of the video to generate" },
        model: { type: "string", description: "Optional Higgsfield model id when using the MCP account path" },
        style: { type: "string", description: "Soul Style name (use higgsfield_get_styles to list available styles)" },
        duration: { type: "number", description: "Video duration in seconds" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "higgsfield_generate_image",
    description: "Generate a Higgsfield image from a prompt. Prefers the customer's connected Higgsfield MCP account login and subscription credits; api_key is only the Cloud API fallback.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Optional Higgsfield Cloud API key for this call. Omit it to use the connected Higgsfield MCP account login when available." },
        prompt: { type: "string", description: "Text description of the image to generate" },
        model: { type: "string", description: "Optional Higgsfield model id, e.g. nano_banana_pro" },
        resolution: { type: "string", description: "Optional Higgsfield resolution, e.g. 1k, 2k, or 4k" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 4:3, 1:1, 9:16" },
        style: { type: "string", description: "Style name (use higgsfield_get_styles to list available styles)" },
        width: { type: "number", description: "Image width in pixels" },
        height: { type: "number", description: "Image height in pixels" },
        negative_prompt: { type: "string", description: "What to avoid in the image" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "higgsfield_get_styles",
    description: "List Higgsfield models/styles. Prefers the customer's connected Higgsfield MCP account login; api_key is only the Cloud API fallback.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Optional Higgsfield Cloud API key for this call. Omit it to use the connected Higgsfield MCP account login when available." },
        action: { type: "string", description: "MCP model explorer action (default search)" },
        type: { type: "string", description: "Model type to explore, e.g. image or video (default image)" },
        query: { type: "string", description: "Optional model/style search text" },
      },
      required: [],
    },
  },
  {
    name: "higgsfield_get_status",
    description: "Check the status of a Higgsfield generation by ID. Prefers the customer's connected Higgsfield MCP account login; api_key is only the Cloud API fallback.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Optional Higgsfield Cloud API key for this call. Omit it to use the connected Higgsfield MCP account login when available." },
        generation_id: { type: "string", description: "Generation ID returned by higgsfield_generate_video or higgsfield_generate_image" },
      },
      required: ["generation_id"],
    },
  },
] as const;

export const higgsfieldHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // higgsfield-tool.ts
  higgsfield_generate_video:   (args) => higgsfield_generate_video(args),
  higgsfield_generate_image:   (args) => higgsfield_generate_image(args),
  higgsfield_get_styles:       (args) => higgsfield_get_styles(args),
  higgsfield_get_status:       (args) => higgsfield_get_status(args),
};
