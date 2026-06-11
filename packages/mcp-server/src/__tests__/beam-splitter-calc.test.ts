import { describe, it, expect } from "vitest";
import {
  transmittance, damage, wavefront, bandwidth,
  bsCost, polarizing, forLaser, substrate,
  bestUse, beamSplitterTypes,
} from "../beam-splitter-calc.js";

describe("transmittance", () => {
  it("pellicle highest transmittance", () => {
    expect(transmittance("pellicle_thin_membrane")).toBeGreaterThan(transmittance("cube_cemented_prism"));
  });
});

describe("damage", () => {
  it("plate best damage threshold", () => {
    expect(damage("plate_dielectric_coated")).toBeGreaterThan(damage("pellicle_thin_membrane"));
  });
});

describe("wavefront", () => {
  it("cube best wavefront", () => {
    expect(wavefront("cube_cemented_prism")).toBeGreaterThan(wavefront("fiber_fused_biconical"));
  });
});

describe("bandwidth", () => {
  it("pellicle widest bandwidth", () => {
    expect(bandwidth("pellicle_thin_membrane")).toBeGreaterThan(bandwidth("polarizing_pbs_cube"));
  });
});

describe("bsCost", () => {
  it("pellicle most expensive", () => {
    expect(bsCost("pellicle_thin_membrane")).toBeGreaterThan(bsCost("plate_dielectric_coated"));
  });
});

describe("polarizing", () => {
  it("pbs cube is polarizing", () => {
    expect(polarizing("polarizing_pbs_cube")).toBe(true);
  });
  it("plate not polarizing", () => {
    expect(polarizing("plate_dielectric_coated")).toBe(false);
  });
});

describe("forLaser", () => {
  it("plate for laser", () => {
    expect(forLaser("plate_dielectric_coated")).toBe(true);
  });
  it("pellicle not for laser", () => {
    expect(forLaser("pellicle_thin_membrane")).toBe(false);
  });
});

describe("substrate", () => {
  it("fiber uses fused silica taper", () => {
    expect(substrate("fiber_fused_biconical")).toBe("fused_silica_fiber_taper");
  });
});

describe("bestUse", () => {
  it("pbs cube best for quantum optics", () => {
    expect(bestUse("polarizing_pbs_cube")).toBe("quantum_optics_entangled_photon");
  });
});

describe("beamSplitterTypes", () => {
  it("returns 5 types", () => {
    expect(beamSplitterTypes()).toHaveLength(5);
  });
});
