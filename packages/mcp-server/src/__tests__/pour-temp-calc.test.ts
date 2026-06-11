import { describe, it, expect } from "vitest";
import {
  throwScent, surfaceSmooth, adhesion, tempRange,
  pourCost, natural, crystalForming, meltPoint,
  bestUse, pourTemps,
} from "../pour-temp-calc.js";

describe("throwScent", () => {
  it("paraffin wax medium strongest throw", () => {
    expect(throwScent("paraffin_wax_medium")).toBeGreaterThan(throwScent("beeswax_high"));
  });
});

describe("surfaceSmooth", () => {
  it("coconut wax cool smoothest surface", () => {
    expect(surfaceSmooth("coconut_wax_cool")).toBeGreaterThan(surfaceSmooth("palm_wax_crystal"));
  });
});

describe("adhesion", () => {
  it("beeswax high best adhesion", () => {
    expect(adhesion("beeswax_high")).toBeGreaterThan(adhesion("palm_wax_crystal"));
  });
});

describe("tempRange", () => {
  it("paraffin wax medium widest temp range", () => {
    expect(tempRange("paraffin_wax_medium")).toBeGreaterThan(tempRange("coconut_wax_cool"));
  });
});

describe("pourCost", () => {
  it("beeswax high most expensive", () => {
    expect(pourCost("beeswax_high")).toBeGreaterThan(pourCost("paraffin_wax_medium"));
  });
});

describe("natural", () => {
  it("soy wax low is natural", () => {
    expect(natural("soy_wax_low")).toBe(true);
  });
  it("paraffin wax medium not natural", () => {
    expect(natural("paraffin_wax_medium")).toBe(false);
  });
});

describe("crystalForming", () => {
  it("palm wax crystal is crystal forming", () => {
    expect(crystalForming("palm_wax_crystal")).toBe(true);
  });
  it("soy wax low not crystal forming", () => {
    expect(crystalForming("soy_wax_low")).toBe(false);
  });
});

describe("meltPoint", () => {
  it("coconut wax cool uses cool 100f pour", () => {
    expect(meltPoint("coconut_wax_cool")).toBe("cool_100f_pour");
  });
});

describe("bestUse", () => {
  it("soy wax low best for container candle pour", () => {
    expect(bestUse("soy_wax_low")).toBe("container_candle_pour");
  });
});

describe("pourTemps", () => {
  it("returns 5 types", () => {
    expect(pourTemps()).toHaveLength(5);
  });
});
