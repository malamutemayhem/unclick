// wiring/worldbank.ts
// Per-app MCP wiring for the worldbank connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { worldbankCountry, worldbankIndicator } from "../worldbank-tool.js";

export const worldbankTools = [
  // ── worldbank-tool.ts ───────────────────────────────────────────────────────
  {
    name: "worldbank_country",
    description: "Get country info from the World Bank. Pass a code (US, GB) or omit for all.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        code: { type: "string", description: "ISO 3166-1 alpha-2 or alpha-3 code (default all)" },
      },
    },
  },
  {
    name: "worldbank_indicator",
    description: "Get economic/development indicator data from the World Bank.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country: { type: "string", description: "Country code (default US)" },
        indicator: { type: "string", description: "Indicator ID (e.g. NY.GDP.MKTP.CD for GDP, SP.POP.TOTL for population)" },
        date: { type: "string", description: "Year range (e.g. 2015:2023, default last 8 years)" },
      },
      required: ["indicator"],
    },
  },

  // ── carbonintensity-tool.ts (UK grid) ───────────────────────────────────────
  {
    name: "carbon_intensity_current",
    description: "Get current UK electricity grid carbon intensity (gCO2/kWh).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "carbon_intensity_forecast",
    description: "Get 24-hour forecast of UK grid carbon intensity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "carbon_intensity_generation",
    description: "Get current UK electricity generation mix by fuel type.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const worldbankHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // worldbank-tool.ts
  worldbank_country:         (args) => worldbankCountry(args),
  worldbank_indicator:       (args) => worldbankIndicator(args),};
