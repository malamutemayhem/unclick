import { describe, it, expect } from "vitest";
import {
  cureSpeed, cureUniformity, partComplexity, throughput,
  vCost, continuous, forSheet, cureConfig,
  bestUse, vulcanizerTypes,
} from "../vulcanizer-calc.js";

describe("cureSpeed", () => {
  it("continuous rotocure fastest cure speed", () => {
    expect(cureSpeed("continuous_rotocure")).toBeGreaterThan(cureSpeed("hot_air_oven"));
  });
});

describe("cureUniformity", () => {
  it("autoclave steam best cure uniformity", () => {
    expect(cureUniformity("autoclave_steam")).toBeGreaterThan(cureUniformity("hot_air_oven"));
  });
});

describe("partComplexity", () => {
  it("injection mold best part complexity", () => {
    expect(partComplexity("injection_mold")).toBeGreaterThan(partComplexity("continuous_rotocure"));
  });
});

describe("throughput", () => {
  it("continuous rotocure highest throughput", () => {
    expect(throughput("continuous_rotocure")).toBeGreaterThan(throughput("hot_air_oven"));
  });
});

describe("vCost", () => {
  it("injection mold most expensive", () => {
    expect(vCost("injection_mold")).toBeGreaterThan(vCost("hot_air_oven"));
  });
});

describe("continuous", () => {
  it("continuous rotocure is continuous", () => {
    expect(continuous("continuous_rotocure")).toBe(true);
  });
  it("compression press not continuous", () => {
    expect(continuous("compression_press")).toBe(false);
  });
});

describe("forSheet", () => {
  it("autoclave steam for sheet", () => {
    expect(forSheet("autoclave_steam")).toBe(true);
  });
  it("compression press not for sheet", () => {
    expect(forSheet("compression_press")).toBe(false);
  });
});

describe("cureConfig", () => {
  it("hot air oven uses batch cure extrusion profile", () => {
    expect(cureConfig("hot_air_oven")).toBe("hot_air_oven_batch_cure_extrusion_profile_sponge_rubber_strip");
  });
});

describe("bestUse", () => {
  it("continuous rotocure for rubber sheet belt flooring", () => {
    expect(bestUse("continuous_rotocure")).toBe("continuous_rubber_sheet_belt_flooring_rotocure_drum_high_speed");
  });
});

describe("vulcanizerTypes", () => {
  it("returns 5 types", () => {
    expect(vulcanizerTypes()).toHaveLength(5);
  });
});
