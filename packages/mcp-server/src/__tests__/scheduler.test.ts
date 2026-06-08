import { describe, it, expect, vi, afterEach } from "vitest";
import { Scheduler } from "../scheduler.js";

describe("Scheduler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("schedule adds a task", () => {
    const s = new Scheduler();
    s.schedule("a", () => {}, 1000);
    expect(s.taskCount).toBe(1);
    expect(s.isScheduled("a")).toBe(true);
    s.clear();
  });

  it("unschedule removes a task", () => {
    const s = new Scheduler();
    s.schedule("a", () => {}, 1000);
    expect(s.unschedule("a")).toBe(true);
    expect(s.taskCount).toBe(0);
  });

  it("unschedule returns false for missing task", () => {
    const s = new Scheduler();
    expect(s.unschedule("x")).toBe(false);
  });

  it("tick runs tasks whose time has come", async () => {
    const s = new Scheduler();
    s.stop();
    let count = 0;
    s.schedule("a", () => { count++; }, 1000, true);
    s.stop();
    await s.tick();
    expect(count).toBe(1);
    s.clear();
  });

  it("tick skips tasks not yet due", async () => {
    const s = new Scheduler();
    s.stop();
    let count = 0;
    s.schedule("a", () => { count++; }, 60000);
    s.stop();
    await s.tick();
    expect(count).toBe(0);
    s.clear();
  });

  it("tick does not run already-running tasks", async () => {
    const s = new Scheduler();
    s.stop();
    let running = false;
    let reentrant = false;
    s.schedule("a", async () => {
      if (running) reentrant = true;
      running = true;
      await new Promise((r) => setTimeout(r, 50));
      running = false;
    }, 0, true);
    s.stop();
    const p = s.tick();
    await s.tick();
    await p;
    expect(reentrant).toBe(false);
    s.clear();
  });

  it("clear removes all tasks and stops", () => {
    const s = new Scheduler();
    s.schedule("a", () => {}, 1000);
    s.schedule("b", () => {}, 1000);
    s.clear();
    expect(s.taskCount).toBe(0);
  });

  it("tick swallows errors from tasks", async () => {
    const s = new Scheduler();
    s.stop();
    s.schedule("bad", () => { throw new Error("boom"); }, 0, true);
    s.stop();
    await expect(s.tick()).resolves.toBeUndefined();
    s.clear();
  });

  it("isScheduled returns false after clear", () => {
    const s = new Scheduler();
    s.schedule("a", () => {}, 1000);
    s.clear();
    expect(s.isScheduled("a")).toBe(false);
  });
});
