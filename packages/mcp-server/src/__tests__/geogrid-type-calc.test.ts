import { describe, it, expect } from "vitest";
import {
  tensile, interlock, flexibility, creep,
  ggCost, multiAxial, forWall, structure,
  bestUse, geogridTypes,
} from "../geogrid-type-calc.js";

describe("tensile", () => {
  it("woven polyester highest tensile", () => {
    expect(tensile("woven_polyester_high_str")).toBeGreaterThan(tensile("biaxial_pp_punch_draw"));
  });
});

describe("interlock", () => {
  it("triaxial best interlock", () => {
    expect(interlock("triaxial_triangular_rib")).toBeGreaterThan(interlock("woven_polyester_high_str"));
  });
});

describe("flexibility", () => {
  it("woven polyester most flexible", () => {
    expect(flexibility("woven_polyester_high_str")).toBeGreaterThan(flexibility("welded_steel_wire_mesh"));
  });
});

describe("creep", () => {
  it("welded steel best creep resistance", () => {
    expect(creep("welded_steel_wire_mesh")).toBeGreaterThan(creep("biaxial_pp_punch_draw"));
  });
});

describe("ggCost", () => {
  it("welded steel most expensive", () => {
    expect(ggCost("welded_steel_wire_mesh")).toBeGreaterThan(ggCost("biaxial_pp_punch_draw"));
  });
});

describe("multiAxial", () => {
  it("biaxial is multi axial", () => {
    expect(multiAxial("biaxial_pp_punch_draw")).toBe(true);
  });
  it("uniaxial not multi axial", () => {
    expect(multiAxial("uniaxial_hdpe_stretch")).toBe(false);
  });
});

describe("forWall", () => {
  it("uniaxial for wall", () => {
    expect(forWall("uniaxial_hdpe_stretch")).toBe(true);
  });
  it("biaxial not for wall", () => {
    expect(forWall("biaxial_pp_punch_draw")).toBe(false);
  });
});

describe("structure", () => {
  it("triaxial uses triangular aperture", () => {
    expect(structure("triaxial_triangular_rib")).toBe("triangular_aperture_multi_direct");
  });
});

describe("bestUse", () => {
  it("uniaxial for retaining wall", () => {
    expect(bestUse("uniaxial_hdpe_stretch")).toBe("retaining_wall_steep_slope_reinforce");
  });
});

describe("geogridTypes", () => {
  it("returns 5 types", () => {
    expect(geogridTypes()).toHaveLength(5);
  });
});
