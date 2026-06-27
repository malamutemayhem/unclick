import { describe, it, expect } from "vitest";
import {
  drapeConformity, throughput, wrinkleControl, shearAngle,
  fdCost_, automated, forDoubleContour, draperConfig,
  bestUse, fabricDraperTypes,
} from "../fabric-draper-calc.js";

describe("drapeConformity", () => {
  it("diaphragm form best drape conformity", () => {
    expect(drapeConformity("diaphragm_form")).toBeGreaterThan(drapeConformity("manual_hand_drape"));
  });
});

describe("throughput", () => {
  it("stamp drape highest throughput", () => {
    expect(throughput("stamp_drape")).toBeGreaterThan(throughput("manual_hand_drape"));
  });
});

describe("wrinkleControl", () => {
  it("diaphragm form best wrinkle control", () => {
    expect(wrinkleControl("diaphragm_form")).toBeGreaterThan(wrinkleControl("manual_hand_drape"));
  });
});

describe("shearAngle", () => {
  it("diaphragm form best shear angle", () => {
    expect(shearAngle("diaphragm_form")).toBeGreaterThan(shearAngle("stamp_drape"));
  });
});

describe("fdCost_", () => {
  it("robot end effector most expensive", () => {
    expect(fdCost_("robot_end_effector")).toBeGreaterThan(fdCost_("manual_hand_drape"));
  });
});

describe("automated", () => {
  it("diaphragm form is automated", () => {
    expect(automated("diaphragm_form")).toBe(true);
  });
  it("manual hand drape not automated", () => {
    expect(automated("manual_hand_drape")).toBe(false);
  });
});

describe("forDoubleContour", () => {
  it("diaphragm form for double contour", () => {
    expect(forDoubleContour("diaphragm_form")).toBe(true);
  });
  it("stamp drape not for double contour", () => {
    expect(forDoubleContour("stamp_drape")).toBe(false);
  });
});

describe("draperConfig", () => {
  it("sequential clamp uses gripper array staged pull order", () => {
    expect(draperConfig("sequential_clamp")).toBe("sequential_clamp_fabric_draper_gripper_array_staged_pull_order");
  });
});

describe("bestUse", () => {
  it("diaphragm form for deep cowl membrane vacuum conform", () => {
    expect(bestUse("diaphragm_form")).toBe("deep_cowl_diaphragm_form_fabric_draper_membrane_vacuum_conform");
  });
});

describe("fabricDraperTypes", () => {
  it("returns 5 types", () => {
    expect(fabricDraperTypes()).toHaveLength(5);
  });
});
