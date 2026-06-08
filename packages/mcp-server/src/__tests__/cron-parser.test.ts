import { describe, it, expect } from "vitest";
import { parseCron, matches, describe as describeCron } from "../cron-parser.js";

describe("cron-parser", () => {
  it("parses wildcard fields", () => {
    const fields = parseCron("* * * * *");
    expect(fields.minute).toHaveLength(60);
    expect(fields.hour).toHaveLength(24);
    expect(fields.dayOfMonth).toHaveLength(31);
    expect(fields.month).toHaveLength(12);
    expect(fields.dayOfWeek).toHaveLength(7);
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

  it("throws on invalid field count", () => {
    expect(() => parseCron("* * *")).toThrow("Expected 5 fields");
  });

  it("matches a date correctly", () => {
    const date = new Date(2025, 0, 15, 10, 30);
    expect(matches("30 10 15 1 *", date)).toBe(true);
    expect(matches("0 10 15 1 *", date)).toBe(false);
  });

  it("matches day of week", () => {
    const monday = new Date(2025, 0, 6, 9, 0);
    expect(matches("0 9 * * 1", monday)).toBe(true);
    expect(matches("0 9 * * 0", monday)).toBe(false);
  });

  it("describe returns human readable text", () => {
    expect(describeCron("*/5 * * * *")).toContain("minutes");
    expect(describeCron("0 9 * * *")).toContain("minute 0");
    expect(describeCron("0 9 * * *")).toContain("hour 9");
  });

  it("throws on invalid values", () => {
    expect(() => parseCron("60 * * * *")).toThrow();
    expect(() => parseCron("* 25 * * *")).toThrow();
  });
});
