import { describe, it, expect } from "vitest";
import {
  magnification, resolution, depthOfField, contrastModes,
  omCost, motorized, forLiveCell, objective,
  bestUse, opticalMicroscopeTypes,
} from "../optical-microscope-calc.js";

describe("magnification", () => {
  it("confocal scanning highest magnification", () => {
    expect(magnification("confocal_scanning")).toBeGreaterThan(magnification("stereo_dissecting"));
  });
});

describe("resolution", () => {
  it("confocal scanning highest resolution", () => {
    expect(resolution("confocal_scanning")).toBeGreaterThan(resolution("brightfield_compound"));
  });
});

describe("depthOfField", () => {
  it("stereo dissecting best depth of field", () => {
    expect(depthOfField("stereo_dissecting")).toBeGreaterThan(depthOfField("brightfield_compound"));
  });
});

describe("contrastModes", () => {
  it("fluorescence epi most contrast modes", () => {
    expect(contrastModes("fluorescence_epi")).toBeGreaterThan(contrastModes("stereo_dissecting"));
  });
});

describe("omCost", () => {
  it("confocal scanning most expensive", () => {
    expect(omCost("confocal_scanning")).toBeGreaterThan(omCost("stereo_dissecting"));
  });
});

describe("motorized", () => {
  it("confocal scanning is motorized", () => {
    expect(motorized("confocal_scanning")).toBe(true);
  });
  it("brightfield compound not motorized", () => {
    expect(motorized("brightfield_compound")).toBe(false);
  });
});

describe("forLiveCell", () => {
  it("fluorescence epi for live cell", () => {
    expect(forLiveCell("fluorescence_epi")).toBe(true);
  });
  it("stereo dissecting not for live cell", () => {
    expect(forLiveCell("stereo_dissecting")).toBe(false);
  });
});

describe("objective", () => {
  it("confocal uses plan apochromat high na", () => {
    expect(objective("confocal_scanning")).toBe("plan_apochromat_high_na_oil_water_silicone_immersion_laser");
  });
});

describe("bestUse", () => {
  it("stereo dissecting for dissection soldering", () => {
    expect(bestUse("stereo_dissecting")).toBe("dissection_soldering_quality_inspection_entomology_fossil");
  });
});

describe("opticalMicroscopeTypes", () => {
  it("returns 5 types", () => {
    expect(opticalMicroscopeTypes()).toHaveLength(5);
  });
});
