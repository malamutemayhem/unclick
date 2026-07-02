import { describe, it, expect } from "vitest";
import { continuedFraction } from "./contfrac-tool.js";

describe("continuedFraction", () => {
  it("computes continued fraction for 355/113 (pi approximation)", async () => {
    const r = (await continuedFraction({ numerator: 355, denominator: 113 })) as any;
    expect(r.terms).toEqual([3, 7, 16]);
    expect(r.convergents).toHaveLength(3);
    expect(r.convergents[2]).toEqual({ p: 355, q: 113 });
  });

  it("handles a simple fraction 7/3", async () => {
    const r = (await continuedFraction({ numerator: 7, denominator: 3 })) as any;
    expect(r.terms).toEqual([2, 3]);
    expect(r.convergents[0]).toEqual({ p: 2, q: 1 });
    expect(r.convergents[1]).toEqual({ p: 7, q: 3 });
    expect(r.decimal_value).toBeCloseTo(7 / 3, 10);
  });

  it("handles negative fraction -7/2", async () => {
    const r = (await continuedFraction({ numerator: -7, denominator: 2 })) as any;
    // floor(-7/2) = -4, remainder = -7 - (-4)*2 = 1, then 2/1 = 2
    expect(r.terms).toEqual([-4, 2]);
    expect(r.decimal_value).toBe(-3.5);
  });

  it("rejects zero denominator", async () => {
    await expect(continuedFraction({ numerator: 1, denominator: 0 })).rejects.toThrow(
      "non-zero integer",
    );
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await continuedFraction({ numerator: 1, denominator: 1 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
