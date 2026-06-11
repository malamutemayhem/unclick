import { describe, it, expect } from "vitest";
import {
  accuracy, tempRange, emissivityImmune, spatialRes,
  piCost, nonContact, forMoving, detector,
  bestUse, pyrometerIrTypes,
} from "../pyrometer-ir-calc.js";

describe("accuracy", () => {
  it("multi wavelength most accurate", () => {
    expect(accuracy("multi_wavelength_spectral")).toBeGreaterThan(accuracy("thermal_imaging_area"));
  });
});

describe("tempRange", () => {
  it("fiber optic widest temp range", () => {
    expect(tempRange("fiber_optic_remote")).toBeGreaterThan(tempRange("thermal_imaging_area"));
  });
});

describe("emissivityImmune", () => {
  it("multi wavelength best emissivity immunity", () => {
    expect(emissivityImmune("multi_wavelength_spectral")).toBeGreaterThan(emissivityImmune("spot_single_wavelength"));
  });
});

describe("spatialRes", () => {
  it("thermal imaging best spatial resolution", () => {
    expect(spatialRes("thermal_imaging_area")).toBeGreaterThan(spatialRes("ratio_two_color"));
  });
});

describe("piCost", () => {
  it("multi wavelength most expensive", () => {
    expect(piCost("multi_wavelength_spectral")).toBeGreaterThan(piCost("spot_single_wavelength"));
  });
});

describe("nonContact", () => {
  it("all pyrometers are non contact", () => {
    expect(nonContact("spot_single_wavelength")).toBe(true);
    expect(nonContact("thermal_imaging_area")).toBe(true);
  });
});

describe("forMoving", () => {
  it("ratio two color for moving targets", () => {
    expect(forMoving("ratio_two_color")).toBe(true);
  });
  it("thermal imaging not for moving", () => {
    expect(forMoving("thermal_imaging_area")).toBe(false);
  });
});

describe("detector", () => {
  it("ratio uses dual wavelength", () => {
    expect(detector("ratio_two_color")).toBe("dual_wavelength_ratio_emissivity_cancel");
  });
});

describe("bestUse", () => {
  it("fiber optic for semiconductor furnace", () => {
    expect(bestUse("fiber_optic_remote")).toBe("semiconductor_furnace_vacuum_rf_immune");
  });
});

describe("pyrometerIrTypes", () => {
  it("returns 5 types", () => {
    expect(pyrometerIrTypes()).toHaveLength(5);
  });
});
