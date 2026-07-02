// wiring/giphy.ts
// Per-app MCP wiring for the giphy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { giphySearch, giphyTrending, giphyRandom } from "../giphy-tool.js";

export const giphyTools = [
  // ── giphy-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "giphy_search",
    description: "Search Giphy for GIFs.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      query: { type: "string", description: "What GIF to search for" },
      limit: { type: "number", description: "GIFs to return (max 50, default 10)" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key", "query"] },
  },
  {
    name: "giphy_trending",
    description: "Get trending GIFs from Giphy.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      limit: { type: "number", description: "GIFs to return (max 50, default 10)" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key"] },
  },
  {
    name: "giphy_random",
    description: "Get a random GIF from Giphy, optionally by tag.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      tag: { type: "string", description: "Optional tag to match" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key"] },
  },
] as const;

export const giphyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // giphy-tool.ts
  giphy_search:            (args) => giphySearch(args),
  giphy_trending:          (args) => giphyTrending(args),
  giphy_random:            (args) => giphyRandom(args),
};
