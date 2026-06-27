import { describe, it, expect } from "vitest";
import { TimezoneOffset } from "../timezone-offset.js";

describe("TimezoneOffset", () => {
  it("gets UTC offset", () => {
    expect(TimezoneOffset.getOffset("UTC")).toBe(0);
    expect(TimezoneOffset.getOffset("EST")).toBe(-5);
    expect(TimezoneOffset.getOffset("JST")).toBe(9);
  });

  it("returns null for unknown timezone", () => {
    expect(TimezoneOffset.getOffset("FAKE")).toBeNull();
  });

  it("converts time between zones", () => {
    const result = TimezoneOffset.convert(12, 0, "UTC", "EST");
    expect(result.hours).toBe(7);
    expect(result.minutes).toBe(0);
  });

  it("handles day rollover", () => {
    const result = TimezoneOffset.convert(2, 0, "UTC", "PST");
    expect(result.hours).toBe(18);
    expect(result.dayOffset).toBe(-1);
  });

  it("formats offset string", () => {
    expect(TimezoneOffset.formatOffset(5.5)).toBe("UTC+05:30");
    expect(TimezoneOffset.formatOffset(-8)).toBe("UTC-08:00");
    expect(TimezoneOffset.formatOffset(0)).toBe("UTC+00:00");
  });

  it("calculates difference between zones", () => {
    expect(TimezoneOffset.diffHours("EST", "PST")).toBe(-3);
    expect(TimezoneOffset.diffHours("UTC", "JST")).toBe(9);
  });

  it("lists all timezones", () => {
    const all = TimezoneOffset.list();
    expect(all.length).toBeGreaterThan(15);
  });

  it("filters by region", () => {
    const europe = TimezoneOffset.list("Europe");
    expect(europe.length).toBeGreaterThan(0);
    expect(europe.every((z) => z.region === "Europe")).toBe(true);
  });

  it("searches timezones", () => {
    const results = TimezoneOffset.search("tokyo");
    expect(results.length).toBe(1);
    expect(results[0].abbreviation).toBe("JST");
  });

  it("lists regions", () => {
    const regions = TimezoneOffset.regions();
    expect(regions).toContain("Americas");
    expect(regions).toContain("Europe");
    expect(regions).toContain("Asia");
  });

  it("calculates overlap hours", () => {
    const overlap = TimezoneOffset.overlapHours("EST", "PST");
    expect(overlap).toBe(5);
  });
});
