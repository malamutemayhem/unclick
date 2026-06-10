import { describe, it, expect } from "vitest";
import {
  cleaningPower, gumGentle, easeOfUse, travelFriendly,
  brushCost, needsPower, ecoFriendly, bristleType,
  bestUser, toothbrushes,
} from "../toothbrush-calc.js";

describe("cleaningPower", () => {
  it("oscillating round head best cleaning power", () => {
    expect(cleaningPower("oscillating_round_head")).toBeGreaterThan(cleaningPower("manual_soft_bristle"));
  });
});

describe("gumGentle", () => {
  it("manual soft bristle gentlest on gums", () => {
    expect(gumGentle("manual_soft_bristle")).toBeGreaterThan(gumGentle("oscillating_round_head"));
  });
});

describe("easeOfUse", () => {
  it("manual soft bristle easiest to use", () => {
    expect(easeOfUse("manual_soft_bristle")).toBeGreaterThan(easeOfUse("water_flosser_combo"));
  });
});

describe("travelFriendly", () => {
  it("manual soft bristle most travel friendly", () => {
    expect(travelFriendly("manual_soft_bristle")).toBeGreaterThan(travelFriendly("water_flosser_combo"));
  });
});

describe("brushCost", () => {
  it("water flosser combo most expensive", () => {
    expect(brushCost("water_flosser_combo")).toBeGreaterThan(brushCost("manual_soft_bristle"));
  });
});

describe("needsPower", () => {
  it("sonic vibration needs power", () => {
    expect(needsPower("sonic_vibration")).toBe(true);
  });
  it("manual soft bristle does not", () => {
    expect(needsPower("manual_soft_bristle")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("bamboo eco friendly is eco friendly", () => {
    expect(ecoFriendly("bamboo_eco_friendly")).toBe(true);
  });
  it("sonic vibration is not", () => {
    expect(ecoFriendly("sonic_vibration")).toBe(false);
  });
});

describe("bristleType", () => {
  it("bamboo eco friendly uses charcoal infused plant", () => {
    expect(bristleType("bamboo_eco_friendly")).toBe("charcoal_infused_plant");
  });
});

describe("bestUser", () => {
  it("oscillating round head best for deep clean thorough user", () => {
    expect(bestUser("oscillating_round_head")).toBe("deep_clean_thorough_user");
  });
});

describe("toothbrushes", () => {
  it("returns 5 types", () => {
    expect(toothbrushes()).toHaveLength(5);
  });
});
