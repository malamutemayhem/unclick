#!/usr/bin/env node
// Lichess MCP. Standalone MCP server by UnClick.
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
  lichessUser,
  lichessUserGames,
  lichessPuzzleDaily,
  lichessTopPlayers,
  lichessTournament,
} from "./lichess-tool.js";

const TOOLS = [
  {
    name: "lichess_user",
    description: "Get a Lichess user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "lichess_user_games",
    description: "Get games for a Lichess user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
        max: { type: "number" },
        perfType: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "lichess_puzzle_daily",
    description: "Get the Lichess daily puzzle.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "lichess_top_players",
    description: "Get top Lichess players for a game mode.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        perfType: { type: "string", enum: ["ultraBullet", "bullet", "blitz", "rapid", "classical", "chess960", "crazyhouse", "antichess", "atomic", "horde", "kingOfTheHill", "racingKings", "threeCheck"], description: "bullet, blitz, rapid, classical, etc." },
        nb: { type: "number" },
      },
    },
  },
  {
    name: "lichess_tournament",
    description: "Get details for a Lichess tournament.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tournament_id: { type: "string" },
      },
      required: ["tournament_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  lichess_user: (args) => lichessUser(args as unknown as Parameters<typeof lichessUser>[0]),
  lichess_user_games: (args) => lichessUserGames(args as unknown as Parameters<typeof lichessUserGames>[0]),
  lichess_puzzle_daily: (args) => lichessPuzzleDaily(args as unknown as Parameters<typeof lichessPuzzleDaily>[0]),
  lichess_top_players: (args) => lichessTopPlayers(args as unknown as Parameters<typeof lichessTopPlayers>[0]),
  lichess_tournament: (args) => lichessTournament(args as unknown as Parameters<typeof lichessTournament>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/lichess", version: "0.1.0" },
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
  process.stderr.write(`[lichess-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
