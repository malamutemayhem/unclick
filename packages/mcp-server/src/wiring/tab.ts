// wiring/tab.ts
// Per-app MCP wiring for the tab connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { getTabMeetings, getTabRace, getTabSportsMarkets } from "../tab-tool.js";

export const tabTools = [
  // ── tab-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "tab_meetings",
    description: "Get TAB race meetings for a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string", description: "YYYY-MM-DD" },
        jurisdiction: { type: "string", description: "e.g. VIC, NSW" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tab_race",
    description: "Get TAB race details. A race is addressed by its meeting date, meeting name, and race number (TAB has no single race id).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        meeting_date: { type: "string", description: "Meeting date, YYYY-MM-DD" },
        meeting_name: { type: "string", description: "Meeting name, e.g. Flemington" },
        race_number: { type: "string", description: "Race number within the meeting" },
        race_type: { type: "string", description: "R (thoroughbred), G (greyhound), or H (harness). Default R." },
        jurisdiction: { type: "string", description: "State jurisdiction, e.g. VIC (default), NSW." },
        api_key: { type: "string" },
      },
      required: ["meeting_date", "meeting_name", "race_number"],
    },
  },
  {
    name: "tab_sports_markets",
    description: "Get TAB sports betting markets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        competition: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const tabHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tab-tool.ts
  tab_meetings:         (args) => getTabMeetings(args),
  tab_race:             (args) => getTabRace(args),
  tab_sports_markets:   (args) => getTabSportsMarkets(args),
};
