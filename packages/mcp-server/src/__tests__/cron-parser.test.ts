import { describe, it, expect } from "vitest";
import { parseCron, matches, nextMatch, nextN, describe as describeCron } from "../cron-parser.js";

describe("parseCron", () => {
  it("parses wildcard", () => {
    const fields = parseCron("* * * * *");
    expect(fields.minute.length).toBe(60);
    expect(fields.hour.length).toBe(24);
  });

  it("parses specific values", () => {
    const fields = parseCron("30 14 * * *");
    expect(fields.minute).toEqual([30]);
    expect(fields.hour).toEqual([14]);
  });

  it("parses ranges", () => {
    const fields = parseCron("0 9-17 * * *");
    expect(fields.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });

  it("parses steps", () => {
    const fields = parseCron("*/15 * * * *");
    expect(fields.minute).toEqual([0, 15, 30, 45]);
  });

  it("parses comma lists", () => {
    const fields = parseCron("0 8,12,18 * * *");
    expect(fields.hour).toEqual([8, 12, 18]);
  });

  it("throws on invalid expression", () => {
    expect(() => parseCron("bad")).toThrow("5 fields");
  });
});

describe("matches", () => {
  it("matches specific time", () => {
    const d = new Date(2025, 0, 6, 14, 30);
    expect(matches("30 14 * * *", d)).toBe(true);
  });

  it("rejects non-matching time", () => {
    const d = new Date(2025, 0, 6, 14, 31);
    expect(matches("30 14 * * *", d)).toBe(false);
  });

  it("matches day of week", () => {
    const mon = new Date(2025, 0, 6, 0, 0);
    expect(matches("0 0 * * 1", mon)).toBe(true);
    expect(matches("0 0 * * 2", mon)).toBe(false);
  });
});

describe("nextMatch", () => {
  it("finds next occurrence", () => {
    const after = new Date(2025, 0, 6, 14, 0);
    const next = nextMatch("30 14 * * *", after);
    expect(next.getHours()).toBe(14);
    expect(next.getMinutes()).toBe(30);
  });

  it("advances to next day if past", () => {
    const after = new Date(2025, 0, 6, 15, 0);
    const next = nextMatch("30 14 * * *", after);
    expect(next.getDate()).toBe(7);
  });
});

describe("nextN", () => {
  it("returns multiple matches", () => {
    const after = new Date(2025, 0, 1, 0, 0);
    const results = nextN("0 12 * * *", after, 3);
    expect(results.length).toBe(3);
    results.forEach((d) => {
      expect(d.getHours()).toBe(12);
      expect(d.getMinutes()).toBe(0);
    });
  });
});

describe("describe", () => {
  it("describes a cron expression", () => {
    const desc = describeCron("30 14 * * 1-5");
    expect(desc).toContain("minute 30");
    expect(desc).toContain("hour 14");
  });
});
