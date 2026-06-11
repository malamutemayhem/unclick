import { describe, it, expect } from "vitest";
import {
  fieldStrength, throughput, recovery, selectivity,
  msCost, wet, forParamagnetic, magnet,
  bestUse, magneticSeparatorTypes,
} from "../magnetic-separator-calc.js";

describe("fieldStrength", () => {
  it("high gradient wet strongest field", () => {
    expect(fieldStrength("high_gradient_wet")).toBeGreaterThan(fieldStrength("low_intensity_drum"));
  });
});

describe("throughput", () => {
  it("low intensity drum highest throughput", () => {
    expect(throughput("low_intensity_drum")).toBeGreaterThan(throughput("high_gradient_wet"));
  });
});

describe("recovery", () => {
  it("high gradient wet best recovery", () => {
    expect(recovery("high_gradient_wet")).toBeGreaterThan(recovery("eddy_current"));
  });
});

describe("selectivity", () => {
  it("high gradient wet and rare earth roll best selectivity", () => {
    expect(selectivity("high_gradient_wet")).toBeGreaterThan(selectivity("low_intensity_drum"));
    expect(selectivity("rare_earth_roll")).toBeGreaterThan(selectivity("low_intensity_drum"));
  });
});

describe("msCost", () => {
  it("high gradient wet most expensive", () => {
    expect(msCost("high_gradient_wet")).toBeGreaterThan(msCost("low_intensity_drum"));
  });
});

describe("wet", () => {
  it("high gradient wet uses wet process", () => {
    expect(wet("high_gradient_wet")).toBe(true);
  });
  it("rare earth roll is dry", () => {
    expect(wet("rare_earth_roll")).toBe(false);
  });
});

describe("forParamagnetic", () => {
  it("high intensity dry for paramagnetic", () => {
    expect(forParamagnetic("high_intensity_dry")).toBe(true);
  });
  it("low intensity drum not for paramagnetic", () => {
    expect(forParamagnetic("low_intensity_drum")).toBe(false);
  });
});

describe("magnet", () => {
  it("eddy current uses rotating ndfeb rotor", () => {
    expect(magnet("eddy_current")).toBe("rotating_ndfeb_rotor_alternating_polarity_eddy_repulsion");
  });
});

describe("bestUse", () => {
  it("high gradient wet for kaolin purification", () => {
    expect(bestUse("high_gradient_wet")).toBe("kaolin_purification_feldspar_cleaning_fine_iron_removal");
  });
});

describe("magneticSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(magneticSeparatorTypes()).toHaveLength(5);
  });
});
