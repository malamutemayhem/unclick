import { describe, it, expect } from "vitest";
import {
  jetUniformity, speedRange, basisWeightControl, fiberOrientation,
  hbCost, pressurized, forMultiPly, headboxConfig,
  bestUse, headboxTypes,
} from "../headbox-calc.js";

describe("jetUniformity", () => {
  it("dilution control best jet uniformity", () => {
    expect(jetUniformity("dilution_control")).toBeGreaterThan(jetUniformity("open_gravity"));
  });
});

describe("speedRange", () => {
  it("dilution control widest speed range", () => {
    expect(speedRange("dilution_control")).toBeGreaterThan(speedRange("open_gravity"));
  });
});

describe("basisWeightControl", () => {
  it("dilution control best basis weight control", () => {
    expect(basisWeightControl("dilution_control")).toBeGreaterThan(basisWeightControl("open_gravity"));
  });
});

describe("fiberOrientation", () => {
  it("gap former best fiber orientation", () => {
    expect(fiberOrientation("gap_former")).toBeGreaterThan(fiberOrientation("open_gravity"));
  });
});

describe("hbCost", () => {
  it("dilution control most expensive", () => {
    expect(hbCost("dilution_control")).toBeGreaterThan(hbCost("open_gravity"));
  });
});

describe("pressurized", () => {
  it("pressurized hydraulic is pressurized", () => {
    expect(pressurized("pressurized_hydraulic")).toBe(true);
  });
  it("open gravity not pressurized", () => {
    expect(pressurized("open_gravity")).toBe(false);
  });
});

describe("forMultiPly", () => {
  it("multi layer for multi ply", () => {
    expect(forMultiPly("multi_layer")).toBe(true);
  });
  it("gap former not for multi ply", () => {
    expect(forMultiPly("gap_former")).toBe(false);
  });
});

describe("headboxConfig", () => {
  it("open gravity uses overflow weir low speed", () => {
    expect(headboxConfig("open_gravity")).toBe("open_gravity_overflow_weir_low_speed_board_tissue_simple_jet");
  });
});

describe("bestUse", () => {
  it("gap former for high speed printing paper", () => {
    expect(bestUse("gap_former")).toBe("high_speed_printing_paper_gap_former_twin_wire_even_formation");
  });
});

describe("headboxTypes", () => {
  it("returns 5 types", () => {
    expect(headboxTypes()).toHaveLength(5);
  });
});
