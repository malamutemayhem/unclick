import { describe, it, expect } from "vitest";
import {
  launchSpeed, capacity, reliability, seaStateRating,
  ldCost, freefall, forLargeVessel, mechanism,
  bestUse, lifeboatDavitTypes,
} from "../lifeboat-davit-calc.js";

describe("launchSpeed", () => {
  it("freefall skid fastest launch", () => {
    expect(launchSpeed("freefall_skid")).toBeGreaterThan(launchSpeed("single_arm_slewing"));
  });
});

describe("capacity", () => {
  it("gravity pivot highest capacity", () => {
    expect(capacity("gravity_pivot")).toBeGreaterThan(capacity("single_arm_slewing"));
  });
});

describe("reliability", () => {
  it("gravity pivot most reliable", () => {
    expect(reliability("gravity_pivot")).toBeGreaterThan(reliability("davit_launched_raft"));
  });
});

describe("seaStateRating", () => {
  it("freefall skid best sea state rating", () => {
    expect(seaStateRating("freefall_skid")).toBeGreaterThan(seaStateRating("davit_launched_raft"));
  });
});

describe("ldCost", () => {
  it("freefall skid most expensive", () => {
    expect(ldCost("freefall_skid")).toBeGreaterThan(ldCost("davit_launched_raft"));
  });
});

describe("freefall", () => {
  it("freefall skid is freefall", () => {
    expect(freefall("freefall_skid")).toBe(true);
  });
  it("gravity pivot not freefall", () => {
    expect(freefall("gravity_pivot")).toBe(false);
  });
});

describe("forLargeVessel", () => {
  it("gravity pivot for large vessel", () => {
    expect(forLargeVessel("gravity_pivot")).toBe(true);
  });
  it("davit launched raft not for large vessel", () => {
    expect(forLargeVessel("davit_launched_raft")).toBe(false);
  });
});

describe("mechanism", () => {
  it("telescopic uses hydraulic extend retract", () => {
    expect(mechanism("telescopic")).toBe("telescopic_arm_hydraulic_extend_retract_compact_stow");
  });
});

describe("bestUse", () => {
  it("single arm slewing for rescue boat", () => {
    expect(bestUse("single_arm_slewing")).toBe("rescue_boat_davit_man_overboard_recovery_patrol_vessel");
  });
});

describe("lifeboatDavitTypes", () => {
  it("returns 5 types", () => {
    expect(lifeboatDavitTypes()).toHaveLength(5);
  });
});
