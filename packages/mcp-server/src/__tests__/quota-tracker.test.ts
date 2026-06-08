import { describe, it, expect } from "vitest";
import { QuotaTracker } from "../quota-tracker.js";

describe("QuotaTracker", () => {
  it("define and consume", () => {
    const qt = new QuotaTracker();
    qt.define("api", 10, 60000);
    const r = qt.consume("api", 3);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(7);
  });

  it("denies over limit", () => {
    const qt = new QuotaTracker();
    qt.define("api", 5, 60000);
    qt.consume("api", 5);
    const r = qt.consume("api", 1);
    expect(r.allowed).toBe(false);
    expect(r.remaining).toBe(0);
  });

  it("remaining shows left", () => {
    const qt = new QuotaTracker();
    qt.define("x", 10, 60000);
    qt.consume("x", 4);
    expect(qt.remaining("x")).toBe(6);
  });

  it("unknown key returns 0 remaining", () => {
    const qt = new QuotaTracker();
    expect(qt.remaining("unknown")).toBe(0);
  });

  it("usage returns stats", () => {
    const qt = new QuotaTracker();
    qt.define("calls", 100, 60000);
    qt.consume("calls", 25);
    const u = qt.usage("calls");
    expect(u?.used).toBe(25);
    expect(u?.limit).toBe(100);
    expect(u?.percent).toBe(25);
  });

  it("reset clears usage", () => {
    const qt = new QuotaTracker();
    qt.define("x", 10, 60000);
    qt.consume("x", 10);
    qt.reset("x");
    expect(qt.remaining("x")).toBe(10);
  });

  it("keys lists all quotas", () => {
    const qt = new QuotaTracker();
    qt.define("a", 1, 1000);
    qt.define("b", 1, 1000);
    expect(qt.keys.sort()).toEqual(["a", "b"]);
  });

  it("default consume is 1", () => {
    const qt = new QuotaTracker();
    qt.define("x", 5, 60000);
    qt.consume("x");
    expect(qt.remaining("x")).toBe(4);
  });
});
