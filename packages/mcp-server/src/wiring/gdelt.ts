// wiring/gdelt.ts
// Per-app MCP wiring for the gdelt connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { gdeltNewsSearch, gdeltToneAnalysis, gdeltGeoEvents, gdeltTrending } from "../gdelt-tool.js";

export const gdeltTools = [
  // ── gdelt-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "gdelt_news_search",
    description: "Search global news via the GDELT Project. Returns article titles, URLs, sources, dates, countries, and languages. No API key required.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (keywords, phrases, or operators)" },
        maxrecords: { type: "number", description: "Max articles to return (default 25, max 250)" },
        startdatetime: { type: "string", description: "Start datetime YYYYMMDDHHMMSS (UTC)" },
        enddatetime: { type: "string", description: "End datetime YYYYMMDDHHMMSS (UTC)" },
        sourcelang: { type: "string", description: "Filter by source language (e.g. 'english', 'spanish')" },
        sourcecountry: { type: "string", description: "Filter by source country code (e.g. 'US', 'GB', 'AU')" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_tone_analysis",
    description: "Analyse the sentiment and tone of global news coverage for a topic over time. Returns average tone scores (negative = negative coverage, positive = positive), trend summary, and timeline. Great for brand monitoring or tracking public sentiment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to analyse" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d', '1month')" },
        sourcelang: { type: "string", description: "Filter by source language" },
        sourcecountry: { type: "string", description: "Filter by source country code" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_geo_events",
    description: "Get geographic distribution of news events for a topic from the GDELT GEO API. Returns event clusters with location, article count, and tone score.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to map" },
        maxpoints: { type: "number", description: "Max location clusters to return (default 50, max 250)" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d')" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_trending",
    description: "Check whether a topic is trending in global news using GDELT article volume timelines. Returns a trend classification (surging, rising, stable, declining, fading) and volume data over time.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to check" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d', '1month')" },
        sourcelang: { type: "string", description: "Filter by source language" },
      },
      required: ["query"],
    },
  },
] as const;

export const gdeltHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gdelt-tool.ts
  gdelt_news_search:       (args) => gdeltNewsSearch(args),
  gdelt_tone_analysis:     (args) => gdeltToneAnalysis(args),
  gdelt_geo_events:        (args) => gdeltGeoEvents(args),
  gdelt_trending:          (args) => gdeltTrending(args),
};
