import { describe, it, expect } from "vitest";
import {
  cellViability, resolution, speed, complexity,
  baCost, cellLaden, forOrgan, bioink,
  bestUse, bioAmTypes,
} from "../bio-am-calc.js";

describe("cellViability", () => {
  it("laser assisted highest cell viability", () => {
    expect(cellViability("laser_assisted_lift")).toBeGreaterThan(cellViability("scaffold_melt_electrospin"));
  });
});

describe("resolution", () => {
  it("laser assisted highest resolution", () => {
    expect(resolution("laser_assisted_lift")).toBeGreaterThan(resolution("extrusion_bioprint_hydrogel"));
  });
});

describe("speed", () => {
  it("volumetric tomographic fastest", () => {
    expect(speed("volumetric_tomographic")).toBeGreaterThan(speed("laser_assisted_lift"));
  });
});

describe("complexity", () => {
  it("volumetric tomographic most complex", () => {
    expect(complexity("volumetric_tomographic")).toBeGreaterThan(complexity("scaffold_melt_electrospin"));
  });
});

describe("baCost", () => {
  it("laser assisted most expensive", () => {
    expect(baCost("laser_assisted_lift")).toBeGreaterThan(baCost("scaffold_melt_electrospin"));
  });
});

describe("cellLaden", () => {
  it("extrusion bioprint is cell-laden", () => {
    expect(cellLaden("extrusion_bioprint_hydrogel")).toBe(true);
  });
  it("scaffold melt not cell-laden", () => {
    expect(cellLaden("scaffold_melt_electrospin")).toBe(false);
  });
});

describe("forOrgan", () => {
  it("volumetric tomographic for organ models", () => {
    expect(forOrgan("volumetric_tomographic")).toBe(true);
  });
  it("inkjet DOD not for organs", () => {
    expect(forOrgan("inkjet_drop_on_demand")).toBe(false);
  });
});

describe("bioink", () => {
  it("scaffold melt uses PCL PLA fiber", () => {
    expect(bioink("scaffold_melt_electrospin")).toBe("pcl_pla_melt_electrospun_fiber");
  });
});

describe("bestUse", () => {
  it("volumetric for complex vasculature", () => {
    expect(bestUse("volumetric_tomographic")).toBe("complex_vasculature_organ_model");
  });
});

describe("bioAmTypes", () => {
  it("returns 5 types", () => {
    expect(bioAmTypes()).toHaveLength(5);
  });
});
