import { describe, it, expect } from "vitest";
import {
  effectiveness, frequency, weight, reworkability,
  shCost, conformal, forRf, material,
  bestUse, shieldings,
} from "../shielding-calc.js";

describe("effectiveness", () => {
  it("stamped metal can most effective", () => {
    expect(effectiveness("stamped_metal_can")).toBeGreaterThan(effectiveness("conductive_paint_spray"));
  });
});

describe("frequency", () => {
  it("board level fence best high freq", () => {
    expect(frequency("board_level_fence")).toBeGreaterThan(frequency("multilayer_fabric_wrap"));
  });
});

describe("weight", () => {
  it("multilayer fabric lightest", () => {
    expect(weight("multilayer_fabric_wrap")).toBeGreaterThan(weight("stamped_metal_can"));
  });
});

describe("reworkability", () => {
  it("board level fence most reworkable", () => {
    expect(reworkability("board_level_fence")).toBeGreaterThan(reworkability("conductive_paint_spray"));
  });
});

describe("shCost", () => {
  it("board level fence most expensive", () => {
    expect(shCost("board_level_fence")).toBeGreaterThan(shCost("metal_foil_tape"));
  });
});

describe("conformal", () => {
  it("conductive paint is conformal", () => {
    expect(conformal("conductive_paint_spray")).toBe(true);
  });
  it("stamped metal not conformal", () => {
    expect(conformal("stamped_metal_can")).toBe(false);
  });
});

describe("forRf", () => {
  it("stamped metal for rf", () => {
    expect(forRf("stamped_metal_can")).toBe(true);
  });
  it("conductive paint not for rf", () => {
    expect(forRf("conductive_paint_spray")).toBe(false);
  });
});

describe("material", () => {
  it("multilayer fabric uses woven silver nylon mesh", () => {
    expect(material("multilayer_fabric_wrap")).toBe("woven_silver_nylon_mesh");
  });
});

describe("bestUse", () => {
  it("board level fence best for multi compartment 5g", () => {
    expect(bestUse("board_level_fence")).toBe("multi_compartment_5g_radio");
  });
});

describe("shieldings", () => {
  it("returns 5 types", () => {
    expect(shieldings()).toHaveLength(5);
  });
});
