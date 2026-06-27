import { describe, it, expect } from "vitest";
import {
  coatingUniformity, throughput, coatingThickness, productRange,
  ecCost, continuous, forConfectionery, coaterConfig,
  bestUse, enroberCoaterTypes,
} from "../enrober-coater-calc.js";

describe("coatingUniformity", () => {
  it("sugar panning best coating uniformity", () => {
    expect(coatingUniformity("sugar_panning")).toBeGreaterThan(coatingUniformity("batter_breading"));
  });
});

describe("throughput", () => {
  it("batter breading highest throughput", () => {
    expect(throughput("batter_breading")).toBeGreaterThan(throughput("sugar_panning"));
  });
});

describe("coatingThickness", () => {
  it("sugar panning best coating thickness", () => {
    expect(coatingThickness("sugar_panning")).toBeGreaterThan(coatingThickness("spray_coating"));
  });
});

describe("productRange", () => {
  it("spray coating best product range", () => {
    expect(productRange("spray_coating")).toBeGreaterThan(productRange("sugar_panning"));
  });
});

describe("ecCost", () => {
  it("fluidized bed most expensive", () => {
    expect(ecCost("fluidized_bed_coat")).toBeGreaterThan(ecCost("sugar_panning"));
  });
});

describe("continuous", () => {
  it("chocolate enrober is continuous", () => {
    expect(continuous("chocolate_enrober")).toBe(true);
  });
  it("sugar panning not continuous", () => {
    expect(continuous("sugar_panning")).toBe(false);
  });
});

describe("forConfectionery", () => {
  it("chocolate enrober for confectionery", () => {
    expect(forConfectionery("chocolate_enrober")).toBe(true);
  });
  it("batter breading not for confectionery", () => {
    expect(forConfectionery("batter_breading")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("fluidized bed uses air suspend spray encapsulate dry in chamber", () => {
    expect(coaterConfig("fluidized_bed_coat")).toBe("fluidized_bed_coater_air_suspend_spray_encapsulate_dry_in_chamber");
  });
});

describe("bestUse", () => {
  it("sugar panning for dragee candy multi layer shell color polish", () => {
    expect(bestUse("sugar_panning")).toBe("dragee_candy_sugar_panning_coater_multi_layer_shell_color_polish");
  });
});

describe("enroberCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(enroberCoaterTypes()).toHaveLength(5);
  });
});
