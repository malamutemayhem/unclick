import { describe, it, expect, vi } from "vitest";
import { DisposableStack, ManagedResource, using, usingAsync, AggregateDisposalError } from "../disposable.js";

describe("DisposableStack", () => {
  it("disposes in reverse order", () => {
    const order: number[] = [];
    const stack = new DisposableStack();
    stack.defer(() => order.push(1));
    stack.defer(() => order.push(2));
    stack.defer(() => order.push(3));
    stack.dispose();
    expect(order).toEqual([3, 2, 1]);
  });

  it("use returns the resource", () => {
    const stack = new DisposableStack();
    const resource = { dispose: vi.fn() };
    const returned = stack.use(resource);
    expect(returned).toBe(resource);
    stack.dispose();
    expect(resource.dispose).toHaveBeenCalled();
  });

  it("adopt wraps a value", () => {
    const fn = vi.fn();
    const stack = new DisposableStack();
    const val = stack.adopt(42, fn);
    expect(val).toBe(42);
    stack.dispose();
    expect(fn).toHaveBeenCalledWith(42);
  });

  it("double dispose is a no-op", () => {
    const fn = vi.fn();
    const stack = new DisposableStack();
    stack.defer(fn);
    stack.dispose();
    stack.dispose();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throws after disposed", () => {
    const stack = new DisposableStack();
    stack.dispose();
    expect(() => stack.use({ dispose() {} })).toThrow("already disposed");
  });

  it("collects multiple errors", () => {
    const stack = new DisposableStack();
    stack.defer(() => { throw new Error("err1"); });
    stack.defer(() => { throw new Error("err2"); });
    try {
      stack.dispose();
    } catch (e) {
      expect(e).toBeInstanceOf(AggregateDisposalError);
      expect((e as AggregateDisposalError).errors).toHaveLength(2);
    }
  });

  it("tracks size", () => {
    const stack = new DisposableStack();
    expect(stack.size).toBe(0);
    stack.defer(() => {});
    stack.defer(() => {});
    expect(stack.size).toBe(2);
  });
});

describe("using", () => {
  it("disposes after sync function", () => {
    const dispose = vi.fn();
    const result = using({ dispose }, () => 42);
    expect(result).toBe(42);
    expect(dispose).toHaveBeenCalled();
  });

  it("disposes even on error", () => {
    const dispose = vi.fn();
    expect(() => using({ dispose }, () => { throw new Error("boom"); })).toThrow("boom");
    expect(dispose).toHaveBeenCalled();
  });
});

describe("usingAsync", () => {
  it("disposes after async function", async () => {
    const dispose = vi.fn();
    const result = await usingAsync({ dispose }, async () => 99);
    expect(result).toBe(99);
    expect(dispose).toHaveBeenCalled();
  });
});

describe("ManagedResource", () => {
  it("runs cleanup on dispose", () => {
    const fn = vi.fn();
    const res = new ManagedResource();
    res.onDispose(fn);
    res.dispose();
    expect(fn).toHaveBeenCalled();
    expect(res.disposed).toBe(true);
  });

  it("runs immediate if already disposed", () => {
    const fn = vi.fn();
    const res = new ManagedResource();
    res.dispose();
    res.onDispose(fn);
    expect(fn).toHaveBeenCalled();
  });
});
