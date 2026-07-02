// wiring/openfigi.ts
// Per-app MCP wiring for the openfigi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openfigiMapping, openfigiSearch } from "../openfigi-tool.js";

export const openfigiTools = [
  // ── openfigi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "openfigi_mapping",
    description: "Map a financial instrument identifier (ticker, ISIN, CUSIP) to FIGI.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id_type: { type: "string" as const, description: "Identifier type: TICKER, ISIN, CUSIP, SEDOL (default: TICKER)." },
        id_value: { type: "string" as const, description: "Identifier value (e.g. AAPL)." },
      }, required: ["id_value"],
    },
  },
  {
    name: "openfigi_search",
    description: "Search OpenFIGI for financial instruments by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Search query (company or instrument name)." },
      }, required: ["query"],
    },
  },
] as const;

export const openfigiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openfigi-tool.ts
  openfigi_mapping:          (args) => openfigiMapping(args),
  openfigi_search:           (args) => openfigiSearch(args),
};
