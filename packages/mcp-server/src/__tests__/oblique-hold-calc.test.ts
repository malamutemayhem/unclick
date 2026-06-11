import { describe, it, expect } from "vitest";
import {
  angleConsist, nibHold, comfortGrip, nibRange,
  holdCost, adjustable, ergonomic, flangeType,
  bestUse, obliqueHolds,
} from "../oblique-hold-calc.js";

describe("angleConsist", () => {
  it("bullock style fixed most consistent angle", () => {
    expect(angleConsist("bullock_style_fixed")).toBeGreaterThan(angleConsist("speedball_oblique_budget"));
  });
});

describe("nibHold", () => {
  it("bullock style fixed best nib hold", () => {
    expect(nibHold("bullock_style_fixed")).toBeGreaterThan(nibHold("speedball_oblique_budget"));
  });
});

describe("comfortGrip", () => {
  it("ergonomic grip comfort most comfortable", () => {
    expect(comfortGrip("ergonomic_grip_comfort")).toBeGreaterThan(comfortGrip("speedball_oblique_budget"));
  });
});

describe("nibRange", () => {
  it("adjustable flange universal widest nib range", () => {
    expect(nibRange("adjustable_flange_universal")).toBeGreaterThan(nibRange("bullock_style_fixed"));
  });
});

describe("holdCost", () => {
  it("bullock style fixed most expensive", () => {
    expect(holdCost("bullock_style_fixed")).toBeGreaterThan(holdCost("speedball_oblique_budget"));
  });
});

describe("adjustable", () => {
  it("adjustable flange universal is adjustable", () => {
    expect(adjustable("adjustable_flange_universal")).toBe(true);
  });
  it("brass flange standard not adjustable", () => {
    expect(adjustable("brass_flange_standard")).toBe(false);
  });
});

describe("ergonomic", () => {
  it("ergonomic grip comfort is ergonomic", () => {
    expect(ergonomic("ergonomic_grip_comfort")).toBe(true);
  });
  it("brass flange standard not ergonomic", () => {
    expect(ergonomic("brass_flange_standard")).toBe(false);
  });
});

describe("flangeType", () => {
  it("adjustable flange universal uses universal adjust flange", () => {
    expect(flangeType("adjustable_flange_universal")).toBe("universal_adjust_flange");
  });
});

describe("bestUse", () => {
  it("brass flange standard best for copperplate script write", () => {
    expect(bestUse("brass_flange_standard")).toBe("copperplate_script_write");
  });
});

describe("obliqueHolds", () => {
  it("returns 5 types", () => {
    expect(obliqueHolds()).toHaveLength(5);
  });
});
