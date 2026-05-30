#!/usr/bin/env node
// CoinGecko MCP. Standalone MCP server by UnClick.
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
  cryptoPrice,
  cryptoCoin,
  cryptoSearch,
  cryptoTrending,
  cryptoTopCoins,
  cryptoCoinHistory,
} from "./coingecko-tool.js";

const TOOLS = [
  {
    name: "crypto_price",
    description: "Get cryptocurrency prices from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ids: { type: "string", description: "Comma-separated coin IDs" },
        vs_currencies: { type: "string", description: "Comma-separated currency codes" },
      },
      required: ["ids"],
    },
  },
  {
    name: "crypto_coin",
    description: "Get detailed info for a cryptocurrency from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "crypto_search",
    description: "Search for cryptocurrencies on CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "crypto_trending",
    description: "Get trending cryptocurrencies from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "crypto_top_coins",
    description: "Get top cryptocurrencies by market cap from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        vs_currency: { type: "string" },
        per_page: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "crypto_coin_history",
    description: "Get historical price data for a cryptocurrency from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        date: { type: "string", description: "DD-MM-YYYY" },
      },
      required: ["id", "date"],
    },
  }
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  crypto_price: (args) => cryptoPrice(args as unknown as Parameters<typeof cryptoPrice>[0]),
  crypto_coin: (args) => cryptoCoin(args as unknown as Parameters<typeof cryptoCoin>[0]),
  crypto_search: (args) => cryptoSearch(args as unknown as Parameters<typeof cryptoSearch>[0]),
  crypto_trending: (args) => cryptoTrending(args as unknown as Parameters<typeof cryptoTrending>[0]),
  crypto_top_coins: (args) => cryptoTopCoins(args as unknown as Parameters<typeof cryptoTopCoins>[0]),
  crypto_coin_history: (args) => cryptoCoinHistory(args as unknown as Parameters<typeof cryptoCoinHistory>[0]),
};

const server = new Server(
  { name: "io.github.malamutemayhem/coingecko", version: "0.1.0" },
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
  process.stderr.write(`[coingecko-mcp] fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
