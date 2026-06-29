// wiring/colorblend.ts
// Per-app MCP wiring for the colorblend connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { colorBlend } from "../colorblend-tool.js";

export const colorblendTools = [
  // ── colorblend-tool.ts ─────────────────────────────────────────────────────
  {
    name: "color_blend",
    description: "Blend two hex colors together, optionally generating a gradient palette.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        color1: { type: "string" as const, description: "First hex color." },
        color2: { type: "string" as const, description: "Second hex color." },
        weight: { type: "number" as const, description: "Blend weight 0-1 (default 0.5)." },
        steps: { type: "number" as const, description: "Number of gradient steps (1-20, default 1)." },
      }, required: ["color1", "color2"],
    },
  },
] as const;

export const colorblendHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // colorblend-tool.ts
  color_blend:               (args) => colorBlend(args),
};
