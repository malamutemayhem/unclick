import { describe, it, expect } from "vitest";
import { formatDuration, parseDuration, humanize } from "../duration-format.js";

describe("duration-format", () => {
  it("formats milliseconds", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatDuration(5000)).toBe("5.0s");
    expect(formatDuration(1500)).toBe("1.5s");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(90000)).toBe("1m 30s");
    expect(formatDuration(120000)).toBe("2m");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(3600000)).toBe("1h");
    expect(formatDuration(5400000)).toBe("1h 30m");
  });

  it("formats negative durations", () => {
    expect(formatDuration(-5000)).toBe("-5.0s");
  });

  it("parseDuration parses various units", () => {
    expect(parseDuration("500ms")).toBe(500);
    expect(parseDuration("5s")).toBe(5000);
    expect(parseDuration("2m")).toBe(120000);
    expect(parseDuration("1h")).toBe(3600000);
    expect(parseDuration("1d")).toBe(86400000);
  });

  it("parseDuration handles combined", () => {
    expect(parseDuration("1h 30m")).toBe(5400000);
    expect(parseDuration("2m 30s")).toBe(150000);
  });

  it("humanize returns relative time", () => {
    expect(humanize(500)).toBe("just now");
    expect(humanize(30000)).toBe("30 seconds ago");
    expect(humanize(300000)).toBe("5 minutes ago");
    expect(humanize(7200000)).toBe("2 hours ago");
    expect(humanize(172800000)).toBe("2 days ago");
  });
});
