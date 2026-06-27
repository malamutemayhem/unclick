import { describe, it, expect } from "vitest";
import { parseDuration, decompose, formatDuration, humanize } from "../duration-parser.js";

describe("parseDuration", () => {
  it("parses simple units", () => {
    expect(parseDuration("5s")).toBe(5000);
    expect(parseDuration("1m")).toBe(60000);
    expect(parseDuration("2h")).toBe(7200000);
    expect(parseDuration("1d")).toBe(86400000);
  });

  it("parses compound durations", () => {
    expect(parseDuration("1h30m")).toBe(5400000);
  });

  it("parses long unit names", () => {
    expect(parseDuration("5 seconds")).toBe(5000);
    expect(parseDuration("2 minutes")).toBe(120000);
  });

  it("handles milliseconds", () => {
    expect(parseDuration("500ms")).toBe(500);
  });

  it("handles decimal values", () => {
    expect(parseDuration("1.5h")).toBe(5400000);
  });

  it("throws for unknown unit", () => {
    expect(() => parseDuration("5x")).toThrow("Unknown");
  });

  it("throws for invalid input", () => {
    expect(() => parseDuration("abc")).toThrow();
  });
});

describe("decompose", () => {
  it("breaks into parts", () => {
    const parts = decompose(90061001);
    expect(parts.days).toBe(1);
    expect(parts.hours).toBe(1);
    expect(parts.minutes).toBe(1);
    expect(parts.seconds).toBe(1);
    expect(parts.milliseconds).toBe(1);
  });
});

describe("formatDuration", () => {
  it("formats verbose", () => {
    expect(formatDuration(3661000)).toBe("1 hour, 1 minute, 1 second");
  });

  it("formats compact", () => {
    expect(formatDuration(3661000, true)).toBe("1h1m1s");
  });

  it("formats zero", () => {
    expect(formatDuration(0, true)).toBe("0ms");
  });

  it("formats ms only", () => {
    expect(formatDuration(500)).toBe("500 milliseconds");
  });
});

describe("humanize", () => {
  it("shows ms for small", () => {
    expect(humanize(500)).toBe("500ms");
  });

  it("shows seconds", () => {
    expect(humanize(5000)).toBe("5.0s");
  });

  it("shows minutes", () => {
    expect(humanize(120000)).toBe("2.0m");
  });

  it("shows hours", () => {
    expect(humanize(7200000)).toBe("2.0h");
  });

  it("shows days", () => {
    expect(humanize(172800000)).toBe("2.0d");
  });
});
