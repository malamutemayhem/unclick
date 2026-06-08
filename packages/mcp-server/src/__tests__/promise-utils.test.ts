import { describe, it, expect } from "vitest";
import { timeout, delay, retry, allSettled, first, deferred } from "../promise-utils.js";

describe("promise-utils", () => {
  it("timeout resolves before deadline", async () => {
    const result = await timeout(delay(10).then(() => "ok"), 1000);
    expect(result).toBe("ok");
  });

  it("timeout rejects past deadline", async () => {
    await expect(timeout(delay(1000).then(() => "late"), 10)).rejects.toThrow("Timed out");
  });

  it("delay waits specified ms", async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });

  it("retry succeeds after failures", async () => {
    let count = 0;
    const result = await retry(async () => {
      count++;
      if (count < 3) throw new Error("fail");
      return "done";
    }, 3, 1);
    expect(result).toBe("done");
  });

  it("retry throws after all attempts", async () => {
    await expect(retry(async () => { throw new Error("always"); }, 2, 1)).rejects.toThrow("always");
  });

  it("allSettled captures all results", async () => {
    const results = await allSettled([
      Promise.resolve(1),
      Promise.reject(new Error("fail")),
      Promise.resolve(3),
    ]);
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1].status).toBe("rejected");
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });

  it("first resolves with fastest", async () => {
    const result = await first([
      delay(100).then(() => "slow"),
      delay(10).then(() => "fast"),
    ]);
    expect(result).toBe("fast");
  });

  it("deferred creates controllable promise", async () => {
    const d = deferred<number>();
    setTimeout(() => d.resolve(42), 10);
    expect(await d.promise).toBe(42);
  });
});
