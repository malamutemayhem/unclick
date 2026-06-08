import { describe, it, expect } from "vitest";
import { formatDuration, parseDuration, durationBetween } from "../duration.js";

describe("formatDuration", () => {
  it("formats milliseconds", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatDuration(3000)).toBe("3s");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(90_000)).toBe("1m 30s");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(3_660_000)).toBe("1h 1m");
  });

  it("formats days and hours", () => {
    expect(formatDuration(90_000_000)).toBe("1d 1h");
  });

  it("drops zero sub-units", () => {
    expect(formatDuration(60_000)).toBe("1m");
    expect(formatDuration(3_600_000)).toBe("1h");
    expect(formatDuration(86_400_000)).toBe("1d");
  });

  it("handles zero", () => {
    expect(formatDuration(0)).toBe("0ms");
  });

  it("handles negative as zero", () => {
    expect(formatDuration(-100)).toBe("0ms");
  });
});

describe("parseDuration", () => {
  it("parses milliseconds", () => {
    expect(parseDuration("500ms")).toBe(500);
  });

  it("parses seconds", () => {
    expect(parseDuration("30s")).toBe(30_000);
    expect(parseDuration("30sec")).toBe(30_000);
  });

  it("parses minutes", () => {
    expect(parseDuration("5m")).toBe(300_000);
    expect(parseDuration("5min")).toBe(300_000);
  });

  it("parses hours", () => {
    expect(parseDuration("2h")).toBe(7_200_000);
    expect(parseDuration("2hr")).toBe(7_200_000);
  });

  it("parses days", () => {
    expect(parseDuration("1d")).toBe(86_400_000);
    expect(parseDuration("1day")).toBe(86_400_000);
  });

  it("handles decimals", () => {
    expect(parseDuration("1.5h")).toBe(5_400_000);
  });

  it("returns undefined for invalid input", () => {
    expect(parseDuration("abc")).toBeUndefined();
    expect(parseDuration("")).toBeUndefined();
    expect(parseDuration("10x")).toBeUndefined();
  });

  it("trims whitespace", () => {
    expect(parseDuration("  5s  ")).toBe(5000);
  });
});

describe("durationBetween", () => {
  it("formats the difference between two dates", () => {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date("2025-01-01T01:30:00Z");
    expect(durationBetween(start, end)).toBe("1h 30m");
  });

  it("handles reversed order", () => {
    const start = new Date("2025-01-01T01:00:00Z");
    const end = new Date("2025-01-01T00:00:00Z");
    expect(durationBetween(start, end)).toBe("1h");
  });
});
