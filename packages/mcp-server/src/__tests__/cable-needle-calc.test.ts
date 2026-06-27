import { describe, it, expect } from "vitest";
import {
  stitchHold, easeOfUse, slipResist, compactSize,
  cableCost, hasBend, flexible, needleShape,
  bestCable, cableNeedles,
} from "../cable-needle-calc.js";

describe("stitchHold", () => {
  it("u shaped deep best stitch hold", () => {
    expect(stitchHold("u_shaped_deep")).toBeGreaterThan(stitchHold("straight_dpn_mini"));
  });
});

describe("easeOfUse", () => {
  it("flexi cable soft easiest to use", () => {
    expect(easeOfUse("flexi_cable_soft")).toBeGreaterThan(easeOfUse("u_shaped_deep"));
  });
});

describe("slipResist", () => {
  it("u shaped deep most slip resistant", () => {
    expect(slipResist("u_shaped_deep")).toBeGreaterThan(slipResist("straight_dpn_mini"));
  });
});

describe("compactSize", () => {
  it("straight dpn mini most compact", () => {
    expect(compactSize("straight_dpn_mini")).toBeGreaterThan(compactSize("u_shaped_deep"));
  });
});

describe("cableCost", () => {
  it("u shaped deep more expensive than bent hook", () => {
    expect(cableCost("u_shaped_deep")).toBeGreaterThan(cableCost("bent_hook_standard"));
  });
});

describe("hasBend", () => {
  it("bent hook standard has bend", () => {
    expect(hasBend("bent_hook_standard")).toBe(true);
  });
  it("straight dpn mini has no bend", () => {
    expect(hasBend("straight_dpn_mini")).toBe(false);
  });
});

describe("flexible", () => {
  it("flexi cable soft is flexible", () => {
    expect(flexible("flexi_cable_soft")).toBe(true);
  });
  it("bent hook standard is not flexible", () => {
    expect(flexible("bent_hook_standard")).toBe(false);
  });
});

describe("needleShape", () => {
  it("claw grip hold uses notched claw tip", () => {
    expect(needleShape("claw_grip_hold")).toBe("notched_claw_tip");
  });
});

describe("bestCable", () => {
  it("u shaped deep best for complex cable many", () => {
    expect(bestCable("u_shaped_deep")).toBe("complex_cable_many");
  });
});

describe("cableNeedles", () => {
  it("returns 5 types", () => {
    expect(cableNeedles()).toHaveLength(5);
  });
});
