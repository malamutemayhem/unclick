#!/usr/bin/env node
// OMDb Movies MCP. Standalone MCP server by UnClick.
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
  omdbSearch,
  omdbGetByTitle,
  omdbGetById,
} from "./omdb-tool.js";

const TOOLS = [
  {
    name: "omdb_search",
    description: "Search movies/TV shows on OMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        s: { type: "string", description: "Search term" },
        type: { type: "string" },
        y: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["s"],
    },
  },
  {
    name: "omdb_by_title",
    description: "Get an OMDB movie/show by title.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        t: { type: "string" },
        type: { type: "string" },
        y: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["t"],
    },
  },
  {
    name: "omdb_by_id",
    description: "Get an OMDB movie/show by IMDb ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        i: { type: "string", description: "IMDb ID" },
        api_key: { type: "string" },
      },
      required: ["i"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  omdb_search: (args) => omdbSearch(args as unknown as Parameters<typeof omdbSearch>[0]),
  omdb_by_title: (args) => omdbGetByTitle(args as unknown as Parameters<typeof omdbGetByTitle>[0]),
  omdb_by_id: (args) => omdbGetById(args as unknown as Parameters<typeof omdbGetById>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/omdb", version: "0.1.0" },
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
  process.stderr.write(`[omdb-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
