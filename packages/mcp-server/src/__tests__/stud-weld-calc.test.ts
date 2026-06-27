import { describe, it, expect } from "vitest";
import {
  shear, tensile, speed, versatility,
  swCost, automatic, forComposite, process,
  bestUse, studWeldTypes,
} from "../stud-weld-calc.js";

describe("shear", () => {
  it("headed shear stud highest shear", () => {
    expect(shear("headed_shear_stud_composite")).toBeGreaterThan(shear("insulation_pin_cd_weld"));
  });
});

describe("tensile", () => {
  it("deformed bar highest tensile", () => {
    expect(tensile("deformed_bar_anchor_rebar")).toBeGreaterThan(tensile("insulation_pin_cd_weld"));
  });
});

describe("speed", () => {
  it("insulation pin fastest", () => {
    expect(speed("insulation_pin_cd_weld")).toBeGreaterThan(speed("deformed_bar_anchor_rebar"));
  });
});

describe("versatility", () => {
  it("threaded stud most versatile", () => {
    expect(versatility("threaded_stud_projection")).toBeGreaterThan(versatility("insulation_pin_cd_weld"));
  });
});

describe("swCost", () => {
  it("arc stud most expensive", () => {
    expect(swCost("arc_stud_drawn_arc_large")).toBeGreaterThan(swCost("insulation_pin_cd_weld"));
  });
});

describe("automatic", () => {
  it("headed shear stud is automatic", () => {
    expect(automatic("headed_shear_stud_composite")).toBe(true);
  });
  it("deformed bar not automatic", () => {
    expect(automatic("deformed_bar_anchor_rebar")).toBe(false);
  });
});

describe("forComposite", () => {
  it("headed shear stud for composite", () => {
    expect(forComposite("headed_shear_stud_composite")).toBe(true);
  });
  it("threaded stud not for composite", () => {
    expect(forComposite("threaded_stud_projection")).toBe(false);
  });
});

describe("process", () => {
  it("insulation pin uses cd", () => {
    expect(process("insulation_pin_cd_weld")).toBe("capacitor_discharge_thin_pin");
  });
});

describe("bestUse", () => {
  it("headed shear stud for composite beam", () => {
    expect(bestUse("headed_shear_stud_composite")).toBe("composite_beam_deck_shear_connect");
  });
});

describe("studWeldTypes", () => {
  it("returns 5 types", () => {
    expect(studWeldTypes()).toHaveLength(5);
  });
});
