import { describe, it, expect } from "vitest";
import { RateLimitTracker } from "../rate-limit-tracker.js";

describe("RateLimitTracker", () => {
  it("allows when no entry exists", () => {
    const rt = new RateLimitTracker();
    expect(rt.canProceed("api")).toBe(true);
    expect(rt.waitTime("api")).toBe(0);
  });

  it("blocks when remaining is 0", () => {
    const rt = new RateLimitTracker();
    rt.update("api", 0, 100, Date.now() + 60000);
    expect(rt.canProceed("api")).toBe(false);
    expect(rt.waitTime("api")).toBeGreaterThan(0);
  });

  it("allows when remaining > 0", () => {
    const rt = new RateLimitTracker();
    rt.update("api", 50, 100, Date.now() + 60000);
    expect(rt.canProceed("api")).toBe(true);
  });

  it("allows after reset time", () => {
    const rt = new RateLimitTracker();
    rt.update("api", 0, 100, Date.now() - 1000);
    expect(rt.canProceed("api")).toBe(true);
  });

  it("tracks utilization", () => {
    const rt = new RateLimitTracker();
    rt.update("api", 25, 100, Date.now() + 60000);
    expect(rt.utilization("api")).toBe(0.75);
  });

  it("updates from headers", () => {
    const rt = new RateLimitTracker();
    rt.updateFromHeaders("api", {
      "x-ratelimit-remaining": "10",
      "x-ratelimit-limit": "100",
      "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 60),
    });
    expect(rt.canProceed("api")).toBe(true);
    expect(rt.getEntry("api")?.remaining).toBe(10);
  });

  it("lists keys", () => {
    const rt = new RateLimitTracker();
    rt.update("a", 1, 10, 0);
    rt.update("b", 1, 10, 0);
    expect(rt.listKeys()).toEqual(["a", "b"]);
  });

  it("clear removes all", () => {
    const rt = new RateLimitTracker();
    rt.update("a", 1, 10, 0);
    rt.clear();
    expect(rt.listKeys()).toEqual([]);
  });
});
