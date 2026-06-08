import { describe, it, expect } from "vitest";
import { TaskScheduler } from "../task-scheduler.js";

describe("TaskScheduler", () => {
  it("runs tasks with no dependencies", async () => {
    const log: string[] = [];
    const s = new TaskScheduler();
    s.add("a", () => { log.push("a"); });
    s.add("b", () => { log.push("b"); });
    await s.runAll();
    expect(log.sort()).toEqual(["a", "b"]);
  });

  it("respects dependencies", async () => {
    const log: string[] = [];
    const s = new TaskScheduler();
    s.add("b", () => { log.push("b"); }, 0, ["a"]);
    s.add("a", () => { log.push("a"); });
    await s.runAll();
    expect(log).toEqual(["a", "b"]);
  });

  it("respects priority (higher first)", async () => {
    const log: string[] = [];
    const s = new TaskScheduler();
    s.add("low", () => { log.push("low"); }, 1);
    s.add("high", () => { log.push("high"); }, 10);
    await s.runAll();
    expect(log).toEqual(["high", "low"]);
  });

  it("getReady returns only unblocked tasks", () => {
    const s = new TaskScheduler();
    s.add("a", () => {});
    s.add("b", () => {}, 0, ["a"]);
    expect(s.getReady()).toEqual(["a"]);
  });

  it("runNext runs one at a time", async () => {
    const s = new TaskScheduler();
    s.add("x", () => {});
    s.add("y", () => {});
    const first = await s.runNext();
    expect(first).not.toBeNull();
  });

  it("tracks completion", async () => {
    const s = new TaskScheduler();
    s.add("a", () => {});
    expect(s.allComplete).toBe(false);
    await s.runAll();
    expect(s.allComplete).toBe(true);
    expect(s.isComplete("a")).toBe(true);
  });

  it("reset clears completed state", async () => {
    const s = new TaskScheduler();
    s.add("a", () => {});
    await s.runAll();
    s.reset();
    expect(s.allComplete).toBe(false);
  });

  it("remove deletes a task", () => {
    const s = new TaskScheduler();
    s.add("a", () => {});
    expect(s.remove("a")).toBe(true);
    expect(s.getReady()).toEqual([]);
  });
});
