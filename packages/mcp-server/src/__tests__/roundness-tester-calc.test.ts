import { describe, it, expect } from "vitest";
import {
  formAccuracy, spinSpeed, partSizeRange, surfaceFinishCapable,
  rtCost, automated, forBearing, rotationMethod,
  bestUse, roundnessTesterTypes,
} from "../roundness-tester-calc.js";

describe("formAccuracy", () => {
  it("multi axis and air bearing best form accuracy", () => {
    expect(formAccuracy("multi_axis_form")).toBeGreaterThan(formAccuracy("portable_vee_block"));
    expect(formAccuracy("air_bearing_ultra")).toBeGreaterThan(formAccuracy("portable_vee_block"));
  });
});

describe("spinSpeed", () => {
  it("air bearing ultra fastest spin", () => {
    expect(spinSpeed("air_bearing_ultra")).toBeGreaterThan(spinSpeed("portable_vee_block"));
  });
});

describe("partSizeRange", () => {
  it("multi axis form widest part range", () => {
    expect(partSizeRange("multi_axis_form")).toBeGreaterThan(partSizeRange("air_bearing_ultra"));
  });
});

describe("surfaceFinishCapable", () => {
  it("air bearing ultra best surface finish capable", () => {
    expect(surfaceFinishCapable("air_bearing_ultra")).toBeGreaterThan(surfaceFinishCapable("portable_vee_block"));
  });
});

describe("rtCost", () => {
  it("multi axis form most expensive", () => {
    expect(rtCost("multi_axis_form")).toBeGreaterThan(rtCost("portable_vee_block"));
  });
});

describe("automated", () => {
  it("rotating spindle is automated", () => {
    expect(automated("rotating_spindle")).toBe(true);
  });
  it("portable vee block not automated", () => {
    expect(automated("portable_vee_block")).toBe(false);
  });
});

describe("forBearing", () => {
  it("rotating spindle for bearing measurement", () => {
    expect(forBearing("rotating_spindle")).toBe(true);
  });
  it("portable vee block not for bearing", () => {
    expect(forBearing("portable_vee_block")).toBe(false);
  });
});

describe("rotationMethod", () => {
  it("air bearing uses sub nanometer error motion", () => {
    expect(rotationMethod("air_bearing_ultra")).toBe("air_bearing_spindle_sub_nanometer_error_motion_reference");
  });
});

describe("bestUse", () => {
  it("portable vee block for quick shop floor check", () => {
    expect(bestUse("portable_vee_block")).toBe("quick_shop_floor_check_shaft_runout_go_no_go_screening");
  });
});

describe("roundnessTesterTypes", () => {
  it("returns 5 types", () => {
    expect(roundnessTesterTypes()).toHaveLength(5);
  });
});
