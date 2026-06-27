import { describe, it, expect } from "vitest";
import {
  tensileStrength, sewSmooth, archivalSafe, knotHold,
  threadCost, preWaxed, naturalFiber, fiberSource,
  bestBinding, bindingThreads,
} from "../binding-thread-calc.js";

describe("tensileStrength", () => {
  it("linen waxed strong best tensile strength", () => {
    expect(tensileStrength("linen_waxed_strong")).toBeGreaterThan(tensileStrength("silk_fine_delicate"));
  });
});

describe("sewSmooth", () => {
  it("silk fine delicate smoothest sewing", () => {
    expect(sewSmooth("silk_fine_delicate")).toBeGreaterThan(sewSmooth("hemp_cord_rustic"));
  });
});

describe("archivalSafe", () => {
  it("linen waxed strong best archival safety", () => {
    expect(archivalSafe("linen_waxed_strong")).toBeGreaterThan(archivalSafe("polyester_synthetic_durable"));
  });
});

describe("knotHold", () => {
  it("hemp cord rustic best knot hold", () => {
    expect(knotHold("hemp_cord_rustic")).toBeGreaterThan(knotHold("silk_fine_delicate"));
  });
});

describe("threadCost", () => {
  it("silk fine delicate most expensive", () => {
    expect(threadCost("silk_fine_delicate")).toBeGreaterThan(threadCost("cotton_unbleached_soft"));
  });
});

describe("preWaxed", () => {
  it("linen waxed strong is pre waxed", () => {
    expect(preWaxed("linen_waxed_strong")).toBe(true);
  });
  it("cotton unbleached soft is not pre waxed", () => {
    expect(preWaxed("cotton_unbleached_soft")).toBe(false);
  });
});

describe("naturalFiber", () => {
  it("linen waxed strong is natural fiber", () => {
    expect(naturalFiber("linen_waxed_strong")).toBe(true);
  });
  it("polyester synthetic durable is not natural fiber", () => {
    expect(naturalFiber("polyester_synthetic_durable")).toBe(false);
  });
});

describe("fiberSource", () => {
  it("linen waxed strong uses flax plant stem", () => {
    expect(fiberSource("linen_waxed_strong")).toBe("flax_plant_stem");
  });
});

describe("bestBinding", () => {
  it("silk fine delicate best for japanese stab bind", () => {
    expect(bestBinding("silk_fine_delicate")).toBe("japanese_stab_bind");
  });
});

describe("bindingThreads", () => {
  it("returns 5 types", () => {
    expect(bindingThreads()).toHaveLength(5);
  });
});
