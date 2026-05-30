#!/usr/bin/env node
// Speedrun.com MCP. Standalone MCP server by UnClick.
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
  speedrunSearchGames,
  speedrunGetGame,
  speedrunGetLeaderboard,
  speedrunListRuns,
  speedrunGetUser,
} from "./speedrun-tool.js";

const TOOLS = [
  {
    name: "speedrun_search_games",
    description: "Search for games on Speedrun.com by name. No API key required.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Game name to search" },
        max: { type: "number", description: "Max results" },
      },
      required: ["name"],
    },
  },
  {
    name: "speedrun_get_game",
    description: "Get details of a game on Speedrun.com including categories and levels.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Speedrun.com game ID or abbreviation" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "speedrun_get_leaderboard",
    description: "Get the leaderboard for a Speedrun.com game category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Game ID" },
        category_id: { type: "string", description: "Category ID" },
        top: { type: "number", description: "Only return top N places" },
        platform: { type: "string" },
        emulators: { type: "boolean" },
        video_only: { type: "boolean" },
      },
      required: ["game_id", "category_id"],
    },
  },
  {
    name: "speedrun_list_runs",
    description: "List speedruns with optional filters for game, category, user, or status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "Game ID" },
        category: { type: "string" },
        user: { type: "string", description: "User ID" },
        status: { type: "string", enum: ["new", "verified", "rejected"], description: "new, verified, or rejected" },
        orderby: { type: "string", enum: ["date", "submitted", "status", "game", "category", "level", "platform", "region", "emulated", "weblink"], description: "date, submitted, status, game, category, level, platform, region, emulated, or weblink" },
        direction: { type: "string", enum: ["asc", "desc"], description: "asc or desc" },
        max: { type: "number" },
      },
    },
  },
  {
    name: "speedrun_get_user",
    description: "Get a Speedrun.com user profile by ID or username.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_id: { type: "string", description: "User ID or username" },
      },
      required: ["user_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  speedrun_search_games: (args) => speedrunSearchGames(args as unknown as Parameters<typeof speedrunSearchGames>[0]),
  speedrun_get_game: (args) => speedrunGetGame(args as unknown as Parameters<typeof speedrunGetGame>[0]),
  speedrun_get_leaderboard: (args) => speedrunGetLeaderboard(args as unknown as Parameters<typeof speedrunGetLeaderboard>[0]),
  speedrun_list_runs: (args) => speedrunListRuns(args as unknown as Parameters<typeof speedrunListRuns>[0]),
  speedrun_get_user: (args) => speedrunGetUser(args as unknown as Parameters<typeof speedrunGetUser>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/speedrun", version: "0.1.0" },
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
  process.stderr.write(`[speedrun-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
