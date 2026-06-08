import { describe, it, expect } from "vitest";
import { parseCron, nextRun, matches, describe as describeCron } from "../cron-parser.js";

describe("parseCron", () => {
  it("parses wildcard expression", () => {
    const fields = parseCron("* * * * *");
    expect(fields.minute.length).toBe(60);
    expect(fields.hour.length).toBe(24);
  });

  it("parses specific values", () => {
    const fields = parseCron("0 12 * * *");
    expect(fields.minute).toEqual([0]);
    expect(fields.hour).toEqual([12]);
  });

  it("parses ranges", () => {
    const fields = parseCron("0-5 * * * *");
    expect(fields.minute).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("parses steps", () => {
    const fields = parseCron("*/15 * * * *");
    expect(fields.minute).toEqual([0, 15, 30, 45]);
  });

  it("parses comma-separated", () => {
    const fields = parseCron("0,30 * * * *");
    expect(fields.minute).toEqual([0, 30]);
  });

  it("throws for invalid expression", () => {
    expect(() => parseCron("* *")).toThrow();
  });
});

describe("nextRun", () => {
  it("finds next matching time", () => {
    const from = new Date(2024, 0, 1, 10, 0, 0);
    const next = nextRun("0 12 * * *", from);
    expect(next.getHours()).toBe(12);
    expect(next.getMinutes()).toBe(0);
  });

  it("moves to next day if past today", () => {
    const from = new Date(2024, 0, 1, 13, 0, 0);
    const next = nextRun("0 12 * * *", from);
    expect(next.getDate()).toBe(2);
  });
});

describe("matches", () => {
  it("returns true for matching date", () => {
    const date = new Date(2024, 0, 1, 12, 0, 0);
    expect(matches("0 12 * * *", date)).toBe(true);
  });

  it("returns false for non-matching date", () => {
    const date = new Date(2024, 0, 1, 13, 0, 0);
    expect(matches("0 12 * * *", date)).toBe(false);
  });
});

describe("describe", () => {
  it("describes a cron expression", () => {
    const desc = describeCron("0 12 * * *");
    expect(desc).toContain("minute 0");
    expect(desc).toContain("hour 12");
  });
});
