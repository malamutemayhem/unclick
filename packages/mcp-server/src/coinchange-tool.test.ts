import { describe, it, expect } from "vitest";
import { coinChange } from "./coinchange-tool.js";

describe("coinChange", () => {
  it("finds minimum coins for a standard case", async () => {
    const r = (await coinChange({ coins: [1, 5, 10, 25], amount: 30 })) as any;
    expect(r.min_coins).toBe(2);
    expect(r.used_coins).toEqual([5, 25]);
  });

  it("counts distinct combinations", async () => {
    // ways to make 5 with [1,2,5]: {5}, {1,2,2}, {1,1,1,2}, {1,1,1,1,1}, {2,2,1} wait
    // actually: [5], [2,2,1], [2,1,1,1], [1,1,1,1,1], [3 is not a coin]
    // coins [1,2,5], amount 5:
    //   5 = 5
    //   5 = 2+2+1
    //   5 = 2+1+1+1
    //   5 = 1+1+1+1+1
    // That is 4 combinations
    const r = (await coinChange({ coins: [1, 2, 5], amount: 5 })) as any;
    expect(r.combination_count).toBe(4);
  });

  it("returns -1 when amount is impossible", async () => {
    const r = (await coinChange({ coins: [3, 7], amount: 5 })) as any;
    expect(r.min_coins).toBe(-1);
    expect(r.used_coins).toEqual([]);
  });

  it("handles zero amount", async () => {
    const r = (await coinChange({ coins: [1, 5], amount: 0 })) as any;
    expect(r.min_coins).toBe(0);
    expect(r.combination_count).toBe(1);
    expect(r.used_coins).toEqual([]);
  });

  it("stamps meta", async () => {
    const r = (await coinChange({ coins: [1], amount: 3 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
