// wiring/raindrop.ts
// Per-app MCP wiring for the raindrop connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { raindropAction } from "../raindrop-tool.js";

export const raindropTools = [
  // ── raindrop-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "raindrop_action",
    description: "Perform a Raindrop.io action: search_raindrops, get_collection_raindrops, get_raindrop_collections, create_raindrop, get_raindrop, delete_raindrop.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        search: { type: "string" },
        collection_id: { type: "number" },
        raindrop_id: { type: "number" },
        link: { type: "string" },
        title: { type: "string" },
        tags: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },
] as const;

export const raindropHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // raindrop-tool.ts
  raindrop_action:         (args) => raindropAction(String(args.action ?? ""), args),
};
