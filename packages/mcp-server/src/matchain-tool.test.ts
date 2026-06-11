import { describe, it, expect } from "vitest";
import { matChainOrder } from "./matchain-tool.js";

describe("matChainOrder", () => {
  it("solves classic 4-matrix example", async () => {
    const r = (await matChainOrder({ dimensions: [10, 30, 5, 60] })) as any;
    expect(r.matrix_count).toBe(3);
    expect(r.min_multiplications).toBe(4500);
  });

  it("solves 2-matrix case", async () => {
    const r = (await matChainOrder({ dimensions: [10, 20, 30] })) as any;
    expect(r.min_multiplications).toBe(6000);
    expect(r.optimal_parenthesization).toBe("(M1 x M2)");
  });

  it("solves standard textbook example", async () => {
    const r = (await matChainOrder({
      dimensions: [40, 20, 30, 10, 30],
    })) as any;
    expect(r.min_multiplications).toBe(26000);
  });

  it("rejects fewer than 2 dimensions", async () => {
    await expect(matChainOrder({ dimensions: [5] })).rejects.toThrow(
      "at least 2",
    );
  });

  it("stamps meta", async () => {
    const r = (await matChainOrder({ dimensions: [5, 10, 3] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
