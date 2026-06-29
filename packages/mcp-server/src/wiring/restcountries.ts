// wiring/restcountries.ts
// Per-app MCP wiring for the restcountries connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { countryAll, countryByName, countryByCode, countryByRegion, countryByCurrency, countryByLanguage } from "../restcountries-tool.js";

export const restcountriesTools = [
  // ── restcountries-tool.ts ────────────────────────────────────────────────────
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
  },
] as const;

export const restcountriesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // restcountries-tool.ts
  country_all:             (args) => countryAll(args),
  country_by_name:         (args) => countryByName(args),
  country_by_code:         (args) => countryByCode(args),
  country_by_region:       (args) => countryByRegion(args),
  country_by_currency:     (args) => countryByCurrency(args),
  country_by_language:     (args) => countryByLanguage(args),
};
