import { describe, it, expect } from "vitest";
import { xorBasis } from "./xorbase-tool.js";

describe("xorBasis", () => {
  it("finds basis for simple set", async () => {
    const r = (await xorBasis({ values: [1, 2, 3] })) as any;
    expect(r.rank).toBe(2);
    expect(r.max_xor).toBe(3);
  });

  it("handles linearly independent set", async () => {
    const r = (await xorBasis({ values: [1, 2, 4] })) as any;
    expect(r.rank).toBe(3);
    expect(r.distinct_xor_values).toBe(8);
    expect(r.max_xor).toBe(7);
  });

  it("detects redundant elements", async () => {
    const r = (await xorBasis({ values: [3, 5, 6] })) as any;
    // 3=011, 5=101, 6=110: 3^5=6, so rank is 2
    expect(r.rank).toBe(2);
    expect(r.distinct_xor_values).toBe(4);
  });

  it("handles single element", async () => {
    const r = (await xorBasis({ values: [42] })) as any;
    expect(r.rank).toBe(1);
    expect(r.max_xor).toBe(42);
    expect(r.basis_vectors).toEqual([42]);
  });

  it("stamps meta", async () => {
    const r = (await xorBasis({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
