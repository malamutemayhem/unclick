import { describe, it, expect } from "vitest";
import {
  speed, uniformity, containerRange, energyEfficiency,
  rsCost, continuous, forFlexiblePouch, heating,
  bestUse, retortSterilizerTypes,
} from "../retort-sterilizer-calc.js";

describe("speed", () => {
  it("continuous hydrostatic fastest", () => {
    expect(speed("continuous_hydrostatic")).toBeGreaterThan(speed("static_steam"));
  });
});

describe("uniformity", () => {
  it("rotary water immersion best uniformity", () => {
    expect(uniformity("rotary_water_immersion")).toBeGreaterThan(uniformity("static_steam"));
  });
});

describe("containerRange", () => {
  it("steam air overpressure widest container range", () => {
    expect(containerRange("steam_air_overpressure")).toBeGreaterThan(containerRange("continuous_hydrostatic"));
  });
});

describe("energyEfficiency", () => {
  it("continuous hydrostatic most energy efficient", () => {
    expect(energyEfficiency("continuous_hydrostatic")).toBeGreaterThan(energyEfficiency("static_steam"));
  });
});

describe("rsCost", () => {
  it("continuous hydrostatic most expensive", () => {
    expect(rsCost("continuous_hydrostatic")).toBeGreaterThan(rsCost("static_steam"));
  });
});

describe("continuous", () => {
  it("continuous hydrostatic is continuous", () => {
    expect(continuous("continuous_hydrostatic")).toBe(true);
  });
  it("static steam not continuous", () => {
    expect(continuous("static_steam")).toBe(false);
  });
});

describe("forFlexiblePouch", () => {
  it("water spray for flexible pouch", () => {
    expect(forFlexiblePouch("water_spray")).toBe(true);
  });
  it("static steam not for flexible pouch", () => {
    expect(forFlexiblePouch("static_steam")).toBe(false);
  });
});

describe("heating", () => {
  it("static steam uses saturated steam batch", () => {
    expect(heating("static_steam")).toBe("saturated_steam_batch_static_baskets_venting_cooling");
  });
});

describe("bestUse", () => {
  it("continuous hydrostatic for high volume canned", () => {
    expect(bestUse("continuous_hydrostatic")).toBe("high_volume_canned_beverage_pet_food_24_7_continuous_line");
  });
});

describe("retortSterilizerTypes", () => {
  it("returns 5 types", () => {
    expect(retortSterilizerTypes()).toHaveLength(5);
  });
});
