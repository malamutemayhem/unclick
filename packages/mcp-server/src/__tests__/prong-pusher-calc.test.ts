import { describe, it, expect } from "vitest";
import {
  pushForce, controlAccuracy, scratchSafe, versatility,
  pusherCost, stoneProtect, forMicroSet, tipProfile,
  bestUse, prongPushers,
} from "../prong-pusher-calc.js";

describe("pushForce", () => {
  it("bezel rocker curve strongest push", () => {
    expect(pushForce("bezel_rocker_curve")).toBeGreaterThan(pushForce("micro_push_fine"));
  });
});

describe("controlAccuracy", () => {
  it("notch tip prong most accurate control", () => {
    expect(controlAccuracy("notch_tip_prong")).toBeGreaterThan(controlAccuracy("flat_blade_wide"));
  });
});

describe("scratchSafe", () => {
  it("cup tip round most scratch safe", () => {
    expect(scratchSafe("cup_tip_round")).toBeGreaterThan(scratchSafe("flat_blade_wide"));
  });
});

describe("versatility", () => {
  it("flat blade wide most versatile", () => {
    expect(versatility("flat_blade_wide")).toBeGreaterThan(versatility("notch_tip_prong"));
  });
});

describe("pusherCost", () => {
  it("micro push fine most expensive", () => {
    expect(pusherCost("micro_push_fine")).toBeGreaterThan(pusherCost("flat_blade_wide"));
  });
});

describe("stoneProtect", () => {
  it("cup tip round protects stone", () => {
    expect(stoneProtect("cup_tip_round")).toBe(true);
  });
  it("flat blade wide no stone protect", () => {
    expect(stoneProtect("flat_blade_wide")).toBe(false);
  });
});

describe("forMicroSet", () => {
  it("micro push fine is for micro set", () => {
    expect(forMicroSet("micro_push_fine")).toBe(true);
  });
  it("cup tip round not for micro set", () => {
    expect(forMicroSet("cup_tip_round")).toBe(false);
  });
});

describe("tipProfile", () => {
  it("cup tip round uses concave cup brass", () => {
    expect(tipProfile("cup_tip_round")).toBe("concave_cup_brass");
  });
});

describe("bestUse", () => {
  it("notch tip prong best for individual prong set", () => {
    expect(bestUse("notch_tip_prong")).toBe("individual_prong_set");
  });
});

describe("prongPushers", () => {
  it("returns 5 types", () => {
    expect(prongPushers()).toHaveLength(5);
  });
});
