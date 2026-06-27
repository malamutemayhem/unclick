import { describe, it, expect } from "vitest";
import {
  lightReduction, colorAccuracy, glareReduction, creativePotential,
  filterCost, alwaysOn, requiresAdapter, opticalEffect,
  bestSubject, lensFilters,
} from "../lens-filter-calc.js";

describe("lightReduction", () => {
  it("neutral density most reduction", () => {
    expect(lightReduction("neutral_density")).toBeGreaterThan(lightReduction("uv_haze"));
  });
});

describe("colorAccuracy", () => {
  it("uv haze best color accuracy", () => {
    expect(colorAccuracy("uv_haze")).toBeGreaterThan(colorAccuracy("infrared_pass"));
  });
});

describe("glareReduction", () => {
  it("circular polarizer best glare reduction", () => {
    expect(glareReduction("circular_polarizer")).toBeGreaterThan(glareReduction("neutral_density"));
  });
});

describe("creativePotential", () => {
  it("infrared pass highest creative potential", () => {
    expect(creativePotential("infrared_pass")).toBeGreaterThan(creativePotential("uv_haze"));
  });
});

describe("filterCost", () => {
  it("infrared pass most expensive", () => {
    expect(filterCost("infrared_pass")).toBeGreaterThan(filterCost("uv_haze"));
  });
});

describe("alwaysOn", () => {
  it("uv haze is always on", () => {
    expect(alwaysOn("uv_haze")).toBe(true);
  });
  it("neutral density is not", () => {
    expect(alwaysOn("neutral_density")).toBe(false);
  });
});

describe("requiresAdapter", () => {
  it("graduated nd requires adapter", () => {
    expect(requiresAdapter("graduated_nd")).toBe(true);
  });
  it("circular polarizer does not", () => {
    expect(requiresAdapter("circular_polarizer")).toBe(false);
  });
});

describe("opticalEffect", () => {
  it("circular polarizer removes reflections deepens sky", () => {
    expect(opticalEffect("circular_polarizer")).toBe("reflection_remove_sky_deepen");
  });
});

describe("bestSubject", () => {
  it("neutral density for long exposure waterfall", () => {
    expect(bestSubject("neutral_density")).toBe("long_exposure_waterfall");
  });
});

describe("lensFilters", () => {
  it("returns 5 types", () => {
    expect(lensFilters()).toHaveLength(5);
  });
});
