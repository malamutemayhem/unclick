import { describe, it, expect } from "vitest";
import { CronExpression } from "../cron-expression.js";

describe("CronExpression", () => {
  it("matches every minute", () => {
    const cron = new CronExpression("* * * * *");
    const date = new Date(2024, 0, 15, 10, 30);
    expect(cron.matches(date)).toBe(true);
  });

  it("matches specific time", () => {
    const cron = new CronExpression("30 10 * * *");
    expect(cron.matches(new Date(2024, 0, 15, 10, 30))).toBe(true);
    expect(cron.matches(new Date(2024, 0, 15, 10, 31))).toBe(false);
  });

  it("matches day of week", () => {
    const cron = new CronExpression("0 9 * * 1");
    const monday = new Date(2024, 0, 15, 9, 0);
    expect(cron.matches(monday)).toBe(true);
  });

  it("parses ranges", () => {
    const cron = new CronExpression("0 9-17 * * *");
    expect(cron.matches(new Date(2024, 0, 15, 12, 0))).toBe(true);
    expect(cron.matches(new Date(2024, 0, 15, 20, 0))).toBe(false);
  });

  it("parses steps", () => {
    const cron = new CronExpression("*/15 * * * *");
    expect(cron.matches(new Date(2024, 0, 15, 10, 0))).toBe(true);
    expect(cron.matches(new Date(2024, 0, 15, 10, 15))).toBe(true);
    expect(cron.matches(new Date(2024, 0, 15, 10, 7))).toBe(false);
  });

  it("next returns upcoming occurrences", () => {
    const cron = new CronExpression("0 12 * * *");
    const from = new Date(2024, 0, 15, 10, 0);
    const nextOccurrences = cron.next(from, 3);
    expect(nextOccurrences.length).toBe(3);
    expect(nextOccurrences[0].getHours()).toBe(12);
    expect(nextOccurrences[0].getMinutes()).toBe(0);
  });

  it("isValid checks expression", () => {
    expect(CronExpression.isValid("* * * * *")).toBe(true);
    expect(CronExpression.isValid("bad")).toBe(false);
  });

  it("describe gives human-readable description", () => {
    const cron = new CronExpression("30 9 * * *");
    const desc = cron.describe();
    expect(desc).toContain("30");
    expect(desc).toContain("9");
  });

  it("getFields returns parsed fields", () => {
    const cron = new CronExpression("0 0 1 1 *");
    const fields = cron.getFields();
    expect(fields.minute).toEqual([0]);
    expect(fields.hour).toEqual([0]);
    expect(fields.dayOfMonth).toEqual([1]);
    expect(fields.month).toEqual([1]);
  });
});
