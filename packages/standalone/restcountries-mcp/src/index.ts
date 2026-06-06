#!/usr/bin/env node
// REST Countries MCP. Standalone MCP server by UnClick.
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
  countryAll,
  countryByName,
  countryByCode,
  countryByRegion,
  countryByCurrency,
  countryByLanguage,
} from "./restcountries-tool.js";

const TOOLS = [
  {
    name: "country_all",
    description: "Get all countries from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fields: { type: "string" },
      },
    },
  },
  {
    name: "country_by_name",
    description: "Get a country by name from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        fullText: { type: "boolean" },
      },
      required: ["name"],
    },
  },
  {
    name: "country_by_code",
    description: "Get a country by code from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        code: { type: "string" },
      },
      required: ["code"],
    },
  },
  {
    name: "country_by_region",
    description: "Get countries by region from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        region: { type: "string" },
      },
      required: ["region"],
    },
  },
  {
    name: "country_by_currency",
    description: "Get countries by currency from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        currency: { type: "string" },
      },
      required: ["currency"],
    },
  },
  {
    name: "country_by_language",
    description: "Get countries by language from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        language: { type: "string" },
      },
      required: ["language"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  country_all: (args) => countryAll(args as unknown as Parameters<typeof countryAll>[0]),
  country_by_name: (args) => countryByName(args as unknown as Parameters<typeof countryByName>[0]),
  country_by_code: (args) => countryByCode(args as unknown as Parameters<typeof countryByCode>[0]),
  country_by_region: (args) => countryByRegion(args as unknown as Parameters<typeof countryByRegion>[0]),
  country_by_currency: (args) => countryByCurrency(args as unknown as Parameters<typeof countryByCurrency>[0]),
  country_by_language: (args) => countryByLanguage(args as unknown as Parameters<typeof countryByLanguage>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/restcountries", version: "0.1.0" },
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
  process.stderr.write(`[restcountries-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
