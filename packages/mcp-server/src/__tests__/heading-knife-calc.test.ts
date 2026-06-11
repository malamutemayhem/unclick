import { describe, it, expect } from "vitest";
import {
  cutCircle, edgeClean, setupSpeed, sizeRange,
  knifeCost, powered, adjustable, cutMethod,
  bestUse, headingKnives,
} from "../heading-knife-calc.js";

describe("cutCircle", () => {
  it("compass cutter round best circle cut", () => {
    expect(cutCircle("compass_cutter_round")).toBeGreaterThan(cutCircle("straight_blade_trim"));
  });
});

describe("edgeClean", () => {
  it("compass cutter round cleanest edge", () => {
    expect(edgeClean("compass_cutter_round")).toBeGreaterThan(edgeClean("electric_jigsaw_power"));
  });
});

describe("setupSpeed", () => {
  it("electric jigsaw power fastest setup", () => {
    expect(setupSpeed("electric_jigsaw_power")).toBeGreaterThan(setupSpeed("adjustable_radius_set"));
  });
});

describe("sizeRange", () => {
  it("adjustable radius set best size range", () => {
    expect(sizeRange("adjustable_radius_set")).toBeGreaterThan(sizeRange("straight_blade_trim"));
  });
});

describe("knifeCost", () => {
  it("adjustable radius set most expensive", () => {
    expect(knifeCost("adjustable_radius_set")).toBeGreaterThan(knifeCost("straight_blade_trim"));
  });
});

describe("powered", () => {
  it("electric jigsaw power is powered", () => {
    expect(powered("electric_jigsaw_power")).toBe(true);
  });
  it("compass cutter round not powered", () => {
    expect(powered("compass_cutter_round")).toBe(false);
  });
});

describe("adjustable", () => {
  it("compass cutter round is adjustable", () => {
    expect(adjustable("compass_cutter_round")).toBe(true);
  });
  it("straight blade trim not adjustable", () => {
    expect(adjustable("straight_blade_trim")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("beveled edge chamfer uses bevel chamfer cut", () => {
    expect(cutMethod("beveled_edge_chamfer")).toBe("bevel_chamfer_cut");
  });
});

describe("bestUse", () => {
  it("compass cutter round best for precision head circle", () => {
    expect(bestUse("compass_cutter_round")).toBe("precision_head_circle");
  });
});

describe("headingKnives", () => {
  it("returns 5 types", () => {
    expect(headingKnives()).toHaveLength(5);
  });
});
