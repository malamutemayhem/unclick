import { describe, it, expect } from "vitest";
import {
  precision, speed, clampForce, energy,
  imCost, allElectric, forMedical, drive,
  bestUse, injectionMoldTypeCalcTypes,
} from "../injection-mold-type-calc.js";

describe("precision", () => {
  it("electric servo most precise", () => {
    expect(precision("electric_servo_precision")).toBeGreaterThan(precision("hydraulic_toggle_clamp"));
  });
});

describe("speed", () => {
  it("micro mold fastest cycle", () => {
    expect(speed("micro_mold_sub_gram")).toBeGreaterThan(speed("two_shot_multi_material"));
  });
});

describe("clampForce", () => {
  it("hydraulic toggle highest clamp", () => {
    expect(clampForce("hydraulic_toggle_clamp")).toBeGreaterThan(clampForce("micro_mold_sub_gram"));
  });
});

describe("energy", () => {
  it("micro mold most energy efficient", () => {
    expect(energy("micro_mold_sub_gram")).toBeGreaterThan(energy("hydraulic_toggle_clamp"));
  });
});

describe("imCost", () => {
  it("two shot most expensive", () => {
    expect(imCost("two_shot_multi_material")).toBeGreaterThan(imCost("hydraulic_toggle_clamp"));
  });
});

describe("allElectric", () => {
  it("electric servo is all electric", () => {
    expect(allElectric("electric_servo_precision")).toBe(true);
  });
  it("hydraulic not all electric", () => {
    expect(allElectric("hydraulic_toggle_clamp")).toBe(false);
  });
});

describe("forMedical", () => {
  it("micro mold for medical", () => {
    expect(forMedical("micro_mold_sub_gram")).toBe(true);
  });
  it("hydraulic not for medical", () => {
    expect(forMedical("hydraulic_toggle_clamp")).toBe(false);
  });
});

describe("drive", () => {
  it("two shot uses rotary platen", () => {
    expect(drive("two_shot_multi_material")).toBe("rotary_platen_dual_injection");
  });
});

describe("bestUse", () => {
  it("electric servo for medical syringe", () => {
    expect(bestUse("electric_servo_precision")).toBe("medical_syringe_optical_lens");
  });
});

describe("injectionMoldTypeCalcTypes", () => {
  it("returns 5 types", () => {
    expect(injectionMoldTypeCalcTypes()).toHaveLength(5);
  });
});
