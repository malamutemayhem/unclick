import { describe, it, expect } from "vitest";
import { DisposableStack, using } from "../disposable.js";

describe("DisposableStack", () => {
  it("disposes in reverse order", () => {
    const order: number[] = [];
    const stack = new DisposableStack();
    stack.use({ dispose: () => order.push(1) });
    stack.use({ dispose: () => order.push(2) });
    stack.use({ dispose: () => order.push(3) });
    stack.dispose();
    expect(order).toEqual([3, 2, 1]);
  });

  it("defer adds cleanup function", () => {
    let cleaned = false;
    const stack = new DisposableStack();
    stack.defer(() => { cleaned = true; });
    stack.dispose();
    expect(cleaned).toBe(true);
  });

  it("double dispose is safe", () => {
    const stack = new DisposableStack();
    let count = 0;
    stack.defer(() => count++);
    stack.dispose();
    stack.dispose();
    expect(count).toBe(1);
  });

  it("use after dispose throws", () => {
    const stack = new DisposableStack();
    stack.dispose();
    expect(() => stack.use({ dispose: () => {} })).toThrow("already disposed");
  });

  it("isDisposed and size", () => {
    const stack = new DisposableStack();
    stack.defer(() => {});
    expect(stack.isDisposed).toBe(false);
    expect(stack.size).toBe(1);
    stack.dispose();
    expect(stack.isDisposed).toBe(true);
  });
});

describe("using", () => {
  it("disposes after function", () => {
    let disposed = false;
    const result = using({ dispose: () => { disposed = true; } }, () => 42);
    expect(result).toBe(42);
    expect(disposed).toBe(true);
  });

  it("disposes even on error", () => {
    let disposed = false;
    expect(() => using({ dispose: () => { disposed = true; } }, () => { throw new Error("boom"); })).toThrow("boom");
    expect(disposed).toBe(true);
  });
});
