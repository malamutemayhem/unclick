import { describe, it, expect } from "vitest";
import { PriorityScheduler } from "../priority-scheduler.js";

describe("PriorityScheduler", () => {
  it("returns highest priority first", () => {
    const s = new PriorityScheduler<string>();
    s.schedule("low", 1);
    s.schedule("high", 10);
    s.schedule("mid", 5);
    expect(s.next()?.data).toBe("high");
    expect(s.next()?.data).toBe("mid");
    expect(s.next()?.data).toBe("low");
  });

  it("respects executeAfter", () => {
    const s = new PriorityScheduler<string>();
    const future = Date.now() + 100000;
    s.schedule("later", 10, future);
    s.schedule("now", 1);
    expect(s.next()?.data).toBe("now");
    expect(s.next()).toBeUndefined();
  });

  it("cancel removes task", () => {
    const s = new PriorityScheduler<string>();
    const id = s.schedule("task", 1);
    expect(s.cancel(id)).toBe(true);
    expect(s.size).toBe(0);
  });

  it("reschedule changes priority", () => {
    const s = new PriorityScheduler<string>();
    const id = s.schedule("a", 1);
    s.schedule("b", 5);
    s.reschedule(id, 10);
    expect(s.next()?.data).toBe("a");
  });

  it("drain returns all", () => {
    const s = new PriorityScheduler<string>();
    s.schedule("a", 1);
    s.schedule("b", 2);
    expect(s.drain().length).toBe(2);
    expect(s.size).toBe(0);
  });

  it("peek does not remove", () => {
    const s = new PriorityScheduler<string>();
    s.schedule("a", 1);
    expect(s.peek()?.data).toBe("a");
    expect(s.size).toBe(1);
  });

  it("clear empties all", () => {
    const s = new PriorityScheduler<string>();
    s.schedule("a", 1);
    s.schedule("b", 2);
    s.clear();
    expect(s.size).toBe(0);
  });
});
