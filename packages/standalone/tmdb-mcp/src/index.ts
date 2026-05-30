#!/usr/bin/env node
// TMDB MCP. Standalone MCP server by UnClick.
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
  tmdbSearchMovies,
  tmdbSearchTv,
  tmdbMovie,
  tmdbTv,
  tmdbTrending,
  tmdbNowPlaying,
  tmdbUpcoming,
  tmdbPopularTv,
} from "./tmdb-tool.js";

const TOOLS = [
  {
    name: "tmdb_search_movies",
    description: "Search for movies on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        year: { type: "number" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_search_tv",
    description: "Search for TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_movie",
    description: "Get details for a TMDB movie by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_tv",
    description: "Get details for a TMDB TV show by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_trending",
    description: "Get trending movies or TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        media_type: { type: "string", enum: ["movie", "tv", "all"], description: "movie, tv, or all" },
        time_window: { type: "string", enum: ["day", "week"], description: "day or week" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_now_playing",
    description: "Get movies currently in theaters from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_upcoming",
    description: "Get upcoming movies from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_popular_tv",
    description: "Get popular TV shows from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  tmdb_search_movies: (args) => tmdbSearchMovies(args as unknown as Parameters<typeof tmdbSearchMovies>[0]),
  tmdb_search_tv: (args) => tmdbSearchTv(args as unknown as Parameters<typeof tmdbSearchTv>[0]),
  tmdb_movie: (args) => tmdbMovie(args as unknown as Parameters<typeof tmdbMovie>[0]),
  tmdb_tv: (args) => tmdbTv(args as unknown as Parameters<typeof tmdbTv>[0]),
  tmdb_trending: (args) => tmdbTrending(args as unknown as Parameters<typeof tmdbTrending>[0]),
  tmdb_now_playing: (args) => tmdbNowPlaying(args as unknown as Parameters<typeof tmdbNowPlaying>[0]),
  tmdb_upcoming: (args) => tmdbUpcoming(args as unknown as Parameters<typeof tmdbUpcoming>[0]),
  tmdb_popular_tv: (args) => tmdbPopularTv(args as unknown as Parameters<typeof tmdbPopularTv>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/tmdb", version: "0.1.0" },
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
  process.stderr.write(`[tmdb-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
