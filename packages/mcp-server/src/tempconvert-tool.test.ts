import { describe, it, expect } from "vitest";
import { temperatureConvert } from "./tempconvert-tool.js";

describe("tempconvert-tool", () => {
  it("converts celsius to all", async () => {
    const r = await temperatureConvert({ value: 100, from: "c" }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, number>;
    expect(conv.fahrenheit).toBe(212);
    expect(conv.kelvin).toBe(373.15);
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts fahrenheit to celsius", async () => {
    const r = await temperatureConvert({ value: 32, from: "f" }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, number>;
    expect(conv.celsius).toBe(0);
  });

  it("converts kelvin", async () => {
    const r = await temperatureConvert({ value: 0, from: "k" }) as Record<string, unknown>;
    const conv = r.conversions as Record<string, number>;
    expect(conv.celsius).toBeCloseTo(-273.15, 1);
  });

  it("includes formulas", async () => {
    const r = await temperatureConvert({ value: 0, from: "c" }) as Record<string, unknown>;
    expect(r.formulas).toBeDefined();
  });

  it("rejects missing value", async () => {
    const r = await temperatureConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/value/i);
  });
});
