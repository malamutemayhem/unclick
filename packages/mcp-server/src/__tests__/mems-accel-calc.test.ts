import { describe, it, expect } from "vitest";
import {
  sensitivity, bandwidth, noiseFloor, shockSurvival,
  accCost, selfTest, forNav, transduction,
  bestUse, memsAccels,
} from "../mems-accel-calc.js";

describe("sensitivity", () => {
  it("optical fbg highest sensitivity", () => {
    expect(sensitivity("optical_fbg")).toBeGreaterThan(sensitivity("thermal_convective"));
  });
});

describe("bandwidth", () => {
  it("piezoelectric shear widest bandwidth", () => {
    expect(bandwidth("piezoelectric_shear")).toBeGreaterThan(bandwidth("thermal_convective"));
  });
});

describe("noiseFloor", () => {
  it("optical fbg lowest noise floor", () => {
    expect(noiseFloor("optical_fbg")).toBeGreaterThan(noiseFloor("thermal_convective"));
  });
});

describe("shockSurvival", () => {
  it("piezoresistive bulk best shock survival", () => {
    expect(shockSurvival("piezoresistive_bulk")).toBeGreaterThan(shockSurvival("optical_fbg"));
  });
});

describe("accCost", () => {
  it("optical fbg most expensive", () => {
    expect(accCost("optical_fbg")).toBeGreaterThan(accCost("thermal_convective"));
  });
});

describe("selfTest", () => {
  it("capacitive comb has self test", () => {
    expect(selfTest("capacitive_comb")).toBe(true);
  });
  it("optical fbg no self test", () => {
    expect(selfTest("optical_fbg")).toBe(false);
  });
});

describe("forNav", () => {
  it("capacitive comb for nav", () => {
    expect(forNav("capacitive_comb")).toBe(true);
  });
  it("thermal convective not for nav", () => {
    expect(forNav("thermal_convective")).toBe(false);
  });
});

describe("transduction", () => {
  it("optical fbg uses fiber bragg wavelength", () => {
    expect(transduction("optical_fbg")).toBe("fiber_bragg_wavelength");
  });
});

describe("bestUse", () => {
  it("piezoresistive bulk best for crash test impact sensor", () => {
    expect(bestUse("piezoresistive_bulk")).toBe("crash_test_impact_sensor");
  });
});

describe("memsAccels", () => {
  it("returns 5 types", () => {
    expect(memsAccels()).toHaveLength(5);
  });
});
