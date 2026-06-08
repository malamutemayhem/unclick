import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TaskScheduler } from "../task-scheduler.js";

describe("TaskScheduler", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("schedules a task", () => {
    const scheduler = new TaskScheduler();
    scheduler.schedule("test", () => {}, 1000);
    expect(scheduler.isScheduled("test")).toBe(true);
    expect(scheduler.size).toBe(1);
    scheduler.cancelAll();
  });

  it("runs task at interval", () => {
    const scheduler = new TaskScheduler();
    const fn = vi.fn();
    scheduler.schedule("test", fn, 100);
    vi.advanceTimersByTime(350);
    expect(fn).toHaveBeenCalledTimes(3);
    scheduler.cancelAll();
  });

  it("cancel stops the task", () => {
    const scheduler = new TaskScheduler();
    const fn = vi.fn();
    scheduler.schedule("test", fn, 100);
    scheduler.cancel("test");
    vi.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
  });

  it("cancelAll stops all tasks", () => {
    const scheduler = new TaskScheduler();
    scheduler.schedule("a", vi.fn(), 100);
    scheduler.schedule("b", vi.fn(), 100);
    scheduler.cancelAll();
    expect(scheduler.size).toBe(0);
  });

  it("getStats returns run info", () => {
    const scheduler = new TaskScheduler();
    scheduler.schedule("test", () => {}, 100);
    vi.advanceTimersByTime(250);
    const stats = scheduler.getStats("test");
    expect(stats?.runCount).toBe(2);
    expect(stats?.lastRun).toBeDefined();
    scheduler.cancelAll();
  });

  it("returns undefined stats for unknown task", () => {
    const scheduler = new TaskScheduler();
    expect(scheduler.getStats("nope")).toBeUndefined();
  });

  it("reschedule replaces existing task", () => {
    const scheduler = new TaskScheduler();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    scheduler.schedule("test", fn1, 100);
    scheduler.schedule("test", fn2, 100);
    vi.advanceTimersByTime(150);
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    scheduler.cancelAll();
  });
});
