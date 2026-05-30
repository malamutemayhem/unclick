#!/usr/bin/env node
// Fantasy Premier League MCP. Standalone MCP server by UnClick.
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
  fplBootstrap,
  fplPlayer,
  fplGameweek,
  fplFixtures,
  fplMyTeam,
  fplManager,
  fplLeaguesClassic,
} from "./fpl-tool.js";

const TOOLS = [
  {
    name: "fpl_bootstrap",
    description: "Get Fantasy Premier League bootstrap data (players, teams, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "fpl_player",
    description: "Get FPL player details and history.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        player_id: { type: "number" },
      },
      required: ["player_id"],
    },
  },
  {
    name: "fpl_gameweek",
    description: "Get FPL gameweek details.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
      required: ["gameweek"],
    },
  },
  {
    name: "fpl_fixtures",
    description: "Get FPL fixtures, optionally for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
    },
  },
  {
    name: "fpl_my_team",
    description: "Get an FPL manager's team for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
        gameweek: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["manager_id", "gameweek"],
    },
  },
  {
    name: "fpl_manager",
    description: "Get an FPL manager profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
      },
      required: ["manager_id"],
    },
  },
  {
    name: "fpl_leagues_classic",
    description: "Get FPL classic league standings.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "number" },
        page: { type: "number" },
      },
      required: ["league_id"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  fpl_bootstrap: (args) => fplBootstrap(args as unknown as Parameters<typeof fplBootstrap>[0]),
  fpl_player: (args) => fplPlayer(args as unknown as Parameters<typeof fplPlayer>[0]),
  fpl_gameweek: (args) => fplGameweek(args as unknown as Parameters<typeof fplGameweek>[0]),
  fpl_fixtures: (args) => fplFixtures(args as unknown as Parameters<typeof fplFixtures>[0]),
  fpl_my_team: (args) => fplMyTeam(args as unknown as Parameters<typeof fplMyTeam>[0]),
  fpl_manager: (args) => fplManager(args as unknown as Parameters<typeof fplManager>[0]),
  fpl_leagues_classic: (args) => fplLeaguesClassic(args as unknown as Parameters<typeof fplLeaguesClassic>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/fpl", version: "0.1.0" },
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
  process.stderr.write(`[fpl-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
