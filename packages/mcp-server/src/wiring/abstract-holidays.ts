// wiring/abstract-holidays.ts
// Per-app MCP wiring for the abstract-holidays connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { abstractCountryInfo, abstractLongWeekends } from "../abstract-holidays-tool.js";

export const abstractHolidaysTools = [
  // ── abstract-holidays-tool.ts ────────────────────────────────────────────────
  {
    name: "country_info_detail",
    description: "Get country details (borders, languages, official name) from Nager.Date.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        country_code: { type: "string" as const, description: "ISO 3166-1 alpha-2 country code (e.g. AU, US)." },
      }, required: ["country_code"],
    },
  },
  {
    name: "long_weekends",
    description: "Get long weekends for a country and year from Nager.Date.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        country_code: { type: "string" as const, description: "ISO 3166-1 alpha-2 country code." },
        year: { type: "string" as const, description: "Year (default: current year)." },
      }, required: ["country_code"],
    },
  },
] as const;

export const abstractHolidaysHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // abstract-holidays-tool.ts
  country_info_detail:       (args) => abstractCountryInfo(args),
  long_weekends:             (args) => abstractLongWeekends(args),
};
