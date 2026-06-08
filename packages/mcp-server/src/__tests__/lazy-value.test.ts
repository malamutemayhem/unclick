import { describe, it, expect } from "vitest";
import { Lazy, AsyncLazy, lazy } from "../lazy-value.js";

describe("Lazy", () => {
  it("defers computation until get", () => {
    let called = false;
    const l = new Lazy(() => { called = true; return 42; });
    expect(called).toBe(false);
    expect(l.get()).toBe(42);
    expect(called).toBe(true);
  });

  it("caches result", () => {
    let count = 0;
    const l = new Lazy(() => ++count);
    l.get();
    l.get();
    expect(count).toBe(1);
  });

  it("isInitialized tracks state", () => {
    const l = new Lazy(() => 1);
    expect(l.isInitialized).toBe(false);
    l.get();
    expect(l.isInitialized).toBe(true);
  });

  it("reset clears cache", () => {
    let count = 0;
    const l = new Lazy(() => ++count);
    l.get();
    l.reset();
    expect(l.isInitialized).toBe(false);
    expect(l.get()).toBe(2);
  });

  it("map creates derived lazy", () => {
    const l = new Lazy(() => 5);
    const doubled = l.map((v) => v * 2);
    expect(doubled.get()).toBe(10);
  });
});

describe("AsyncLazy", () => {
  it("defers async computation", async () => {
    let called = false;
    const l = new AsyncLazy(async () => { called = true; return 42; });
    expect(called).toBe(false);
    expect(await l.get()).toBe(42);
    expect(called).toBe(true);
  });

  it("caches promise", async () => {
    let count = 0;
    const l = new AsyncLazy(async () => ++count);
    await l.get();
    await l.get();
    expect(count).toBe(1);
  });

  it("reset clears", async () => {
    let count = 0;
    const l = new AsyncLazy(async () => ++count);
    await l.get();
    l.reset();
    expect(await l.get()).toBe(2);
  });
});

describe("lazy helper", () => {
  it("creates Lazy instance", () => {
    const l = lazy(() => 99);
    expect(l.get()).toBe(99);
  });
});
