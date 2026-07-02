import { describe, it, expect } from "vitest";
import { catalanCalc } from "./catalan-tool.js";

describe("catalanCalc", () => {
  it("computes C(0) = 1", async () => {
    const r = await catalanCalc({ n: 0 }) as any;
    expect(r.catalan_n).toBe(1);
  });

  it("computes C(5) = 42", async () => {
    const r = await catalanCalc({ n: 5 }) as any;
    expect(r.catalan_n).toBe(42);
  });

  it("computes C(10) = 16796", async () => {
    const r = await catalanCalc({ n: 10 }) as any;
    expect(r.catalan_n).toBe(16796);
  });

  it("returns sequence when requested", async () => {
    const r = await catalanCalc({ n: 4, sequence: true }) as any;
    expect(r.sequence).toHaveLength(5);
    expect(r.sequence[0].value).toBe(1);
    expect(r.sequence[4].value).toBe(14);
  });

  it("rejects negative n", async () => {
    await expect(catalanCalc({ n: -1 })).rejects.toThrow("non-negative");
  });

  it("stamps meta", async () => {
    const r = await catalanCalc({ n: 3 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
