#!/usr/bin/env node
// IGDB Games MCP. Standalone MCP server by UnClick.
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
  igdbSearchGames,
  igdbGetGame,
  igdbListPlatforms,
  igdbListGenres,
  igdbGetCompany,
} from "./igdb-tool.js";

const TOOLS = [
  {
    name: "igdb_search_games",
    description: "Search the IGDB games database by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        limit: { type: "number", description: "Max results (default 10, max 50)" },
        client_id: { type: "string", description: "Twitch/IGDB Client ID (or set IGDB_CLIENT_ID)" },
        client_secret: { type: "string", description: "Twitch/IGDB Client Secret (or set IGDB_CLIENT_SECRET)" },
      },
      required: ["query"],
    },
  },
  {
    name: "igdb_get_game",
    description: "Get full details of a game from IGDB by game ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "IGDB game ID" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "igdb_list_platforms",
    description: "List gaming platforms from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 30)" },
        offset: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_list_genres",
    description: "List all game genres from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_get_company",
    description: "Get a game company from IGDB by name or ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Company name to search for" },
        company_id: { type: "string", description: "IGDB company ID (takes precedence over name)" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  igdb_search_games: (args) => igdbSearchGames(args as unknown as Parameters<typeof igdbSearchGames>[0]),
  igdb_get_game: (args) => igdbGetGame(args as unknown as Parameters<typeof igdbGetGame>[0]),
  igdb_list_platforms: (args) => igdbListPlatforms(args as unknown as Parameters<typeof igdbListPlatforms>[0]),
  igdb_list_genres: (args) => igdbListGenres(args as unknown as Parameters<typeof igdbListGenres>[0]),
  igdb_get_company: (args) => igdbGetCompany(args as unknown as Parameters<typeof igdbGetCompany>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/igdb", version: "0.1.0" },
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
  process.stderr.write(`[igdb-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
