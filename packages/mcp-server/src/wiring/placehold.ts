// wiring/placehold.ts
// Per-app MCP wiring for the placehold connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { placeholdImage } from "../placehold-tool.js";

export const placeholdTools = [
  // ── placehold-tool.ts ─────────────────────────────────────────────────────
  {
    name: "placehold_image",
    description: "Generate a placeholder image URL with custom size, colors, and text (no network call).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        width: { type: "number" as const, description: "Image width in pixels (default 300, max 4000)." },
        height: { type: "number" as const, description: "Image height in pixels (default: same as width)." },
        background: { type: "string" as const, description: "Background hex color (default: CCCCCC)." },
        foreground: { type: "string" as const, description: "Text hex color (default: 333333)." },
        text: { type: "string" as const, description: "Custom text overlay." },
        font: { type: "string" as const, description: "Font name (roboto, lato, open-sans, montserrat, etc.)." },
      },
    },
  },
] as const;

export const placeholdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // placehold-tool.ts
  placehold_image:           (args) => placeholdImage(args),};
