import { describe, it, expect } from "vitest";
import {
  pullForce, lineSpeed, controlPrecision, dutyRating,
  weCost, selfLocking, forMarine, mechanism,
  bestUse, winchElectricTypes,
} from "../winch-electric-calc.js";

describe("pullForce", () => {
  it("hydraulic power heavy highest pull force", () => {
    expect(pullForce("hydraulic_power_heavy")).toBeGreaterThan(pullForce("capstan_vertical_drum"));
  });
});

describe("lineSpeed", () => {
  it("traction elevator fastest line speed", () => {
    expect(lineSpeed("traction_elevator_rope")).toBeGreaterThan(lineSpeed("worm_gear_self_lock"));
  });
});

describe("controlPrecision", () => {
  it("traction elevator best control precision", () => {
    expect(controlPrecision("traction_elevator_rope")).toBeGreaterThan(controlPrecision("capstan_vertical_drum"));
  });
});

describe("dutyRating", () => {
  it("hydraulic power heavy highest duty rating", () => {
    expect(dutyRating("hydraulic_power_heavy")).toBeGreaterThan(dutyRating("capstan_vertical_drum"));
  });
});

describe("weCost", () => {
  it("hydraulic power heavy most expensive", () => {
    expect(weCost("hydraulic_power_heavy")).toBeGreaterThan(weCost("capstan_vertical_drum"));
  });
});

describe("selfLocking", () => {
  it("worm gear is self locking", () => {
    expect(selfLocking("worm_gear_self_lock")).toBe(true);
  });
  it("planetary gear not self locking", () => {
    expect(selfLocking("planetary_gear_compact")).toBe(false);
  });
});

describe("forMarine", () => {
  it("capstan for marine", () => {
    expect(forMarine("capstan_vertical_drum")).toBe(true);
  });
  it("worm gear not for marine", () => {
    expect(forMarine("worm_gear_self_lock")).toBe(false);
  });
});

describe("mechanism", () => {
  it("traction elevator uses sheave counterweight", () => {
    expect(mechanism("traction_elevator_rope")).toBe("traction_sheave_counterweight_vfd_gearless_motor");
  });
});

describe("bestUse", () => {
  it("hydraulic for offshore anchor handling", () => {
    expect(bestUse("hydraulic_power_heavy")).toBe("offshore_anchor_handling_towing_heavy_marine");
  });
});

describe("winchElectricTypes", () => {
  it("returns 5 types", () => {
    expect(winchElectricTypes()).toHaveLength(5);
  });
});
