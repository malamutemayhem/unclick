import { describe, it, expect } from "vitest";
import {
  speed, repeatability, sheetCapability, automation,
  rwCost, continuous, forSheet, electrode,
  bestUse, resistanceWeldTypes,
} from "../resistance-weld-calc.js";

describe("speed", () => {
  it("spot weld fastest", () => {
    expect(speed("spot_weld_sheet")).toBeGreaterThan(speed("flash_butt_rail"));
  });
});

describe("repeatability", () => {
  it("projection weld most repeatable", () => {
    expect(repeatability("projection_weld_nut")).toBeGreaterThan(repeatability("flash_butt_rail"));
  });
});

describe("sheetCapability", () => {
  it("spot weld best for sheet", () => {
    expect(sheetCapability("spot_weld_sheet")).toBeGreaterThan(sheetCapability("flash_butt_rail"));
  });
});

describe("automation", () => {
  it("spot and projection highly automated", () => {
    expect(automation("spot_weld_sheet")).toBeGreaterThan(automation("flash_butt_rail"));
  });
});

describe("rwCost", () => {
  it("flash butt most expensive", () => {
    expect(rwCost("flash_butt_rail")).toBeGreaterThan(rwCost("projection_weld_nut"));
  });
});

describe("continuous", () => {
  it("seam weld is continuous", () => {
    expect(continuous("seam_weld_continuous")).toBe(true);
  });
  it("spot weld not continuous", () => {
    expect(continuous("spot_weld_sheet")).toBe(false);
  });
});

describe("forSheet", () => {
  it("spot weld for sheet", () => {
    expect(forSheet("spot_weld_sheet")).toBe(true);
  });
  it("flash butt not for sheet", () => {
    expect(forSheet("flash_butt_rail")).toBe(false);
  });
});

describe("electrode", () => {
  it("seam weld uses copper wheel roller", () => {
    expect(electrode("seam_weld_continuous")).toBe("copper_wheel_roller_rotating");
  });
});

describe("bestUse", () => {
  it("spot weld for auto body", () => {
    expect(bestUse("spot_weld_sheet")).toBe("auto_body_sheet_metal_overlap");
  });
});

describe("resistanceWeldTypes", () => {
  it("returns 5 types", () => {
    expect(resistanceWeldTypes()).toHaveLength(5);
  });
});
