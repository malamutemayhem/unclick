import { describe, it, expect } from "vitest";
import {
  cutSpeed, cleanCut, safety, aestheticValue,
  openerCost, needsBattery, deskDisplay, bladeStyle,
  bestUse, letterOpeners,
} from "../letter-opener-calc.js";

describe("cutSpeed", () => {
  it("electric battery fastest cut", () => {
    expect(cutSpeed("electric_battery")).toBeGreaterThan(cutSpeed("plastic_safety"));
  });
});

describe("cleanCut", () => {
  it("envelope slitter wheel cleanest cut", () => {
    expect(cleanCut("envelope_slitter_wheel")).toBeGreaterThan(cleanCut("plastic_safety"));
  });
});

describe("safety", () => {
  it("plastic safety safest", () => {
    expect(safety("plastic_safety")).toBeGreaterThan(safety("classic_blade_metal"));
  });
});

describe("aestheticValue", () => {
  it("bone ivory replica most aesthetic", () => {
    expect(aestheticValue("bone_ivory_replica")).toBeGreaterThan(aestheticValue("plastic_safety"));
  });
});

describe("openerCost", () => {
  it("bone ivory replica most expensive", () => {
    expect(openerCost("bone_ivory_replica")).toBeGreaterThan(openerCost("plastic_safety"));
  });
});

describe("needsBattery", () => {
  it("electric battery needs battery", () => {
    expect(needsBattery("electric_battery")).toBe(true);
  });
  it("classic blade metal does not", () => {
    expect(needsBattery("classic_blade_metal")).toBe(false);
  });
});

describe("deskDisplay", () => {
  it("bone ivory replica is desk display", () => {
    expect(deskDisplay("bone_ivory_replica")).toBe(true);
  });
  it("plastic safety is not", () => {
    expect(deskDisplay("plastic_safety")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("envelope slitter wheel uses concealed wheel slit", () => {
    expect(bladeStyle("envelope_slitter_wheel")).toBe("concealed_wheel_slit");
  });
});

describe("bestUse", () => {
  it("plastic safety best for child safe classroom", () => {
    expect(bestUse("plastic_safety")).toBe("child_safe_classroom");
  });
});

describe("letterOpeners", () => {
  it("returns 5 types", () => {
    expect(letterOpeners()).toHaveLength(5);
  });
});
