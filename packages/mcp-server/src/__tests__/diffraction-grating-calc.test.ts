import { describe, it, expect } from "vitest";
import {
  resolution, efficiency, bandwidth, strayLight,
  dgCost, inFiber, forSpectroscopy, fabrication,
  bestUse, diffractionGratingTypes,
} from "../diffraction-grating-calc.js";

describe("resolution", () => {
  it("echelle highest resolution", () => {
    expect(resolution("echelle_high_order")).toBeGreaterThan(resolution("fiber_bragg_gratings"));
  });
});

describe("efficiency", () => {
  it("transmission volume phase most efficient", () => {
    expect(efficiency("transmission_volume_phase")).toBeGreaterThan(efficiency("holographic_sinusoidal"));
  });
});

describe("bandwidth", () => {
  it("holographic widest bandwidth", () => {
    expect(bandwidth("holographic_sinusoidal")).toBeGreaterThan(bandwidth("fiber_bragg_gratings"));
  });
});

describe("strayLight", () => {
  it("holographic least stray light", () => {
    expect(strayLight("holographic_sinusoidal")).toBeGreaterThan(strayLight("ruled_blazed_reflection"));
  });
});

describe("dgCost", () => {
  it("echelle most expensive", () => {
    expect(dgCost("echelle_high_order")).toBeGreaterThan(dgCost("holographic_sinusoidal"));
  });
});

describe("inFiber", () => {
  it("fiber bragg is in fiber", () => {
    expect(inFiber("fiber_bragg_gratings")).toBe(true);
  });
  it("ruled not in fiber", () => {
    expect(inFiber("ruled_blazed_reflection")).toBe(false);
  });
});

describe("forSpectroscopy", () => {
  it("echelle for spectroscopy", () => {
    expect(forSpectroscopy("echelle_high_order")).toBe(true);
  });
  it("fiber bragg not for spectroscopy", () => {
    expect(forSpectroscopy("fiber_bragg_gratings")).toBe(false);
  });
});

describe("fabrication", () => {
  it("transmission uses dcg holographic gelatin", () => {
    expect(fabrication("transmission_volume_phase")).toBe("dcg_holographic_gelatin");
  });
});

describe("bestUse", () => {
  it("ruled best for monochromator", () => {
    expect(bestUse("ruled_blazed_reflection")).toBe("monochromator_wavelength_select");
  });
});

describe("diffractionGratingTypes", () => {
  it("returns 5 types", () => {
    expect(diffractionGratingTypes()).toHaveLength(5);
  });
});
