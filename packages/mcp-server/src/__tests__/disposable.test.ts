import { describe, it, expect } from "vitest";
import { DisposableStack, using, usingAsync } from "../disposable.js";

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

  it("use returns resource", () => {
    const stack = new DisposableStack();
    const resource = { dispose: () => {}, value: 42 };
    const returned = stack.use(resource);
    expect(returned.value).toBe(42);
    stack.dispose();
  });

  it("adopt calls onDispose with value", () => {
    const stack = new DisposableStack();
    let disposed: string | null = null;
    stack.adopt("test", (v: string) => { disposed = v; });
    stack.dispose();
    expect(disposed).toBe("test");
  });

  it("defer runs on dispose", () => {
    const stack = new DisposableStack();
    let called = false;
    stack.defer(() => { called = true; });
    stack.dispose();
    expect(called).toBe(true);
  });

  it("double dispose is safe", () => {
    const stack = new DisposableStack();
    let count = 0;
    stack.defer(() => count++);
    stack.dispose();
    stack.dispose();
    expect(count).toBe(1);
  });

  it("tracks isDisposed and size", () => {
    const stack = new DisposableStack();
    stack.defer(() => {});
    expect(stack.isDisposed).toBe(false);
    expect(stack.size).toBe(1);
    stack.dispose();
    expect(stack.isDisposed).toBe(true);
  });
});

describe("using", () => {
  it("disposes after callback", () => {
    let disposed = false;
    const result = using({ dispose: () => { disposed = true; } }, () => 42);
    expect(result).toBe(42);
    expect(disposed).toBe(true);
  });

  it("disposes on error", () => {
    let disposed = false;
    expect(() => using({ dispose: () => { disposed = true; } }, () => { throw new Error("fail"); })).toThrow("fail");
    expect(disposed).toBe(true);
  });
});

describe("usingAsync", () => {
  it("disposes after async callback", async () => {
    let disposed = false;
    const result = await usingAsync({ dispose: () => { disposed = true; } }, async () => 42);
    expect(result).toBe(42);
    expect(disposed).toBe(true);
  });
});
