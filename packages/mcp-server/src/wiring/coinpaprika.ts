// wiring/coinpaprika.ts
// Per-app MCP wiring for the coinpaprika connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { coinpaprikaGlobal, coinpaprikaCoin, coinpaprikaTicker } from "../coinpaprika-tool.js";

export const coinpaprikaTools = [
  // ── coinpaprika-tool.ts ─────────────────────────────────────────────────────
  {
    name: "coinpaprika_global",
    description: "Get global cryptocurrency market stats from Coinpaprika.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "coinpaprika_coin",
    description: "Get detailed info about a cryptocurrency from Coinpaprika.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "string", description: "Coin ID (e.g. btc-bitcoin, eth-ethereum)" },
      },
      required: ["id"],
    },
  },
  {
    name: "coinpaprika_ticker",
    description: "Get live price/ticker data from Coinpaprika. Without id, returns top 20.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "string", description: "Coin ID for specific ticker (optional)" },
      },
    },
  },
] as const;

export const coinpaprikaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coinpaprika-tool.ts
  coinpaprika_global:      (args) => coinpaprikaGlobal(args),
  coinpaprika_coin:        (args) => coinpaprikaCoin(args),
  coinpaprika_ticker:      (args) => coinpaprikaTicker(args),
};
