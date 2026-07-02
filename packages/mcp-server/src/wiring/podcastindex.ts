// wiring/podcastindex.ts
// Per-app MCP wiring for the podcastindex connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { podcastSearch, podcastGetByFeedUrl, podcastGetEpisodes, podcastSearchEpisodes, podcastTrending, podcastRecentEpisodes } from "../podcastindex-tool.js";

export const podcastindexTools = [
  // ── podcastindex-tool.ts ─────────────────────────────────────────────────────
  {
    name: "podcast_search",
    description: "Search for podcasts on Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "podcast_by_feed_url",
    description: "Get a podcast by feed URL from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "podcast_get_episodes",
    description: "Get episodes for a podcast from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "podcast_search_episodes",
    description: "Search podcast episodes on Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "podcast_trending",
    description: "Get trending podcasts from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max: { type: "number" },
        lang: { type: "string" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
    },
  },
  {
    name: "podcast_recent_episodes",
    description: "Get recent podcast episodes from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
    },
  },
] as const;

export const podcastindexHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // podcastindex-tool.ts
  podcast_search:          (args) => podcastSearch(args),
  podcast_by_feed_url:     (args) => podcastGetByFeedUrl(args),
  podcast_get_episodes:    (args) => podcastGetEpisodes(args),
  podcast_search_episodes: (args) => podcastSearchEpisodes(args),
  podcast_trending:        (args) => podcastTrending(args),
  podcast_recent_episodes: (args) => podcastRecentEpisodes(args),
};
