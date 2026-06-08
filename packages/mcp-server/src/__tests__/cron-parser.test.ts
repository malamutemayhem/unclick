import { describe, it, expect } from "vitest";
import { parseCron, cronMatches, nextCronDate, describeCron } from "../cron-parser.js";

describe("parseCron", () => {
  it("parses wildcard", () => {
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

  it("throws for invalid format", () => {
    expect(() => parseCron("* *")).toThrow("5 fields");
  });
});

describe("cronMatches", () => {
  it("matches specific time", () => {
    const d = new Date("2024-06-15T12:30:00");
    expect(cronMatches("30 12 * * *", d)).toBe(true);
    expect(cronMatches("0 12 * * *", d)).toBe(false);
  });
});

describe("nextCronDate", () => {
  it("finds next matching minute", () => {
    const after = new Date("2024-06-15T12:00:00");
    const next = nextCronDate("30 12 * * *", after);
    expect(next.getHours()).toBe(12);
    expect(next.getMinutes()).toBe(30);
  });
});

describe("describeCron", () => {
  it("describes every minute", () => {
    expect(describeCron("* * * * *")).toContain("every minute");
  });

  it("describes specific minute and hour", () => {
    const desc = describeCron("30 12 * * *");
    expect(desc).toContain("minute 30");
    expect(desc).toContain("hour 12");
  });
});
