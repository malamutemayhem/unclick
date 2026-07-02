import { describe, it, expect } from "vitest";
import { romanConvert } from "./roman-tool.js";

describe("roman-tool", () => {
  it("converts decimal to Roman", async () => {
    const r = await romanConvert({ value: 42 }) as Record<string, unknown>;
    expect(r.roman).toBe("XLII");
    expect(r.decimal).toBe(42);
    expect(r.direction).toBe("decimal_to_roman");
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts Roman to decimal", async () => {
    const r = await romanConvert({ value: "MCMXCIX" }) as Record<string, unknown>;
    expect(r.decimal).toBe(1999);
    expect(r.direction).toBe("roman_to_decimal");
  });

  it("handles year 2024", async () => {
    const r = await romanConvert({ value: 2024 }) as Record<string, unknown>;
    expect(r.roman).toBe("MMXXIV");
  });

  it("detects canonical form", async () => {
    const r = await romanConvert({ value: "XIV" }) as Record<string, unknown>;
    expect(r.canonical).toBe(true);
  });

  it("rejects out of range", async () => {
    const r = await romanConvert({ value: 4000 }) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("rejects missing input", async () => {
    const r = await romanConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/value/i);
  });
});
