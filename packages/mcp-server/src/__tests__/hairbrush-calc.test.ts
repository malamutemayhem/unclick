import { describe, it, expect } from "vitest";
import {
  detangling, volumeAdd, shineResult, gentleness,
  brushCost, heatSafe, wetHairSafe, bristleType,
  bestHair, hairbrushes,
} from "../hairbrush-calc.js";

describe("detangling", () => {
  it("paddle flat detangle best detangling", () => {
    expect(detangling("paddle_flat_detangle")).toBeGreaterThan(detangling("boar_bristle_shine"));
  });
});

describe("volumeAdd", () => {
  it("round blow dry volume best volume", () => {
    expect(volumeAdd("round_blow_dry_volume")).toBeGreaterThan(volumeAdd("wide_tooth_comb_wet"));
  });
});

describe("shineResult", () => {
  it("boar bristle shine best shine result", () => {
    expect(shineResult("boar_bristle_shine")).toBeGreaterThan(shineResult("wide_tooth_comb_wet"));
  });
});

describe("gentleness", () => {
  it("wide tooth comb wet gentlest", () => {
    expect(gentleness("wide_tooth_comb_wet")).toBeGreaterThan(gentleness("round_blow_dry_volume"));
  });
});

describe("brushCost", () => {
  it("boar bristle shine most expensive", () => {
    expect(brushCost("boar_bristle_shine")).toBeGreaterThan(brushCost("wide_tooth_comb_wet"));
  });
});

describe("heatSafe", () => {
  it("round blow dry volume is heat safe", () => {
    expect(heatSafe("round_blow_dry_volume")).toBe(true);
  });
  it("paddle flat detangle is not heat safe", () => {
    expect(heatSafe("paddle_flat_detangle")).toBe(false);
  });
});

describe("wetHairSafe", () => {
  it("wide tooth comb wet is wet hair safe", () => {
    expect(wetHairSafe("wide_tooth_comb_wet")).toBe(true);
  });
  it("boar bristle shine is not wet hair safe", () => {
    expect(wetHairSafe("boar_bristle_shine")).toBe(false);
  });
});

describe("bristleType", () => {
  it("boar bristle shine uses natural boar bristle", () => {
    expect(bristleType("boar_bristle_shine")).toBe("natural_boar_bristle");
  });
});

describe("bestHair", () => {
  it("wide tooth comb wet best for curly wet fragile", () => {
    expect(bestHair("wide_tooth_comb_wet")).toBe("curly_wet_fragile");
  });
});

describe("hairbrushes", () => {
  it("returns 5 types", () => {
    expect(hairbrushes()).toHaveLength(5);
  });
});
