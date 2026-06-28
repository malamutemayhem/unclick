import { describe, it, expect } from "vitest";
import { ntt } from "./ntt-tool.js";

describe("ntt", () => {
  it("multiplies two simple polynomials", async () => {
    const r = (await ntt({
      poly_a: [1, 2],
      poly_b: [3, 4],
    })) as any;
    expect(r.product).toEqual([3, 10, 8]);
    expect(r.result_degree).toBe(2);
  });

  it("multiplies (1+x)^2", async () => {
    const r = (await ntt({
      poly_a: [1, 1],
      poly_b: [1, 1],
    })) as any;
    expect(r.product).toEqual([1, 2, 1]);
  });

  it("handles single-element polynomials", async () => {
    const r = (await ntt({
      poly_a: [5],
      poly_b: [7],
    })) as any;
    expect(r.product).toEqual([35]);
    expect(r.result_degree).toBe(0);
  });

  it("handles larger polynomials correctly", async () => {
    const r = (await ntt({
      poly_a: [1, 1, 1],
      poly_b: [1, 1, 1],
    })) as any;
    expect(r.product).toEqual([1, 2, 3, 2, 1]);
    expect(r.degree_a).toBe(2);
    expect(r.degree_b).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await ntt({
      poly_a: [1],
      poly_b: [1],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
