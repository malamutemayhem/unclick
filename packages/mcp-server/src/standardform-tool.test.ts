import { describe, it, expect } from "vitest";
import { standardForm } from "./standardform-tool.js";

describe("standardForm", () => {
  it("converts large number", async () => {
    const r = await standardForm({ value: 12345 }) as any;
    expect(r.mantissa).toBeCloseTo(1.2345, 4);
    expect(r.exponent).toBe(4);
  });

  it("converts small number", async () => {
    const r = await standardForm({ value: 0.0042 }) as any;
    expect(r.mantissa).toBeCloseTo(4.2, 1);
    expect(r.exponent).toBe(-3);
  });

  it("handles zero", async () => {
    const r = await standardForm({ value: 0 }) as any;
    expect(r.mantissa).toBe(0);
    expect(r.exponent).toBe(0);
  });

  it("returns error for non-number", async () => {
    const r = await standardForm({}) as any;
    expect(r.error).toBeTruthy();
  });
});
