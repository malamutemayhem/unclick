import { stampMeta } from "./connector-meta.js";

const TIMEZONE_OFFSETS: Record<string, { offset: number; name: string }> = {
  "UTC": { offset: 0, name: "Coordinated Universal Time" },
  "GMT": { offset: 0, name: "Greenwich Mean Time" },
  "EST": { offset: -5, name: "Eastern Standard Time" },
  "EDT": { offset: -4, name: "Eastern Daylight Time" },
  "CST": { offset: -6, name: "Central Standard Time" },
  "CDT": { offset: -5, name: "Central Daylight Time" },
  "MST": { offset: -7, name: "Mountain Standard Time" },
  "MDT": { offset: -6, name: "Mountain Daylight Time" },
  "PST": { offset: -8, name: "Pacific Standard Time" },
  "PDT": { offset: -7, name: "Pacific Daylight Time" },
  "AKST": { offset: -9, name: "Alaska Standard Time" },
  "HST": { offset: -10, name: "Hawaii Standard Time" },
  "AEST": { offset: 10, name: "Australian Eastern Standard Time" },
  "AEDT": { offset: 11, name: "Australian Eastern Daylight Time" },
  "ACST": { offset: 9.5, name: "Australian Central Standard Time" },
  "AWST": { offset: 8, name: "Australian Western Standard Time" },
  "NZST": { offset: 12, name: "New Zealand Standard Time" },
  "NZDT": { offset: 13, name: "New Zealand Daylight Time" },
  "IST": { offset: 5.5, name: "India Standard Time" },
  "JST": { offset: 9, name: "Japan Standard Time" },
  "KST": { offset: 9, name: "Korea Standard Time" },
  "CST_CHINA": { offset: 8, name: "China Standard Time" },
  "HKT": { offset: 8, name: "Hong Kong Time" },
  "SGT": { offset: 8, name: "Singapore Time" },
  "WET": { offset: 0, name: "Western European Time" },
  "CET": { offset: 1, name: "Central European Time" },
  "CEST": { offset: 2, name: "Central European Summer Time" },
  "EET": { offset: 2, name: "Eastern European Time" },
  "EEST": { offset: 3, name: "Eastern European Summer Time" },
  "BRT": { offset: -3, name: "Brasilia Time" },
  "ART": { offset: -3, name: "Argentina Time" },
};

export async function timezoneInfo(args: Record<string, unknown>) {
  const tz = String(args.timezone ?? "").toUpperCase().trim();
  if (!tz) {
    const all = Object.entries(TIMEZONE_OFFSETS).map(([abbr, info]) => ({
      abbreviation: abbr, offset_hours: info.offset, name: info.name,
    }));
    return stampMeta({ timezones: all, count: all.length }, {
      source: "local timezone reference",
      fetched_at: new Date().toISOString(),
      next_steps: ["pass a timezone abbreviation for details", "offset_hours is relative to UTC"],
    });
  }
  const info = TIMEZONE_OFFSETS[tz];
  if (!info) {
    const matches = Object.entries(TIMEZONE_OFFSETS)
      .filter(([k, v]) => k.includes(tz) || v.name.toUpperCase().includes(tz))
      .map(([k, v]) => ({ abbreviation: k, offset_hours: v.offset, name: v.name }));
    if (matches.length > 0) {
      return stampMeta({ query: tz, matches, count: matches.length }, {
        source: "local timezone reference",
        fetched_at: new Date().toISOString(),
        next_steps: ["use an exact abbreviation for full info"],
      });
    }
    return { error: `Unknown timezone: ${tz}. Pass no timezone to list all.` };
  }
  const sign = info.offset >= 0 ? "+" : "";
  const utcOffset = `UTC${sign}${info.offset}`;
  return stampMeta({
    abbreviation: tz, name: info.name,
    offset_hours: info.offset, utc_offset: utcOffset,
  }, {
    source: "local timezone reference",
    fetched_at: new Date().toISOString(),
    next_steps: ["use datetime_convert_timezone for live conversions", "offset_hours is from UTC"],
  });
}
