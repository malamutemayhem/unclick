import { describe, it, expect } from "vitest";
import { parseCron, nextRun, matches, describe as describeCron } from "../cron.js";

describe("cron", () => {
  it("parses simple expression", () => {
    const fields = parseCron("0 12 * * *");
    expect(fields.minute).toEqual([0]);
    expect(fields.hour).toEqual([12]);
    expect(fields.dayOfMonth).toHaveLength(31);
    expect(fields.month).toHaveLength(12);
    expect(fields.dayOfWeek).toHaveLength(7);
  });

  it("parses ranges", () => {
    const fields = parseCron("0-5 * * * *");
    expect(fields.minute).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("parses steps", () => {
    const fields = parseCron("*/15 * * * *");
    expect(fields.minute).toEqual([0, 15, 30, 45]);
  });

  it("parses lists", () => {
    const fields = parseCron("0 9,12,17 * * *");
    expect(fields.hour).toEqual([9, 12, 17]);
  });

  it("throws on invalid expression", () => {
    expect(() => parseCron("bad")).toThrow();
  });

  it("finds next run", () => {
    const after = new Date(2025, 0, 1, 11, 0, 0);
    const next = nextRun("0 12 * * *", after);
    expect(next.getHours()).toBe(12);
    expect(next.getMinutes()).toBe(0);
  });

  it("matches checks if date matches", () => {
    const d = new Date(2025, 0, 1, 12, 0, 0);
    expect(matches("0 12 * * *", d)).toBe(true);
    expect(matches("0 13 * * *", d)).toBe(false);
  });

  it("describe returns human-readable text", () => {
    const desc = describeCron("0 12 * * *");
    expect(desc).toContain("minute 0");
    expect(desc).toContain("hour 12");
  });
});
