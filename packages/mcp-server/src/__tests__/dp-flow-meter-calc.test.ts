import { describe, it, expect } from "vitest";
import {
  accuracy, permanentLoss, rangeability, durability,
  dpCost, noMovingParts, forDirty, element,
  bestUse, dpFlowMeterTypes,
} from "../dp-flow-meter-calc.js";

describe("accuracy", () => {
  it("venturi tube highest accuracy", () => {
    expect(accuracy("venturi_tube_classic")).toBeGreaterThan(accuracy("orifice_plate_concentric"));
  });
});

describe("permanentLoss", () => {
  it("venturi tube lowest permanent loss (highest score)", () => {
    expect(permanentLoss("venturi_tube_classic")).toBeGreaterThan(permanentLoss("orifice_plate_concentric"));
  });
});

describe("rangeability", () => {
  it("wedge meter best rangeability", () => {
    expect(rangeability("wedge_meter_slurry")).toBeGreaterThan(rangeability("orifice_plate_concentric"));
  });
});

describe("durability", () => {
  it("venturi tube and wedge meter most durable", () => {
    expect(durability("venturi_tube_classic")).toBeGreaterThan(durability("averaging_pitot_annubar"));
  });
});

describe("dpCost", () => {
  it("venturi tube most expensive", () => {
    expect(dpCost("venturi_tube_classic")).toBeGreaterThan(dpCost("orifice_plate_concentric"));
  });
});

describe("noMovingParts", () => {
  it("all dp flow meters have no moving parts", () => {
    expect(noMovingParts("orifice_plate_concentric")).toBe(true);
    expect(noMovingParts("venturi_tube_classic")).toBe(true);
  });
});

describe("forDirty", () => {
  it("venturi tube for dirty fluids", () => {
    expect(forDirty("venturi_tube_classic")).toBe(true);
  });
  it("orifice plate not for dirty", () => {
    expect(forDirty("orifice_plate_concentric")).toBe(false);
  });
});

describe("element", () => {
  it("wedge meter uses v wedge restriction", () => {
    expect(element("wedge_meter_slurry")).toBe("v_wedge_restriction_no_edge_buildup");
  });
});

describe("bestUse", () => {
  it("averaging pitot for large duct stack gas", () => {
    expect(bestUse("averaging_pitot_annubar")).toBe("large_duct_stack_gas_retrofit_install");
  });
});

describe("dpFlowMeterTypes", () => {
  it("returns 5 types", () => {
    expect(dpFlowMeterTypes()).toHaveLength(5);
  });
});
