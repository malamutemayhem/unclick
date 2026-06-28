import { describe, it, expect } from "vitest";
import { angleConvert } from "./angleconv-tool.js";

describe("angleConvert", () => {
  it("converts 180 degrees to radians", async () => {
    const r = await angleConvert({ value: 180, from: "degrees" }) as any;
    expect(r.radians).toBeCloseTo(Math.PI, 6);
    expect(r.gradians).toBe(200);
    expect(r.turns).toBe(0.5);
  });

  it("converts pi radians to degrees", async () => {
    const r = await angleConvert({ value: Math.PI, from: "radians" }) as any;
    expect(r.degrees).toBeCloseTo(180, 5);
  });

  it("converts 1 turn to degrees", async () => {
    const r = await angleConvert({ value: 1, from: "turns" }) as any;
    expect(r.degrees).toBeCloseTo(360, 5);
  });

  it("returns error for invalid unit", async () => {
    const r = await angleConvert({ value: 90, from: "foo" }) as any;
    expect(r.error).toBeTruthy();
  });
});
