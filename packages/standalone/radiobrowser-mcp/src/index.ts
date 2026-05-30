#!/usr/bin/env node
// Radio Browser MCP. Standalone MCP server by UnClick.
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
  radioSearch,
  radioByCountry,
  radioTopClicked,
  radioTopVoted,
  radioByTag,
  radioCountries,
} from "./radiobrowser-tool.js";

const TOOLS = [
  {
    name: "radio_search",
    description: "Search for radio stations via Radio Browser.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        limit: { type: "number" },
      },
      required: ["name"],
    },
  },
  {
    name: "radio_by_country",
    description: "Get radio stations by country.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        limit: { type: "number" },
      },
      required: ["country"],
    },
  },
  {
    name: "radio_top_clicked",
    description: "Get the most-clicked radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "radio_top_voted",
    description: "Get the most-voted radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "radio_by_tag",
    description: "Get radio stations by genre tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tag: { type: "string" },
        limit: { type: "number" },
      },
      required: ["tag"],
    },
  },
  {
    name: "radio_countries",
    description: "List all countries with radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  radio_search: (args) => radioSearch(args as unknown as Parameters<typeof radioSearch>[0]),
  radio_by_country: (args) => radioByCountry(args as unknown as Parameters<typeof radioByCountry>[0]),
  radio_top_clicked: (args) => radioTopClicked(args as unknown as Parameters<typeof radioTopClicked>[0]),
  radio_top_voted: (args) => radioTopVoted(args as unknown as Parameters<typeof radioTopVoted>[0]),
  radio_by_tag: (args) => radioByTag(args as unknown as Parameters<typeof radioByTag>[0]),
  radio_countries: (args) => radioCountries(args as unknown as Parameters<typeof radioCountries>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/radiobrowser", version: "0.1.0" },
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
  process.stderr.write(`[radiobrowser-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
