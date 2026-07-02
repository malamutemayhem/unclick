// wiring/coingecko.ts
// Per-app MCP wiring for the coingecko connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cryptoPrice, cryptoCoin, cryptoSearch, cryptoTrending, cryptoTopCoins, cryptoCoinHistory } from "../coingecko-tool.js";

export const coingeckoTools = [
  // ── coingecko-tool.ts ────────────────────────────────────────────────────────
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
  },
] as const;

export const coingeckoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coingecko-tool.ts
  crypto_price:            (args) => cryptoPrice(args),
  crypto_coin:             (args) => cryptoCoin(args),
  crypto_search:           (args) => cryptoSearch(args),
  crypto_trending:         (args) => cryptoTrending(args),
  crypto_top_coins:        (args) => cryptoTopCoins(args),
  crypto_coin_history:     (args) => cryptoCoinHistory(args),
};
