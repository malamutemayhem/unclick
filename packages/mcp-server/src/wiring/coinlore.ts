// wiring/coinlore.ts
// Per-app MCP wiring for the coinlore connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { coinloreGlobal, coinloreTickers, coinloreCoin } from "../coinlore-tool.js";

export const coinloreTools = [
  // ── coinlore-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "coinlore_global",
    description: "Get global cryptocurrency market overview from Coinlore.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "coinlore_tickers",
    description: "List top cryptocurrency tickers with price and market cap from Coinlore.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        start: { type: "number" as const, description: "Offset for pagination (default 0)." },
        limit: { type: "number" as const, description: "Max results (default 20, max 100)." },
      },
    },
  },
  {
    name: "coinlore_coin",
    description: "Get detailed info for a specific cryptocurrency from Coinlore.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Coin ID (e.g. 90 for Bitcoin, 80 for Ethereum)." },
      },
      required: ["id"],
    },
  },
] as const;

export const coinloreHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coinlore-tool.ts
  coinlore_global:           (args) => coinloreGlobal(args),
  coinlore_tickers:          (args) => coinloreTickers(args),
  coinlore_coin:             (args) => coinloreCoin(args),};
