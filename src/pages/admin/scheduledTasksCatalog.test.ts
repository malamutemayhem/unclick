import { describe, expect, it } from "vitest";
import {
  SCHEDULED_TASKS,
  cronMatchesUtc,
  describeCron,
  expandCronField,
  summarizeScheduledTasks,
} from "./scheduledTasksCatalog";

describe("scheduled tasks catalog", () => {
  it("has unique ids and valid 5-field crons for every task", () => {
    const ids = SCHEDULED_TASKS.map((task) => task.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const task of SCHEDULED_TASKS) {
      expect(task.cron.trim().split(/\s+/)).toHaveLength(5);
      expect(task.workflowFile).toMatch(/^\.github\/workflows\/.+\.yml$/);
      expect(task.description.length).toBeGreaterThan(0);
    }
  });

  it("summarizes totals by owner", () => {
    const summary = summarizeScheduledTasks();
    expect(summary.total).toBe(SCHEDULED_TASKS.length);
    const ownerSum = Object.values(summary.byOwner).reduce((a, b) => a + b, 0);
    expect(ownerSum).toBe(SCHEDULED_TASKS.length);
  });
});

describe("expandCronField", () => {
  it("expands wildcards, steps, ranges, and lists", () => {
    expect(expandCronField("*/5", "minute").has(0)).toBe(true);
    expect(expandCronField("*/5", "minute").has(5)).toBe(true);
    expect(expandCronField("*/5", "minute").has(1)).toBe(false);
    expect([...expandCronField("7,22,37,52", "minute")]).toEqual([7, 22, 37, 52]);
    expect([...expandCronField("1-3", "hour")]).toEqual([1, 2, 3]);
    expect(expandCronField("*", "hour").size).toBe(24);
  });

  it("rejects out-of-range and malformed values", () => {
    expect(() => expandCronField("99", "minute")).toThrow();
    expect(() => expandCronField("*/0", "minute")).toThrow();
  });
});

describe("describeCron", () => {
  it("derives cadence prose for the catalog patterns", () => {
    expect(describeCron("*/5 * * * *")).toBe("every 5 minutes");
    expect(describeCron("*/10 * * * *")).toBe("every 10 minutes");
    expect(describeCron("3,13,23,33,43,53 * * * *")).toBe("every 10 minutes");
    expect(describeCron("7,22,37,52 * * * *")).toBe("every 15 minutes");
    expect(describeCron("23 */2 * * *")).toBe("every 2 hours at :23 (UTC)");
    expect(describeCron("17 */6 * * *")).toBe("every 6 hours at :17 (UTC)");
    expect(describeCron("17 16 * * *")).toBe("daily at 16:17 UTC");
  });

  it("derives prose for every catalog task without falling back to raw cron", () => {
    for (const task of SCHEDULED_TASKS) {
      expect(describeCron(task.cron), task.id).not.toBe(task.cron);
    }
  });

  it("falls back to the raw expression for unsupported shapes", () => {
    expect(describeCron("not a cron")).toBe("not a cron");
    expect(describeCron("0 0 1 1 1")).toBe("0 0 1 1 1");
  });
});

describe("cronMatchesUtc", () => {
  const at = (h: number, m: number) => new Date(Date.UTC(2026, 5, 2, h, m, 0));

  it("matches step-minute crons", () => {
    expect(cronMatchesUtc("*/5 * * * *", at(9, 5))).toBe(true);
    expect(cronMatchesUtc("*/5 * * * *", at(9, 6))).toBe(false);
  });

  it("matches comma-list minute crons", () => {
    expect(cronMatchesUtc("7,22,37,52 * * * *", at(0, 37))).toBe(true);
    expect(cronMatchesUtc("7,22,37,52 * * * *", at(0, 38))).toBe(false);
  });

  it("matches a once-daily cron only at the exact UTC minute", () => {
    expect(cronMatchesUtc("17 16 * * *", at(16, 17))).toBe(true);
    expect(cronMatchesUtc("17 16 * * *", at(16, 18))).toBe(false);
    expect(cronMatchesUtc("17 16 * * *", at(15, 17))).toBe(false);
  });

  it("matches every-N-hours crons on the fixed minute", () => {
    expect(cronMatchesUtc("23 */2 * * *", at(2, 23))).toBe(true);
    expect(cronMatchesUtc("23 */2 * * *", at(3, 23))).toBe(false);
  });
});
