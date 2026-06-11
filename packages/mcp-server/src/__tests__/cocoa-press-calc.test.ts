import { describe, it, expect } from "vitest";
import {
  fatExtraction, cakeQuality, throughput, butterPurity,
  cpCost, continuous, forPremium, pressConfig,
  bestUse, cocoaPressTypes,
} from "../cocoa-press-calc.js";

describe("fatExtraction", () => {
  it("supercritical co2 best fat extraction", () => {
    expect(fatExtraction("supercritical_co2")).toBeGreaterThan(fatExtraction("cold_press"));
  });
});

describe("cakeQuality", () => {
  it("cold press best cake quality", () => {
    expect(cakeQuality("cold_press")).toBeGreaterThan(cakeQuality("screw_expeller"));
  });
});

describe("throughput", () => {
  it("screw expeller highest throughput", () => {
    expect(throughput("screw_expeller")).toBeGreaterThan(throughput("cold_press"));
  });
});

describe("butterPurity", () => {
  it("supercritical co2 best butter purity", () => {
    expect(butterPurity("supercritical_co2")).toBeGreaterThan(butterPurity("screw_expeller"));
  });
});

describe("cpCost", () => {
  it("supercritical co2 most expensive", () => {
    expect(cpCost("supercritical_co2")).toBeGreaterThan(cpCost("screw_expeller"));
  });
});

describe("continuous", () => {
  it("horizontal cage is continuous", () => {
    expect(continuous("horizontal_cage")).toBe(true);
  });
  it("cold press not continuous", () => {
    expect(continuous("cold_press")).toBe(false);
  });
});

describe("forPremium", () => {
  it("cold press for premium", () => {
    expect(forPremium("cold_press")).toBe(true);
  });
  it("screw expeller not for premium", () => {
    expect(forPremium("screw_expeller")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("supercritical co2 uses high pressure carbon dioxide", () => {
    expect(pressConfig("supercritical_co2")).toBe("supercritical_co2_cocoa_extract_high_pressure_carbon_dioxide_pure");
  });
});

describe("bestUse", () => {
  it("cold press for premium raw cocoa", () => {
    expect(bestUse("cold_press")).toBe("premium_raw_cocoa_cold_press_low_temp_preserve_flavor_nutrient");
  });
});

describe("cocoaPressTypes", () => {
  it("returns 5 types", () => {
    expect(cocoaPressTypes()).toHaveLength(5);
  });
});
