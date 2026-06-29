// wiring/alphavantage.ts
// Per-app MCP wiring for the alphavantage connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { stockQuote, stockSearch, stockDaily, stockIntraday, forexRate, cryptoDaily } from "../alphavantage-tool.js";

export const alphavantageTools = [
  // ── alphavantage-tool.ts ─────────────────────────────────────────────────────
  {
    name: "stock_quote",
    description: "Get a real-time stock quote from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "stock_search",
    description: "Search for stock tickers on Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keywords: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "stock_daily",
    description: "Get daily stock price history from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        outputsize: { type: "string", enum: ["compact", "full"], description: "compact or full" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "stock_intraday",
    description: "Get intraday stock prices from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        interval: { type: "string", description: "1min, 5min, 15min, 30min, 60min" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "forex_rate",
    description: "Get a forex exchange rate from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from_currency: { type: "string" },
        to_currency: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from_currency", "to_currency"],
    },
  },
  {
    name: "crypto_daily",
    description: "Get daily crypto price history from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        market: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
] as const;

export const alphavantageHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // alphavantage-tool.ts
  stock_quote:             (args) => stockQuote(args),
  stock_search:            (args) => stockSearch(args),
  stock_daily:             (args) => stockDaily(args),
  stock_intraday:          (args) => stockIntraday(args),
  forex_rate:              (args) => forexRate(args),
  crypto_daily:            (args) => cryptoDaily(args),
};
