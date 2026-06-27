import { describe, it, expect } from "vitest";
import { CronSchedule } from "../cron-schedule.js";

describe("CronSchedule", () => {
  it("parses wildcard fields", () => {
    const cron = new CronSchedule("* * * * *");
    const fields = cron.getFields();
    expect(fields.minute.type).toBe("wildcard");
    expect(fields.minute.values).toHaveLength(60);
  });

  it("parses specific values", () => {
    const cron = new CronSchedule("30 14 * * *");
    const fields = cron.getFields();
    expect(fields.minute.values).toEqual([30]);
    expect(fields.hour.values).toEqual([14]);
  });

  it("parses ranges", () => {
    const fields = CronSchedule.parse("0 9-17 * * *");
    expect(fields.hour.type).toBe("range");
    expect(fields.hour.values).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });

  it("parses steps", () => {
    const fields = CronSchedule.parse("*/15 * * * *");
    expect(fields.minute.type).toBe("step");
    expect(fields.minute.values).toEqual([0, 15, 30, 45]);
  });

  it("parses lists", () => {
    const fields = CronSchedule.parse("0 8,12,18 * * *");
    expect(fields.hour.type).toBe("list");
    expect(fields.hour.values).toEqual([8, 12, 18]);
  });

  it("throws on invalid expression", () => {
    expect(() => new CronSchedule("* * *")).toThrow("Invalid cron");
  });

  it("matches a date correctly", () => {
    const cron = new CronSchedule("30 14 * * *");
    const yes = new Date(2025, 0, 15, 14, 30, 0);
    const no = new Date(2025, 0, 15, 14, 31, 0);
    expect(cron.matches(yes)).toBe(true);
    expect(cron.matches(no)).toBe(false);
  });

  it("finds next occurrence", () => {
    const cron = new CronSchedule("0 12 * * *");
    const from = new Date(2025, 0, 1, 10, 0, 0);
    const next = cron.next(from);
    expect(next).not.toBeNull();
    expect(next!.getHours()).toBe(12);
    expect(next!.getMinutes()).toBe(0);
  });

  it("finds multiple next occurrences", () => {
    const cron = new CronSchedule("0 * * * *");
    const from = new Date(2025, 0, 1, 10, 0, 0);
    const results = cron.nextN(from, 3);
    expect(results).toHaveLength(3);
    expect(results[0].getHours()).toBe(11);
    expect(results[1].getHours()).toBe(12);
    expect(results[2].getHours()).toBe(13);
  });

  it("describes the expression", () => {
    const cron = new CronSchedule("30 14 * * *");
    const desc = cron.describe();
    expect(desc).toContain("minute");
    expect(desc).toContain("30");
  });

  it("returns expression string", () => {
    const cron = new CronSchedule("0 0 * * *");
    expect(cron.getExpression()).toBe("0 0 * * *");
  });

  it("validates expressions", () => {
    expect(CronSchedule.isValid("* * * * *")).toBe(true);
    expect(CronSchedule.isValid("bad")).toBe(false);
  });

  it("has common presets", () => {
    expect(CronSchedule.common.daily).toBe("0 0 * * *");
    expect(CronSchedule.common.hourly).toBe("0 * * * *");
    expect(CronSchedule.common.weekly).toBe("0 0 * * 0");
  });
});
