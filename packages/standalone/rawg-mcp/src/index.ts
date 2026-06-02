#!/usr/bin/env node
// RAWG Games MCP. Standalone MCP server by UnClick.
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
  rawgSearchGames,
  rawgGetGame,
  rawgGetGameScreenshots,
  rawgListGenres,
  rawgListPlatforms,
  rawgUpcomingGames,
} from "./rawg-tool.js";

const TOOLS = [
  {
    name: "rawg_search_games",
    description: "Search for video games on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string", description: "Search query" },
        genres: { type: "string" },
        platforms: { type: "string" },
        ordering: { type: "string" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["search"],
    },
  },
  {
    name: "rawg_get_game",
    description: "Get details for a specific game by RAWG ID or slug.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "RAWG game ID or slug" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_game_screenshots",
    description: "Get screenshots for a RAWG game.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_list_genres",
    description: "List all game genres on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_list_platforms",
    description: "List all gaming platforms on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_upcoming_games",
    description: "Get upcoming game releases from RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  rawg_search_games: (args) => rawgSearchGames(args as unknown as Parameters<typeof rawgSearchGames>[0]),
  rawg_get_game: (args) => rawgGetGame(args as unknown as Parameters<typeof rawgGetGame>[0]),
  rawg_game_screenshots: (args) => rawgGetGameScreenshots(args as unknown as Parameters<typeof rawgGetGameScreenshots>[0]),
  rawg_list_genres: (args) => rawgListGenres(args as unknown as Parameters<typeof rawgListGenres>[0]),
  rawg_list_platforms: (args) => rawgListPlatforms(args as unknown as Parameters<typeof rawgListPlatforms>[0]),
  rawg_upcoming_games: (args) => rawgUpcomingGames(args as unknown as Parameters<typeof rawgUpcomingGames>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/rawg", version: "0.1.0" },
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
  process.stderr.write(`[rawg-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
