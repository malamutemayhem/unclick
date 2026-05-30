#!/usr/bin/env node
// Exchange Rates MCP. Standalone MCP server by UnClick.
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
  exchangerateLatest,
  exchangerateConvert,
  exchangerateHistorical,
  exchangerateCodes,
} from "./exchangerate-tool.js";

const TOOLS = [
  {
    name: "exchangerate_latest",
    description: "Get latest currency exchange rates for a base currency. Works without API key using the free tier.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        api_key: { type: "string", description: "ExchangeRate-API key (or set EXCHANGERATE_API_KEY). Optional for latest rates." },
      },
    },
  },
  {
    name: "exchangerate_convert",
    description: "Convert an amount from one currency to another.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string", description: "Source currency code (e.g. USD)" },
        to: { type: "string", description: "Target currency code (e.g. EUR)" },
        amount: { type: "number", description: "Amount to convert (default 1)" },
        api_key: { type: "string", description: "Optional for conversion (uses latest rates if omitted)" },
      },
      required: ["from", "to"],
    },
  },
  {
    name: "exchangerate_historical",
    description: "Get historical exchange rates for a specific date. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        year: { type: "string", description: "4-digit year" },
        month: { type: "string", description: "Month number (1-12)" },
        day: { type: "string", description: "Day number (1-31)" },
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
      required: ["year", "month", "day"],
    },
  },
  {
    name: "exchangerate_codes",
    description: "List all supported currency codes and their names. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  exchangerate_latest: (args) => exchangerateLatest(args as unknown as Parameters<typeof exchangerateLatest>[0]),
  exchangerate_convert: (args) => exchangerateConvert(args as unknown as Parameters<typeof exchangerateConvert>[0]),
  exchangerate_historical: (args) => exchangerateHistorical(args as unknown as Parameters<typeof exchangerateHistorical>[0]),
  exchangerate_codes: (args) => exchangerateCodes(args as unknown as Parameters<typeof exchangerateCodes>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/exchangerate", version: "0.1.0" },
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
  process.stderr.write(`[exchangerate-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
