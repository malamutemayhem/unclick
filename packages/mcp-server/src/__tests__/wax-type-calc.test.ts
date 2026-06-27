import { describe, it, expect } from "vitest";
import {
  burnTime, scentThrow, ecoFriendly, pourEase,
  waxCost, renewable, naturalScent, meltPoint,
  bestCandle, waxTypes,
} from "../wax-type-calc.js";

describe("burnTime", () => {
  it("beeswax pure golden longest burn time", () => {
    expect(burnTime("beeswax_pure_golden")).toBeGreaterThan(burnTime("paraffin_wax_classic"));
  });
});

describe("scentThrow", () => {
  it("paraffin wax classic best scent throw", () => {
    expect(scentThrow("paraffin_wax_classic")).toBeGreaterThan(scentThrow("beeswax_pure_golden"));
  });
});

describe("ecoFriendly", () => {
  it("beeswax pure golden most eco friendly", () => {
    expect(ecoFriendly("beeswax_pure_golden")).toBeGreaterThan(ecoFriendly("paraffin_wax_classic"));
  });
});

describe("pourEase", () => {
  it("coconut wax cream easiest to pour", () => {
    expect(pourEase("coconut_wax_cream")).toBeGreaterThan(pourEase("beeswax_pure_golden"));
  });
});

describe("waxCost", () => {
  it("beeswax pure golden most expensive", () => {
    expect(waxCost("beeswax_pure_golden")).toBeGreaterThan(waxCost("paraffin_wax_classic"));
  });
});

describe("renewable", () => {
  it("soy wax natural is renewable", () => {
    expect(renewable("soy_wax_natural")).toBe(true);
  });
  it("paraffin wax classic is not renewable", () => {
    expect(renewable("paraffin_wax_classic")).toBe(false);
  });
});

describe("naturalScent", () => {
  it("beeswax pure golden has natural scent", () => {
    expect(naturalScent("beeswax_pure_golden")).toBe(true);
  });
  it("soy wax natural has no natural scent", () => {
    expect(naturalScent("soy_wax_natural")).toBe(false);
  });
});

describe("meltPoint", () => {
  it("coconut wax cream low melt point", () => {
    expect(meltPoint("coconut_wax_cream")).toBe("low_100f_38c");
  });
});

describe("bestCandle", () => {
  it("paraffin wax classic best for pillar taper mold", () => {
    expect(bestCandle("paraffin_wax_classic")).toBe("pillar_taper_mold");
  });
});

describe("waxTypes", () => {
  it("returns 5 types", () => {
    expect(waxTypes()).toHaveLength(5);
  });
});
