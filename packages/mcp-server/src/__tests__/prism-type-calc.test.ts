import { describe, it, expect } from "vitest";
import {
  dispersionPower, reflectionEfficiency, opticalPrecision, costFactor,
  wavelengthSensitivity, coatingRequired, usedInSpectroscopy,
  commonApplication, glassMaterial, prismTypes,
} from "../prism-type-calc.js";

describe("dispersionPower", () => {
  it("dispersive prism best dispersion", () => {
    expect(dispersionPower("dispersive")).toBeGreaterThan(dispersionPower("retroreflector"));
  });
});

describe("reflectionEfficiency", () => {
  it("reflective prism best reflection", () => {
    expect(reflectionEfficiency("reflective")).toBeGreaterThan(
      reflectionEfficiency("dispersive")
    );
  });
});

describe("opticalPrecision", () => {
  it("polarizing highest precision", () => {
    expect(opticalPrecision("polarizing")).toBeGreaterThan(opticalPrecision("retroreflector"));
  });
});

describe("costFactor", () => {
  it("polarizing most expensive", () => {
    expect(costFactor("polarizing")).toBeGreaterThan(costFactor("retroreflector"));
  });
});

describe("wavelengthSensitivity", () => {
  it("dispersive most wavelength sensitive", () => {
    expect(wavelengthSensitivity("dispersive")).toBeGreaterThan(
      wavelengthSensitivity("retroreflector")
    );
  });
});

describe("coatingRequired", () => {
  it("beam splitting requires coating", () => {
    expect(coatingRequired("beam_splitting")).toBe(true);
  });
  it("dispersive does not", () => {
    expect(coatingRequired("dispersive")).toBe(false);
  });
});

describe("usedInSpectroscopy", () => {
  it("dispersive used in spectroscopy", () => {
    expect(usedInSpectroscopy("dispersive")).toBe(true);
  });
  it("reflective not used", () => {
    expect(usedInSpectroscopy("reflective")).toBe(false);
  });
});

describe("commonApplication", () => {
  it("reflective for binoculars", () => {
    expect(commonApplication("reflective")).toBe("binoculars_periscopes");
  });
});

describe("glassMaterial", () => {
  it("polarizing uses calcite", () => {
    expect(glassMaterial("polarizing")).toBe("calcite_wollaston");
  });
});

describe("prismTypes", () => {
  it("returns 5 types", () => {
    expect(prismTypes()).toHaveLength(5);
  });
});
