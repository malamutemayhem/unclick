// wiring/robohash.ts
// Per-app MCP wiring for the robohash connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { robohashUrl } from "../robohash-tool.js";

export const robohashTools = [
  // ── robohash-tool.ts ───────────────────────────────────────────────────────
  {
    name: "robohash_url",
    description: "Generate a unique robot/monster/cat avatar from any text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        text: { type: "string", description: "Text seed for the avatar (default robot)" },
        size: { type: "number", description: "Size in pixels (default 300)" },
        set: { type: "string", description: "Style: set1 (robots), set2 (monsters), set3 (heads), set4 (cats), set5 (humans)" },
        bg: { type: "string", description: "Background: bg1 or bg2" },
      },
    },
  },

  // ── openlib2-tool.ts (gutendex/project gutenberg) ─────────────────────────
  {
    name: "gutenberg_search",
    description: "Search Project Gutenberg free ebooks by title or author.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search term (title or author)" },
      },
      required: ["query"],
    },
  },
  {
    name: "gutenberg_book",
    description: "Get details for a specific Project Gutenberg book by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Numeric book ID from Project Gutenberg" },
      },
      required: ["id"],
    },
  },
] as const;

export const robohashHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // robohash-tool.ts
  robohash_url:            (args) => robohashUrl(args),
};
