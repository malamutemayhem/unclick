import { describe, it, expect } from "vitest";
import {
  tonnage, speed, precision, flexibility,
  pbCost, cnc, forHeavy, drive,
  bestUse, pressBrakeTypes,
} from "../press-brake-calc.js";

describe("tonnage", () => {
  it("hydraulic and tandem highest tonnage", () => {
    expect(tonnage("hydraulic_sync_cnc")).toBeGreaterThan(tonnage("pneumatic_light_duty"));
  });
});

describe("speed", () => {
  it("mechanical flywheel fastest", () => {
    expect(speed("mechanical_flywheel")).toBeGreaterThan(speed("tandem_long_bed"));
  });
});

describe("precision", () => {
  it("servo electric most precise", () => {
    expect(precision("servo_electric_drive")).toBeGreaterThan(precision("mechanical_flywheel"));
  });
});

describe("flexibility", () => {
  it("hydraulic cnc most flexible", () => {
    expect(flexibility("hydraulic_sync_cnc")).toBeGreaterThan(flexibility("pneumatic_light_duty"));
  });
});

describe("pbCost", () => {
  it("tandem long bed most expensive", () => {
    expect(pbCost("tandem_long_bed")).toBeGreaterThan(pbCost("pneumatic_light_duty"));
  });
});

describe("cnc", () => {
  it("hydraulic sync has cnc", () => {
    expect(cnc("hydraulic_sync_cnc")).toBe(true);
  });
  it("mechanical flywheel no cnc", () => {
    expect(cnc("mechanical_flywheel")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("tandem for heavy work", () => {
    expect(forHeavy("tandem_long_bed")).toBe(true);
  });
  it("pneumatic not for heavy", () => {
    expect(forHeavy("pneumatic_light_duty")).toBe(false);
  });
});

describe("drive", () => {
  it("servo electric uses ball screw", () => {
    expect(drive("servo_electric_drive")).toBe("servo_motor_ball_screw_direct");
  });
});

describe("bestUse", () => {
  it("pneumatic for light gauge duct", () => {
    expect(bestUse("pneumatic_light_duty")).toBe("light_gauge_duct_flashing_simple");
  });
});

describe("pressBrakeTypes", () => {
  it("returns 5 types", () => {
    expect(pressBrakeTypes()).toHaveLength(5);
  });
});
