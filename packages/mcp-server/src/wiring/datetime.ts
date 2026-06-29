// wiring/datetime.ts
// Per-app MCP wiring for the datetime connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { getCurrentTime, convertTimezone, calculateDateDiff, addToDate, getBusinessDays, formatDate, getWeekNumber } from "../datetime-tool.js";

export const datetimeTools = [
  // ── datetime-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "datetime_current_time",
    description: "Get the current date and time, optionally in a specific timezone.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        timezone: { type: "string" },
        format: { type: "string" },
      },
    },
  },
  {
    name: "datetime_convert_timezone",
    description: "Convert a datetime from one timezone to another.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        datetime: { type: "string" },
        from_timezone: { type: "string" },
        to_timezone: { type: "string" },
      },
      required: ["datetime", "from_timezone", "to_timezone"],
    },
  },
  {
    name: "datetime_date_diff",
    description: "Calculate the difference between two dates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date1: { type: "string" },
        date2: { type: "string" },
      },
      required: ["date1", "date2"],
    },
  },
  {
    name: "datetime_add_to_date",
    description: "Add a duration to a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        years: { type: "number" },
        months: { type: "number" },
        days: { type: "number" },
        hours: { type: "number" },
        minutes: { type: "number" },
      },
      required: ["date"],
    },
  },
  {
    name: "datetime_business_days",
    description: "Get business days between two dates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start: { type: "string" },
        end: { type: "string" },
      },
      required: ["start", "end"],
    },
  },
  {
    name: "datetime_format_date",
    description: "Format a date string.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        format: { type: "string" },
        locale: { type: "string" },
      },
      required: ["date"],
    },
  },
  {
    name: "datetime_week_number",
    description: "Get the ISO week number for a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
      },
      required: ["date"],
    },
  },
] as const;

export const datetimeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // datetime-tool.ts
  datetime_current_time:   (args) => Promise.resolve(getCurrentTime(args)),
  datetime_convert_timezone:(args) => Promise.resolve(convertTimezone(args)),
  datetime_date_diff:      (args) => Promise.resolve(calculateDateDiff(args)),
  datetime_add_to_date:    (args) => Promise.resolve(addToDate(args)),
  datetime_business_days:  (args) => Promise.resolve(getBusinessDays(args)),
  datetime_format_date:    (args) => Promise.resolve(formatDate(args)),
  datetime_week_number:    (args) => Promise.resolve(getWeekNumber(args)),
};
