import { describe, it, expect } from "vitest";
import { moebiusFunction } from "./moebius-tool.js";

describe("moebiusFunction", () => {
  it("computes mu for small values", async () => {
    const r = (await moebiusFunction({ n: 10 })) as any;
    // mu: 1,-1,-1,0,-1,1,-1,0,0,1
    expect(r.mu_values).toEqual([1, -1, -1, 0, -1, 1, -1, 0, 0, 1]);
    expect(r.mu_n).toBe(1);
  });

  it("returns 0 for perfect square factor", async () => {
    const r = (await moebiusFunction({ n: 4 })) as any;
    expect(r.mu_n).toBe(0);
  });

  it("computes Mertens function", async () => {
    const r = (await moebiusFunction({ n: 10 })) as any;
    // M(10) = 1-1-1+0-1+1-1+0+0+1 = -1
    expect(r.mertens_n).toBe(-1);
  });

  it("counts distribution", async () => {
    const r = (await moebiusFunction({ n: 10 })) as any;
    expect(r.counts.zero).toBe(3);
    expect(r.counts.plus_one).toBe(3);
    expect(r.counts.minus_one).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await moebiusFunction({ n: 1 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
