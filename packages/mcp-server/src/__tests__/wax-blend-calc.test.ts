import { describe, it, expect } from "vitest";
import {
  throwHot, burnEven, surfaceSmooth, blendStable,
  blendCost, allNatural, ecoCert, baseRatio,
  bestUse, waxBlends,
} from "../wax-blend-calc.js";

describe("throwHot", () => {
  it("paraffin soy mix strongest hot throw", () => {
    expect(throwHot("paraffin_soy_mix")).toBeGreaterThan(throwHot("beeswax_coconut_natural"));
  });
});

describe("burnEven", () => {
  it("beeswax coconut natural most even burn", () => {
    expect(burnEven("beeswax_coconut_natural")).toBeGreaterThan(burnEven("palm_paraffin_crystal"));
  });
});

describe("surfaceSmooth", () => {
  it("soy coconut blend smoothest surface", () => {
    expect(surfaceSmooth("soy_coconut_blend")).toBeGreaterThan(surfaceSmooth("palm_paraffin_crystal"));
  });
});

describe("blendStable", () => {
  it("paraffin soy mix most stable blend", () => {
    expect(blendStable("paraffin_soy_mix")).toBeGreaterThan(blendStable("rapeseed_soy_eco"));
  });
});

describe("blendCost", () => {
  it("beeswax coconut natural most expensive", () => {
    expect(blendCost("beeswax_coconut_natural")).toBeGreaterThan(blendCost("paraffin_soy_mix"));
  });
});

describe("allNatural", () => {
  it("soy coconut blend is all natural", () => {
    expect(allNatural("soy_coconut_blend")).toBe(true);
  });
  it("paraffin soy mix not all natural", () => {
    expect(allNatural("paraffin_soy_mix")).toBe(false);
  });
});

describe("ecoCert", () => {
  it("rapeseed soy eco is eco cert", () => {
    expect(ecoCert("rapeseed_soy_eco")).toBe(true);
  });
  it("soy coconut blend not eco cert", () => {
    expect(ecoCert("soy_coconut_blend")).toBe(false);
  });
});

describe("baseRatio", () => {
  it("paraffin soy mix uses seventy para thirty soy", () => {
    expect(baseRatio("paraffin_soy_mix")).toBe("seventy_para_thirty_soy");
  });
});

describe("bestUse", () => {
  it("soy coconut blend best for luxury container candle", () => {
    expect(bestUse("soy_coconut_blend")).toBe("luxury_container_candle");
  });
});

describe("waxBlends", () => {
  it("returns 5 types", () => {
    expect(waxBlends()).toHaveLength(5);
  });
});
