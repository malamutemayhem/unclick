import { describe, expect, it } from "vitest";

import {
  getCurrentTime,
  convertTimezone,
  calculateDateDiff,
  addToDate,
  getBusinessDays,
  formatDate,
  getWeekNumber,
} from "../datetime-tool.js";

describe("getCurrentTime", () => {
  it("returns a well-shaped result for UTC", () => {
    const r = getCurrentTime({ timezone: "UTC" }) as any;
    expect(r.timezone).toBe("UTC");
    expect(r.iso).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(r.unix_timestamp).toBeGreaterThan(0);
    expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(r.time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("defaults to UTC when no timezone provided", () => {
    const r = getCurrentTime({}) as any;
    expect(r.timezone).toBe("UTC");
  });

  it("returns error for invalid timezone", () => {
    const r = getCurrentTime({ timezone: "Mars/Olympus" }) as any;
    expect(r.error).toContain("Mars/Olympus");
  });

  it("accepts valid IANA timezones", () => {
    const r = getCurrentTime({ timezone: "Australia/Melbourne" }) as any;
    expect(r.timezone).toBe("Australia/Melbourne");
    expect(r.error).toBeUndefined();
  });
});

describe("convertTimezone", () => {
  it("converts a datetime between timezones", () => {
    const r = convertTimezone({
      datetime: "2024-06-15T12:00:00",
      from_timezone: "UTC",
      to_timezone: "Australia/Sydney",
    }) as any;
    expect(r.result).toContain("2024-06-15T22:00:00");
    expect(r.from_tz).toBe("UTC");
    expect(r.to_tz).toBe("Australia/Sydney");
  });

  it("returns error when datetime is missing", () => {
    const r = convertTimezone({ from_timezone: "UTC", to_timezone: "UTC" }) as any;
    expect(r.error).toContain("datetime");
  });

  it("returns error when from_tz is missing", () => {
    const r = convertTimezone({ datetime: "2024-01-01T00:00:00", to_timezone: "UTC" }) as any;
    expect(r.error).toContain("from_tz");
  });

  it("returns error when to_tz is missing", () => {
    const r = convertTimezone({ datetime: "2024-01-01T00:00:00", from_timezone: "UTC" }) as any;
    expect(r.error).toContain("to_tz");
  });

  it("returns error for invalid timezone", () => {
    const r = convertTimezone({
      datetime: "2024-01-01T00:00:00",
      from_timezone: "UTC",
      to_timezone: "Fake/Place",
    }) as any;
    expect(r.error).toBeTruthy();
  });

  it("accepts from_tz/to_tz aliases", () => {
    const r = convertTimezone({
      datetime: "2024-01-01T00:00:00",
      from_tz: "UTC",
      to_tz: "America/New_York",
    }) as any;
    expect(r.result).toBeDefined();
  });

  it("includes iso_utc and unix_timestamp", () => {
    const r = convertTimezone({
      datetime: "2024-06-15T12:00:00",
      from_timezone: "UTC",
      to_timezone: "UTC",
    }) as any;
    expect(r.iso_utc).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(r.unix_timestamp).toBeGreaterThan(0);
  });
});

describe("calculateDateDiff", () => {
  it("calculates days between two dates", () => {
    const r = calculateDateDiff({ date1: "2024-01-01", date2: "2024-01-31" }) as any;
    expect(r.total_days).toBe(30);
    expect(r.absolute_days).toBe(30);
  });

  it("handles date2 before date1 (negative)", () => {
    const r = calculateDateDiff({ date1: "2024-06-15", date2: "2024-06-01" }) as any;
    expect(r.total_days).toBe(-14);
    expect(r.absolute_days).toBe(14);
    expect(r.direction).toContain("before");
  });

  it("computes weeks and remaining days", () => {
    const r = calculateDateDiff({ date1: "2024-01-01", date2: "2024-01-22" }) as any;
    expect(r.weeks).toBe(3);
    expect(r.weeks_and_days).toBe("3 weeks, 0 days");
  });

  it("reports approximate months", () => {
    const r = calculateDateDiff({ date1: "2024-01-01", date2: "2024-07-01" }) as any;
    expect(r.approximate_months).toBe(6);
  });

  it("reports approximate years and months", () => {
    const r = calculateDateDiff({ date1: "2022-03-01", date2: "2024-09-01" }) as any;
    expect(r.approximate_years_and_months).toBe("2 years, 6 months");
  });

  it("returns zero for same date", () => {
    const r = calculateDateDiff({ date1: "2024-06-15", date2: "2024-06-15" }) as any;
    expect(r.total_days).toBe(0);
  });

  it("returns error for invalid date1", () => {
    const r = calculateDateDiff({ date1: "nope", date2: "2024-01-01" }) as any;
    expect(r.error).toContain("date1");
  });

  it("returns error for invalid date2", () => {
    const r = calculateDateDiff({ date1: "2024-01-01", date2: "nope" }) as any;
    expect(r.error).toContain("date2");
  });
});

describe("addToDate", () => {
  it("adds days", () => {
    const r = addToDate({ date: "2024-01-01", amount: 10, unit: "days" }) as any;
    expect(r.result_date).toBe("2024-01-11");
  });

  it("adds weeks", () => {
    const r = addToDate({ date: "2024-01-01", amount: 2, unit: "weeks" }) as any;
    expect(r.result_date).toBe("2024-01-15");
  });

  it("adds months", () => {
    const r = addToDate({ date: "2024-01-15", amount: 3, unit: "months" }) as any;
    expect(r.result_date).toBe("2024-04-15");
  });

  it("adds years", () => {
    const r = addToDate({ date: "2024-06-15", amount: 1, unit: "years" }) as any;
    expect(r.result_date).toBe("2025-06-15");
  });

  it("subtracts with negative amount", () => {
    const r = addToDate({ date: "2024-06-15", amount: -15, unit: "days" }) as any;
    expect(r.result_date).toBe("2024-05-31");
  });

  it("defaults to days", () => {
    const r = addToDate({ date: "2024-01-01", amount: 5 }) as any;
    expect(r.result_date).toBe("2024-01-06");
  });

  it("returns error for invalid date", () => {
    const r = addToDate({ date: "xyz", amount: 1, unit: "days" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for unsupported unit", () => {
    const r = addToDate({ date: "2024-01-01", amount: 1, unit: "hours" }) as any;
    expect(r.error).toContain("unit");
  });

  it("includes day_of_week in result", () => {
    const r = addToDate({ date: "2024-01-01", amount: 0, unit: "days" }) as any;
    expect(r.day_of_week).toBe("Monday");
  });
});

describe("getBusinessDays", () => {
  it("counts weekdays in a one-week span", () => {
    const r = getBusinessDays({ start: "2024-06-10", end: "2024-06-14" }) as any;
    expect(r.business_days).toBe(5);
    expect(r.weekend_days).toBe(0);
  });

  it("counts weekdays across a weekend", () => {
    const r = getBusinessDays({ start: "2024-06-10", end: "2024-06-16" }) as any;
    expect(r.business_days).toBe(5);
    expect(r.weekend_days).toBe(2);
  });

  it("handles start after end (auto-swaps)", () => {
    const r = getBusinessDays({ start: "2024-06-16", end: "2024-06-10" }) as any;
    expect(r.business_days).toBe(5);
  });

  it("handles single day (Monday)", () => {
    const r = getBusinessDays({ start: "2024-06-10", end: "2024-06-10" }) as any;
    expect(r.business_days).toBe(1);
    expect(r.total_calendar_days).toBe(1);
  });

  it("handles single day (Saturday)", () => {
    const r = getBusinessDays({ start: "2024-06-15", end: "2024-06-15" }) as any;
    expect(r.business_days).toBe(0);
    expect(r.weekend_days).toBe(1);
  });

  it("accepts start_date/end_date aliases", () => {
    const r = getBusinessDays({ start_date: "2024-06-10", end_date: "2024-06-14" }) as any;
    expect(r.business_days).toBe(5);
  });

  it("returns error for invalid start", () => {
    const r = getBusinessDays({ start: "bad", end: "2024-06-14" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for invalid end", () => {
    const r = getBusinessDays({ start: "2024-06-10", end: "bad" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("formatDate", () => {
  it("formats as ISO by default", () => {
    const r = formatDate({ date: "2024-06-15" }) as any;
    expect(r.result).toBe("2024-06-15");
    expect(r.format).toBe("iso");
  });

  it("formats as US date", () => {
    const r = formatDate({ date: "2024-06-15", format: "us" }) as any;
    expect(r.result).toBe("06/15/2024");
  });

  it("formats as AU date", () => {
    const r = formatDate({ date: "2024-06-15", format: "au" }) as any;
    expect(r.result).toBe("15/06/2024");
  });

  it("formats as long", () => {
    const r = formatDate({ date: "2024-06-15", format: "long" }) as any;
    expect(r.result).toContain("June");
    expect(r.result).toContain("2024");
    expect(r.result).toContain("Saturday");
  });

  it("formats as short", () => {
    const r = formatDate({ date: "2024-06-15", format: "short" }) as any;
    expect(r.result).toContain("Jun");
    expect(r.result).toContain("2024");
  });

  it("includes all_formats in result", () => {
    const r = formatDate({ date: "2024-06-15" }) as any;
    expect(r.all_formats.iso).toBeDefined();
    expect(r.all_formats.us).toBeDefined();
    expect(r.all_formats.au).toBeDefined();
    expect(r.all_formats.long).toBeDefined();
    expect(r.all_formats.short).toBeDefined();
  });

  it("returns error for unsupported format", () => {
    const r = formatDate({ date: "2024-06-15", format: "japanese" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for invalid date", () => {
    const r = formatDate({ date: "not-a-date" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("getWeekNumber", () => {
  it("returns ISO week number for a known date", () => {
    const r = getWeekNumber({ date: "2024-01-01" }) as any;
    expect(r.iso_week).toBe(1);
    expect(r.iso_year).toBe(2024);
  });

  it("returns correct week for mid-year", () => {
    const r = getWeekNumber({ date: "2024-06-15" }) as any;
    expect(r.iso_week).toBe(24);
  });

  it("includes formatted string", () => {
    const r = getWeekNumber({ date: "2024-06-15" }) as any;
    expect(r.formatted).toBe("W24 2024");
  });

  it("includes day_of_week", () => {
    const r = getWeekNumber({ date: "2024-06-15" }) as any;
    expect(r.day_of_week).toBe("Saturday");
  });

  it("includes day_number_in_year", () => {
    const r = getWeekNumber({ date: "2024-01-01" }) as any;
    expect(r.day_number_in_year).toBe(1);
  });

  it("handles year boundary (Dec 31 that falls in next year W01)", () => {
    const r = getWeekNumber({ date: "2024-12-30" }) as any;
    expect(r.iso_week).toBe(1);
    expect(r.iso_year).toBe(2025);
  });

  it("returns error for invalid date", () => {
    const r = getWeekNumber({ date: "nope" }) as any;
    expect(r.error).toBeTruthy();
  });
});
