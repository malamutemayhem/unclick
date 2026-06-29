// wiring/placekitten.ts
// Per-app MCP wiring for the placekitten connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { placeholderImage, placekittenImage } from "../placekitten-tool.js";

export const placekittenTools = [
  // ── placekitten-tool.ts ────────────────────────────────────────────────────
  {
    name: "placeholder_image",
    description: "Generate a placeholder image URL with custom size, colors, and text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        text: { type: "string", description: "Text overlay on the image" },
        bg: { type: "string", description: "Background hex color (default EEEEEE)" },
        fg: { type: "string", description: "Text hex color (default 333333)" },
      },
    },
  },
  {
    name: "placekitten_image",
    description: "Generate a random kitten placeholder image URL.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        grayscale: { type: "boolean", description: "Grayscale kitten image" },
      },
    },
  },
] as const;

export const placekittenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // placekitten-tool.ts
  placeholder_image:       (args) => placeholderImage(args),
  placekitten_image:       (args) => placekittenImage(args),
};
