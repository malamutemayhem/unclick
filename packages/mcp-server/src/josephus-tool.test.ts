import { describe, it, expect } from "vitest";
import { josephus } from "./josephus-tool.js";

describe("josephus", () => {
  it("solves classic n=7 k=3", async () => {
    const r = (await josephus({ n: 7, k: 3 })) as any;
    expect(r.survivor_0indexed).toBe(3);
    expect(r.survivor_1indexed).toBe(4);
  });

  it("solves n=1 (trivial)", async () => {
    const r = (await josephus({ n: 1, k: 5 })) as any;
    expect(r.survivor_0indexed).toBe(0);
  });

  it("returns elimination order for small n", async () => {
    const r = (await josephus({ n: 5, k: 2 })) as any;
    expect(r.elimination_order_0indexed).toEqual([1, 3, 0, 4, 2]);
    expect(r.survivor_0indexed).toBe(2);
  });

  it("handles k=1 (sequential elimination)", async () => {
    const r = (await josephus({ n: 6, k: 1 })) as any;
    expect(r.survivor_0indexed).toBe(5);
    expect(r.elimination_order_0indexed).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("stamps meta", async () => {
    const r = (await josephus({ n: 3, k: 2 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
