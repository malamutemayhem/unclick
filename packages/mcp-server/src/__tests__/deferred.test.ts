import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createDeferred, withTimeout } from "../deferred.js";

describe("createDeferred", () => {
  it("resolves externally", async () => {
    const d = createDeferred<number>();
    d.resolve(42);
    expect(await d.promise).toBe(42);
  });

  it("rejects externally", async () => {
    const d = createDeferred<number>();
    d.reject(new Error("boom"));
    await expect(d.promise).rejects.toThrow("boom");
  });

  it("tracks settled state", () => {
    const d = createDeferred<string>();
    expect(d.isSettled).toBe(false);
    d.resolve("done");
    expect(d.isSettled).toBe(true);
  });

  it("ignores double resolve", async () => {
    const d = createDeferred<number>();
    d.resolve(1);
    d.resolve(2);
    expect(await d.promise).toBe(1);
  });

  it("ignores resolve after reject", async () => {
    const d = createDeferred<number>();
    d.reject(new Error("first"));
    d.resolve(2);
    await expect(d.promise).rejects.toThrow("first");
  });
});

describe("withTimeout", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("rejects if not resolved in time", async () => {
    const d = createDeferred<string>();
    withTimeout(d, 1000);
    vi.advanceTimersByTime(1500);
    await expect(d.promise).rejects.toThrow("Timed out");
  });

  it("does not reject if resolved in time", async () => {
    const d = createDeferred<string>();
    withTimeout(d, 1000);
    d.resolve("ok");
    vi.advanceTimersByTime(1500);
    expect(await d.promise).toBe("ok");
  });
});
