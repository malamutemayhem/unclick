import { describe, it, expect } from "vitest";
import {
  pullControl, comfort, easeOfUse, neckPressure,
  harnessCost, reflective, crashTested, strapDesign,
  bestDog, petHarnesses,
} from "../pet-harness-calc.js";

describe("pullControl", () => {
  it("front clip no pull best pull control", () => {
    expect(pullControl("front_clip_no_pull")).toBeGreaterThan(pullControl("back_clip_sport"));
  });
});

describe("comfort", () => {
  it("step in vest basic most comfortable", () => {
    expect(comfort("step_in_vest_basic")).toBeGreaterThan(comfort("car_safety_seatbelt"));
  });
});

describe("easeOfUse", () => {
  it("step in vest basic easiest to use", () => {
    expect(easeOfUse("step_in_vest_basic")).toBeGreaterThan(easeOfUse("dual_clip_training"));
  });
});

describe("neckPressure", () => {
  it("step in vest basic least neck pressure", () => {
    expect(neckPressure("step_in_vest_basic")).toBeGreaterThan(neckPressure("dual_clip_training"));
  });
});

describe("harnessCost", () => {
  it("dual clip training most expensive", () => {
    expect(harnessCost("dual_clip_training")).toBeGreaterThan(harnessCost("step_in_vest_basic"));
  });
});

describe("reflective", () => {
  it("all types are reflective", () => {
    expect(reflective("step_in_vest_basic")).toBe(true);
    expect(reflective("car_safety_seatbelt")).toBe(true);
  });
});

describe("crashTested", () => {
  it("car safety seatbelt is crash tested", () => {
    expect(crashTested("car_safety_seatbelt")).toBe(true);
  });
  it("front clip no pull is not", () => {
    expect(crashTested("front_clip_no_pull")).toBe(false);
  });
});

describe("strapDesign", () => {
  it("front clip no pull uses chest strap front ring", () => {
    expect(strapDesign("front_clip_no_pull")).toBe("chest_strap_front_ring");
  });
});

describe("bestDog", () => {
  it("car safety seatbelt best for car travel road trip", () => {
    expect(bestDog("car_safety_seatbelt")).toBe("car_travel_road_trip");
  });
});

describe("petHarnesses", () => {
  it("returns 5 types", () => {
    expect(petHarnesses()).toHaveLength(5);
  });
});
