import { describe, it, expect } from "vitest";
import {
  cutPrecision, throughput, materialRange, setupTime,
  dcCost, contactFree, forThick, cutterConfig,
  bestUse, dieCutterTypes,
} from "../die-cutter-calc.js";

describe("cutPrecision", () => {
  it("laser die best cut precision", () => {
    expect(cutPrecision("laser_die")).toBeGreaterThan(cutPrecision("steel_rule"));
  });
});

describe("throughput", () => {
  it("rotary die highest throughput", () => {
    expect(throughput("rotary_die")).toBeGreaterThan(throughput("laser_die"));
  });
});

describe("materialRange", () => {
  it("steel rule widest material range", () => {
    expect(materialRange("steel_rule")).toBeGreaterThan(materialRange("rotary_die"));
  });
});

describe("setupTime", () => {
  it("laser die fastest setup time", () => {
    expect(setupTime("laser_die")).toBeGreaterThan(setupTime("rotary_die"));
  });
});

describe("dcCost", () => {
  it("laser die most expensive", () => {
    expect(dcCost("laser_die")).toBeGreaterThan(dcCost("steel_rule"));
  });
});

describe("contactFree", () => {
  it("laser die is contact free", () => {
    expect(contactFree("laser_die")).toBe(true);
  });
  it("flatbed platen not contact free", () => {
    expect(contactFree("flatbed_platen")).toBe(false);
  });
});

describe("forThick", () => {
  it("flatbed platen for thick material", () => {
    expect(forThick("flatbed_platen")).toBe(true);
  });
  it("rotary die not for thick", () => {
    expect(forThick("rotary_die")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("digital die uses plotter blade servo path short run no die", () => {
    expect(cutterConfig("digital_die")).toBe("digital_die_cutter_plotter_blade_servo_path_short_run_no_die");
  });
});

describe("bestUse", () => {
  it("steel rule for corrugated foam custom shape gasket box", () => {
    expect(bestUse("steel_rule")).toBe("corrugated_foam_steel_rule_die_cutter_custom_shape_gasket_box");
  });
});

describe("dieCutterTypes", () => {
  it("returns 5 types", () => {
    expect(dieCutterTypes()).toHaveLength(5);
  });
});
