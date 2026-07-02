// wiring/catapi.ts
// Per-app MCP wiring for the catapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { catApiRandomImage, catApiBreeds } from "../catapi-tool.js";

export const catapiTools = [
  // ── catapi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "cat_api_random_image",
    description: "Get a random cat image from The Cat API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "cat_api_breeds",
    description: "List cat breeds with details from The Cat API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds (max 50, default 20)" },
        page: { type: "number", description: "Page number (default 0)" },
      },
    },
  },
] as const;

export const catapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // catapi-tool.ts
  cat_api_random_image:    (args) => catApiRandomImage(args),
  cat_api_breeds:          (args) => catApiBreeds(args),
};
