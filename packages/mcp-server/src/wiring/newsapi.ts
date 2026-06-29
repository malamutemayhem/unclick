// wiring/newsapi.ts
// Per-app MCP wiring for the newsapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { newsGetTopHeadlines, newsSearchNews, newsGetSources } from "../newsapi-tool.js";

export const newsapiTools = [
  // ── newsapi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "news_top_headlines",
    description: "Get top headlines from NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        category: { type: "string" },
        q: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "news_search",
    description: "Search news articles via NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        from: { type: "string" },
        to: { type: "string" },
        language: { type: "string" },
        sortBy: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "news_get_sources",
    description: "Get available news sources from NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        category: { type: "string" },
        language: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const newsapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // newsapi-tool.ts
  news_top_headlines:      (args) => newsGetTopHeadlines(args),
  news_search:             (args) => newsSearchNews(args),
  news_get_sources:        (args) => newsGetSources(args),
};
