import { describe, it, expect } from "vitest";
import {
  breakForce, controlFine, comfortGrip, glassRange,
  plierCost, adjustable, forSmallCut, jawType,
  bestUse, runningPliers,
} from "../running-plier-calc.js";

describe("breakForce", () => {
  it("wide jaw thick most break force", () => {
    expect(breakForce("wide_jaw_thick")).toBeGreaterThan(breakForce("mini_6_inch_small"));
  });
});

describe("controlFine", () => {
  it("mini 6 inch small finest control", () => {
    expect(controlFine("mini_6_inch_small")).toBeGreaterThan(controlFine("wide_jaw_thick"));
  });
});

describe("comfortGrip", () => {
  it("pistol grip ergo most comfortable", () => {
    expect(comfortGrip("pistol_grip_ergo")).toBeGreaterThan(comfortGrip("mini_6_inch_small"));
  });
});

describe("glassRange", () => {
  it("wide jaw thick widest glass range", () => {
    expect(glassRange("wide_jaw_thick")).toBeGreaterThan(glassRange("mini_6_inch_small"));
  });
});

describe("plierCost", () => {
  it("adjustable screw set most expensive", () => {
    expect(plierCost("adjustable_screw_set")).toBeGreaterThan(plierCost("standard_8_inch"));
  });
});

describe("adjustable", () => {
  it("adjustable screw set is adjustable", () => {
    expect(adjustable("adjustable_screw_set")).toBe(true);
  });
  it("standard 8 inch not adjustable", () => {
    expect(adjustable("standard_8_inch")).toBe(false);
  });
});

describe("forSmallCut", () => {
  it("mini 6 inch small is for small cut", () => {
    expect(forSmallCut("mini_6_inch_small")).toBe(true);
  });
  it("standard 8 inch not for small cut", () => {
    expect(forSmallCut("standard_8_inch")).toBe(false);
  });
});

describe("jawType", () => {
  it("standard 8 inch uses curved jaw nylon", () => {
    expect(jawType("standard_8_inch")).toBe("curved_jaw_nylon");
  });
});

describe("bestUse", () => {
  it("wide jaw thick best for thick glass break", () => {
    expect(bestUse("wide_jaw_thick")).toBe("thick_glass_break");
  });
});

describe("runningPliers", () => {
  it("returns 5 types", () => {
    expect(runningPliers()).toHaveLength(5);
  });
});
