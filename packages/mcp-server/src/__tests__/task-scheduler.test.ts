import { describe, it, expect, afterEach } from "vitest";
import { TaskScheduler } from "../task-scheduler.js";

describe("TaskScheduler", () => {
  let scheduler: TaskScheduler;

  afterEach(() => {
    scheduler?.stop();
  });

  it("schedules and runs a one-shot task", async () => {
    scheduler = new TaskScheduler();
    let ran = false;
    scheduler.schedule(() => { ran = true; }, 20);
    scheduler.start();
    await new Promise((r) => setTimeout(r, 50));
    expect(ran).toBe(true);
  });

  it("cancels a task", async () => {
    scheduler = new TaskScheduler();
    let ran = false;
    const id = scheduler.schedule(() => { ran = true; }, 20);
    scheduler.start();
    scheduler.cancel(id);
    await new Promise((r) => setTimeout(r, 50));
    expect(ran).toBe(false);
  });

  it("repeats a task", async () => {
    scheduler = new TaskScheduler();
    let count = 0;
    scheduler.schedule(() => { count++; }, 20, true);
    scheduler.start();
    await new Promise((r) => setTimeout(r, 90));
    expect(count).toBeGreaterThanOrEqual(2);
  });

  it("tracks running state", () => {
    scheduler = new TaskScheduler();
    expect(scheduler.isRunning).toBe(false);
    scheduler.start();
    expect(scheduler.isRunning).toBe(true);
    scheduler.stop();
    expect(scheduler.isRunning).toBe(false);
  });

  it("tracks task count", () => {
    scheduler = new TaskScheduler();
    scheduler.schedule(() => {}, 1000);
    scheduler.schedule(() => {}, 1000);
    expect(scheduler.taskCount).toBe(2);
  });
});
