import { describe, it, expect, vi } from "vitest";
import { Scheduler } from "../scheduler.js";

describe("Scheduler", () => {
  it("setTimeout fires after delay", async () => {
    const s = new Scheduler();
    const cb = vi.fn();
    s.setTimeout(cb, 30);
    await new Promise((r) => setTimeout(r, 60));
    expect(cb).toHaveBeenCalledTimes(1);
    s.cancelAll();
  });

  it("setInterval fires repeatedly", async () => {
    const s = new Scheduler();
    const cb = vi.fn();
    const id = s.setInterval(cb, 20);
    await new Promise((r) => setTimeout(r, 80));
    s.cancel(id);
    expect(cb.mock.calls.length).toBeGreaterThanOrEqual(2);
    s.cancelAll();
  });

  it("cancel stops a task", async () => {
    const s = new Scheduler();
    const cb = vi.fn();
    const id = s.setTimeout(cb, 20);
    s.cancel(id);
    await new Promise((r) => setTimeout(r, 50));
    expect(cb).not.toHaveBeenCalled();
    s.cancelAll();
  });

  it("cancelAll stops everything", async () => {
    const s = new Scheduler();
    const cb = vi.fn();
    s.setTimeout(cb, 20);
    s.setTimeout(cb, 30);
    s.cancelAll();
    await new Promise((r) => setTimeout(r, 50));
    expect(cb).not.toHaveBeenCalled();
  });

  it("taskCount reflects active tasks", () => {
    const s = new Scheduler();
    s.setTimeout(() => {}, 1000);
    s.setTimeout(() => {}, 1000);
    expect(s.taskCount).toBe(2);
    s.cancelAll();
  });
});
