// wiring/dummyimage.ts
// Per-app MCP wiring for the dummyimage connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dummyImageUrl } from "../dummyimage-tool.js";

export const dummyimageTools = [
  // ── dummyimage-tool.ts ─────────────────────────────────────────────────────
  {
    name: "dummy_image_url",
    description: "Generate a placeholder image URL with custom size, colors, and text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        bg_color: { type: "string", description: "Background hex color without # (default cccccc)" },
        fg_color: { type: "string", description: "Text hex color without # (default 000000)" },
        text: { type: "string", description: "Text to show on the image" },
      },
    },
  },
] as const;

export const dummyimageHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dummyimage-tool.ts
  dummy_image_url:         (args) => dummyImageUrl(args),
};
