import { describe, it, expect } from "vitest";
import { bitwiseCalc } from "./bitwise-tool.js";

describe("bitwise-tool", () => {
  it("performs AND", async () => {
    const r = await bitwiseCalc({ a: 12, b: 10, operation: "and" }) as Record<string, unknown>;
    expect(r.result).toBe(8);
    expect(r.binary_result).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("performs OR", async () => {
    const r = await bitwiseCalc({ a: 12, b: 10, operation: "or" }) as Record<string, unknown>;
    expect(r.result).toBe(14);
  });

  it("performs XOR", async () => {
    const r = await bitwiseCalc({ a: 12, b: 10, operation: "xor" }) as Record<string, unknown>;
    expect(r.result).toBe(6);
  });

  it("performs NOT", async () => {
    const r = await bitwiseCalc({ a: 0, operation: "not" }) as Record<string, unknown>;
    expect(r.result).toBe(-1);
  });

  it("performs shift left", async () => {
    const r = await bitwiseCalc({ a: 5, b: 2, operation: "shift_left" }) as Record<string, unknown>;
    expect(r.result).toBe(20);
  });

  it("rejects missing a", async () => {
    const r = await bitwiseCalc({}) as Record<string, unknown>;
    expect(r.error).toMatch(/a is required/i);
  });
});
