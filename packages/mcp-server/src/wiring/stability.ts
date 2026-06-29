// wiring/stability.ts
// Per-app MCP wiring for the stability connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { stabilityTextToImage, stabilityImageToImage, stabilityUpscale, stabilityListEngines } from "../stability-tool.js";

export const stabilityTools = [
  // ── stability-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "stability_text_to_image",
    description: "Generate images from a text prompt using Stability AI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        engine_id: { type: "string", description: "Stability engine ID (default: stable-diffusion-xl-1024-v1-0)" },
        negative_prompt: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
        steps: { type: "number", description: "Diffusion steps 10-150 (default: 30)" },
        cfg_scale: { type: "number", description: "Guidance scale 0-35 (default: 7)" },
        samples: { type: "number", description: "Number of images (max 10, default: 1)" },
        style_preset: { type: "string" },
        seed: { type: "number" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "stability_image_to_image",
    description: "Transform an existing image using a text prompt with Stability AI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        image_url: { type: "string", description: "URL of the source image" },
        engine_id: { type: "string" },
        negative_prompt: { type: "string" },
        strength: { type: "number", description: "0.0-1.0: how much to change the image (default: 0.35)" },
        steps: { type: "number" },
        cfg_scale: { type: "number" },
        samples: { type: "number" },
      },
      required: ["api_key", "prompt", "image_url"],
    },
  },
  {
    name: "stability_upscale",
    description: "Upscale an image using Stability AI ESRGAN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        image_url: { type: "string", description: "URL of the image to upscale" },
        width: { type: "number", description: "Target width in pixels (default: 2048)" },
        engine_id: { type: "string", description: "Upscale engine (default: esrgan-v1-x2plus)" },
      },
      required: ["api_key", "image_url"],
    },
  },
  {
    name: "stability_list_engines",
    description: "List all available Stability AI generation engines.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const stabilityHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // stability-tool.ts
  stability_text_to_image:     (args) => stabilityTextToImage(args),
  stability_image_to_image:    (args) => stabilityImageToImage(args),
  stability_upscale:           (args) => stabilityUpscale(args),
  stability_list_engines:      (args) => stabilityListEngines(args),
};
