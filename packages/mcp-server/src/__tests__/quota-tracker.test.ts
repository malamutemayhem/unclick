import { describe, it, expect } from "vitest";
import { QuotaTracker } from "../quota-tracker.js";

describe("QuotaTracker", () => {
  it("consume within limit succeeds", () => {
    const qt = new QuotaTracker();
    qt.define("api", 10, 60000);
    expect(qt.consume("api")).toBe(true);
    expect(qt.remaining("api")).toBe(9);
  });

  it("consume beyond limit fails", () => {
    const qt = new QuotaTracker();
    qt.define("api", 2, 60000);
    qt.consume("api");
    qt.consume("api");
    expect(qt.consume("api")).toBe(false);
    expect(qt.isExhausted("api")).toBe(true);
  });

  it("consume with amount", () => {
    const qt = new QuotaTracker();
    qt.define("bytes", 100, 60000);
    expect(qt.consume("bytes", 50)).toBe(true);
    expect(qt.remaining("bytes")).toBe(50);
    expect(qt.consume("bytes", 60)).toBe(false);
  });

  it("consume unknown key returns false", () => {
    const qt = new QuotaTracker();
    expect(qt.consume("nope")).toBe(false);
  });

  it("getStatus returns quota info", () => {
    const qt = new QuotaTracker();
    qt.define("api", 100, 60000);
    qt.consume("api", 30);
    const status = qt.getStatus("api");
    expect(status?.limit).toBe(100);
    expect(status?.used).toBe(30);
    expect(status?.remaining).toBe(70);
  });

  it("reset clears usage", () => {
    const qt = new QuotaTracker();
    qt.define("api", 5, 60000);
    qt.consume("api", 5);
    qt.reset("api");
    expect(qt.remaining("api")).toBe(5);
  });

  it("tracks size", () => {
    const qt = new QuotaTracker();
    qt.define("a", 10, 1000);
    qt.define("b", 10, 1000);
    expect(qt.size).toBe(2);
  });
});
