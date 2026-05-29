#!/usr/bin/env node
// BoardGameGeek MCP — standalone MCP server.
// Part of UnClick — 180+ tools plus persistent agent memory in one install. https://unclick.world
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
  bggSearch,
  bggGameDetails,
  bggUserCollection,
  bggTopGames,
  bggGameReviews,
} from "./bgg-tool.js";

const TOOLS = [
  {
    name: "bgg_search",
    description: "Search BoardGameGeek for board games by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        type: { type: "string", enum: ["boardgame", "boardgameexpansion"], description: "Type of item to search for (default: boardgame)" },
      },
      required: ["query"],
    },
  },
  {
    name: "bgg_game_details",
    description: "Get full details for a board game by its BGG ID - name, year, rating, players, playtime, description, categories, and mechanics.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
      },
      required: ["gameId"],
    },
  },
  {
    name: "bgg_user_collection",
    description: "Get a BGG user's game collection filtered by status (owned, wishlist, or played).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string", description: "BGG username" },
        status: { type: "string", enum: ["owned", "wishlist", "played"], description: "Collection filter (default: owned)" },
      },
      required: ["username"],
    },
  },
  {
    name: "bgg_top_games",
    description: "Get the BGG Hotness list - the most discussed and active board games right now.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of games to return (max 50, default 20)" },
      },
    },
  },
  {
    name: "bgg_game_reviews",
    description: "Get user comments and ratings for a board game on BGG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
        page: { type: "number", description: "Page number (default 1, 25 comments per page)" },
      },
      required: ["gameId"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  bgg_search: (args) => bggSearch(args),
  bgg_game_details: (args) => bggGameDetails(args),
  bgg_user_collection: (args) => bggUserCollection(args),
  bgg_top_games: (args) => bggTopGames(args),
  bgg_game_reviews: (args) => bggGameReviews(args),
};

const server = new Server(
  { name: "io.github.malamutemayhem/bgg", version: "0.1.0" },
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
  process.stderr.write(`[bgg-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
