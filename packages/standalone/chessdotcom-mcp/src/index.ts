#!/usr/bin/env node
// Chess.com MCP. Standalone MCP server by UnClick.
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
  chessPlayer,
  chessPlayerStats,
  chessPlayerGames,
  chessPuzzlesRandom,
  chessLeaderboards,
} from "./chessdotcom-tool.js";

const TOOLS = [
  {
    name: "chess_player",
    description: "Get a Chess.com player profile.",
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
    name: "chess_player_stats",
    description: "Get Chess.com player statistics.",
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
    name: "chess_player_games",
    description: "Get recent games for a Chess.com player.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
        year: { type: "number" },
        month: { type: "number" },
      },
      required: ["username"],
    },
  },
  {
    name: "chess_puzzles_random",
    description: "Get a random chess puzzle from Chess.com.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "chess_leaderboards",
    description: "Get Chess.com leaderboards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  chess_player: (args) => chessPlayer(args as unknown as Parameters<typeof chessPlayer>[0]),
  chess_player_stats: (args) => chessPlayerStats(args as unknown as Parameters<typeof chessPlayerStats>[0]),
  chess_player_games: (args) => chessPlayerGames(args as unknown as Parameters<typeof chessPlayerGames>[0]),
  chess_puzzles_random: (args) => chessPuzzlesRandom(args as unknown as Parameters<typeof chessPuzzlesRandom>[0]),
  chess_leaderboards: (args) => chessLeaderboards(args as unknown as Parameters<typeof chessLeaderboards>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/chessdotcom", version: "0.1.0" },
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
  process.stderr.write(`[chessdotcom-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
