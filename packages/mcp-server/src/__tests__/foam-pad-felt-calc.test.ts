import { describe, it, expect } from "vitest";
import {
  needleProtect, surfaceRebound, durability, portability,
  padCost, natural, washable, padMaterial,
  bestUse, foamPadFelts,
} from "../foam-pad-felt-calc.js";

describe("needleProtect", () => {
  it("brush mat bristle best needle protect", () => {
    expect(needleProtect("brush_mat_bristle")).toBeGreaterThan(needleProtect("travel_pad_compact"));
  });
});

describe("surfaceRebound", () => {
  it("brush mat bristle best surface rebound", () => {
    expect(surfaceRebound("brush_mat_bristle")).toBeGreaterThan(surfaceRebound("travel_pad_compact"));
  });
});

describe("durability", () => {
  it("multi layer thick most durable", () => {
    expect(durability("multi_layer_thick")).toBeGreaterThan(durability("wool_pad_natural"));
  });
});

describe("portability", () => {
  it("travel pad compact most portable", () => {
    expect(portability("travel_pad_compact")).toBeGreaterThan(portability("multi_layer_thick"));
  });
});

describe("padCost", () => {
  it("brush mat bristle most expensive", () => {
    expect(padCost("brush_mat_bristle")).toBeGreaterThan(padCost("dense_foam_standard"));
  });
});

describe("natural", () => {
  it("wool pad natural is natural", () => {
    expect(natural("wool_pad_natural")).toBe(true);
  });
  it("dense foam standard not natural", () => {
    expect(natural("dense_foam_standard")).toBe(false);
  });
});

describe("washable", () => {
  it("brush mat bristle is washable", () => {
    expect(washable("brush_mat_bristle")).toBe(true);
  });
  it("dense foam standard not washable", () => {
    expect(washable("dense_foam_standard")).toBe(false);
  });
});

describe("padMaterial", () => {
  it("multi layer thick uses layered foam stack", () => {
    expect(padMaterial("multi_layer_thick")).toBe("layered_foam_stack");
  });
});

describe("bestUse", () => {
  it("dense foam standard best for general felting surface", () => {
    expect(bestUse("dense_foam_standard")).toBe("general_felting_surface");
  });
});

describe("foamPadFelts", () => {
  it("returns 5 types", () => {
    expect(foamPadFelts()).toHaveLength(5);
  });
});
