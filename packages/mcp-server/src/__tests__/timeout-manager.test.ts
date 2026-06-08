import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TimeoutManager, withTimeout, TimeoutError } from "../timeout-manager.js";

describe("TimeoutManager", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("fires callback after timeout", () => {
    const mgr = new TimeoutManager();
    let fired = false;
    mgr.set("test", () => { fired = true; }, 100);
    vi.advanceTimersByTime(100);
    expect(fired).toBe(true);
  });

  it("tracks active timers", () => {
    const mgr = new TimeoutManager();
    mgr.set("a", () => {}, 100);
    mgr.set("b", () => {}, 200);
    expect(mgr.activeCount).toBe(2);
    expect(mgr.activeNames).toContain("a");
    expect(mgr.activeNames).toContain("b");
  });

  it("clears a specific timer", () => {
    const mgr = new TimeoutManager();
    let fired = false;
    mgr.set("test", () => { fired = true; }, 100);
    mgr.clear("test");
    vi.advanceTimersByTime(200);
    expect(fired).toBe(false);
    expect(mgr.has("test")).toBe(false);
  });

  it("clearAll removes everything", () => {
    const mgr = new TimeoutManager();
    mgr.set("a", () => {}, 100);
    mgr.set("b", () => {}, 200);
    mgr.clearAll();
    expect(mgr.activeCount).toBe(0);
  });

  it("replaces existing timer with same name", () => {
    const mgr = new TimeoutManager();
    let count = 0;
    mgr.set("x", () => { count++; }, 100);
    mgr.set("x", () => { count += 10; }, 100);
    vi.advanceTimersByTime(100);
    expect(count).toBe(10);
  });

  it("uses default timeout from constructor", () => {
    const mgr = new TimeoutManager({ fetch: 5000 });
    let fired = false;
    mgr.set("fetch", () => { fired = true; });
    vi.advanceTimersByTime(5000);
    expect(fired).toBe(true);
  });

  it("has returns false for unknown timers", () => {
    const mgr = new TimeoutManager();
    expect(mgr.has("nope")).toBe(false);
  });

  it("removes itself from map after firing", () => {
    const mgr = new TimeoutManager();
    mgr.set("test", () => {}, 50);
    vi.advanceTimersByTime(50);
    expect(mgr.has("test")).toBe(false);
  });
});

describe("withTimeout", () => {
  it("resolves fast promises", async () => {
    const result = await withTimeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it("rejects slow promises with TimeoutError", async () => {
    vi.useFakeTimers();
    const slow = new Promise<string>((resolve) => setTimeout(() => resolve("late"), 5000));
    const p = withTimeout(slow, 100, "fetch");

    vi.advanceTimersByTime(200);
    await expect(p).rejects.toThrow(TimeoutError);
    await expect(p).rejects.toThrow("fetch timed out after 100ms");
    vi.useRealTimers();
  });

  it("TimeoutError has timeoutMs", async () => {
    vi.useFakeTimers();
    const slow = new Promise(() => {});
    const p = withTimeout(slow, 50);

    vi.advanceTimersByTime(100);
    try {
      await p;
      expect.fail("should throw");
    } catch (e) {
      expect(e).toBeInstanceOf(TimeoutError);
      expect((e as TimeoutError).timeoutMs).toBe(50);
    }
    vi.useRealTimers();
  });
});
