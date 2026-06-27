import { describe, it, expect } from "vitest";
import {
  parseDate, parseDuration, formatDate, formatDuration,
  durationToSeconds, toUnixTimestamp, fromUnixTimestamp,
  addDuration, isValid, parseInterval
} from "../iso8601.js";

describe("ISO8601", () => {
  it("parses basic date", () => {
    const d = parseDate("2024-03-15");
    expect(d.year).toBe(2024);
    expect(d.month).toBe(3);
    expect(d.day).toBe(15);
  });

  it("parses date with time", () => {
    const d = parseDate("2024-03-15T10:30:45");
    expect(d.hour).toBe(10);
    expect(d.minute).toBe(30);
    expect(d.second).toBe(45);
  });

  it("parses UTC timezone", () => {
    const d = parseDate("2024-03-15T10:30:00Z");
    expect(d.tzOffsetMinutes).toBe(0);
  });

  it("parses positive timezone offset", () => {
    const d = parseDate("2024-03-15T10:30:00+05:30");
    expect(d.tzOffsetMinutes).toBe(330);
  });

  it("parses negative timezone offset", () => {
    const d = parseDate("2024-03-15T10:30:00-08:00");
    expect(d.tzOffsetMinutes).toBe(-480);
  });

  it("parses milliseconds", () => {
    const d = parseDate("2024-03-15T10:30:00.123Z");
    expect(d.millisecond).toBe(123);
  });

  it("formats date back to string", () => {
    const d = parseDate("2024-03-15T10:30:45Z");
    expect(formatDate(d)).toBe("2024-03-15T10:30:45Z");
  });

  it("parses duration", () => {
    const d = parseDuration("P1Y2M3DT4H5M6S");
    expect(d.years).toBe(1);
    expect(d.months).toBe(2);
    expect(d.days).toBe(3);
    expect(d.hours).toBe(4);
    expect(d.minutes).toBe(5);
    expect(d.seconds).toBe(6);
  });

  it("parses week duration", () => {
    const d = parseDuration("P2W");
    expect(d.weeks).toBe(2);
  });

  it("formats duration", () => {
    expect(formatDuration({ years: 1, months: 0, weeks: 0, days: 2, hours: 3, minutes: 0, seconds: 0 }))
      .toBe("P1Y2DT3H");
  });

  it("formats zero duration", () => {
    expect(formatDuration({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }))
      .toBe("P0D");
  });

  it("converts duration to seconds", () => {
    expect(durationToSeconds({ years: 0, months: 0, weeks: 0, days: 1, hours: 0, minutes: 0, seconds: 0 }))
      .toBe(86400);
  });

  it("converts to unix timestamp and back", () => {
    const d = parseDate("2024-01-01T00:00:00Z");
    const ts = toUnixTimestamp(d);
    const d2 = fromUnixTimestamp(ts);
    expect(d2.year).toBe(2024);
    expect(d2.month).toBe(1);
    expect(d2.day).toBe(1);
  });

  it("validates dates", () => {
    expect(isValid(parseDate("2024-02-29"))).toBe(true);
    expect(isValid({ year: 2024, month: 13, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, tzOffsetMinutes: null }))
      .toBe(false);
  });

  it("adds duration to date", () => {
    const d = parseDate("2024-01-01T00:00:00Z");
    const dur = parseDuration("P1D");
    const result = addDuration(d, dur);
    expect(result.day).toBe(2);
  });

  it("parses interval", () => {
    const interval = parseInterval("2024-01-01T00:00:00Z/P1D");
    expect(interval.start.year).toBe(2024);
    expect("days" in interval.end && interval.end.days).toBe(1);
  });

  it("throws on invalid date", () => {
    expect(() => parseDate("not-a-date")).toThrow("Invalid ISO 8601");
  });

  it("throws on invalid duration", () => {
    expect(() => parseDuration("not-a-duration")).toThrow("Invalid ISO 8601");
  });
});
