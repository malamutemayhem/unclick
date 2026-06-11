import { describe, it, expect } from "vitest";
import {
  liquorRatio, fabricSpeed, dyeUniformity, temperatureMax,
  jdCost, lowLiquor, forKnit, flowConfig,
  bestUse, jetDyeingTypes,
} from "../jet-dyeing-calc.js";

describe("liquorRatio", () => {
  it("air jet best liquor ratio", () => {
    expect(liquorRatio("air_jet")).toBeGreaterThan(liquorRatio("sample_mini_jet"));
  });
});

describe("fabricSpeed", () => {
  it("full flood rapid fastest fabric speed", () => {
    expect(fabricSpeed("full_flood_rapid")).toBeGreaterThan(fabricSpeed("sample_mini_jet"));
  });
});

describe("dyeUniformity", () => {
  it("high temp hthp best dye uniformity", () => {
    expect(dyeUniformity("high_temp_hthp")).toBeGreaterThan(dyeUniformity("sample_mini_jet"));
  });
});

describe("temperatureMax", () => {
  it("high temp hthp highest temperature", () => {
    expect(temperatureMax("high_temp_hthp")).toBeGreaterThan(temperatureMax("overflow_soft_flow"));
  });
});

describe("jdCost", () => {
  it("air jet most expensive", () => {
    expect(jdCost("air_jet")).toBeGreaterThan(jdCost("sample_mini_jet"));
  });
});

describe("lowLiquor", () => {
  it("air jet is low liquor", () => {
    expect(lowLiquor("air_jet")).toBe(true);
  });
  it("overflow soft flow not low liquor", () => {
    expect(lowLiquor("overflow_soft_flow")).toBe(false);
  });
});

describe("forKnit", () => {
  it("overflow soft flow for knit", () => {
    expect(forKnit("overflow_soft_flow")).toBe(true);
  });
  it("full flood rapid not for knit", () => {
    expect(forKnit("full_flood_rapid")).toBe(false);
  });
});

describe("flowConfig", () => {
  it("high temp hthp uses pressurized vessel", () => {
    expect(flowConfig("high_temp_hthp")).toBe("pressurized_vessel_140c_disperse_dye_polyester_high_temp_jet");
  });
});

describe("bestUse", () => {
  it("sample mini jet for lab color matching", () => {
    expect(bestUse("sample_mini_jet")).toBe("lab_sample_dyeing_color_matching_shade_development_small_batch");
  });
});

describe("jetDyeingTypes", () => {
  it("returns 5 types", () => {
    expect(jetDyeingTypes()).toHaveLength(5);
  });
});
