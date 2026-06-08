import { describe, it, expect } from "vitest";
import { gcdLcmCalc } from "./gcdlcm-tool.js";

describe("gcdlcm-tool", () => {
  it("calculates GCD and LCM of two numbers", async () => {
    const r = await gcdLcmCalc({ a: 12, b: 18 }) as Record<string, unknown>;
    expect(r.gcd).toBe(6);
    expect(r.lcm).toBe(36);
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles comma-separated string", async () => {
    const r = await gcdLcmCalc({ numbers: "4,6,8" }) as Record<string, unknown>;
    expect(r.gcd).toBe(2);
    expect(r.lcm).toBe(24);
  });

  it("handles array input", async () => {
    const r = await gcdLcmCalc({ numbers: [15, 25, 35] }) as Record<string, unknown>;
    expect(r.gcd).toBe(5);
  });

  it("detects coprime numbers", async () => {
    const r = await gcdLcmCalc({ a: 7, b: 11 }) as Record<string, unknown>;
    expect(r.are_coprime).toBe(true);
  });

  it("rejects insufficient input", async () => {
    const r = await gcdLcmCalc({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
