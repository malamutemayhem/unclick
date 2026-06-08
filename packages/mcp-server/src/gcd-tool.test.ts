import { describe, it, expect } from "vitest";
import { gcdCalculate } from "./gcd-tool.js";

describe("gcd-tool", () => {
  it("computes GCD and LCM of two numbers", async () => {
    const r = await gcdCalculate({ numbers: [12, 8] }) as Record<string, unknown>;
    expect(r.gcd).toBe(4);
    expect(r.lcm).toBe(24);
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles multiple numbers", async () => {
    const r = await gcdCalculate({ numbers: [12, 18, 24] }) as Record<string, unknown>;
    expect(r.gcd).toBe(6);
    expect(r.lcm).toBe(72);
  });

  it("handles coprime numbers", async () => {
    const r = await gcdCalculate({ numbers: [7, 13] }) as Record<string, unknown>;
    expect(r.gcd).toBe(1);
    expect(r.lcm).toBe(91);
  });

  it("rejects too few numbers", async () => {
    const r = await gcdCalculate({ numbers: [5] }) as Record<string, unknown>;
    expect(r.error).toMatch(/at least 2/i);
  });

  it("rejects empty input", async () => {
    const r = await gcdCalculate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/numbers/i);
  });
});
