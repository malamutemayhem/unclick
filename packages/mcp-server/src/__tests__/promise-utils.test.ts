import { describe, it, expect } from "vitest";
import { timeout, delay, defer, settle, mapSeries, mapConcurrent } from "../promise-utils.js";

describe("promise-utils", () => {
  it("timeout resolves before deadline", async () => {
    const result = await timeout(Promise.resolve(42), 100);
    expect(result).toBe(42);
  });
  it("timeout rejects on expiry", async () => {
    await expect(timeout(new Promise(() => {}), 10)).rejects.toThrow("Timed out");
  });
  it("delay waits", async () => {
    const start = Date.now();
    await delay(20);
    expect(Date.now() - start).toBeGreaterThanOrEqual(15);
  });
  it("defer creates controllable promise", async () => {
    const d = defer<number>();
    d.resolve(99);
    expect(await d.promise).toBe(99);
  });
  it("defer rejects", async () => {
    const d = defer<number>();
    d.reject(new Error("fail"));
    await expect(d.promise).rejects.toThrow("fail");
  });
  it("settle returns all results", async () => {
    const results = await settle([
      Promise.resolve(1),
      Promise.reject(new Error("no")),
    ]);
    expect(results[0].status).toBe("fulfilled");
    expect(results[1].status).toBe("rejected");
  });
  it("mapSeries processes in order", async () => {
    const order: number[] = [];
    await mapSeries([1, 2, 3], async (x) => { order.push(x); return x; });
    expect(order).toEqual([1, 2, 3]);
  });
  it("mapConcurrent returns correct results", async () => {
    const results = await mapConcurrent([1, 2, 3], async (x) => x * 2, 2);
    expect(results).toEqual([2, 4, 6]);
  });
});
