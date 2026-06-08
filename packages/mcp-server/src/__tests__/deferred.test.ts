import { describe, it, expect } from "vitest";
import { deferred, timeout, delay, settled } from "../deferred.js";

describe("deferred", () => {
  it("resolves with a value", async () => {
    const d = deferred<number>();
    d.resolve(42);
    expect(await d.promise).toBe(42);
  });

  it("rejects with a reason", async () => {
    const d = deferred<number>();
    d.reject(new Error("fail"));
    await expect(d.promise).rejects.toThrow("fail");
  });

  it("tracks settled state", async () => {
    const d = deferred<string>();
    expect(d.settled).toBe(false);
    d.resolve("done");
    await d.promise;
    expect(d.settled).toBe(true);
  });

  it("tracks settled on reject", async () => {
    const d = deferred<string>();
    d.reject(new Error("x"));
    await d.promise.catch(() => {});
    expect(d.settled).toBe(true);
  });
});

describe("timeout", () => {
  it("resolves if promise completes in time", async () => {
    const p = Promise.resolve(10);
    expect(await timeout(p, 1000)).toBe(10);
  });

  it("rejects if promise takes too long", async () => {
    const slow = new Promise<number>((resolve) => setTimeout(() => resolve(1), 500));
    await expect(timeout(slow, 1, "Too slow")).rejects.toThrow("Too slow");
  });

  it("uses default timeout message", async () => {
    const slow = new Promise<number>((resolve) => setTimeout(() => resolve(1), 500));
    await expect(timeout(slow, 1)).rejects.toThrow("Timeout");
  });

  it("propagates rejections from original promise", async () => {
    const failing = Promise.reject(new Error("original"));
    await expect(timeout(failing, 1000)).rejects.toThrow("original");
  });
});

describe("delay", () => {
  it("resolves after the specified time", async () => {
    const start = Date.now();
    await delay(10);
    expect(Date.now() - start).toBeGreaterThanOrEqual(5);
  });
});

describe("settled", () => {
  it("reports fulfilled and rejected results", async () => {
    const results = await settled([
      Promise.resolve(1),
      Promise.reject(new Error("bad")),
      Promise.resolve(3),
    ]);
    expect(results).toHaveLength(3);
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1]).toEqual({ status: "rejected", reason: expect.any(Error) });
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });

  it("handles all fulfilled", async () => {
    const results = await settled([Promise.resolve("a"), Promise.resolve("b")]);
    expect(results.every((r) => r.status === "fulfilled")).toBe(true);
  });

  it("handles empty array", async () => {
    expect(await settled([])).toEqual([]);
  });
});
