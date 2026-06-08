import { describe, it, expect, vi } from "vitest";
import { DisposableGroup } from "../disposable.js";

describe("DisposableGroup", () => {
  it("calls disposers in reverse order", async () => {
    const order: number[] = [];
    const group = new DisposableGroup();
    group.add(() => { order.push(1); });
    group.add(() => { order.push(2); });
    group.add(() => { order.push(3); });
    await group.dispose();
    expect(order).toEqual([3, 2, 1]);
  });

  it("marks as disposed", async () => {
    const group = new DisposableGroup();
    expect(group.disposed).toBe(false);
    await group.dispose();
    expect(group.disposed).toBe(true);
  });

  it("is idempotent", async () => {
    const fn = vi.fn();
    const group = new DisposableGroup();
    group.add(fn);
    await group.dispose();
    await group.dispose();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throws when adding after dispose", async () => {
    const group = new DisposableGroup();
    await group.dispose();
    expect(() => group.add(() => {})).toThrow("Already disposed");
  });

  it("handles async disposers", async () => {
    const group = new DisposableGroup();
    let done = false;
    group.add(async () => { done = true; });
    await group.dispose();
    expect(done).toBe(true);
  });

  it("use registers resource", async () => {
    const dispose = vi.fn();
    const group = new DisposableGroup();
    const resource = group.use({ dispose, value: 42 });
    expect(resource.value).toBe(42);
    await group.dispose();
    expect(dispose).toHaveBeenCalled();
  });

  it("throws first error but disposes all", async () => {
    const fn1 = vi.fn();
    const group = new DisposableGroup();
    group.add(fn1);
    group.add(() => { throw new Error("oops"); });
    await expect(group.dispose()).rejects.toThrow("oops");
    expect(fn1).toHaveBeenCalled();
  });
});
