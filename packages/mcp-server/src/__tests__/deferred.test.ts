import { describe, it, expect } from "vitest";
import { Deferred, deferred, timeout, delay } from "../deferred.js";

describe("Deferred", () => {
  it("resolves externally", async () => {
    const d = new Deferred<number>();
    expect(d.isSettled).toBe(false);
    d.resolve(42);
    expect(d.isSettled).toBe(true);
    expect(await d.promise).toBe(42);
  });

  it("rejects externally", async () => {
    const d = new Deferred<number>();
    d.reject(new Error("fail"));
    await expect(d.promise).rejects.toThrow("fail");
  });

  it("ignores double settle", async () => {
    const d = new Deferred<number>();
    d.resolve(1);
    d.resolve(2);
    expect(await d.promise).toBe(1);
  });

  it("factory function works", async () => {
    const d = deferred<string>();
    d.resolve("hello");
    expect(await d.promise).toBe("hello");
  });
});

describe("timeout", () => {
  it("resolves before timeout", async () => {
    const result = await timeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it("rejects on timeout", async () => {
    await expect(timeout(new Promise(() => {}), 10, "too slow")).rejects.toThrow("too slow");
  });
});

describe("delay", () => {
  it("resolves after ms", async () => {
    const start = Date.now();
    await delay(10);
    expect(Date.now() - start).toBeGreaterThanOrEqual(5);
  });
});
