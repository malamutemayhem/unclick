import { describe, it, expect } from "vitest";
import { sigmoidCalculate } from "./sigmoid-tool.js";

describe("sigmoidCalculate", () => {
  it("computes sigmoid at 0", async () => {
    const r = await sigmoidCalculate({ x: 0, function: "sigmoid" }) as any;
    expect(r.result).toBe(0.5);
  });

  it("computes relu for negative", async () => {
    const r = await sigmoidCalculate({ x: -5, function: "relu" }) as any;
    expect(r.result).toBe(0);
    expect(r.derivative).toBe(0);
  });

  it("computes tanh", async () => {
    const r = await sigmoidCalculate({ x: 0, function: "tanh" }) as any;
    expect(r.result).toBe(0);
    expect(r.derivative).toBe(1);
  });

  it("defaults to sigmoid", async () => {
    const r = await sigmoidCalculate({ x: 0 }) as any;
    expect(r.function).toBe("sigmoid");
    expect(r.result).toBe(0.5);
  });

  it("returns error for invalid function", async () => {
    const r = await sigmoidCalculate({ x: 0, function: "nope" }) as any;
    expect(r.error).toBeTruthy();
  });
});
