import { describe, it, expect, vi } from "vitest";
import { createDeferred, timeout, delay, settling, props, retry } from "../deferred.js";

describe("createDeferred", () => {
  it("resolves when resolve is called", async () => {
    const d = createDeferred<number>();
    expect(d.settled).toBe(false);
    d.resolve(42);
    expect(await d.promise).toBe(42);
    expect(d.settled).toBe(true);
  });

  it("rejects when reject is called", async () => {
    const d = createDeferred<number>();
    d.reject(new Error("fail"));
    await expect(d.promise).rejects.toThrow("fail");
    expect(d.settled).toBe(true);
  });
});

describe("timeout", () => {
  it("resolves if fast enough", async () => {
    const result = await timeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it("rejects on timeout", async () => {
    const slow = new Promise((r) => setTimeout(r, 5000));
    await expect(timeout(slow, 10)).rejects.toThrow("Timeout");
  });
});

describe("delay", () => {
  it("resolves after ms", async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });
});

describe("settling", () => {
  it("settles all promises", async () => {
    const results = await settling([
      Promise.resolve(1),
      Promise.reject(new Error("bad")),
      Promise.resolve(3),
    ]);
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1].status).toBe("rejected");
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });
});

describe("props", () => {
  it("resolves object of promises", async () => {
    const result = await props({
      a: Promise.resolve(1),
      b: Promise.resolve("hello"),
    });
    expect(result).toEqual({ a: 1, b: "hello" });
  });
});

describe("retry", () => {
  it("succeeds on first try", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    expect(await retry(fn, 3)).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries and succeeds", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("x"))
      .mockResolvedValue("ok");
    expect(await retry(fn, 3, 1)).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throws after all attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("fail"));
    await expect(retry(fn, 2, 1)).rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
