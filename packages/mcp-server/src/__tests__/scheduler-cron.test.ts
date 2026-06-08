import { describe, it, expect } from "vitest";
import { CronScheduler } from "../scheduler-cron.js";

describe("CronScheduler", () => {
  it("schedules and runs a task matching every minute", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "* * * * *", () => { ran = true; });
    const result = await scheduler.tick(new Date("2026-01-15T10:30:00"));
    expect(ran).toBe(true);
    expect(result).toEqual(["t1"]);
  });

  it("does not run same task twice within a minute", async () => {
    const scheduler = new CronScheduler();
    let count = 0;
    scheduler.schedule("t1", "* * * * *", () => { count++; });
    const d = new Date("2026-01-15T10:30:00");
    await scheduler.tick(d);
    await scheduler.tick(d);
    expect(count).toBe(1);
  });

  it("matches specific minute and hour", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "30 10 * * *", () => { ran = true; });
    await scheduler.tick(new Date("2026-01-15T10:30:00"));
    expect(ran).toBe(true);
  });

  it("does not match wrong minute", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "15 10 * * *", () => { ran = true; });
    await scheduler.tick(new Date("2026-01-15T10:30:00"));
    expect(ran).toBe(false);
  });

  it("matches day of week", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "0 9 * * 1", () => { ran = true; });
    await scheduler.tick(new Date("2026-01-19T09:00:00"));
    expect(ran).toBe(true);
  });

  it("matches range fields", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "0-30 * * * *", () => { ran = true; });
    await scheduler.tick(new Date("2026-01-15T10:15:00"));
    expect(ran).toBe(true);
  });

  it("matches step fields", async () => {
    const scheduler = new CronScheduler();
    let ran = false;
    scheduler.schedule("t1", "*/15 * * * *", () => { ran = true; });
    await scheduler.tick(new Date("2026-01-15T10:30:00"));
    expect(ran).toBe(true);
  });

  it("unschedule removes a task", () => {
    const scheduler = new CronScheduler();
    scheduler.schedule("t1", "* * * * *", () => {});
    expect(scheduler.unschedule("t1")).toBe(true);
    expect(scheduler.taskCount).toBe(0);
  });

  it("taskIds returns all scheduled ids", () => {
    const scheduler = new CronScheduler();
    scheduler.schedule("a", "* * * * *", () => {});
    scheduler.schedule("b", "* * * * *", () => {});
    expect(scheduler.taskIds().sort()).toEqual(["a", "b"]);
  });

  it("start and stop toggle running state", () => {
    const scheduler = new CronScheduler();
    expect(scheduler.isRunning).toBe(false);
    scheduler.start(60000);
    expect(scheduler.isRunning).toBe(true);
    scheduler.stop();
    expect(scheduler.isRunning).toBe(false);
  });
});
