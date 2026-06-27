import { describe, it, expect } from "vitest";
import {
  isolation, deflection, damping, loadCapacity,
  viCost, adjustable, forHeavyEquip, element,
  bestUse, vibrationIsolatorTypes,
} from "../vibration-isolator-calc.js";

describe("isolation", () => {
  it("air spring best isolation", () => {
    expect(isolation("air_spring_pneumatic")).toBeGreaterThan(isolation("rubber_pad_element"));
  });
});

describe("deflection", () => {
  it("air spring highest deflection", () => {
    expect(deflection("air_spring_pneumatic")).toBeGreaterThan(deflection("rubber_pad_element"));
  });
});

describe("damping", () => {
  it("wire rope best damping", () => {
    expect(damping("wire_rope_isolator")).toBeGreaterThan(damping("steel_spring_mount"));
  });
});

describe("loadCapacity", () => {
  it("inertia base highest load capacity", () => {
    expect(loadCapacity("inertia_base_block")).toBeGreaterThan(loadCapacity("wire_rope_isolator"));
  });
});

describe("viCost", () => {
  it("air spring most expensive", () => {
    expect(viCost("air_spring_pneumatic")).toBeGreaterThan(viCost("rubber_pad_element"));
  });
});

describe("adjustable", () => {
  it("steel spring is adjustable", () => {
    expect(adjustable("steel_spring_mount")).toBe(true);
  });
  it("rubber pad not adjustable", () => {
    expect(adjustable("rubber_pad_element")).toBe(false);
  });
});

describe("forHeavyEquip", () => {
  it("inertia base for heavy equipment", () => {
    expect(forHeavyEquip("inertia_base_block")).toBe(true);
  });
  it("rubber pad not for heavy equipment", () => {
    expect(forHeavyEquip("rubber_pad_element")).toBe(false);
  });
});

describe("element", () => {
  it("wire rope uses stainless helical cable", () => {
    expect(element("wire_rope_isolator")).toBe("stainless_wire_rope_helical_cable_mount");
  });
});

describe("bestUse", () => {
  it("air spring for precision instrument", () => {
    expect(bestUse("air_spring_pneumatic")).toBe("precision_instrument_cmm_electron_microscope");
  });
});

describe("vibrationIsolatorTypes", () => {
  it("returns 5 types", () => {
    expect(vibrationIsolatorTypes()).toHaveLength(5);
  });
});
