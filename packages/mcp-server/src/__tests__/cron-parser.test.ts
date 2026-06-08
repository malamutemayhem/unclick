import { describe, it, expect } from "vitest";
import { parseCron, matches, nextMatch, describe as describeCron } from "../cron-parser.js";

describe("parseCron", () => {
  it("parses every minute", () => {
    const f = parseCron("* * * * *");
    expect(f.minute.length).toBe(60);
    expect(f.hour.length).toBe(24);
  });

  it("parses specific values", () => {
    const f = parseCron("30 9 * * 1");
    expect(f.minute).toEqual([30]);
    expect(f.hour).toEqual([9]);
    expect(f.dayOfWeek).toEqual([1]);
  });

  it("parses ranges", () => {
    const f = parseCron("0 9-17 * * *");
    expect(f.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });

  it("parses steps", () => {
    const f = parseCron("*/15 * * * *");
    expect(f.minute).toEqual([0, 15, 30, 45]);
  });

  it("parses comma-separated", () => {
    const f = parseCron("0 8,12,18 * * *");
    expect(f.hour).toEqual([8, 12, 18]);
  });

  it("throws for invalid", () => {
    expect(() => parseCron("* * *")).toThrow("expected 5 fields");
  });
});

describe("matches", () => {
  it("matches date", () => {
    const f = parseCron("30 9 * * *");
    const d = new Date(2024, 0, 15, 9, 30);
    expect(matches(f, d)).toBe(true);
  });

  it("rejects non-matching", () => {
    const f = parseCron("30 9 * * *");
    const d = new Date(2024, 0, 15, 10, 30);
    expect(matches(f, d)).toBe(false);
  });
});

describe("nextMatch", () => {
  it("finds next occurrence", () => {
    const f = parseCron("0 12 * * *");
    const after = new Date(2024, 0, 15, 10, 0);
    const next = nextMatch(f, after);
    expect(next.getHours()).toBe(12);
    expect(next.getMinutes()).toBe(0);
  });
});

describe("describe", () => {
  it("produces human-readable text", () => {
    const f = parseCron("0 9 * * 1-5");
    const text = describeCron(f);
    expect(text).toContain("start of the hour");
    expect(text).toContain("hour 9");
  });
});
