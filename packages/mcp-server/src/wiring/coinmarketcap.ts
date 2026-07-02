// wiring/coinmarketcap.ts
// Per-app MCP wiring for the coinmarketcap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cmcListings, cmcQuotes, cmcInfo, cmcTrending, cmcGlobalMetrics } from "../coinmarketcap-tool.js";

export const coinmarketcapTools = [
  // ── coinmarketcap-tool.ts ────────────────────────────────────────────────────
  {
    name: "cmc_listings",
    description: "Get latest cryptocurrency listings from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        convert: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_quotes",
    description: "Get cryptocurrency quotes from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        id: { type: "string" },
        convert: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_info",
    description: "Get cryptocurrency metadata from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        id: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_trending",
    description: "Get trending cryptocurrencies from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_global_metrics",
    description: "Get global cryptocurrency market metrics from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const coinmarketcapHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coinmarketcap-tool.ts
  cmc_listings:            (args) => cmcListings(args),
  cmc_quotes:              (args) => cmcQuotes(args),
  cmc_info:                (args) => cmcInfo(args),
  cmc_trending:            (args) => cmcTrending(args),
  cmc_global_metrics:      (args) => cmcGlobalMetrics(args),
};
