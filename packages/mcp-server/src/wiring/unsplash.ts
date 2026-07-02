// wiring/unsplash.ts
// Per-app MCP wiring for the unsplash connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { unsplashSearchPhotos, unsplashGetPhoto, unsplashRandomPhoto } from "../unsplash-tool.js";

export const unsplashTools = [
  // ── unsplash-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "unsplash_search_photos",
    description: "Search Unsplash photos.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      query: { type: "string", description: "What to search for" },
      per_page: { type: "number", description: "Photos to return (max 30, default 10)" },
      orientation: { type: "string", enum: ["landscape", "portrait", "squarish"], description: "Filter by orientation" },
    }, required: ["access_key", "query"] },
  },
  {
    name: "unsplash_get_photo",
    description: "Get a single Unsplash photo by id (URLs + attribution).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      photo_id: { type: "string", description: "Unsplash photo id" },
    }, required: ["access_key", "photo_id"] },
  },
  {
    name: "unsplash_random_photo",
    description: "Get a random Unsplash photo, optionally matching a query.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      query: { type: "string", description: "Optional topic to match" },
      orientation: { type: "string", enum: ["landscape", "portrait", "squarish"], description: "Filter by orientation" },
    }, required: ["access_key"] },
  },
] as const;

export const unsplashHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // unsplash-tool.ts
  unsplash_search_photos:  (args) => unsplashSearchPhotos(args),
  unsplash_get_photo:      (args) => unsplashGetPhoto(args),
  unsplash_random_photo:   (args) => unsplashRandomPhoto(args),
};
