import { describe, it, expect } from "vitest";
import {
  magnificationMax, resolutionPower, samplePrepComplexity, costLevel,
  easeOfUse, liveSampleViewing, requires3dImaging, primaryApplication,
  illuminationSource, microscopeTypes,
} from "../microscope-type-calc.js";

describe("magnificationMax", () => {
  it("electron highest magnification", () => {
    expect(magnificationMax("electron")).toBeGreaterThan(magnificationMax("stereo"));
  });
});

describe("resolutionPower", () => {
  it("electron best resolution", () => {
    expect(resolutionPower("electron")).toBeGreaterThan(resolutionPower("compound"));
  });
});

describe("samplePrepComplexity", () => {
  it("electron needs most prep", () => {
    expect(samplePrepComplexity("electron")).toBeGreaterThan(samplePrepComplexity("stereo"));
  });
});

describe("costLevel", () => {
  it("electron most expensive", () => {
    expect(costLevel("electron")).toBeGreaterThan(costLevel("compound"));
  });
});

describe("easeOfUse", () => {
  it("stereo easiest to use", () => {
    expect(easeOfUse("stereo")).toBeGreaterThan(easeOfUse("electron"));
  });
});

describe("liveSampleViewing", () => {
  it("compound can view live samples", () => {
    expect(liveSampleViewing("compound")).toBe(true);
  });
  it("electron cannot", () => {
    expect(liveSampleViewing("electron")).toBe(false);
  });
});

describe("requires3dImaging", () => {
  it("confocal does 3d imaging", () => {
    expect(requires3dImaging("confocal")).toBe(true);
  });
  it("compound does not", () => {
    expect(requires3dImaging("compound")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("electron for nanotechnology", () => {
    expect(primaryApplication("electron")).toBe("nanotechnology_materials");
  });
});

describe("illuminationSource", () => {
  it("electron uses electron beam", () => {
    expect(illuminationSource("electron")).toBe("electron_beam");
  });
});

describe("microscopeTypes", () => {
  it("returns 5 types", () => {
    expect(microscopeTypes()).toHaveLength(5);
  });
});
