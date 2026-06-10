import { describe, it, expect } from "vitest";
import {
  portionControl, convenience, eatingPace, cleanEase,
  feederCost, needsPower, dishwasherSafe, bowlMaterial,
  bestPet, petFeeders,
} from "../pet-feeder-calc.js";

describe("portionControl", () => {
  it("smart wifi camera best portion control", () => {
    expect(portionControl("smart_wifi_camera")).toBeGreaterThan(portionControl("gravity_hopper_basic"));
  });
});

describe("convenience", () => {
  it("smart wifi camera most convenient", () => {
    expect(convenience("smart_wifi_camera")).toBeGreaterThan(convenience("slow_feeder_puzzle"));
  });
});

describe("eatingPace", () => {
  it("slow feeder puzzle best eating pace control", () => {
    expect(eatingPace("slow_feeder_puzzle")).toBeGreaterThan(eatingPace("gravity_hopper_basic"));
  });
});

describe("cleanEase", () => {
  it("elevated stand raised easiest to clean", () => {
    expect(cleanEase("elevated_stand_raised")).toBeGreaterThan(cleanEase("smart_wifi_camera"));
  });
});

describe("feederCost", () => {
  it("smart wifi camera most expensive", () => {
    expect(feederCost("smart_wifi_camera")).toBeGreaterThan(feederCost("gravity_hopper_basic"));
  });
});

describe("needsPower", () => {
  it("automatic timer portion needs power", () => {
    expect(needsPower("automatic_timer_portion")).toBe(true);
  });
  it("gravity hopper basic does not", () => {
    expect(needsPower("gravity_hopper_basic")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("gravity hopper basic is dishwasher safe", () => {
    expect(dishwasherSafe("gravity_hopper_basic")).toBe(true);
  });
  it("smart wifi camera is not", () => {
    expect(dishwasherSafe("smart_wifi_camera")).toBe(false);
  });
});

describe("bowlMaterial", () => {
  it("elevated stand raised uses stainless steel bamboo", () => {
    expect(bowlMaterial("elevated_stand_raised")).toBe("stainless_steel_bamboo");
  });
});

describe("bestPet", () => {
  it("slow feeder puzzle best for fast eater overweight", () => {
    expect(bestPet("slow_feeder_puzzle")).toBe("fast_eater_overweight");
  });
});

describe("petFeeders", () => {
  it("returns 5 types", () => {
    expect(petFeeders()).toHaveLength(5);
  });
});
