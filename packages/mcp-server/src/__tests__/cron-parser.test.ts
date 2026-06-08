import { describe, it, expect } from "vitest";
import { parseCron, matches, nextMatch } from "../cron-parser.js";

describe("parseCron", () => {
  it("parses every-minute expression", () => {
    const result = parseCron("* * * * *");
    expect(result.minute).toHaveLength(60);
    expect(result.hour).toHaveLength(24);
  });

  it("parses specific values", () => {
    const result = parseCron("30 9 * * 1");
    expect(result.minute).toEqual([30]);
    expect(result.hour).toEqual([9]);
    expect(result.dayOfWeek).toEqual([1]);
  });

  it("parses ranges", () => {
    const result = parseCron("0-5 * * * *");
    expect(result.minute).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("parses steps", () => {
    const result = parseCron("*/15 * * * *");
    expect(result.minute).toEqual([0, 15, 30, 45]);
  });

  it("parses comma-separated values", () => {
    const result = parseCron("0 9,17 * * *");
    expect(result.hour).toEqual([9, 17]);
  });

  it("throws for invalid expression", () => {
    expect(() => parseCron("* * *")).toThrow("5 fields");
  });

  it("throws for out of range values", () => {
    expect(() => parseCron("60 * * * *")).toThrow("out of range");
  });
});

describe("matches", () => {
  it("matches a specific time", () => {
    const date = new Date(2025, 0, 6, 9, 30, 0);
    expect(matches("30 9 6 1 *", date)).toBe(true);
  });

  it("does not match wrong minute", () => {
    const date = new Date(2025, 0, 6, 9, 31, 0);
    expect(matches("30 9 6 1 *", date)).toBe(false);
  });

  it("matches wildcard fields", () => {
    const date = new Date(2025, 5, 15, 12, 0, 0);
    expect(matches("0 12 * * *", date)).toBe(true);
  });
});

describe("nextMatch", () => {
  it("finds next match", () => {
    const after = new Date(2025, 0, 1, 0, 0, 0);
    const next = nextMatch("0 12 * * *", after);
    expect(next.getHours()).toBe(12);
    expect(next.getMinutes()).toBe(0);
  });

  it("skips current minute", () => {
    const after = new Date(2025, 0, 1, 12, 0, 0);
    const next = nextMatch("0 12 * * *", after);
    expect(next.getDate()).toBe(2);
  });

  it("finds next matching day of week", () => {
    const monday = new Date(2025, 0, 6, 10, 0, 0);
    const next = nextMatch("0 9 * * 5", monday);
    expect(next.getDay()).toBe(5);
  });
});
