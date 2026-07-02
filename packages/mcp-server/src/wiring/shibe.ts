// wiring/shibe.ts
// Per-app MCP wiring for the shibe connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { shibeRandomImage } from "../shibe-tool.js";

export const shibeTools = [
  // ── shibe-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shibe_random_image",
    description: "Get random Shiba Inu, cat, or bird images.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of images (1-10, default 1)" },
        type: { type: "string", description: "Image type: shibes, cats, or birds (default shibes)" },
      },
    },
  },
] as const;

export const shibeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // shibe-tool.ts
  shibe_random_image:      (args) => shibeRandomImage(args),
};
