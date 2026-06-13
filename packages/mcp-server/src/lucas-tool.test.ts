import { describe, it, expect } from "vitest";
import { lucasTheorem } from "./lucas-tool.js";

describe("lucasTheorem", () => {
  it("computes small binomial mod prime", async () => {
    const r = (await lucasTheorem({ n: 10, k: 3, p: 7 })) as any;
    // C(10,3) = 120 mod 7 = 1
    expect(r.binomial_mod_p).toBe(1);
  });

  it("returns 0 when k > n", async () => {
    const r = (await lucasTheorem({ n: 3, k: 5, p: 7 })) as any;
    expect(r.binomial_mod_p).toBe(0);
  });

  it("handles C(n, 0) = 1", async () => {
    const r = (await lucasTheorem({ n: 100, k: 0, p: 13 })) as any;
    expect(r.binomial_mod_p).toBe(1);
  });

  it("handles large n with Lucas decomposition", async () => {
    const r = (await lucasTheorem({ n: 1000, k: 500, p: 13 })) as any;
    expect(r.binomial_mod_p).toBeGreaterThanOrEqual(0);
    expect(r.binomial_mod_p).toBeLessThan(13);
    expect(r.base_p_digits.length).toBeGreaterThan(0);
  });

  it("stamps meta", async () => {
    const r = (await lucasTheorem({ n: 5, k: 2, p: 3 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
