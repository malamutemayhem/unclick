import { describe, it, expect } from "vitest";
import { pressureConvert } from "./unitpressure-tool.js";

describe("unitpressure-tool", () => {
  it("converts atm to psi", async () => {
    const r = await pressureConvert({ value: 1, from: "atm", to: "psi" }) as Record<string, unknown>;
    expect(r.result).toBeCloseTo(14.696, 1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts bar to kpa", async () => {
    const r = await pressureConvert({ value: 1, from: "bar", to: "kpa" }) as Record<string, unknown>;
    expect(r.result).toBe(100);
  });

  it("shows all conversions when no to", async () => {
    const r = await pressureConvert({ value: 101325, from: "pa" }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, number>;
    expect(conv.atm).toBeCloseTo(1, 3);
    expect(conv.bar).toBeCloseTo(1.01325, 3);
  });

  it("rejects unknown unit", async () => {
    const r = await pressureConvert({ value: 1, from: "xyz" }) as Record<string, unknown>;
    expect(r.error).toMatch(/unknown/i);
  });

  it("rejects missing value", async () => {
    const r = await pressureConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/value/i);
  });
});
