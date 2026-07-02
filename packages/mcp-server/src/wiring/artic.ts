// wiring/artic.ts
// Per-app MCP wiring for the artic connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { articSearchArtworks, articGetArtwork } from "../artic-tool.js";

export const articTools = [
  // ── artic-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "artic_search_artworks",
    description: "Search artworks at the Art Institute of Chicago by keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search term (e.g. monet, sunflowers, impressionism)." },
        limit: { type: "number" as const, description: "Max results (default 10, max 50)." },
      },
      required: ["query"],
    },
  },
  {
    name: "artic_get_artwork",
    description: "Get detailed info about a specific artwork at the Art Institute of Chicago.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "number" as const, description: "Artwork ID (from search results)." },
      },
      required: ["id"],
    },
  },
] as const;

export const articHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // artic-tool.ts
  artic_search_artworks:     (args) => articSearchArtworks(args),
  artic_get_artwork:         (args) => articGetArtwork(args),};
