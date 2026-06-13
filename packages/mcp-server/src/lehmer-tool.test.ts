import { describe, it, expect } from "vitest";
import { lehmerCode } from "./lehmer-tool.js";

describe("lehmerCode", () => {
  it("computes Lehmer code and rank for identity permutation", async () => {
    const r = (await lehmerCode({ permutation: [0, 1, 2] })) as any;
    expect(r.lehmer_code).toEqual([0, 0, 0]);
    expect(r.rank).toBe(0);
    expect(r.n).toBe(3);
  });

  it("computes Lehmer code for last permutation [2,1,0]", async () => {
    const r = (await lehmerCode({ permutation: [2, 1, 0] })) as any;
    expect(r.lehmer_code).toEqual([2, 1, 0]);
    expect(r.rank).toBe(5); // 2*2! + 1*1! + 0*0! = 4+1+0 = 5
  });

  it("unranks rank=0, n=3 to identity permutation", async () => {
    const r = (await lehmerCode({ rank: 0, n: 3 })) as any;
    expect(r.permutation).toEqual([0, 1, 2]);
    expect(r.lehmer_code).toEqual([0, 0, 0]);
  });

  it("round-trips permutation through rank and back", async () => {
    const perm = [3, 0, 2, 1];
    const r1 = (await lehmerCode({ permutation: perm })) as any;
    const r2 = (await lehmerCode({ rank: r1.rank, n: 4 })) as any;
    expect(r2.permutation).toEqual(perm);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await lehmerCode({ permutation: [1, 0] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
