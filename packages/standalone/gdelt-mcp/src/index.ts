#!/usr/bin/env node
// GDELT News MCP. Standalone MCP server by UnClick.
// By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  gdeltNewsSearch,
  gdeltToneAnalysis,
  gdeltGeoEvents,
  gdeltTrending,
} from "./gdelt-tool.js";

const TOOLS = [
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
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  gdelt_news_search: (args) => gdeltNewsSearch(args as unknown as Parameters<typeof gdeltNewsSearch>[0]),
  gdelt_tone_analysis: (args) => gdeltToneAnalysis(args as unknown as Parameters<typeof gdeltToneAnalysis>[0]),
  gdelt_geo_events: (args) => gdeltGeoEvents(args as unknown as Parameters<typeof gdeltGeoEvents>[0]),
  gdelt_trending: (args) => gdeltTrending(args as unknown as Parameters<typeof gdeltTrending>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/gdelt", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[gdelt-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
