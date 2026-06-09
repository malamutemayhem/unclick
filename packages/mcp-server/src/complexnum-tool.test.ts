import { describe, it, expect } from "vitest";
import { complexCalc } from "./complexnum-tool.js";

describe("complexCalc", () => {
  it("adds two complex numbers", async () => {
    const r = await complexCalc({ operation: "add", real1: 1, imag1: 2, real2: 3, imag2: 4 }) as any;
    expect(r.real).toBe(4);
    expect(r.imag).toBe(6);
  });

  it("multiplies two complex numbers", async () => {
    const r = await complexCalc({ operation: "multiply", real1: 1, imag1: 2, real2: 3, imag2: 4 }) as any;
    expect(r.real).toBe(-5);
    expect(r.imag).toBe(10);
  });

  it("computes magnitude", async () => {
    const r = await complexCalc({ operation: "magnitude", real1: 3, imag1: 4 }) as any;
    expect(r.magnitude).toBe(5);
  });

  it("converts to polar", async () => {
    const r = await complexCalc({ operation: "polar", real1: 1, imag1: 0 }) as any;
    expect(r.magnitude).toBe(1);
    expect(r.angle_degrees).toBe(0);
  });

  it("returns error for missing operand2 on binary op", async () => {
    const r = await complexCalc({ operation: "add", real1: 1, imag1: 2 }) as any;
    expect(r.error).toBeTruthy();
  });
});
