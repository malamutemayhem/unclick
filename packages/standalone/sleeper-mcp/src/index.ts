#!/usr/bin/env node
// Sleeper Fantasy MCP. Standalone MCP server by UnClick.
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
  getNflState,
  getSleeperPlayers,
  getTrendingPlayers,
  getSleeperLeague,
  getLeagueRosters,
  getLeagueMatchups,
} from "./sleeper-tool.js";

const TOOLS = [
  {
    name: "sleeper_nfl_state",
    description: "Get the current NFL state from Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "sleeper_players",
    description: "Get all NFL players from Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
      },
    },
  },
  {
    name: "sleeper_trending_players",
    description: "Get trending players on Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        type: { type: "string", enum: ["add", "drop"], description: "add or drop" },
        lookback_hours: { type: "number" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "sleeper_league",
    description: "Get a Sleeper fantasy league by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
      },
      required: ["league_id"],
    },
  },
  {
    name: "sleeper_league_rosters",
    description: "Get rosters for a Sleeper fantasy league.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
      },
      required: ["league_id"],
    },
  },
  {
    name: "sleeper_league_matchups",
    description: "Get matchups for a Sleeper fantasy league week.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
        week: { type: "number" },
      },
      required: ["league_id", "week"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  sleeper_nfl_state: (args) => getNflState(args as unknown as Parameters<typeof getNflState>[0]),
  sleeper_players: (args) => getSleeperPlayers(args as unknown as Parameters<typeof getSleeperPlayers>[0]),
  sleeper_trending_players: (args) => getTrendingPlayers(args as unknown as Parameters<typeof getTrendingPlayers>[0]),
  sleeper_league: (args) => getSleeperLeague(args as unknown as Parameters<typeof getSleeperLeague>[0]),
  sleeper_league_rosters: (args) => getLeagueRosters(args as unknown as Parameters<typeof getLeagueRosters>[0]),
  sleeper_league_matchups: (args) => getLeagueMatchups(args as unknown as Parameters<typeof getLeagueMatchups>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/sleeper", version: "0.1.0" },
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
  process.stderr.write(`[sleeper-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
