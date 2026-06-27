import { describe, it, expect } from "vitest";
import { createLazyLoader, createLazyValue } from "../lazy-loader.js";

describe("createLazyLoader", () => {
  it("calls factory on first load", async () => {
    let calls = 0;
    const loader = createLazyLoader(() => { calls++; return 42; });
    expect(calls).toBe(0);
    const result = await loader.load();
    expect(result).toBe(42);
    expect(calls).toBe(1);
  });

  it("caches the result on subsequent loads", async () => {
    let calls = 0;
    const loader = createLazyLoader(() => { calls++; return "hello"; });
    await loader.load();
    await loader.load();
    await loader.load();
    expect(calls).toBe(1);
  });

  it("tracks isLoaded", async () => {
    const loader = createLazyLoader(() => "val");
    expect(loader.isLoaded).toBe(false);
    await loader.load();
    expect(loader.isLoaded).toBe(true);
  });

  it("clear resets the cache", async () => {
    let calls = 0;
    const loader = createLazyLoader(() => { calls++; return calls; });
    await loader.load();
    expect(loader.isLoaded).toBe(true);
    loader.clear();
    expect(loader.isLoaded).toBe(false);
    const result = await loader.load();
    expect(result).toBe(2);
  });

  it("retries on rejection by default", async () => {
    let calls = 0;
    const loader = createLazyLoader(() => {
      calls++;
      if (calls === 1) throw new Error("fail");
      return "ok";
    });

    await expect(loader.load()).rejects.toThrow("fail");
    const result = await loader.load();
    expect(result).toBe("ok");
    expect(calls).toBe(2);
  });

  it("caches rejections when configured", async () => {
    let calls = 0;
    const loader = createLazyLoader(
      () => { calls++; throw new Error("fail"); },
      { cacheRejections: true },
    );

    await expect(loader.load()).rejects.toThrow("fail");
    await expect(loader.load()).rejects.toThrow("fail");
    expect(calls).toBe(1);
  });

  it("works with async factories", async () => {
    const loader = createLazyLoader(async () => {
      return "async-result";
    });
    expect(await loader.load()).toBe("async-result");
  });
});

describe("createLazyValue", () => {
  it("calls factory on first get", () => {
    let calls = 0;
    const lazy = createLazyValue(() => { calls++; return 99; });
    expect(calls).toBe(0);
    expect(lazy.get()).toBe(99);
    expect(calls).toBe(1);
  });

  it("caches on subsequent gets", () => {
    let calls = 0;
    const lazy = createLazyValue(() => { calls++; return "cached"; });
    lazy.get();
    lazy.get();
    lazy.get();
    expect(calls).toBe(1);
  });

  it("clear resets the value", () => {
    let calls = 0;
    const lazy = createLazyValue(() => { calls++; return calls; });
    expect(lazy.get()).toBe(1);
    lazy.clear();
    expect(lazy.get()).toBe(2);
  });
});
