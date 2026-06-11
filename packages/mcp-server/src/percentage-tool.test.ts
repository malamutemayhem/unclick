import { describe, it, expect } from "vitest";
import { percentageCalc } from "./percentage-tool.js";

describe("percentage-tool", () => {
  it("calculates percentage of", async () => {
    const r = await percentageCalc({ a: 20, b: 150 }) as Record<string, unknown>;
    expect(r.result).toBe(30);
    expect(r.explanation).toContain("20% of 150");
    expect(r.unclick_meta).toBeDefined();
  });

  it("calculates what percent a is of b", async () => {
    const r = await percentageCalc({ operation: "is_what_percent", a: 25, b: 200 }) as Record<string, unknown>;
    expect(r.result).toBe(12.5);
  });

  it("calculates percentage change", async () => {
    const r = await percentageCalc({ operation: "change", a: 100, b: 150 }) as Record<string, unknown>;
    expect(r.result).toBe(50);
  });

  it("calculates increase", async () => {
    const r = await percentageCalc({ operation: "increase", a: 200, b: 10 }) as Record<string, unknown>;
    expect(r.result).toBe(220);
  });

  it("rejects missing numbers", async () => {
    const r = await percentageCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/required/i);
  });
});
