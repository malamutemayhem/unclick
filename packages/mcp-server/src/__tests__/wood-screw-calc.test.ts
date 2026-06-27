import { describe, it, expect } from "vitest";
import {
  holdingPower, driveEase, corrosionResist, flushFinish,
  screwCost, preDrillRequired, selfTapping, driveStyle,
  bestProject, woodScrews,
} from "../wood-screw-calc.js";

describe("holdingPower", () => {
  it("lag screw hex strongest hold", () => {
    expect(holdingPower("lag_screw_hex")).toBeGreaterThan(holdingPower("round_head_pan"));
  });
});

describe("driveEase", () => {
  it("deck screw coated easiest to drive", () => {
    expect(driveEase("deck_screw_coated")).toBeGreaterThan(driveEase("lag_screw_hex"));
  });
});

describe("corrosionResist", () => {
  it("deck screw coated best corrosion resistance", () => {
    expect(corrosionResist("deck_screw_coated")).toBeGreaterThan(corrosionResist("flat_head_countersink"));
  });
});

describe("flushFinish", () => {
  it("flat head countersink best flush finish", () => {
    expect(flushFinish("flat_head_countersink")).toBeGreaterThan(flushFinish("lag_screw_hex"));
  });
});

describe("screwCost", () => {
  it("lag screw hex most expensive", () => {
    expect(screwCost("lag_screw_hex")).toBeGreaterThan(screwCost("flat_head_countersink"));
  });
});

describe("preDrillRequired", () => {
  it("flat head countersink needs pre drill", () => {
    expect(preDrillRequired("flat_head_countersink")).toBe(true);
  });
  it("deck screw coated does not", () => {
    expect(preDrillRequired("deck_screw_coated")).toBe(false);
  });
});

describe("selfTapping", () => {
  it("deck screw coated is self tapping", () => {
    expect(selfTapping("deck_screw_coated")).toBe(true);
  });
  it("flat head countersink is not", () => {
    expect(selfTapping("flat_head_countersink")).toBe(false);
  });
});

describe("driveStyle", () => {
  it("deck screw coated uses star torx drive", () => {
    expect(driveStyle("deck_screw_coated")).toBe("star_torx_drive");
  });
});

describe("bestProject", () => {
  it("pocket hole washer best for hidden joint frame", () => {
    expect(bestProject("pocket_hole_washer")).toBe("hidden_joint_frame");
  });
});

describe("woodScrews", () => {
  it("returns 5 types", () => {
    expect(woodScrews()).toHaveLength(5);
  });
});
