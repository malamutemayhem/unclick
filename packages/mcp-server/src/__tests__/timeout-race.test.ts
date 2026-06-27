import { describe, it, expect, vi, afterEach } from "vitest";
import { withTimeout, delay, TimeoutError, firstSettled, deadline } from "../timeout-race.js";

describe("timeout-race", () => {
  afterEach(() => { vi.useRealTimers(); });

  it("withTimeout resolves if fast enough", async () => {
    const result = await withTimeout(Promise.resolve("ok"), 1000);
    expect(result).toBe("ok");
  });

  it("withTimeout rejects on timeout", async () => {
    vi.useFakeTimers();
    const p = withTimeout(new Promise(() => {}), 100);
    vi.advanceTimersByTime(100);
    await expect(p).rejects.toThrow(TimeoutError);
  });

  it("delay resolves after ms", async () => {
    vi.useFakeTimers();
    const p = delay(100, "done");
    vi.advanceTimersByTime(100);
    expect(await p).toBe("done");
  });

  it("firstSettled returns first to resolve or reject", async () => {
    const result = await firstSettled([
      Promise.resolve("fast"),
      new Promise((r) => setTimeout(r, 1000)),
    ]);
    expect(result.status).toBe("fulfilled");
    if (result.status === "fulfilled") expect(result.value).toBe("fast");
  });

  it("firstSettled handles rejection", async () => {
    const result = await firstSettled([
      Promise.reject("oops"),
      new Promise((r) => setTimeout(r, 1000)),
    ]);
    expect(result.status).toBe("rejected");
  });

  it("deadline creates a cancellable timeout", async () => {
    vi.useFakeTimers();
    const dl = deadline(500);
    dl.cancel();
    vi.advanceTimersByTime(500);
    await vi.advanceTimersByTimeAsync(0);
  });

  it("TimeoutError has correct name", () => {
    const err = new TimeoutError(100);
    expect(err.name).toBe("TimeoutError");
    expect(err.message).toContain("100ms");
  });
});
