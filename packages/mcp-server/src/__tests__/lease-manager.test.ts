import { describe, it, expect, vi, afterEach } from "vitest";
import { LeaseManager } from "../lease-manager.js";

describe("LeaseManager", () => {
  afterEach(() => { vi.useRealTimers(); });

  it("acquire grants a lease", () => {
    const lm = new LeaseManager();
    expect(lm.acquire("res-1", "worker-a", 5000)).toBe(true);
    expect(lm.isHeld("res-1")).toBe(true);
    expect(lm.getHolder("res-1")).toBe("worker-a");
  });

  it("acquire blocks other holders", () => {
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 5000);
    expect(lm.acquire("res-1", "worker-b", 5000)).toBe(false);
  });

  it("same holder can re-acquire", () => {
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 5000);
    expect(lm.acquire("res-1", "worker-a", 5000)).toBe(true);
  });

  it("release frees the lease", () => {
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 5000);
    expect(lm.release("res-1", "worker-a")).toBe(true);
    expect(lm.isHeld("res-1")).toBe(false);
  });

  it("release rejects wrong holder", () => {
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 5000);
    expect(lm.release("res-1", "worker-b")).toBe(false);
  });

  it("expired lease is not held", () => {
    vi.useFakeTimers();
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 100);
    vi.advanceTimersByTime(101);
    expect(lm.isHeld("res-1")).toBe(false);
    expect(lm.getHolder("res-1")).toBeUndefined();
  });

  it("expired lease allows new holder", () => {
    vi.useFakeTimers();
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 100);
    vi.advanceTimersByTime(101);
    expect(lm.acquire("res-1", "worker-b", 5000)).toBe(true);
  });

  it("renew extends the lease", () => {
    const lm = new LeaseManager();
    lm.acquire("res-1", "worker-a", 100);
    expect(lm.renew("res-1", "worker-a", 5000)).toBe(true);
  });

  it("purgeExpired removes stale leases", () => {
    vi.useFakeTimers();
    const lm = new LeaseManager();
    lm.acquire("a", "w1", 100);
    lm.acquire("b", "w2", 200);
    vi.advanceTimersByTime(150);
    expect(lm.purgeExpired()).toBe(1);
    expect(lm.size).toBe(1);
  });
});
