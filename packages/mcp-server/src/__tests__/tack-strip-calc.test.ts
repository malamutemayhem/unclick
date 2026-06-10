import { describe, it, expect } from "vitest";
import {
  holdStrength, installSpeed, surfaceRange, concealAbility,
  stripCost, forConcrete, flexible, pinType,
  bestUse, tackStrips,
} from "../tack-strip-calc.js";

describe("holdStrength", () => {
  it("metal gripper tooth strongest hold", () => {
    expect(holdStrength("metal_gripper_tooth")).toBeGreaterThan(holdStrength("curved_stair_flex"));
  });
});

describe("installSpeed", () => {
  it("pre nailed anchor fastest install", () => {
    expect(installSpeed("pre_nailed_anchor")).toBeGreaterThan(installSpeed("curved_stair_flex"));
  });
});

describe("surfaceRange", () => {
  it("concrete adhesive bond widest surface range", () => {
    expect(surfaceRange("concrete_adhesive_bond")).toBeGreaterThan(surfaceRange("pre_nailed_anchor"));
  });
});

describe("concealAbility", () => {
  it("curved stair flex best conceal", () => {
    expect(concealAbility("curved_stair_flex")).toBeGreaterThan(concealAbility("metal_gripper_tooth"));
  });
});

describe("stripCost", () => {
  it("curved stair flex most expensive", () => {
    expect(stripCost("curved_stair_flex")).toBeGreaterThan(stripCost("wood_standard_nail"));
  });
});

describe("forConcrete", () => {
  it("concrete adhesive bond is for concrete", () => {
    expect(forConcrete("concrete_adhesive_bond")).toBe(true);
  });
  it("wood standard nail not for concrete", () => {
    expect(forConcrete("wood_standard_nail")).toBe(false);
  });
});

describe("flexible", () => {
  it("curved stair flex is flexible", () => {
    expect(flexible("curved_stair_flex")).toBe(true);
  });
  it("wood standard nail not flexible", () => {
    expect(flexible("wood_standard_nail")).toBe(false);
  });
});

describe("pinType", () => {
  it("metal gripper tooth uses hardened tooth strip", () => {
    expect(pinType("metal_gripper_tooth")).toBe("hardened_tooth_strip");
  });
});

describe("bestUse", () => {
  it("curved stair flex best for stair nose curve", () => {
    expect(bestUse("curved_stair_flex")).toBe("stair_nose_curve");
  });
});

describe("tackStrips", () => {
  it("returns 5 types", () => {
    expect(tackStrips()).toHaveLength(5);
  });
});
