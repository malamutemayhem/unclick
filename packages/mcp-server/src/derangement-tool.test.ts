import { describe, it, expect } from "vitest";
import { derangementCalc } from "./derangement-tool.js";

describe("derangementCalc", () => {
  it("computes D(1) = 0", async () => {
    const r = (await derangementCalc({ n: 1 })) as any;
    expect(r.count).toBe(0);
  });

  it("computes D(5) = 44", async () => {
    const r = (await derangementCalc({ n: 5 })) as any;
    expect(r.count).toBe(44);
  });

  it("enumerates derangements for n=3", async () => {
    const r = (await derangementCalc({ n: 3, enumerate: true })) as any;
    expect(r.count).toBe(2);
    expect(r.derangements).toHaveLength(2);
    // The two derangements of {0,1,2} are [1,2,0] and [2,0,1]
    expect(r.derangements).toContainEqual([1, 2, 0]);
    expect(r.derangements).toContainEqual([2, 0, 1]);
  });

  it("rejects n > 20", async () => {
    await expect(derangementCalc({ n: 21 })).rejects.toThrow("between 1 and 20");
  });

  it("stamps meta", async () => {
    const r = (await derangementCalc({ n: 4 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
