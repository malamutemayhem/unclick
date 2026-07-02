// wiring/aspectratio.ts
// Per-app MCP wiring for the aspectratio connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { aspectRatio } from "../aspectratio-tool.js";

export const aspectratioTools = [
  // ── aspectratio-tool.ts ────────────────────────────────────────────────────
  {
    name: "aspect_ratio",
    description: "Calculate the aspect ratio of given width and height.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        width: { type: "number" as const, description: "Width in pixels." },
        height: { type: "number" as const, description: "Height in pixels." },
      }, required: ["width", "height"],
    },
  },
] as const;

export const aspectratioHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // aspectratio-tool.ts
  aspect_ratio:              (args) => aspectRatio(args),
};
