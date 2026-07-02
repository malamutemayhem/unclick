// wiring/coincap.ts
// Per-app MCP wiring for the coincap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { coincapAssets, coincapAssetDetail, coincapRates } from "../coincap-tool.js";

export const coincapTools = [
  // ── coincap-tool.ts ───────────────────────────────────────────────────────
  {
    name: "coincap_assets",
    description: "List top crypto assets by market cap from CoinCap.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        limit: { type: "number" as const, description: "Max results (default 10, max 50)." },
        search: { type: "string" as const, description: "Filter by asset name or symbol." },
      },
    },
  },
  {
    name: "coincap_asset_detail",
    description: "Get detailed crypto asset info (price, volume, market cap) from CoinCap.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Asset id (e.g. bitcoin, ethereum)." },
      }, required: ["id"],
    },
  },
  {
    name: "coincap_rates",
    description: "List crypto and fiat exchange rates from CoinCap.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const coincapHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // coincap-tool.ts
  coincap_assets:            (args) => coincapAssets(args),
  coincap_asset_detail:      (args) => coincapAssetDetail(args),
  coincap_rates:             (args) => coincapRates(args),};
