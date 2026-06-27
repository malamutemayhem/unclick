import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, dimensionalHold, materialCompat,
  vsCost, sealed, forAbs, smootherConfig,
  bestUse, vaporSmootherTypes,
} from "../vapor-smoother-calc.js";

describe("surfaceFinish", () => {
  it("vacuum vapor best surface finish", () => {
    expect(surfaceFinish("vacuum_vapor")).toBeGreaterThan(surfaceFinish("chemical_dip"));
  });
});

describe("throughput", () => {
  it("chemical dip highest throughput", () => {
    expect(throughput("chemical_dip")).toBeGreaterThan(throughput("vacuum_vapor"));
  });
});

describe("dimensionalHold", () => {
  it("vacuum vapor best dimensional hold", () => {
    expect(dimensionalHold("vacuum_vapor")).toBeGreaterThan(dimensionalHold("chemical_dip"));
  });
});

describe("materialCompat", () => {
  it("vacuum vapor best material compat", () => {
    expect(materialCompat("vacuum_vapor")).toBeGreaterThan(materialCompat("acetone_vapor"));
  });
});

describe("vsCost", () => {
  it("vacuum vapor most expensive", () => {
    expect(vsCost("vacuum_vapor")).toBeGreaterThan(vsCost("acetone_vapor"));
  });
});

describe("sealed", () => {
  it("solvent vapor is sealed", () => {
    expect(sealed("solvent_vapor")).toBe(true);
  });
  it("acetone vapor not sealed", () => {
    expect(sealed("acetone_vapor")).toBe(false);
  });
});

describe("forAbs", () => {
  it("acetone vapor for abs", () => {
    expect(forAbs("acetone_vapor")).toBe(true);
  });
  it("solvent vapor not for abs", () => {
    expect(forAbs("solvent_vapor")).toBe(false);
  });
});

describe("smootherConfig", () => {
  it("heated chamber uses controlled temp solvent saturate", () => {
    expect(smootherConfig("heated_chamber")).toBe("heated_chamber_vapor_smoother_controlled_temp_solvent_saturate");
  });
});

describe("bestUse", () => {
  it("vacuum vapor for precision part tight tolerance smooth seal", () => {
    expect(bestUse("vacuum_vapor")).toBe("precision_part_vacuum_vapor_smoother_tight_tolerance_smooth_seal");
  });
});

describe("vaporSmootherTypes", () => {
  it("returns 5 types", () => {
    expect(vaporSmootherTypes()).toHaveLength(5);
  });
});
