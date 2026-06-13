import { describe, it, expect } from "vitest";
import { sosDp } from "./sos-tool.js";

describe("sosDp", () => {
  it("computes subset sum for 4 elements", async () => {
    const r = (await sosDp({ values: [1, 2, 3, 4], direction: "subset_sum" })) as any;
    // mask 0 (00): only subset is 00 -> 1
    // mask 1 (01): subsets 00, 01 -> 1+2=3
    // mask 2 (10): subsets 00, 10 -> 1+3=4
    // mask 3 (11): subsets 00, 01, 10, 11 -> 1+2+3+4=10
    expect(r.result).toEqual([1, 3, 4, 10]);
    expect(r.bits).toBe(2);
  });

  it("computes superset sum for 4 elements", async () => {
    const r = (await sosDp({ values: [1, 2, 3, 4], direction: "superset_sum" })) as any;
    // mask 0 (00): supersets are all -> 1+2+3+4=10
    // mask 1 (01): supersets 01, 11 -> 2+4=6
    // mask 2 (10): supersets 10, 11 -> 3+4=7
    // mask 3 (11): only itself -> 4
    expect(r.result).toEqual([10, 6, 7, 4]);
  });

  it("handles single element", async () => {
    const r = (await sosDp({ values: [42], direction: "subset_sum" })) as any;
    expect(r.result).toEqual([42]);
    expect(r.bits).toBe(0);
  });

  it("defaults to superset_sum", async () => {
    const r = (await sosDp({ values: [1, 2, 3, 4] })) as any;
    expect(r.direction).toBe("superset_sum");
  });

  it("stamps meta", async () => {
    const r = (await sosDp({ values: [1, 0], direction: "subset_sum" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
