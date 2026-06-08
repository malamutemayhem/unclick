import { describe, it, expect } from "vitest";
import { withTimeout, delay, retry, isTimeoutError, TimeoutError } from "../timeout-controller.js";

describe("withTimeout", () => {
  it("resolves when fast enough", async () => {
    const result = await withTimeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it("rejects on timeout", async () => {
    const slow = new Promise((r) => setTimeout(r, 1000));
    await expect(withTimeout(slow, 10)).rejects.toThrow("Operation timed out");
  });

  it("uses custom message", async () => {
    const slow = new Promise((r) => setTimeout(r, 1000));
    await expect(withTimeout(slow, 10, "custom")).rejects.toThrow("custom");
  });

  it("propagates original errors", async () => {
    const failing = Promise.reject(new Error("original"));
    await expect(withTimeout(failing, 1000)).rejects.toThrow("original");
  });
});

describe("delay", () => {
  it("waits specified time", async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });
});

describe("retry", () => {
  it("succeeds on first try", async () => {
    const result = await retry(async () => 42, 3, 0);
    expect(result).toBe(42);
  });

  it("retries on failure", async () => {
    let calls = 0;
    const result = await retry(async () => {
      calls++;
      if (calls < 3) throw new Error("not yet");
      return "done";
    }, 3, 0);
    expect(result).toBe("done");
    expect(calls).toBe(3);
  });

  it("throws after max attempts", async () => {
    await expect(retry(async () => { throw new Error("fail"); }, 2, 0)).rejects.toThrow("fail");
  });
});

describe("isTimeoutError", () => {
  it("identifies TimeoutError", () => {
    expect(isTimeoutError(new TimeoutError())).toBe(true);
    expect(isTimeoutError(new Error("other"))).toBe(false);
  });
});
