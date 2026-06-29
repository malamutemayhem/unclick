// wiring/holidays.ts
// Per-app MCP wiring for the holidays connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { holidaysByCountry, holidaysNextWorldwide, holidayCountries, holidayLongWeekends } from "../holidays-tool.js";

export const holidaysTools = [
  // ── holidays-tool.ts ────────────────────────────────────────────────────────
  {
    name: "holidays_by_country",
    description: "Get public holidays for a country and year.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code (US, AU, GB, DE, etc)" },
        year: { type: "number", description: "Year (defaults to current year)" },
      },
      required: ["country_code"],
    },
  },
  {
    name: "holidays_next",
    description: "Get upcoming public holidays for a country.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code" },
      },
      required: ["country_code"],
    },
  },
  {
    name: "holidays_countries",
    description: "List all countries supported by the public holidays API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "holidays_long_weekends",
    description: "Get long weekends for a country and year.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code" },
        year: { type: "number", description: "Year (defaults to current year)" },
      },
      required: ["country_code"],
    },
  },
] as const;

export const holidaysHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // holidays-tool.ts
  holidays_by_country:     (args) => holidaysByCountry(args),
  holidays_next:           (args) => holidaysNextWorldwide(args),
  holidays_countries:      (args) => holidayCountries(args),
  holidays_long_weekends:  (args) => holidayLongWeekends(args),
};
