import { describe, expect, it } from "vitest";

import {
  addToDate,
  calculateDateDiff,
  convertTimezone,
  formatDate,
  getBusinessDays,
  getCurrentTime,
  getWeekNumber,
} from "./datetime-tool.js";

describe("datetime connector (L2)", () => {
  // ── get_current_time ───────────────────────────────────────────────────────

  it("returns current time in UTC by default", () => {
    const r = getCurrentTime({}) as Record<string, unknown>;
    expect(r.timezone).toBe("UTC");
    expect(r.iso).toBeDefined();
    expect(r.unix_timestamp).toBeGreaterThan(0);
    expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(r.time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("accepts a valid IANA timezone", () => {
    const r = getCurrentTime({ timezone: "Australia/Sydney" }) as Record<string, unknown>;
    expect(r.timezone).toBe("Australia/Sydney");
    expect(r.iso).toBeDefined();
  });

  it("returns an error for an invalid timezone", () => {
    const r = getCurrentTime({ timezone: "Mars/Olympus" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid timezone/i);
  });

  // ── convert_timezone ───────────────────────────────────────────────────────

  it("converts between timezones", () => {
    const r = convertTimezone({
      datetime: "2026-01-15T10:00:00",
      from_tz: "UTC",
      to_tz: "Australia/Sydney",
    }) as Record<string, unknown>;
    expect(r.from_tz).toBe("UTC");
    expect(r.to_tz).toBe("Australia/Sydney");
    expect(r.result).toBeDefined();
    expect(r.result).toContain("2026-01-15T21:00:00");
  });

  it("returns an error when datetime is missing", () => {
    const r = convertTimezone({ from_tz: "UTC", to_tz: "US/Eastern" }) as Record<string, unknown>;
    expect(r.error).toMatch(/datetime is required/i);
  });

  it("returns an error when from_tz is missing", () => {
    const r = convertTimezone({ datetime: "2026-01-15T10:00:00", to_tz: "UTC" }) as Record<string, unknown>;
    expect(r.error).toMatch(/from_tz is required/i);
  });

  it("returns an error when to_tz is missing", () => {
    const r = convertTimezone({ datetime: "2026-01-15T10:00:00", from_tz: "UTC" }) as Record<string, unknown>;
    expect(r.error).toMatch(/to_tz is required/i);
  });

  // ── calculate_date_diff ────────────────────────────────────────────────────

  it("calculates difference between two dates", () => {
    const r = calculateDateDiff({ date1: "2026-01-01", date2: "2026-01-31" }) as Record<string, unknown>;
    expect(r.total_days).toBe(30);
    expect(r.absolute_days).toBe(30);
    expect(r.weeks).toBe(4);
    expect(r.direction).toMatch(/date2 is after/i);
  });

  it("handles reverse date order", () => {
    const r = calculateDateDiff({ date1: "2026-06-15", date2: "2026-01-01" }) as Record<string, unknown>;
    expect(r.total_days).toBeLessThan(0);
    expect(r.direction).toMatch(/date2 is before/i);
  });

  it("returns an error for invalid date1", () => {
    const r = calculateDateDiff({ date1: "not-a-date", date2: "2026-01-01" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid date1/i);
  });

  // ── add_to_date ────────────────────────────────────────────────────────────

  it("adds days to a date", () => {
    const r = addToDate({ date: "2026-01-01", amount: 10, unit: "days" }) as Record<string, unknown>;
    expect(r.result_date).toBe("2026-01-11");
  });

  it("adds months to a date", () => {
    const r = addToDate({ date: "2026-01-15", amount: 3, unit: "months" }) as Record<string, unknown>;
    expect(r.result_date).toBe("2026-04-15");
  });

  it("subtracts with negative amount", () => {
    const r = addToDate({ date: "2026-06-01", amount: -1, unit: "years" }) as Record<string, unknown>;
    expect(r.result_date).toBe("2025-06-01");
  });

  it("returns an error for invalid date", () => {
    const r = addToDate({ date: "bad", amount: 1, unit: "days" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid date/i);
  });

  it("returns an error for invalid unit", () => {
    const r = addToDate({ date: "2026-01-01", amount: 1, unit: "centuries" }) as Record<string, unknown>;
    expect(r.error).toMatch(/unit must be one of/i);
  });

  // ── get_business_days ──────────────────────────────────────────────────────

  it("counts business days in a work week", () => {
    // Mon Jan 5 to Fri Jan 9 2026
    const r = getBusinessDays({ start: "2026-01-05", end: "2026-01-09" }) as Record<string, unknown>;
    expect(r.business_days).toBe(5);
    expect(r.weekend_days).toBe(0);
  });

  it("counts business days across a weekend", () => {
    // Mon Jan 5 to Mon Jan 12 2026
    const r = getBusinessDays({ start: "2026-01-05", end: "2026-01-12" }) as Record<string, unknown>;
    expect(r.business_days).toBe(6);
    expect(r.weekend_days).toBe(2);
  });

  it("returns an error for invalid start_date", () => {
    const r = getBusinessDays({ start: "bad", end: "2026-01-10" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid start_date/i);
  });

  // ── format_date ────────────────────────────────────────────────────────────

  it("formats a date as ISO by default", () => {
    const r = formatDate({ date: "2026-03-15" }) as Record<string, unknown>;
    expect(r.format).toBe("iso");
    expect(r.result).toBe("2026-03-15");
  });

  it("returns an error for invalid format", () => {
    const r = formatDate({ date: "2026-01-01", format: "invalid" }) as Record<string, unknown>;
    expect(r.error).toMatch(/format must be one of/i);
  });

  it("returns an error for invalid date", () => {
    const r = formatDate({ date: "nope" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid date/i);
  });

  // ── get_week_number ────────────────────────────────────────────────────────

  it("returns the ISO week number", () => {
    // 2026-01-05 is a Monday in week 2
    const r = getWeekNumber({ date: "2026-01-05" }) as Record<string, unknown>;
    expect(r.iso_week).toBe(2);
    expect(r.formatted).toMatch(/^W02 2026$/);
    expect(r.day_of_week).toBe("Monday");
  });

  it("returns an error for invalid date", () => {
    const r = getWeekNumber({ date: "xyz" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid date/i);
  });
});
