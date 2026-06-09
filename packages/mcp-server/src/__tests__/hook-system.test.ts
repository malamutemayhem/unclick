import { describe, it, expect } from "vitest";
import { HookSystem, createHookSystem } from "../hook-system.js";

describe("HookSystem", () => {
  it("tap and call", () => {
    const hooks = new HookSystem();
    hooks.tap("init", (ctx: any) => ({ ...ctx, ready: true }));
    const result = hooks.call("init", { ready: false });
    expect(result).toEqual({ ready: true });
  });

  it("call returns context when no hooks", () => {
    const hooks = new HookSystem();
    const result = hooks.call("missing", { x: 1 });
    expect(result).toEqual({ x: 1 });
  });

  it("priority ordering", () => {
    const hooks = new HookSystem();
    const order: number[] = [];
    hooks.tap("run", () => { order.push(1); }, { priority: 0 });
    hooks.tap("run", () => { order.push(2); }, { priority: 10 });
    hooks.tap("run", () => { order.push(3); }, { priority: 5 });
    hooks.call("run", {});
    expect(order).toEqual([2, 3, 1]);
  });

  it("tapOnce fires only once", () => {
    const hooks = new HookSystem();
    let count = 0;
    hooks.tapOnce("event", () => { count++; });
    hooks.call("event", {});
    hooks.call("event", {});
    expect(count).toBe(1);
  });

  it("untap removes hook", () => {
    const hooks = new HookSystem();
    let count = 0;
    const reg = hooks.tap("tick", () => { count++; });
    hooks.call("tick", {});
    expect(count).toBe(1);
    const removed = hooks.untap(reg.id);
    expect(removed).toBe(true);
    hooks.call("tick", {});
    expect(count).toBe(1);
  });

  it("untap returns false for unknown id", () => {
    const hooks = new HookSystem();
    expect(hooks.untap(999)).toBe(false);
  });

  it("chained transformations", () => {
    const hooks = new HookSystem();
    hooks.tap("transform", (n: any) => n * 2);
    hooks.tap("transform", (n: any) => n + 3);
    const result = hooks.call("transform", 5);
    expect(result).toBe(13);
  });

  it("callAsync awaits hooks", async () => {
    const hooks = new HookSystem();
    hooks.tap("async", async (ctx: any) => {
      return { ...ctx, done: true };
    });
    const result = await hooks.callAsync("async", { done: false });
    expect(result).toEqual({ done: true });
  });

  it("callAsync returns context when no hooks", async () => {
    const hooks = new HookSystem();
    const result = await hooks.callAsync("nope", { val: 42 });
    expect(result).toEqual({ val: 42 });
  });

  it("callAsync tapOnce fires once", async () => {
    const hooks = new HookSystem();
    let count = 0;
    hooks.tapOnce("once-async", async () => { count++; return {}; });
    await hooks.callAsync("once-async", {});
    await hooks.callAsync("once-async", {});
    expect(count).toBe(1);
  });

  it("callBail returns first non-null result", () => {
    const hooks = new HookSystem();
    hooks.tap("bail", () => undefined);
    hooks.tap("bail", () => "found");
    hooks.tap("bail", () => "ignored");
    const result = hooks.callBail("bail", {});
    expect(result).toBe("found");
  });

  it("callBail returns null when no hook returns", () => {
    const hooks = new HookSystem();
    hooks.tap("bail", () => undefined);
    expect(hooks.callBail("bail", {})).toBeNull();
  });

  it("callBail returns null for unknown event", () => {
    const hooks = new HookSystem();
    expect(hooks.callBail("unknown", {})).toBeNull();
  });

  it("hasHooks checks presence", () => {
    const hooks = new HookSystem();
    expect(hooks.hasHooks("x")).toBe(false);
    hooks.tap("x", () => {});
    expect(hooks.hasHooks("x")).toBe(true);
  });

  it("hookCount returns count", () => {
    const hooks = new HookSystem();
    expect(hooks.hookCount("x")).toBe(0);
    hooks.tap("x", () => {});
    hooks.tap("x", () => {});
    expect(hooks.hookCount("x")).toBe(2);
  });

  it("names returns active event names", () => {
    const hooks = new HookSystem();
    hooks.tap("alpha", () => {});
    hooks.tap("beta", () => {});
    const names = hooks.names();
    expect(names).toContain("alpha");
    expect(names).toContain("beta");
  });

  it("clear by name", () => {
    const hooks = new HookSystem();
    hooks.tap("a", () => {});
    hooks.tap("b", () => {});
    hooks.clear("a");
    expect(hooks.hasHooks("a")).toBe(false);
    expect(hooks.hasHooks("b")).toBe(true);
  });

  it("clear all", () => {
    const hooks = new HookSystem();
    hooks.tap("a", () => {});
    hooks.tap("b", () => {});
    hooks.clear();
    expect(hooks.names()).toEqual([]);
  });

  it("registration info returned", () => {
    const hooks = new HookSystem();
    const reg = hooks.tap("ev", () => {}, { priority: 5, once: true });
    expect(reg.name).toBe("ev");
    expect(reg.priority).toBe(5);
    expect(reg.once).toBe(true);
    expect(typeof reg.id).toBe("number");
  });

  it("createHookSystem factory", () => {
    const hooks = createHookSystem<{ init: { ready: boolean } }>();
    hooks.tap("init", (ctx) => ({ ready: true }));
    const result = hooks.call("init", { ready: false });
    expect(result).toEqual({ ready: true });
  });

  it("void callbacks do not overwrite context", () => {
    const hooks = new HookSystem();
    let sideEffect = false;
    hooks.tap("check", () => { sideEffect = true; });
    const result = hooks.call("check", "original");
    expect(result).toBe("original");
    expect(sideEffect).toBe(true);
  });

  it("multiple once hooks removed correctly", () => {
    const hooks = new HookSystem();
    const order: string[] = [];
    hooks.tapOnce("multi", () => { order.push("a"); });
    hooks.tapOnce("multi", () => { order.push("b"); });
    hooks.call("multi", {});
    hooks.call("multi", {});
    expect(order).toEqual(["a", "b"]);
  });
});
