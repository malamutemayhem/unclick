import { describe, it, expect, vi } from "vitest";
import { DisposableStack, withDisposables, AggregateDisposalError } from "../disposable.js";

describe("DisposableStack", () => {
  it("disposes resources in reverse order", () => {
    const order: number[] = [];
    const stack = new DisposableStack();
    stack.add({ dispose: () => order.push(1) });
    stack.add({ dispose: () => order.push(2) });
    stack.add({ dispose: () => order.push(3) });
    stack.dispose();
    expect(order).toEqual([3, 2, 1]);
  });

  it("addCallback registers a cleanup function", () => {
    let cleaned = false;
    const stack = new DisposableStack();
    stack.addCallback(() => { cleaned = true; });
    stack.dispose();
    expect(cleaned).toBe(true);
  });

  it("addTimer clears timeout on dispose", () => {
    vi.useFakeTimers();
    let fired = false;
    const stack = new DisposableStack();
    const timer = setTimeout(() => { fired = true; }, 1000);
    stack.addTimer(timer);
    stack.dispose();
    vi.advanceTimersByTime(2000);
    expect(fired).toBe(false);
    vi.useRealTimers();
  });

  it("addInterval clears interval on dispose", () => {
    vi.useFakeTimers();
    let count = 0;
    const stack = new DisposableStack();
    const interval = setInterval(() => { count++; }, 100);
    stack.addInterval(interval);
    stack.dispose();
    vi.advanceTimersByTime(500);
    expect(count).toBe(0);
    vi.useRealTimers();
  });

  it("is idempotent - second dispose is a no-op", () => {
    let count = 0;
    const stack = new DisposableStack();
    stack.addCallback(() => { count++; });
    stack.dispose();
    stack.dispose();
    expect(count).toBe(1);
  });

  it("tracks isDisposed", () => {
    const stack = new DisposableStack();
    expect(stack.isDisposed).toBe(false);
    stack.dispose();
    expect(stack.isDisposed).toBe(true);
  });

  it("tracks size", () => {
    const stack = new DisposableStack();
    stack.addCallback(() => {});
    stack.addCallback(() => {});
    expect(stack.size).toBe(2);
  });

  it("auto-disposes resources added after disposal", () => {
    let disposed = false;
    const stack = new DisposableStack();
    stack.dispose();
    stack.add({ dispose: () => { disposed = true; } });
    expect(disposed).toBe(true);
  });

  it("collects errors and throws AggregateDisposalError", () => {
    const stack = new DisposableStack();
    stack.add({ dispose: () => { throw new Error("err1"); } });
    stack.add({ dispose: () => { throw new Error("err2"); } });
    try {
      stack.dispose();
      expect.fail("should throw");
    } catch (err) {
      expect(err).toBeInstanceOf(AggregateDisposalError);
      expect((err as AggregateDisposalError).errors).toHaveLength(2);
    }
  });
});

describe("withDisposables", () => {
  it("auto-disposes on success", async () => {
    let disposed = false;
    const result = await withDisposables(async (stack) => {
      stack.addCallback(() => { disposed = true; });
      return 42;
    });
    expect(result).toBe(42);
    expect(disposed).toBe(true);
  });

  it("auto-disposes on error", async () => {
    let disposed = false;
    await expect(
      withDisposables(async (stack) => {
        stack.addCallback(() => { disposed = true; });
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");
    expect(disposed).toBe(true);
  });
});
